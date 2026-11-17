import { getOccasionLabel } from '../data/mockOcopData';
import {
  GiftOccasion,
  GiftPreferenceKey,
  Language,
  Product,
} from '../types/ocop';

export interface GiftBoxRecommendation {
  status: 'matched' | 'missing-prices' | 'insufficient' | 'empty-preferences';
  boxTitle: string;
  items: Product[];
  totalPrice: number | null;
  maxBudget: number;
  remainingBudget: number | null;
  message: string;
  suggestedMinBudget?: number;
}

export function buildGiftBoxRecommendation(params: {
  products: Product[];
  maxBudget: number;
  occasion: GiftOccasion;
  preferences: GiftPreferenceKey[];
  language?: Language;
}): GiftBoxRecommendation {
  const { products, maxBudget, occasion, preferences, language = 'vi' } = params;
  const isEn = language === 'en';

  const occasionNameMapVi: Record<GiftOccasion, string> = {
    'Biếu gia đình': 'Box Quà Biếu Gia Đình Đất Tổ',
    'Đối tác': 'Box Quà Đối Tác Phú Thọ',
    'Lễ Tết': 'Box Quà Lễ Tết Đất Tổ',
    'Sinh nhật': 'Box Quà Tặng Đặc Sản Phú Thọ',
    Khác: 'Box Đặc Sản Phú Thọ Tùy Chọn',
  };

  const occasionNameMapEn: Record<GiftOccasion, string> = {
    'Biếu gia đình': 'Đất Tổ Family Gift Box',
    'Đối tác': 'Phú Thọ Business Partner Gift Box',
    'Lễ Tết': 'Đất Tổ Festive & Tet Gift Box',
    'Sinh nhật': 'Phú Thọ Specialty Gift Box',
    Khác: 'Custom Phú Thọ Specialty Box',
  };

  const boxTitle = isEn ? occasionNameMapEn[occasion] : occasionNameMapVi[occasion];

  const formatBudget = (val: number) =>
    isEn
      ? `${new Intl.NumberFormat('en-US').format(val)} VND`
      : `${new Intl.NumberFormat('vi-VN').format(val)}đ`;

  if (preferences.length === 0) {
    return {
      status: 'empty-preferences',
      boxTitle,
      items: [],
      totalPrice: null,
      maxBudget,
      remainingBudget: null,
      message: isEn
        ? 'No product group selected yet. Please choose at least one of the 3 specialty groups or pick individual items directly for your box.'
        : 'Bạn chưa chọn nhóm sản phẩm nào. Hãy chọn ít nhất một trong 3 nhóm đặc sản hoặc tự chọn trực tiếp từng sản phẩm vào box quà.',
    };
  }

  const matchingProducts = products.filter((p) =>
    p.preferenceTags.some((tag) => preferences.includes(tag)),
  );

  if (matchingProducts.length === 0) {
    return {
      status: 'insufficient',
      boxTitle,
      items: [],
      totalPrice: null,
      maxBudget,
      remainingBudget: null,
      message: isEn
        ? 'No products match the selected group yet. Please try selecting another product group.'
        : 'Hiện chưa có sản phẩm phù hợp với nhóm đã chọn. Vui lòng thử chọn lại nhóm sản phẩm.',
    };
  }

  // Only perform budget arithmetic when verified numeric prices exist.
  const pricedProducts = matchingProducts.filter(
    (p): p is Product & { price: number } =>
      typeof p.price === 'number' && Number.isFinite(p.price) && p.price > 0,
  );

  if (pricedProducts.length === 0) {
    // Select up to 1 representative product per selected group without fabricating prices or totals.
    const picked: Product[] = [];
    for (const pref of preferences) {
      const candidate = matchingProducts.find(
        (p) => p.preferenceTags.includes(pref) && !picked.some((s) => s.id === p.id),
      );
      if (candidate) picked.push(candidate);
    }
    while (picked.length < 3) {
      const next = matchingProducts.find(
        (p) => !picked.some((s) => s.id === p.id),
      );
      if (!next) break;
      picked.push(next);
    }

    return {
      status: 'missing-prices',
      boxTitle,
      items: picked,
      totalPrice: null,
      maxBudget,
      remainingBudget: null,
      message: isEn
        ? 'Please wait for product prices to be updated to view the box total. You can pre-select your favorite specialties and submit a gift box consultation request.'
        : 'Vui lòng cập nhật giá sản phẩm để xem tổng box. Hiện bạn có thể chọn sẵn các đặc sản yêu thích và gửi yêu cầu tư vấn box quà.',
    };
  }

  if (!Number.isFinite(maxBudget) || maxBudget <= 0) {
    return {
      status: 'insufficient',
      boxTitle,
      items: [],
      totalPrice: null,
      maxBudget: 0,
      remainingBudget: null,
      message: isEn
        ? 'Invalid budget. Please select a preset budget or enter an amount greater than 0 VND.'
        : 'Ngân sách chưa hợp lệ. Vui lòng chọn một mức ngân sách có sẵn hoặc nhập số tiền lớn hơn 0đ.',
      suggestedMinBudget: Math.min(...pricedProducts.map((p) => p.price)),
    };
  }

  const cheapestMatching = Math.min(...pricedProducts.map((p) => p.price));
  if (maxBudget < cheapestMatching) {
    return {
      status: 'insufficient',
      boxTitle,
      items: [],
      totalPrice: null,
      maxBudget,
      remainingBudget: null,
      message: isEn
        ? `With a maximum budget of ${formatBudget(maxBudget)}, no product in the selected group fits yet (lowest available price: ${formatBudget(cheapestMatching)}).`
        : `Với ngân sách tối đa ${formatBudget(maxBudget)}, chưa có sản phẩm nào thuộc nhóm đã chọn (giá thấp nhất hiện có: ${formatBudget(cheapestMatching)}).`,
      suggestedMinBudget: cheapestMatching,
    };
  }

  const sortedByPreferenceCoverage = [...pricedProducts].sort((a, b) => {
    const aMatches = a.preferenceTags.filter((t) => preferences.includes(t)).length;
    const bMatches = b.preferenceTags.filter((t) => preferences.includes(t)).length;
    if (bMatches !== aMatches) return bMatches - aMatches;
    return b.price - a.price;
  });

  const selected: (Product & { price: number })[] = [];
  let currentTotal = 0;

  for (const pref of preferences) {
    const candidates = sortedByPreferenceCoverage.filter(
      (p) =>
        p.preferenceTags.includes(pref) &&
        !selected.some((s) => s.id === p.id) &&
        currentTotal + p.price <= maxBudget,
    );
    if (candidates.length > 0) {
      const pick =
        preferences.length > 1
          ? candidates[candidates.length - 1]
          : candidates[0];
      selected.push(pick);
      currentTotal += pick.price;
    }
  }

  if (selected.length === 0) {
    const affordable = pricedProducts
      .filter((p) => p.price <= maxBudget)
      .sort((a, b) => b.price - a.price);
    if (affordable.length > 0) {
      selected.push(affordable[0]);
      currentTotal += affordable[0].price;
    }
  } else {
    let safetyCounter = 0;
    while (selected.length < 4 && safetyCounter < 10) {
      safetyCounter += 1;
      const nextCandidate = pricedProducts
        .filter(
          (p) =>
            !selected.some((s) => s.id === p.id) &&
            currentTotal + p.price <= maxBudget,
        )
        .sort((a, b) => b.price - a.price)[0];

      if (!nextCandidate) break;
      selected.push(nextCandidate);
      currentTotal += nextCandidate.price;
    }
  }

  if (selected.length === 0) {
    return {
      status: 'insufficient',
      boxTitle,
      items: [],
      totalPrice: null,
      maxBudget,
      remainingBudget: null,
      message: isEn
        ? 'Could not compose a matching gift box within this budget. Please adjust your budget or selected groups.'
        : 'Chưa ghép được box quà phù hợp trong mức ngân sách này. Bạn hãy thử điều chỉnh lại ngân sách hoặc nhóm sản phẩm.',
      suggestedMinBudget: cheapestMatching,
    };
  }

  const occasionLabel = getOccasionLabel(occasion, language).toLowerCase();

  return {
    status: 'matched',
    boxTitle,
    items: selected,
    totalPrice: currentTotal,
    maxBudget,
    remainingBudget: maxBudget - currentTotal,
    message: isEn
      ? `Composed ${selected.length} products suitable for ${occasionLabel}, keeping total cost within budget.`
      : `Đã ghép ${selected.length} sản phẩm phù hợp dịp ${occasionLabel}, tổng giá không vượt quá ngân sách.`,
  };
}
