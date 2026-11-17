import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Gift,
  Info,
  RotateCcw,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react';
import {
  FEATURED_GIFT_BOXES,
  PRODUCT_CATEGORIES,
  evaluateGiftBoxPrice,
  getCategoryLabel,
  getOccasionLabel,
  getProductName,
} from '../data/mockOcopData';
import {
  GiftBoxSelectionItem,
  Language,
  Product,
  ProductCategory,
} from '../types/ocop';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';
import { normalizeSearchText } from '../components/GlobalSearchBar';

interface ProductsPageProps {
  products: Product[];
  language: Language;
  initialCategory: ProductCategory | 'Tất cả';
  initialSearchQuery?: string;
  giftBoxItems: GiftBoxSelectionItem[];
  cartQtyMap: Map<string, number>;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToGiftBox: (product: Product) => void;
  onAddBoxToCart: (boxId: string) => void;
  onSelectFeaturedBox: (boxId: string) => void;
  onGoToGiftBuilder: () => void;
}

type PriceRangeKey = 'all' | 'under-150' | '150-350' | 'over-350';

const PRICE_RANGES: {
  key: PriceRangeKey;
  labelVi: string;
  labelEn: string;
}[] = [
  { key: 'all', labelVi: 'Tất cả mức giá', labelEn: 'All price ranges' },
  {
    key: 'under-150',
    labelVi: 'Dưới 150.000đ',
    labelEn: 'Under 150,000 VND',
  },
  {
    key: '150-350',
    labelVi: '150.000đ – 350.000đ',
    labelEn: '150,000 – 350,000 VND',
  },
  {
    key: 'over-350',
    labelVi: 'Trên 350.000đ',
    labelEn: 'Over 350,000 VND',
  },
];

export function ProductsPage({
  products,
  language,
  initialCategory,
  initialSearchQuery = '',
  giftBoxItems,
  cartQtyMap,
  onViewProduct,
  onAddToCart,
  onAddToGiftBox,
  onAddBoxToCart,
  onSelectFeaturedBox,
  onGoToGiftBuilder,
}: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'Tất cả'
  >(initialCategory);
  const [priceRange, setPriceRange] = useState<PriceRangeKey>('all');

  const isEn = language === 'en';

  const giftBoxQtyMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of giftBoxItems) {
      map.set(item.product.id, item.quantity);
    }
    return map;
  }, [giftBoxItems]);

  const totalGiftBoxCount = useMemo(
    () => giftBoxItems.reduce((sum, item) => sum + item.quantity, 0),
    [giftBoxItems],
  );

  const normalizedSearch = useMemo(
    () => normalizeSearchText(searchQuery),
    [searchQuery],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'Tất cả' && p.category !== selectedCategory) {
        return false;
      }

      if (priceRange === 'under-150') {
        if (p.price === null || p.price >= 150000) return false;
      }
      if (priceRange === '150-350') {
        if (p.price === null || p.price < 150000 || p.price > 350000) {
          return false;
        }
      }
      if (priceRange === 'over-350') {
        if (p.price === null || p.price <= 350000) return false;
      }

      if (normalizedSearch) {
        const haystack = normalizeSearchText(
          [
            p.name,
            p.nameEn,
            p.category,
            getCategoryLabel(p.category, 'en'),
            p.shortDescription,
            p.shortDescriptionEn,
            p.locality ?? '',
            p.producer.name ?? '',
            p.weight ?? '',
          ].join(' '),
        );
        if (!haystack.includes(normalizedSearch)) return false;
      }

      return true;
    });
  }, [products, normalizedSearch, selectedCategory, priceRange]);

  const matchingGiftBoxes = useMemo(() => {
    if (!normalizedSearch) return [];
    return FEATURED_GIFT_BOXES.map((box) => {
      const items = box.productIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));
      return { box, items, priceEval: evaluateGiftBoxPrice(items) };
    }).filter(({ box, items }) => {
      const haystack = normalizeSearchText(
        [
          box.name,
          box.nameEn,
          box.occasion,
          getOccasionLabel(box.occasion, 'en'),
          box.description,
          box.descriptionEn,
          items.map((p) => `${p.name} ${p.nameEn}`).join(' '),
        ].join(' '),
      );
      return haystack.includes(normalizedSearch);
    });
  }, [products, normalizedSearch]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tất cả');
    setPriceRange('all');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#228654]">
              {isEn
                ? `${products.length} Specialties Catalog · 3 Product Groups`
                : `Danh mục ${products.length} đặc sản · 3 nhóm sản phẩm`}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e2a22] mt-1">
              {isEn
                ? 'Phú Thọ OCOP Specialties – Gifts from the Ancestral Land'
                : 'Đặc sản OCOP Phú Thọ – Quà từ Đất Tổ'}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#5f6d66] max-w-2xl leading-relaxed">
              {isEn
                ? `Explore all ${products.length} Phú Thọ specialties with verified product photos, full pricing, and packaging specs across 3 groups. Add items directly to cart or combine them into a gift box.`
                : `Khám phá trọn bộ ${products.length} đặc sản Phú Thọ đầy đủ đơn giá, quy cách, hình ảnh xác thực và thông tin cơ sở theo 3 nhóm để mua lẻ hoặc ghép box quà.`}
            </p>
          </div>
          <p className="text-sm text-[#5f6d66] tabular-nums shrink-0">
            {isEn ? 'Showing ' : 'Hiển thị '}
            <strong className="text-[#1e2a22]">
              {filteredProducts.length}
            </strong>{' '}
            / {products.length} {isEn ? 'products' : 'sản phẩm'}
          </p>
        </div>

        <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-4 flex items-start gap-3 text-xs sm:text-sm text-[#38473e]">
          <Info className="w-4 h-4 text-[#228654] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isEn ? (
              <>
                <strong>Verified Catalog Information:</strong> All{' '}
                <strong>{products.length} products</strong> feature verified
                official photos, retail pricing, packaging weights, ingredients,
                shelf-life guides, and producer locations. OCOP star ratings are
                shown exclusively for items with confirmed certificates.
              </>
            ) : (
              <>
                <strong>Thông tin danh mục xác thực:</strong> Toàn bộ{' '}
                <strong>{products.length} sản phẩm</strong> đều hiển thị đầy đủ
                ảnh thật kèm nguồn dẫn, đơn giá tham khảo, quy cách khối lượng,
                thành phần, hạn sử dụng và thông tin cơ sở sản xuất. Hạng sao
                OCOP chỉ hiển thị với các sản phẩm có hồ sơ xác nhận.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Active Gift Box Shortcut Bar */}
      {totalGiftBoxCount > 0 && (
        <div className="bg-[#fff8e6] border border-[#e6b64a]/70 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-sm text-[#1e2a22]">
            <Gift className="w-4 h-4 text-[#b7791f] shrink-0" />
            <span>
              {isEn ? (
                <>
                  You have selected{' '}
                  <strong className="tabular-nums">{totalGiftBoxCount}</strong>{' '}
                  items ({giftBoxItems.length} types) in your gift box.
                </>
              ) : (
                <>
                  Bạn đã chọn{' '}
                  <strong className="tabular-nums">{totalGiftBoxCount}</strong>{' '}
                  sản phẩm ({giftBoxItems.length} loại) vào box quà đang thiết
                  kế.
                </>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={onGoToGiftBuilder}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#228654] hover:bg-[#08734d] text-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>
              {isEn
                ? `Open gift box (${totalGiftBoxCount})`
                : `Mở box quà (${totalGiftBoxCount})`}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-white border border-[#e6eee9] rounded-lg p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#5f6d66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEn
                  ? 'Search products or gift boxes (e.g. Long Coc Tea, Rice Noodles, Honey, Sweet Box)...'
                  : 'Tìm sản phẩm hoặc box quà (ví dụ: Chè Long Cốc, Mỳ gạo, Mật ong, Thịt chua, Box Trà)...'
              }
              aria-label={isEn ? 'Search catalog' : 'Tìm kiếm danh mục'}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#fcfdfc] border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
            />
          </div>

          <div className="md:col-span-4">
            <select
              aria-label={
                isEn ? 'Filter by price range' : 'Lọc theo khoảng giá'
              }
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRangeKey)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#fcfdfc] border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
            >
              {PRICE_RANGES.map((r) => (
                <option key={r.key} value={r.key}>
                  {isEn ? r.labelEn : r.labelVi}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#f2f6f3]">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label={
              isEn
                ? 'Filter by 3 product groups'
                : 'Lọc theo 3 nhóm sản phẩm'
            }
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('Tất cả')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'Tất cả'
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
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors text-left cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-[#228654] text-white'
                    : 'bg-[#f7fbf8] text-[#38473e] hover:bg-[#e8f5ee]'
                }`}
              >
                {getCategoryLabel(cat.name, language)} ({cat.count})
              </button>
            ))}
          </div>

          {(searchQuery ||
            selectedCategory !== 'Tất cả' ||
            priceRange !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b7791f] hover:text-[#1e2a22] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Clear filters' : 'Xóa bộ lọc'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Matching Gift Boxes when searching */}
      {matchingGiftBoxes.length > 0 && (
        <section className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-extrabold text-[#1e2a22]">
              {isEn
                ? `Matching Gift Boxes (${matchingGiftBoxes.length})`
                : `Box quà phù hợp (${matchingGiftBoxes.length})`}
            </h2>
            <button
              type="button"
              onClick={onGoToGiftBuilder}
              className="text-xs font-bold text-[#228654] hover:underline whitespace-nowrap cursor-pointer"
            >
              {isEn ? 'Open Gift Builder →' : 'Mở trình ghép box →'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingGiftBoxes.map(({ box, items, priceEval }) => {
              const boxName = isEn ? box.nameEn : box.name;
              return (
                <div
                  key={box.id}
                  className="bg-white border border-[#e6eee9] rounded-md overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 p-3.5">
                    <div className="w-16 h-16 rounded overflow-hidden bg-[#f7fbf8] shrink-0">
                      <SafeImage
                        src={box.image}
                        alt={boxName}
                        fallbackLabel={boxName}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-[#b7791f]">
                        {getOccasionLabel(box.occasion, language)} ·{' '}
                        {items.length} {isEn ? 'items' : 'món'}
                      </div>
                      <h3 className="font-display text-sm font-extrabold text-[#1e2a22] truncate">
                        {boxName}
                      </h3>
                      <div className="text-xs font-extrabold text-[#228654] tabular-nums mt-0.5">
                        {isEn
                          ? priceEval.summaryTextEn
                          : priceEval.summaryTextVi}
                      </div>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectFeaturedBox(box.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#1e2a22] bg-[#f7fbf8] hover:bg-[#e8f5ee] border border-[#e6eee9] rounded transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Customize' : 'Tùy chỉnh'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddBoxToCart(box.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Add to cart' : 'Thêm vào giỏ'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#e6eee9] rounded-lg p-12 text-center space-y-4">
          <p className="font-display text-xl font-bold text-[#1e2a22]">
            {isEn
              ? 'No matching products found'
              : 'Chưa tìm thấy sản phẩm phù hợp'}
          </p>
          <p className="text-sm text-[#5f6d66] max-w-lg mx-auto leading-relaxed">
            {isEn
              ? 'No products match the current keyword, price range, or group filter. Please try resetting the filters.'
              : 'Không có sản phẩm nào khớp đồng thời với từ khóa, khoảng giá hoặc nhóm đang chọn. Vui lòng thử lại hoặc đặt lại bộ lọc.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-[#228654] text-white rounded-md hover:bg-[#08734d] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEn ? 'Reset all filters' : 'Đặt lại toàn bộ bộ lọc'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              onViewDetail={onViewProduct}
              onAddToCart={onAddToCart}
              onAddToGiftBox={onAddToGiftBox}
              inCartQuantity={cartQtyMap.get(product.id) ?? 0}
              inBoxQuantity={giftBoxQtyMap.get(product.id) ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
