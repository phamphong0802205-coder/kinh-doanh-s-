import { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Gift,
  Loader2,
  Minus,
  Plus,
  RefreshCw,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  ACCOUNT_NAME,
  ACCOUNT_NO,
  APPS_SCRIPT_URL,
  BANK_ID,
} from '../config/orderConfig';
import {
  FEATURED_GIFT_BOXES,
  evaluateGiftBoxPrice,
  formatVnd,
  getProductName,
} from '../data/mockOcopData';
import { UI_TEXT } from '../i18n/translations';
import {
  CreatedOrderSummary,
  OrderGiftBoxPayload,
  OrderLineItem,
  OrderPaymentMethod,
  submitOrder,
} from '../services/orderService';
import {
  CartItem,
  GiftBoxSelectionItem,
  Language,
  Product,
} from '../types/ocop';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  items: CartItem[];
  products: Product[];
  giftBoxItems: GiftBoxSelectionItem[];
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onConvertGiftBoxToCart: () => void;
  onOpenGiftBuilder: () => void;
  onOrderCreated: (orderCode: string) => void;
}

interface FieldErrors {
  customerName?: string;
  phone?: string;
  address?: string;
  cart?: string;
}

export function CartDrawer({
  isOpen,
  language,
  onClose,
  items,
  products,
  giftBoxItems,
  onUpdateQuantity,
  onRemoveItem,
  onConvertGiftBoxToCart,
  onOpenGiftBuilder,
  onOrderCreated,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMethod>('COD');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] =
    useState<CreatedOrderSummary | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    'waiting' | 'paid' | 'underpaid' | 'timed_out'
  >('waiting');
  const [pollingCycle, setPollingCycle] = useState(0);
  const [isManualChecking, setIsManualChecking] = useState(false);
  const [qrLoadError, setQrLoadError] = useState(false);

  const checkTransferStatus = useCallback(
    async (code: string, phoneNumber: string) => {
      try {
        const url = `${APPS_SCRIPT_URL}?action=lookup&code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phoneNumber)}`;
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) return;
        const data = (await response.json()) as {
          found?: boolean;
          payStatus?: string;
        };
        if (
          data?.found === true &&
          typeof data.payStatus === 'string' &&
          data.payStatus.startsWith('Đã thanh toán')
        ) {
          setPaymentStatus('paid');
        } else if (data?.payStatus === 'Thanh toán thiếu') {
          setPaymentStatus('underpaid');
        }
      } catch (err) {
        console.error('Lỗi kiểm tra trạng thái thanh toán:', err);
      }
    },
    [],
  );

  useEffect(() => {
    if (
      !isOpen ||
      !confirmedOrder ||
      confirmedOrder.paymentMethod !== 'Chuyển khoản' ||
      paymentStatus === 'paid' ||
      paymentStatus === 'timed_out'
    ) {
      return;
    }

    const { code, phone: orderPhone } = confirmedOrder;

    const intervalId = window.setInterval(() => {
      void checkTransferStatus(code, orderPhone);
    }, 10000);

    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      setPaymentStatus((prev) => (prev === 'paid' ? prev : 'timed_out'));
    }, 20 * 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [
    isOpen,
    confirmedOrder,
    paymentStatus,
    pollingCycle,
    checkTransferStatus,
  ]);

  if (!isOpen) return null;

  const isEn = language === 'en';
  const tCommon = UI_TEXT[language].common;

  const hasMissingPrices = items.some(
    (item) => item.unitPrice === null || !Number.isFinite(item.unitPrice),
  );

  const subtotal =
    items.length > 0 && !hasMissingPrices
      ? items.reduce(
          (sum, item) => sum + (item.unitPrice ?? 0) * item.quantity,
          0,
        )
      : null;

  const totalDraftUnits = giftBoxItems.reduce(
    (sum, entry) => sum + entry.quantity,
    0,
  );
  const draftBoxProducts = giftBoxItems.flatMap((entry) =>
    Array.from({ length: entry.quantity }, () => entry.product),
  );
  const draftBoxEval =
    giftBoxItems.length > 0 ? evaluateGiftBoxPrice(draftBoxProducts) : null;

  const resolveCartItemName = (item: CartItem): string => {
    if (item.productId) {
      const foundProduct = products.find((p) => p.id === item.productId);
      if (foundProduct) {
        return getProductName(foundProduct, language);
      }
    }
    if (item.cartKey.startsWith('featured-box:')) {
      const boxId = item.cartKey.replace('featured-box:', '');
      const foundBox = FEATURED_GIFT_BOXES.find((b) => b.id === boxId);
      if (foundBox) {
        return isEn ? foundBox.nameEn : foundBox.name;
      }
    }
    return item.name;
  };

  const resolveCartItemSubtitle = (item: CartItem): string => {
    if (item.productId) {
      const foundProduct = products.find((p) => p.id === item.productId);
      if (foundProduct) {
        const unitLabel = isEn
          ? foundProduct.weightEn ?? foundProduct.unitEn ?? foundProduct.unit
          : foundProduct.weight ?? foundProduct.unit;
        return unitLabel ?? item.subtitle;
      }
    }
    return item.subtitle;
  };

  const handleCopyValue = async (fieldKey: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldKey);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === fieldKey ? null : prev));
      }, 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const handleManualRecheck = async () => {
    if (!confirmedOrder || isManualChecking) return;
    setIsManualChecking(true);
    setPaymentStatus('waiting');
    setPollingCycle((prev) => prev + 1);
    await checkTransferStatus(confirmedOrder.code, confirmedOrder.phone);
    setIsManualChecking(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = customerName.trim().slice(0, 120);
    const normalizedPhone = phone.replace(/[\s.-]/g, '');
    const trimmedAddress = address.trim().slice(0, 300);
    const trimmedNote = note.trim().slice(0, 500);

    const errors: FieldErrors = {};
    if (items.length === 0) {
      errors.cart = 'Giỏ hàng đang trống, vui lòng thêm ít nhất 1 sản phẩm.';
    }
    if (!trimmedName) {
      errors.customerName = 'Vui lòng nhập họ tên người nhận.';
    }
    if (!normalizedPhone) {
      errors.phone = 'Vui lòng nhập số điện thoại.';
    } else if (!/^0\d{9}$/.test(normalizedPhone)) {
      errors.phone = 'Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0.';
    }
    if (!trimmedAddress) {
      errors.address = 'Vui lòng nhập địa chỉ nhận hàng.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError('');
      return;
    }

    setFieldErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    const orderItems: OrderLineItem[] = items.slice(0, 50).map((item) => ({
      productId: String(item.productId ?? item.cartKey).slice(0, 128),
      name: resolveCartItemName(item).slice(0, 200),
      qty: Math.max(1, Math.floor(item.quantity)),
      price: Math.max(0, Math.round(item.unitPrice ?? 0)),
    }));

    const aiBoxItem = items.find((item) => item.giftBoxMeta?.isAiDesigned);
    const aiBoxProducts = (aiBoxItem?.includedItems ?? [])
      .slice(0, 30)
      .map((sub) => ({
        productId: String(sub.productId ?? sub.name).slice(0, 128),
        name: String(sub.name).slice(0, 200),
        qty: Math.max(1, Math.floor(sub.quantity ?? 1)),
        price: Math.max(0, Math.round(sub.price ?? 0)),
      }));
    const giftBoxPayload: OrderGiftBoxPayload | null =
      aiBoxItem?.giftBoxMeta && aiBoxProducts.length > 0
        ? {
            message: String(aiBoxItem.giftBoxMeta.message ?? '').slice(0, 500),
            recipient: String(aiBoxItem.giftBoxMeta.recipient ?? '').slice(0, 120),
            occasion: String(aiBoxItem.giftBoxMeta.occasion ?? '').slice(0, 80),
            products: aiBoxProducts,
          }
        : null;

    const computedTotal = Math.min(
      500000000,
      orderItems.reduce((sum, entry) => sum + entry.qty * entry.price, 0),
    );

    try {
      const created = await submitOrder({
        customerName: trimmedName,
        phone: normalizedPhone,
        address: trimmedAddress,
        note: trimmedNote,
        items: orderItems,
        giftBox: giftBoxPayload,
        total: computedTotal,
        paymentMethod,
      });

      setConfirmedOrder(created);
      setCopiedField(null);
      setPaymentStatus('waiting');
      setPollingCycle(0);
      setQrLoadError(false);
      setCustomerName('');
      setPhone('');
      setAddress('');
      setNote('');
      setPaymentMethod('COD');
      onOrderCreated(created.code);
    } catch {
      setSubmitError(
        'Không thể gửi đơn hàng lên hệ thống lúc này. Vui lòng thử lại sau ít phút.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmptyState = items.length === 0 && giftBoxItems.length === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1e2a22]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Shopping Cart' : 'Giỏ hàng OCOP Phú Thọ'}
    >
      <div className="w-full max-w-md bg-[#fcfdfc] h-full flex flex-col border-l border-[#e6eee9] shadow-xl">
        <div className="px-6 py-4 bg-white border-b border-[#e6eee9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#228654]" />
            <h2 className="font-display text-lg font-extrabold text-[#1e2a22]">
              {isEn ? 'Shopping Cart' : 'Giỏ hàng đặc sản'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label={isEn ? 'Close cart' : 'Đóng giỏ hàng'}
            className="w-9 h-9 inline-flex items-center justify-center rounded-md text-[#5f6d66] hover:text-[#1e2a22] hover:bg-[#f3fbf6] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {confirmedOrder ? (() => {
            const transferContent = confirmedOrder.code.replace(/-/g, '');
            const vietQrUrl = `https://img.vietqr.io/image/${encodeURIComponent(
              BANK_ID,
            )}-${encodeURIComponent(
              ACCOUNT_NO,
            )}-compact2.png?amount=${confirmedOrder.total}&addInfo=${encodeURIComponent(
              transferContent,
            )}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;
            const bankDisplay =
              BANK_ID === 'TCB' ? 'Techcombank (TCB)' : BANK_ID;
            const bankCopyValue =
              BANK_ID === 'TCB' ? 'Techcombank' : BANK_ID;
            const transferRows = [
              {
                key: 'bank',
                label: 'Ngân hàng',
                value: bankDisplay,
                copyValue: bankCopyValue,
              },
              {
                key: 'accountNo',
                label: 'Số tài khoản',
                value: ACCOUNT_NO,
                copyValue: ACCOUNT_NO,
                mono: true,
              },
              {
                key: 'accountName',
                label: 'Chủ tài khoản',
                value: ACCOUNT_NAME,
                copyValue: ACCOUNT_NAME,
              },
              {
                key: 'amount',
                label: 'Số tiền',
                value: formatVnd(confirmedOrder.total, language),
                copyValue: String(confirmedOrder.total),
                mono: true,
              },
              {
                key: 'addInfo',
                label: 'Nội dung chuyển khoản',
                value: transferContent,
                copyValue: transferContent,
                mono: true,
              },
            ];

            return (
              <div className="bg-white border border-[#e6eee9] rounded-lg p-5 space-y-5">
                <div className="flex items-center gap-2.5 text-[#228654]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <h3 className="font-display text-lg font-extrabold">
                    {isEn ? 'Order placed successfully' : 'Đặt hàng thành công'}
                  </h3>
                </div>

                <div className="bg-[#f3fbf6] border border-[#228654]/25 rounded-lg p-4 space-y-2">
                  <div className="text-xs font-semibold text-[#5f6d66]">
                    {isEn ? 'Order code' : 'Mã đơn hàng'}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-lg font-extrabold text-[#228654] tracking-wide">
                      {confirmedOrder.code}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyValue('orderCode', confirmedOrder.code)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white hover:bg-[#e8f5ee] text-[#228654] border border-[#228654]/30 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedField === 'orderCode' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Copied' : 'Đã sao chép'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Copy code' : 'Sao chép mã đơn'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-sm font-medium text-[#1e2a22] leading-relaxed">
                  {isEn
                    ? 'We will contact you to confirm your order as soon as possible.'
                    : 'Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất'}
                </p>

                {confirmedOrder.paymentMethod === 'Chuyển khoản' ? (
                  <div className="bg-[#fcfdfc] border border-[#cfe5ff] rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-[#1e2a22]">
                        Thanh toán bằng QR
                      </h4>
                    </div>

                    <div className="flex flex-col items-center gap-2 bg-white border border-[#e6eee9] rounded-lg p-3">
                      <img
                        src={
                          !qrLoadError
                            ? vietQrUrl
                            : '/assets/aistudio/bank_qr_tcb.png'
                        }
                        alt={`Mã QR chuyển khoản ${confirmedOrder.code}`}
                        onError={() => {
                          if (!qrLoadError) setQrLoadError(true);
                        }}
                        className="w-60 min-w-[240px] max-w-full h-auto block rounded-md"
                      />
                    </div>

                    <div className="space-y-2 text-xs">
                      {transferRows.map((row) => (
                        <div
                          key={row.key}
                          className="bg-white border border-[#e6eee9] rounded-md px-3 py-2 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="text-[11px] text-[#5f6d66]">
                              {row.label}
                            </div>
                            <div
                              className={`text-xs font-bold text-[#1e2a22] break-all ${
                                row.mono ? 'font-mono tabular-nums' : ''
                              }`}
                            >
                              {row.value}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyValue(row.key, row.copyValue)
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#228654] bg-[#f3fbf6] hover:bg-[#e8f5ee] border border-[#228654]/25 rounded transition-colors cursor-pointer shrink-0"
                          >
                            {copiedField === row.key ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Sao chép</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#fff8e6] border border-[#e6b64a] rounded-md px-3 py-2.5 flex items-start gap-2 text-xs font-semibold text-[#7c4d03]">
                      <AlertTriangle className="w-4 h-4 text-[#b7791f] shrink-0 mt-0.5" />
                      <span>
                        Vui lòng giữ đúng nội dung chuyển khoản và đúng số tiền để đơn được xác nhận tự động.
                      </span>
                    </div>

                    {paymentStatus === 'paid' ? (
                      <div className="bg-[#e8f5ee] border border-[#228654]/40 rounded-md px-3 py-2.5 flex items-center gap-2 text-xs font-bold text-[#156d42]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#228654]" />
                        <span>Đã nhận thanh toán, cảm ơn bạn</span>
                      </div>
                    ) : paymentStatus === 'underpaid' ? (
                      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-2.5 flex items-center gap-2 text-xs font-bold text-[#B91C1C]">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Số tiền chuyển chưa đủ, vui lòng liên hệ shop</span>
                      </div>
                    ) : (
                      <div className="bg-[#f3f7fb] border border-[#cfe5ff] rounded-md px-3 py-2.5 flex items-center justify-between gap-2 text-xs font-semibold text-[#1e2a22]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#0068FF] shrink-0" />
                          <span>Đang chờ thanh toán</span>
                        </div>
                        {paymentStatus === 'timed_out' && (
                          <button
                            type="button"
                            onClick={handleManualRecheck}
                            disabled={isManualChecking}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded cursor-pointer shrink-0 disabled:opacity-60"
                          >
                            <RefreshCw
                              className={`w-3 h-3 ${
                                isManualChecking ? 'animate-spin' : ''
                              }`}
                            />
                            <span>Kiểm tra lại</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md px-3.5 py-2.5 text-xs font-semibold text-[#1e2a22]">
                    Thanh toán khi nhận hàng
                  </div>
                )}

                <div className="bg-[#fcfdfc] border border-[#e6eee9] rounded-lg p-4 space-y-3 text-xs">
                  <div className="font-bold text-[#1e2a22]">
                    {isEn ? 'Order summary' : 'Tóm tắt đơn hàng'}
                  </div>

                  <div className="space-y-1.5 text-[#38473e]">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Recipient' : 'Người nhận'}
                      </span>
                      <span className="font-semibold text-right text-[#1e2a22]">
                        {confirmedOrder.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Phone' : 'Số điện thoại'}
                      </span>
                      <span className="font-mono font-semibold tabular-nums text-[#1e2a22]">
                        {confirmedOrder.phone}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Address' : 'Địa chỉ'}
                      </span>
                      <span className="text-right text-[#1e2a22]">
                        {confirmedOrder.address}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Payment' : 'Thanh toán'}
                      </span>
                      <span className="font-semibold text-[#1e2a22]">
                        {confirmedOrder.paymentMethod}
                      </span>
                    </div>
                    {confirmedOrder.note && (
                      <div className="flex justify-between gap-3">
                        <span className="text-[#5f6d66]">
                          {isEn ? 'Note' : 'Ghi chú'}
                        </span>
                        <span className="text-right text-[#1e2a22]">
                          {confirmedOrder.note}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#e6eee9] pt-2.5 space-y-1.5">
                    {confirmedOrder.items.map((entry, idx) => (
                      <div
                        key={`${entry.productId}-${idx}`}
                        className="flex justify-between gap-2 text-[#1e2a22]"
                      >
                        <span className="truncate">
                          {entry.name} ×{entry.qty}
                        </span>
                        <span className="font-semibold tabular-nums shrink-0">
                          {formatVnd(entry.price * entry.qty, language)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {confirmedOrder.giftBox && (
                    <div className="border-t border-[#e6eee9] pt-2 text-[11px] text-[#5f6d66]">
                      <span className="font-semibold text-[#b7791f]">
                        {isEn ? 'AI Gift Box:' : 'Box quà thiết kế:'}
                      </span>{' '}
                      {confirmedOrder.giftBox.occasion}
                      {confirmedOrder.giftBox.message
                        ? ` · "${confirmedOrder.giftBox.message}"`
                        : ''}
                    </div>
                  )}

                  <div className="border-t border-[#e6eee9] pt-2.5 flex items-center justify-between text-sm font-extrabold text-[#228654]">
                    <span>{isEn ? 'Total' : 'Tổng cộng'}</span>
                    <span className="tabular-nums">
                      {formatVnd(confirmedOrder.total, language)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setConfirmedOrder(null);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md transition-colors cursor-pointer"
                >
                  {isEn ? 'Continue shopping' : 'Tiếp tục khám phá'}
                </button>
              </div>
            );
          })() : isEmptyState ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag
                className="w-10 h-10 text-[#228654]/35 mx-auto"
                strokeWidth={1.5}
              />
              <p className="text-base font-bold text-[#1e2a22]">
                {isEn
                  ? 'Your shopping cart is empty'
                  : 'Chưa có sản phẩm hoặc box quà nào'}
              </p>
              <p className="text-sm text-[#5f6d66] max-w-xs mx-auto leading-relaxed">
                {isEn
                  ? 'Browse our 27 Phú Thọ specialties or select one of our 5 curated gift boxes.'
                  : 'Hãy chọn đặc sản Phú Thọ hoặc thiết kế box quà theo dịp tặng của bạn.'}
              </p>
            </div>
          ) : (
            <>
              {items.length > 0 && (
                <div className="space-y-4">
                  {items.map((item) => {
                    const displayName = resolveCartItemName(item);
                    const displaySubtitle = resolveCartItemSubtitle(item);
                    return (
                      <div
                        key={item.cartKey}
                        className="bg-white border border-[#e6eee9] rounded-lg p-4 flex gap-3.5"
                      >
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-[#f7fbf8] shrink-0">
                          <SafeImage
                            src={item.image}
                            alt={displayName}
                            fallbackLabel={displayName}
                            emptyStateLabel={tCommon.unverifiedPhotoLabel}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-[#1e2a22] leading-snug">
                              {displayName}
                            </h3>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.cartKey)}
                              aria-label={
                                isEn
                                  ? `Remove ${displayName}`
                                  : `Xóa ${displayName}`
                              }
                              className="text-[#5f6d66] hover:text-[#B91C1C] p-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-[#5f6d66] mt-0.5">
                            {displaySubtitle}
                          </p>

                          {item.includedItems && item.includedItems.length > 0 && (
                            <ul className="mt-2 space-y-0.5 text-xs text-[#5f6d66] border-t border-[#f2f6f3] pt-1.5">
                              {item.includedItems.map((sub, idx) => (
                                <li
                                  key={idx}
                                  className="flex justify-between gap-2"
                                >
                                  <span className="truncate">
                                    {sub.name}
                                    {sub.quantity && sub.quantity > 1
                                      ? ` ×${sub.quantity}`
                                      : ''}
                                  </span>
                                  <span className="tabular-nums shrink-0">
                                    {sub.price !== null
                                      ? formatVnd(sub.price, language)
                                      : sub.priceRange ?? tCommon.updating}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {item.giftNote && (
                            <p className="mt-1.5 text-xs font-medium text-[#b7791f]">
                              {isEn ? 'Gift note:' : 'Lời chúc:'} &ldquo;
                              {item.giftNote}&rdquo;
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center border border-[#e6eee9] rounded-md bg-[#f7fbf8]">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.cartKey, -1)
                                }
                                aria-label={
                                  isEn ? 'Decrease quantity' : 'Giảm số lượng'
                                }
                                className="w-7 h-7 inline-flex items-center justify-center text-[#1e2a22] hover:bg-[#e8f5ee] cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.cartKey, 1)}
                                aria-label={
                                  isEn ? 'Increase quantity' : 'Tăng số lượng'
                                }
                                className="w-7 h-7 inline-flex items-center justify-center text-[#1e2a22] hover:bg-[#e8f5ee] cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-xs font-extrabold text-[#b7791f] tabular-nums">
                              {item.unitPrice !== null
                                ? formatVnd(
                                    item.unitPrice * item.quantity,
                                    language,
                                  )
                                : tCommon.updating}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Active Gift Box Draft Banner inside Cart */}
              {giftBoxItems.length > 0 && draftBoxEval && (
                <div className="bg-[#fff8e6] border border-[#e6b64a]/70 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#1e2a22]">
                      <Gift className="w-4 h-4 text-[#b7791f] shrink-0" />
                      <span>
                        {isEn
                          ? `Gift box in progress (${totalDraftUnits} items)`
                          : `Box quà đang ghép (${totalDraftUnits} sản phẩm)`}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-[#228654] tabular-nums shrink-0">
                      {isEn
                        ? draftBoxEval.summaryTextEn
                        : draftBoxEval.summaryTextVi}
                    </span>
                  </div>

                  <ul className="space-y-1 text-xs text-[#38473e]">
                    {giftBoxItems.map(({ product, quantity }) => (
                      <li
                        key={product.id}
                        className="flex justify-between gap-2"
                      >
                        <span className="truncate">
                          • {getProductName(product, language)} ×{quantity}
                        </span>
                        <span className="tabular-nums shrink-0 font-medium">
                          {product.price !== null
                            ? formatVnd(product.price * quantity, language)
                            : tCommon.updating}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={onConvertGiftBoxToCart}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>
                        {isEn
                          ? 'Move box to cart'
                          : 'Đưa box vào giỏ hàng'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenGiftBuilder();
                      }}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-[#1e2a22] bg-white hover:bg-[#f7fbf8] border border-[#e6eee9] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>{isEn ? 'Edit box' : 'Chỉnh sửa box'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {items.length > 0 && (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white border border-[#e6eee9] rounded-lg p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#1e2a22]">
                      {isEn
                        ? 'Delivery & Recipient Information'
                        : 'Thông tin đặt hàng & nhận quà'}
                    </h3>
                    <p className="text-xs text-[#5f6d66]">
                      {isEn
                        ? 'Submit your contact details to confirm item availability and delivery schedule.'
                        : 'Điền thông tin liên hệ để xác nhận đơn hàng và hình thức giao nhận từ cơ sở.'}
                    </p>
                  </div>

                  {fieldErrors.cart && (
                    <p
                      className="text-xs text-[#B91C1C] font-medium"
                      role="alert"
                    >
                      {fieldErrors.cart}
                    </p>
                  )}

                  {submitError && (
                    <p
                      className="text-xs text-[#B91C1C] bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-2 font-medium"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn ? 'Recipient full name' : 'Họ tên người nhận'}
                    </label>
                    <input
                      type="text"
                      maxLength={120}
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (fieldErrors.customerName) {
                          setFieldErrors((prev) => ({
                            ...prev,
                            customerName: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors.customerName)}
                      placeholder={
                        isEn ? 'e.g. Nguyen Van An' : 'Ví dụ: Nguyễn Văn An'
                      }
                      className={`w-full px-3 py-2 text-sm bg-[#fcfdfc] border rounded-md focus:outline-none ${
                        fieldErrors.customerName
                          ? 'border-[#B91C1C]'
                          : 'border-[#e6eee9] focus:border-[#228654]'
                      }`}
                    />
                    {fieldErrors.customerName && (
                      <p className="mt-1 text-xs text-[#B91C1C] font-medium">
                        {fieldErrors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn ? 'Contact phone number' : 'Số điện thoại liên hệ'}
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (fieldErrors.phone) {
                          setFieldErrors((prev) => ({
                            ...prev,
                            phone: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      placeholder={isEn ? 'e.g. 0388195865' : 'Ví dụ: 0388195865'}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums bg-[#fcfdfc] border rounded-md focus:outline-none ${
                        fieldErrors.phone
                          ? 'border-[#B91C1C]'
                          : 'border-[#e6eee9] focus:border-[#228654]'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-[#B91C1C] font-medium">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn ? 'Delivery address' : 'Địa chỉ nhận hàng'}
                    </label>
                    <input
                      type="text"
                      maxLength={300}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (fieldErrors.address) {
                          setFieldErrors((prev) => ({
                            ...prev,
                            address: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors.address)}
                      placeholder={
                        isEn
                          ? 'e.g. Việt Trì City, Phú Thọ'
                          : 'Ví dụ: TP. Việt Trì, Phú Thọ'
                      }
                      className={`w-full px-3 py-2 text-sm bg-[#fcfdfc] border rounded-md focus:outline-none ${
                        fieldErrors.address
                          ? 'border-[#B91C1C]'
                          : 'border-[#e6eee9] focus:border-[#228654]'
                      }`}
                    />
                    {fieldErrors.address && (
                      <p className="mt-1 text-xs text-[#B91C1C] font-medium">
                        {fieldErrors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn
                        ? 'Order note (optional)'
                        : 'Ghi chú đơn hàng (tùy chọn)'}
                    </label>
                    <input
                      type="text"
                      maxLength={500}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={
                        isEn
                          ? 'e.g. Deliver during office hours'
                          : 'Ví dụ: Giao giờ hành chính, gói quà biếu'
                      }
                      className="w-full px-3 py-2 text-sm bg-[#fcfdfc] border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-[#1e2a22] mb-1.5">
                      {isEn
                        ? 'Payment method'
                        : 'Phương thức thanh toán'}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['COD', 'Chuyển khoản'] as const).map((method) => {
                        const active = paymentMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`px-3 py-2 text-xs font-bold rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                              active
                                ? 'bg-[#f3fbf6] text-[#228654] border-[#228654]'
                                : 'bg-[#fcfdfc] text-[#38473e] border-[#e6eee9] hover:border-[#228654]/50'
                            }`}
                          >
                            {method === 'COD'
                              ? isEn
                                ? 'COD (Cash)'
                                : 'COD (Nhận hàng)'
                              : isEn
                                ? 'Bank transfer'
                                : 'Chuyển khoản'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-[#228654] hover:bg-[#08734d] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold rounded-md transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>
                          {isEn ? 'Submitting order...' : 'Đang gửi đơn hàng...'}
                        </span>
                      </>
                    ) : subtotal !== null ? (
                      isEn ? (
                        `Place order (${formatVnd(subtotal, language)})`
                      ) : (
                        `Đặt hàng (${formatVnd(subtotal, language)})`
                      )
                    ) : isEn ? (
                      'Place order'
                    ) : (
                      'Đặt hàng'
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {items.length > 0 && !confirmedOrder && (
          <div className="px-6 py-4 bg-white border-t border-[#e6eee9] flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm text-[#5f6d66]">
              {isEn ? 'Estimated total' : 'Tổng giá trị đơn hàng'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-[#228654] text-right tabular-nums">
              {subtotal !== null
                ? formatVnd(subtotal, language)
                : tCommon.updating}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
