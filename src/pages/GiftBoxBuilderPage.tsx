import { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Gift,
  Minus,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  FEATURED_GIFT_BOXES,
  GIFT_OCCASIONS,
  GIFT_PREFERENCES,
  IMAGE_ASSETS,
  PRODUCT_CATEGORIES,
  evaluateGiftBoxPrice,
  formatVnd,
  getCategoryLabel,
  getOccasionLabel,
  getProductName,
  getProductPriceDisplay,
} from '../data/mockOcopData';
import {
  GiftBoxSelectionItem,
  GiftOccasion,
  GiftPreferenceKey,
  Language,
  Product,
  ProductCategory,
} from '../types/ocop';
import { buildGiftBoxRecommendation } from '../utils/giftBoxEngine';
import { SafeImage } from '../components/SafeImage';
import { normalizeSearchText } from '../components/GlobalSearchBar';

interface GiftBoxBuilderPageProps {
  products: Product[];
  language: Language;
  giftBoxItems: GiftBoxSelectionItem[];
  onAddProductToBox: (product: Product, quantity?: number) => void;
  onUpdateBoxQuantity: (productId: string, delta: number) => void;
  onRemoveBoxItem: (productId: string) => void;
  onClearBox: () => void;
  onApplyPresetItems: (items: Product[]) => void;
  onAddBoxToCart: (boxId: string) => void;
  onAddCustomBoxToCart: (params: {
    boxTitle: string;
    occasion: GiftOccasion;
    items: GiftBoxSelectionItem[];
    totalPrice: number | null;
    giftNote: string;
  }) => void;
}

type BudgetPreset = 'under-300' | '300-500' | '500-1000' | 'custom';

const BUDGET_OPTIONS: {
  key: BudgetPreset;
  labelVi: string;
  labelEn: string;
  maxValue: number;
}[] = [
  {
    key: 'under-300',
    labelVi: 'Dưới 300.000đ',
    labelEn: 'Under 300,000 VND',
    maxValue: 300000,
  },
  {
    key: '300-500',
    labelVi: '300.000 – 500.000đ',
    labelEn: '300,000 – 500,000 VND',
    maxValue: 500000,
  },
  {
    key: '500-1000',
    labelVi: '500.000 – 1.000.000đ',
    labelEn: '500,000 – 1,000,000 VND',
    maxValue: 1000000,
  },
  {
    key: 'custom',
    labelVi: 'Tự nhập ngân sách',
    labelEn: 'Custom budget',
    maxValue: 0,
  },
];

export function GiftBoxBuilderPage({
  products,
  language,
  giftBoxItems,
  onAddProductToBox,
  onUpdateBoxQuantity,
  onRemoveBoxItem,
  onClearBox,
  onApplyPresetItems,
  onAddBoxToCart,
  onAddCustomBoxToCart,
}: GiftBoxBuilderPageProps) {
  const [budgetPreset, setBudgetPreset] = useState<BudgetPreset>('300-500');
  const [customBudgetInput, setCustomBudgetInput] = useState('500000');
  const [occasion, setOccasion] = useState<GiftOccasion>('Biếu gia đình');
  const [preferences, setPreferences] = useState<GiftPreferenceKey[]>([
    'tra-do-uong',
    'dac-san-kho',
  ]);
  const [pickerCategory, setPickerCategory] = useState<
    ProductCategory | 'Tất cả'
  >('Tất cả');
  const [pickerSearch, setPickerSearch] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const [consultOpen, setConsultOpen] = useState(false);
  const [consultName, setConsultName] = useState('');
  const [consultContact, setConsultContact] = useState('');
  const [consultQuantityBoxes, setConsultQuantityBoxes] = useState(1);
  const [consultRef, setConsultRef] = useState<string | null>(null);

  const isEn = language === 'en';

  const effectiveBudget = useMemo(() => {
    if (budgetPreset === 'custom') {
      const parsed = Number(customBudgetInput.replace(/[^\d]/g, ''));
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return (
      BUDGET_OPTIONS.find((b) => b.key === budgetPreset)?.maxValue ?? 500000
    );
  }, [budgetPreset, customBudgetInput]);

  const recommendation = useMemo(
    () =>
      buildGiftBoxRecommendation({
        products,
        maxBudget: effectiveBudget,
        occasion,
        preferences,
        language,
      }),
    [products, effectiveBudget, occasion, preferences, language],
  );

  const togglePreference = (key: GiftPreferenceKey) => {
    setPreferences((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const pickerProducts = useMemo(() => {
    const q = normalizeSearchText(pickerSearch);
    return products.filter((p) => {
      if (pickerCategory !== 'Tất cả' && p.category !== pickerCategory) {
        return false;
      }
      if (q) {
        const haystack = normalizeSearchText(
          `${p.name} ${p.nameEn} ${p.locality ?? ''} ${p.producer.name ?? ''}`,
        );
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [products, pickerCategory, pickerSearch]);

  const activeBoxQtyMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of giftBoxItems) {
      map.set(item.product.id, item.quantity);
    }
    return map;
  }, [giftBoxItems]);

  const totalSelectedUnits = useMemo(
    () => giftBoxItems.reduce((sum, item) => sum + item.quantity, 0),
    [giftBoxItems],
  );

  const knownFixedTotal = useMemo(
    () =>
      giftBoxItems.reduce((sum, item) => {
        if (
          typeof item.product.price === 'number' &&
          Number.isFinite(item.product.price)
        ) {
          return sum + item.product.price * item.quantity;
        }
        return sum;
      }, 0),
    [giftBoxItems],
  );

  const computedTotalPrice = useMemo(() => {
    if (giftBoxItems.length === 0) return null;
    return knownFixedTotal;
  }, [giftBoxItems.length, knownFixedTotal]);

  const boxTitleByOccasion = recommendation.boxTitle;

  const handleOpenConsult = () => {
    setConsultRef(null);
    setConsultOpen(true);
  };

  const handleSubmitConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TV-BOX-${Math.floor(1000 + Math.random() * 8999)}`;
    setConsultRef(ref);
  };

  const handleApplyFeaturedPreset = (boxId: string) => {
    const box = FEATURED_GIFT_BOXES.find((b) => b.id === boxId);
    if (!box) return;
    setOccasion(box.occasion);
    const boxProducts = box.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
    onApplyPresetItems(boxProducts);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="text-xs font-bold text-[#228654]">
          {isEn
            ? `Compose a gift box from ${products.length} Phú Thọ specialties`
            : `Ghép quà từ ${products.length} đặc sản Phú Thọ`}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e2a22]">
          {isEn
            ? 'Custom Phú Thọ Specialty Gift Box Builder'
            : 'Thiết kế box quà đặc sản Phú Thọ'}
        </h1>
        <p className="text-sm sm:text-base text-[#5f6d66] max-w-2xl leading-relaxed">
          {isEn
            ? `Start from one of 5 curated Phú Thọ gift box pairings below or pick products across all ${products.length} items with upfront pricing and instant cart addition.`
            : `Chọn nhanh 1 trong 5 gợi ý ghép box quà Đất Tổ bên dưới hoặc tự phối món trong trọn bộ ${products.length} đặc sản đầy đủ giá niêm yết.`}
        </p>
      </div>

      {/* Curated 5 Suggested Boxes Quick-Apply Bar */}
      <section className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-lg font-extrabold text-[#1e2a22]">
              {isEn
                ? '5 Suggested Gift Box Pairings'
                : '5 Gợi ý ghép thành box quà'}
            </h2>
            <p className="text-xs text-[#5f6d66]">
              {isEn
                ? 'Customize items inside the builder or add the entire suggested box straight to cart.'
                : 'Tùy chỉnh từng món trong box hoặc thêm ngay box quà hoàn chỉnh vào giỏ hàng.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {FEATURED_GIFT_BOXES.map((box) => {
            const boxProducts = box.productIds
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is Product => Boolean(p));
            const priceEval = evaluateGiftBoxPrice(boxProducts);
            const boxName = isEn ? box.nameEn : box.name;

            return (
              <div
                key={box.id}
                className="bg-white border border-[#e6eee9] rounded-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#f7fbf8] overflow-hidden">
                    <SafeImage
                      src={box.image}
                      alt={boxName}
                      fallbackLabel={boxName}
                    />
                  </div>
                  <div className="p-3.5 pb-0 space-y-1.5">
                    <div className="text-[11px] font-bold text-[#b7791f]">
                      {getOccasionLabel(box.occasion, language)}
                    </div>
                    <h3 className="font-display text-sm font-extrabold text-[#1e2a22] leading-snug">
                      {boxName}
                    </h3>
                    <ul className="space-y-0.5 text-[11px] text-[#5f6d66]">
                      {boxProducts.map((p) => (
                        <li key={p.id} className="truncate">
                          • {getProductName(p, language)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 pt-2 mt-2 border-t border-[#f2f6f3] space-y-2">
                  <div className="text-xs font-extrabold tabular-nums text-[#228654]">
                    {isEn ? priceEval.summaryTextEn : priceEval.summaryTextVi}
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => onAddBoxToCart(box.id)}
                      className="w-full py-1.5 px-2.5 text-xs font-bold bg-[#228654] hover:bg-[#08734d] text-white rounded transition-colors inline-flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>{isEn ? 'Add to cart' : 'Thêm vào giỏ'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyFeaturedPreset(box.id)}
                      className="w-full py-1.5 px-2.5 text-xs font-semibold bg-[#f7fbf8] hover:bg-[#e8f5ee] text-[#1e2a22] border border-[#e6eee9] rounded transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {isEn ? 'Customize items' : 'Chọn tùy chỉnh'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Budget, Occasion & Catalog Picker */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Budget */}
          <section className="bg-white border border-[#e6eee9] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-[#1e2a22]">
                {isEn
                  ? '01. Select estimated budget'
                  : '01. Chọn mức ngân sách dự kiến'}
              </h2>
              <span className="text-xs font-mono font-bold text-[#228654] tabular-nums">
                {isEn ? 'Estimated:' : 'Dự kiến:'}{' '}
                {formatVnd(effectiveBudget, language)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BUDGET_OPTIONS.map((opt) => {
                const active = budgetPreset === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setBudgetPreset(opt.key)}
                    className={`px-4 py-3 text-left rounded-md border text-sm font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                      active
                        ? 'bg-[#228654] text-white border-[#228654]'
                        : 'bg-[#f7fbf8] text-[#1e2a22] border-[#e6eee9] hover:border-[#228654]'
                    }`}
                  >
                    <span>{isEn ? opt.labelEn : opt.labelVi}</span>
                    {active && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {budgetPreset === 'custom' && (
              <div className="pt-2">
                <label
                  htmlFor="custom-budget-input"
                  className="block text-xs font-semibold text-[#5f6d66] mb-1.5"
                >
                  {isEn
                    ? 'Enter estimated budget (VND)'
                    : 'Nhập ngân sách dự kiến (VNĐ)'}
                </label>
                <input
                  id="custom-budget-input"
                  type="number"
                  min={0}
                  step={50000}
                  value={customBudgetInput}
                  onChange={(e) => setCustomBudgetInput(e.target.value)}
                  placeholder={isEn ? 'e.g. 500000' : 'Ví dụ: 500000'}
                  className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#fcfdfc] border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                />
              </div>
            )}
          </section>

          {/* Step 2: Occasion */}
          <section className="bg-white border border-[#e6eee9] rounded-lg p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#1e2a22]">
              {isEn ? '02. Select gifting occasion' : '02. Chọn dịp tặng quà'}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {GIFT_OCCASIONS.map((item) => {
                const active = occasion === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOccasion(item)}
                    className={`px-4 py-2 text-sm font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#228654] text-white border-[#228654]'
                        : 'bg-[#f7fbf8] text-[#1e2a22] border-[#e6eee9] hover:border-[#228654]'
                    }`}
                  >
                    {getOccasionLabel(item, language)}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 3: Preferred Groups & Quick Suggest */}
          <section className="bg-white border border-[#e6eee9] rounded-lg p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold text-[#1e2a22]">
                  {isEn
                    ? '03. Quick pick across 3 specialty groups'
                    : '03. Chọn nhanh theo 3 nhóm đặc sản'}
                </h2>
                <p className="text-xs text-[#5f6d66] mt-0.5">
                  {isEn
                    ? 'Choose groups to include or hand-pick individual specialties below.'
                    : 'Chọn nhóm muốn có trong box hoặc tự chọn chi tiết từng món bên dưới.'}
                </p>
              </div>
              {recommendation.items.length > 0 && (
                <button
                  type="button"
                  onClick={() => onApplyPresetItems(recommendation.items)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#228654] bg-[#f3fbf6] hover:bg-[#e8f5ee] border border-[#228654]/25 rounded-md cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#b7791f]" />
                  <span>
                    {isEn
                      ? `Auto-suggest items (${recommendation.items.length})`
                      : `Gợi ý nhanh vào box (${recommendation.items.length} món)`}
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {GIFT_PREFERENCES.map((pref) => {
                const checked = preferences.includes(pref.key);
                return (
                  <button
                    key={pref.key}
                    type="button"
                    onClick={() => togglePreference(pref.key)}
                    aria-pressed={checked}
                    className={`p-3.5 text-left rounded-md border transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                      checked
                        ? 'bg-[#f3fbf6] border-[#228654] text-[#1e2a22]'
                        : 'bg-[#fcfdfc] border-[#e6eee9] text-[#5f6d66] hover:border-[#228654]/45'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-[#1e2a22]">
                        {isEn ? pref.labelEn : pref.label}
                      </div>
                      <div className="text-xs text-[#5f6d66] mt-0.5 leading-relaxed">
                        {isEn ? pref.descriptionEn : pref.description}
                      </div>
                    </div>
                    <span
                      className={`w-5 h-5 rounded border inline-flex items-center justify-center shrink-0 mt-0.5 ${
                        checked
                          ? 'bg-[#228654] border-[#228654] text-white'
                          : 'border-[#e6eee9] bg-white'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 4: Manual Multi-Product Picker across catalog */}
          <section className="bg-white border border-[#e6eee9] rounded-lg p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-[#1e2a22]">
                {isEn
                  ? `04. Hand-pick products into your box (${products.length} items)`
                  : `04. Tự chọn sản phẩm vào box quà (${products.length} sản phẩm)`}
              </h2>
              <span className="text-xs text-[#5f6d66] tabular-nums">
                {isEn
                  ? `Selected ${giftBoxItems.length} types (${totalSelectedUnits} units)`
                  : `Đã chọn ${giftBoxItems.length} loại (${totalSelectedUnits} sản phẩm)`}
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-[#5f6d66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                placeholder={
                  isEn
                    ? 'Quick filter products in box builder...'
                    : 'Tìm nhanh sản phẩm để thêm vào box...'
                }
                aria-label={
                  isEn ? 'Filter products in builder' : 'Tìm sản phẩm vào box'
                }
                className="w-full pl-9 pr-3 py-2 text-sm bg-[#fcfdfc] border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setPickerCategory('Tất cả')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                  pickerCategory === 'Tất cả'
                    ? 'bg-[#228654] text-white'
                    : 'bg-[#f7fbf8] text-[#38473e] hover:bg-[#e8f5ee]'
                }`}
              >
                {getCategoryLabel('Tất cả', language)} ({products.length})
              </button>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setPickerCategory(cat.name)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md text-left cursor-pointer ${
                    pickerCategory === cat.name
                      ? 'bg-[#228654] text-white'
                      : 'bg-[#f7fbf8] text-[#38473e] hover:bg-[#e8f5ee]'
                  }`}
                >
                  {getCategoryLabel(cat.name, language)}
                </button>
              ))}
            </div>

            <div className="divide-y divide-[#f2f6f3] max-h-[420px] overflow-y-auto pr-1">
              {pickerProducts.length === 0 ? (
                <p className="py-6 text-center text-xs text-[#5f6d66]">
                  {isEn
                    ? 'No matching products in this group.'
                    : 'Không có sản phẩm phù hợp trong nhóm này.'}
                </p>
              ) : (
                pickerProducts.map((prod) => {
                  const qty = activeBoxQtyMap.get(prod.id) ?? 0;
                  const prodName = getProductName(prod, language);
                  const packInfo = isEn
                    ? prod.weightEn ?? prod.unitEn ?? ''
                    : prod.weight ?? prod.unit ?? '';
                  return (
                    <div
                      key={prod.id}
                      className="py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-[#f7fbf8] shrink-0">
                          <SafeImage
                            src={prod.image}
                            alt={
                              isEn
                                ? prod.imageAltEn ??
                                  `${prodName} (${prod.imageCaptionEn ?? prod.imageCaption})`
                                : prod.imageAlt ??
                                  `${prodName} (${prod.imageCaption})`
                            }
                            fallbackLabel={prodName}
                            emptyStateLabel={isEn ? 'No photo' : 'Chưa có ảnh'}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#1e2a22] truncate">
                            <span className="font-mono text-xs text-[#5f6d66] mr-1.5">
                              #{String(prod.orderNumber).padStart(2, '0')}
                            </span>
                            {prodName}
                          </div>
                          <div className="text-xs text-[#5f6d66] truncate">
                            {getProductPriceDisplay(prod, language)}
                            {packInfo ? ` · ${packInfo}` : ''}
                          </div>
                        </div>
                      </div>

                      {qty > 0 ? (
                        <div className="inline-flex items-center border border-[#228654] rounded-md bg-[#f3fbf6] shrink-0">
                          <button
                            type="button"
                            onClick={() => onUpdateBoxQuantity(prod.id, -1)}
                            aria-label={
                              isEn ? `Decrease ${prodName}` : `Giảm ${prodName}`
                            }
                            className="w-7 h-7 inline-flex items-center justify-center text-[#228654] hover:bg-[#e8f5ee] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold tabular-nums text-[#1e2a22]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateBoxQuantity(prod.id, 1)}
                            aria-label={
                              isEn ? `Increase ${prodName}` : `Tăng ${prodName}`
                            }
                            className="w-7 h-7 inline-flex items-center justify-center text-[#228654] hover:bg-[#e8f5ee] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAddProductToBox(prod, 1)}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {isEn ? '+ Add to box' : '+ Thêm vào box'}
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-2 border-t border-[#f2f6f3]">
              <label
                htmlFor="gift-note-input"
                className="block text-xs font-semibold text-[#1e2a22] mb-1.5"
              >
                {isEn
                  ? 'Gift card message or packaging note (optional)'
                  : 'Lời chúc trên thiệp hoặc ghi chú đóng gói (tùy chọn)'}
              </label>
              <input
                id="gift-note-input"
                type="text"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder={
                  isEn
                    ? 'e.g. Wishing your family health, warmth, and peace...'
                    : 'Ví dụ: Kính chúc gia đình sức khỏe và bình an...'
                }
                className="w-full px-3.5 py-2.5 text-sm bg-[#fcfdfc] border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
              />
            </div>
          </section>
        </div>

        {/* Right: Current Selected Gift Box Summary */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white border border-[#e6eee9] rounded-lg overflow-hidden">
            <div className="aspect-[4/3] bg-[#f7fbf8] overflow-hidden relative">
              <SafeImage
                src={IMAGE_ASSETS.giftBox}
                alt={boxTitleByOccasion}
                fallbackLabel={
                  isEn ? 'Phú Thọ Specialty Gift Box' : 'Box quà đặc sản Phú Thọ'
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3d1f]/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-[#e6b64a] font-bold">
                  {isEn ? 'Occasion:' : 'Dịp:'}{' '}
                  {getOccasionLabel(occasion, language)} ·{' '}
                  {isEn ? 'Estimated budget:' : 'Ngân sách dự kiến:'}{' '}
                  {formatVnd(effectiveBudget, language)}
                </div>
                <h2 className="font-display text-xl font-extrabold mt-0.5">
                  {boxTitleByOccasion}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {giftBoxItems.length === 0 ? (
                <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md p-5 space-y-3 text-center">
                  <Gift className="w-8 h-8 text-[#228654]/50 mx-auto" />
                  <p className="text-sm font-bold text-[#1e2a22]">
                    {isEn
                      ? 'Your gift box is currently empty'
                      : 'Box quà hiện chưa có sản phẩm nào'}
                  </p>
                  <p className="text-xs text-[#5f6d66] leading-relaxed">
                    {isEn
                      ? `Click "+ Add to box" from the ${products.length}-item list on the left or choose one of the 5 curated boxes above.`
                      : `Bạn hãy nhấn "+ Thêm vào box" ở danh sách ${products.length} sản phẩm bên trái hoặc chọn nhanh 1 trong 5 gợi ý phía trên.`}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-[#f2f6f3] pb-3">
                    <span className="text-xs font-bold text-[#5f6d66]">
                      {isEn
                        ? `Selected products (${giftBoxItems.length} types · ${totalSelectedUnits} units)`
                        : `Sản phẩm đã chọn (${giftBoxItems.length} loại · ${totalSelectedUnits} món)`}
                    </span>
                    <button
                      type="button"
                      onClick={onClearBox}
                      className="text-xs font-semibold text-[#B91C1C] hover:underline cursor-pointer"
                    >
                      {isEn ? 'Clear all' : 'Xóa hết'}
                    </button>
                  </div>

                  <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {giftBoxItems.map(({ product, quantity }) => {
                      const prodName = getProductName(product, language);
                      return (
                        <li
                          key={product.id}
                          className="flex items-start justify-between gap-2 text-sm pb-2.5 border-b border-[#f2f6f3] last:border-b-0 last:pb-0"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-[#1e2a22] leading-snug">
                              {prodName}
                            </div>
                            <div className="text-xs text-[#5f6d66] mt-0.5">
                              {getCategoryLabel(product.category, language)}
                            </div>
                            <div className="mt-1.5 inline-flex items-center border border-[#e6eee9] rounded bg-[#f7fbf8]">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateBoxQuantity(product.id, -1)
                                }
                                aria-label={
                                  isEn
                                    ? `Decrease ${prodName}`
                                    : `Giảm ${prodName}`
                                }
                                className="w-6 h-6 inline-flex items-center justify-center hover:bg-[#e8f5ee] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold tabular-nums">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateBoxQuantity(product.id, 1)
                                }
                                aria-label={
                                  isEn
                                    ? `Increase ${prodName}`
                                    : `Tăng ${prodName}`
                                }
                                className="w-6 h-6 inline-flex items-center justify-center hover:bg-[#e8f5ee] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => onRemoveBoxItem(product.id)}
                              aria-label={
                                isEn ? `Remove ${prodName}` : `Xóa ${prodName}`
                              }
                              className="text-[#5f6d66] hover:text-[#B91C1C] cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-[#228654] tabular-nums">
                              {product.price !== null
                                ? formatVnd(product.price * quantity, language)
                                : getProductPriceDisplay(product, language)}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Total box value' : 'Tổng giá trị box'}
                      </span>
                      <span className="text-lg font-extrabold text-[#228654] tabular-nums">
                        {formatVnd(computedTotalPrice ?? 0, language)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-[#5f6d66]">
                      <span>
                        {isEn ? 'Estimated budget' : 'Ngân sách dự kiến'}
                      </span>
                      <span className="tabular-nums">
                        {formatVnd(effectiveBudget, language)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        onAddCustomBoxToCart({
                          boxTitle: boxTitleByOccasion,
                          occasion,
                          items: giftBoxItems,
                          totalPrice: computedTotalPrice,
                          giftNote: giftNote.trim(),
                        })
                      }
                      className="w-full py-3 px-5 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {isEn ? 'Add box to cart' : 'Thêm box vào giỏ hàng'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenConsult}
                      className="w-full py-2.5 px-4 bg-[#f7fbf8] hover:bg-[#e8f5ee] text-[#228654] border border-[#228654]/25 text-xs font-bold rounded-md transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isEn
                          ? 'Request custom corporate quote'
                          : 'Gửi yêu cầu báo giá số lượng lớn'}
                      </span>
                    </button>
                  </div>
                </>
              )}

              {/* Consultation Form Inline Drawer */}
              {consultOpen && (
                <div className="pt-4 border-t border-[#e6eee9] space-y-4">
                  {consultRef ? (
                    <div className="bg-[#f3fbf6] border border-[#228654]/30 rounded-md p-4 space-y-2.5">
                      <div className="flex items-center gap-2 text-[#228654] font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>
                          {isEn
                            ? 'Consultation request recorded'
                            : 'Đã ghi nhận yêu cầu tư vấn box quà'}
                        </span>
                      </div>
                      <p className="text-xs text-[#1e2a22]">
                        {isEn ? 'Reference code:' : 'Mã yêu cầu:'}{' '}
                        <strong className="font-mono text-[#228654]">
                          {consultRef}
                        </strong>
                      </p>
                      <p className="text-xs text-[#5f6d66] leading-relaxed">
                        {isEn
                          ? `Includes ${giftBoxItems.length} product types (${totalSelectedUnits} units), occasion: ${getOccasionLabel(occasion, language)}, quantity: ${consultQuantityBoxes} boxes. Support hotline: 0388 195 865.`
                          : `Box gồm ${giftBoxItems.length} loại sản phẩm (${totalSelectedUnits} món), dịp ${occasion}, số lượng ${consultQuantityBoxes} hộp. Hotline hỗ trợ: 0388 195 865.`}
                      </p>
                      <button
                        type="button"
                        onClick={() => setConsultOpen(false)}
                        className="text-xs font-bold text-[#228654] hover:underline cursor-pointer"
                      >
                        {isEn ? 'Dismiss message' : 'Đóng thông báo'}
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmitConsult}
                      className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md p-4 space-y-3"
                    >
                      <div className="text-xs font-bold text-[#1e2a22]">
                        {isEn
                          ? 'Corporate / Bulk Gift Box Consultation'
                          : 'Yêu cầu tư vấn & báo giá box quà số lượng lớn'}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                          {isEn ? 'Full name / Organization' : 'Họ tên / Đơn vị'}
                        </label>
                        <input
                          type="text"
                          required
                          value={consultName}
                          onChange={(e) => setConsultName(e.target.value)}
                          placeholder={
                            isEn
                              ? 'e.g. Nguyen Minh / ABC Co.'
                              : 'Ví dụ: Nguyễn Minh / Công ty ABC'
                          }
                          className="w-full px-3 py-2 text-xs bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                            {isEn
                              ? 'Phone / Email'
                              : 'Số điện thoại / Email'}
                          </label>
                          <input
                            type="text"
                            required
                            value={consultContact}
                            onChange={(e) => setConsultContact(e.target.value)}
                            placeholder="0388 195 865"
                            className="w-full px-3 py-2 text-xs bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                            {isEn ? 'Estimated box quantity' : 'Số lượng hộp dự kiến'}
                          </label>
                          <input
                            type="number"
                            min={1}
                            required
                            value={consultQuantityBoxes}
                            onChange={(e) =>
                              setConsultQuantityBoxes(
                                Math.max(1, Number(e.target.value) || 1),
                              )
                            }
                            className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-1 py-2 px-3 bg-[#228654] hover:bg-[#08734d] text-white text-xs font-bold rounded-md cursor-pointer"
                        >
                          {isEn ? 'Send request' : 'Gửi yêu cầu'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConsultOpen(false)}
                          className="py-2 px-3 text-xs font-semibold text-[#5f6d66] hover:text-[#1e2a22] cursor-pointer"
                        >
                          {isEn ? 'Cancel' : 'Hủy'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
