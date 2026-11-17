import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ORDER_NOTIFICATION_CONFIG } from '../config/orderConfig';
import {
  db,
  handleFirestoreError,
  OperationType,
} from '../firebase';

export type OrderPaymentMethod = 'COD' | 'Chuyển khoản';

export interface OrderLineItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface OrderGiftBoxPayload {
  message: string;
  recipient: string;
  occasion: string;
  products: OrderLineItem[];
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  address: string;
  note: string;
  items: OrderLineItem[];
  giftBox: OrderGiftBoxPayload | null;
  total: number;
  paymentMethod: OrderPaymentMethod;
}

export interface CreatedOrderSummary extends CreateOrderInput {
  code: string;
  status: 'new';
}

const CODE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const sessionGeneratedCodes = new Set<string>();

function randomThreeChars(): string {
  const bytes = new Uint8Array(3);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 3; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  let out = '';
  for (let i = 0; i < 3; i += 1) {
    out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  }
  return out;
}

export function generateOrderCode(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const datePart = `${yy}${mm}${dd}`;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = `OCOP-${datePart}-${randomThreeChars()}`;
    if (!sessionGeneratedCodes.has(code)) {
      sessionGeneratedCodes.add(code);
      return code;
    }
  }
  const fallback = `OCOP-${datePart}-${randomThreeChars()}`;
  sessionGeneratedCodes.add(fallback);
  return fallback;
}

function sendAppsScriptNotification(order: CreatedOrderSummary): void {
  try {
    void fetch(ORDER_NOTIFICATION_CONFIG.appsScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret: ORDER_NOTIFICATION_CONFIG.secret,
        type: 'order',
        code: order.code,
        customerName: order.customerName,
        phone: order.phone,
        address: order.address,
        note: order.note,
        items: order.items,
        giftBox: order.giftBox,
        total: order.total,
        paymentMethod: order.paymentMethod,
      }),
    }).catch((err) => {
      console.error('Lỗi gửi thông báo Google Apps Script:', err);
    });
  } catch (err) {
    console.error('Lỗi gửi thông báo Google Apps Script:', err);
  }
}

export async function submitOrder(
  input: CreateOrderInput,
): Promise<CreatedOrderSummary> {
  const maxAttempts = 5;
  let lastError: unknown = null;
  let lastCode = '';

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const code = generateOrderCode();
    lastCode = code;

    const payload = {
      code,
      customerName: input.customerName,
      phone: input.phone,
      address: input.address,
      note: input.note,
      items: input.items,
      giftBox: input.giftBox,
      total: input.total,
      paymentMethod: input.paymentMethod,
      status: 'new' as const,
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, 'orders', code), payload);

      const summary: CreatedOrderSummary = {
        code,
        customerName: input.customerName,
        phone: input.phone,
        address: input.address,
        note: input.note,
        items: input.items,
        giftBox: input.giftBox,
        total: input.total,
        paymentMethod: input.paymentMethod,
        status: 'new',
      };

      // Fire-and-forget notification after Firestore succeeds
      sendAppsScriptNotification(summary);

      return summary;
    } catch (error: unknown) {
      lastError = error;
      const errCode =
        typeof error === 'object' && error !== null && 'code' in error
          ? String((error as { code?: unknown }).code)
          : '';
      if (errCode === 'already-exists' && attempt < maxAttempts - 1) {
        continue;
      }
      handleFirestoreError(error, OperationType.CREATE, `orders/${code}`);
    }
  }

  handleFirestoreError(lastError, OperationType.CREATE, `orders/${lastCode}`);
}
