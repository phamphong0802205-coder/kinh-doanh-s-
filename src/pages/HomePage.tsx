import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  MapPin,
  Pause,
  Play,
  ShoppingBag,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import {
  CRAFT_STORIES,
  FEATURED_GIFT_BOXES,
  HERO_BANNER_SLIDES,
  PRODUCT_CATEGORIES,
  evaluateGiftBoxPrice,
  getCategoryLabel,
  getOccasionLabel,
  getProductName,
  getProductPriceDisplay,
} from '../data/mockOcopData';
import { UI_TEXT } from '../i18n/translations';
import {
  GiftBoxSelectionItem,
  Language,
  PageView,
  Product,
  ProductCategory,
} from '../types/ocop';
import { SafeImage } from '../components/SafeImage';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  language: Language;
  cartQtyMap: Map<string, number>;
  giftBoxItems: GiftBoxSelectionItem[];
  onNavigate: (page: PageView) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToGiftBox: (product: Product) => void;
  onSelectFeaturedBox: (boxId: string) => void;
  onAddBoxToCart: (boxId: string) => void;
}

const CUSTOMER_REVIEWS = [
  {
    id: 'tm-1',
    author: 'Chị Nguyễn Minh Thư',
    authorEn: 'Ms. Minh Thu Nguyen',
    location: 'Hà Nội, Việt Nam',
    locationEn: 'Hanoi, Vietnam',
    quote:
      'Danh mục chia 3 nhóm rõ ràng, đủ đơn giá từng sản phẩm giúp tôi chọn nhanh Box Trà Đất Tổ và các đặc sản làm quà biếu gia đình dịp cuối tuần.',
    quoteEn:
      'The 3 clear product groups and upfront prices made it effortless to pick the Heritage Tea Box and regional delicacies for family gifting.',
    rating: '4.9',
  },
  {
    id: 'tm-2',
    author: 'Anh Trần Quốc Dũng',
    authorEn: 'Mr. Quoc Dung Tran',
    location: 'Việt Trì, Phú Thọ',
    locationEn: 'Việt Trì, Phú Thọ',
    quote:
      'Thông tin chứng nhận OCOP, địa chỉ hợp tác xã và câu chuyện từng sản phẩm rất minh bạch, đặt đơn hộp quà đối tác cực kỳ yên tâm.',
    quoteEn:
      'Verified OCOP certifications, cooperative locations, and craft stories give complete confidence when ordering corporate gift sets.',
    rating: '4.9',
  },
  {
    id: 'tm-3',
    author: 'Cô Lê Thanh Mai',
    authorEn: 'Ms. Thanh Mai Le',
    location: 'Đà Nẵng, Việt Nam',
    locationEn: 'Da Nang, Vietnam',
    quote:
      'Tìm nhanh được Chè búp tím Thanh Ba, Mỳ gạo Hùng Lô, Tương làng Bợ và Sét quà Con Cui rồi thêm thẳng vào giỏ hàng rất tiện lợi.',
    quoteEn:
      'It is super convenient to search Thanh Ba Purple Bud Tea, Hung Lo Rice Noodles, Lang Bo Soy Sauce, and Con Cui Gift Set and add straight to cart.',
    rating: '4.8',
  },
];

export function HomePage({
  products,
  language,
  cartQtyMap,
  giftBoxItems,
  onNavigate,
  onSelectCategory,
  onViewProduct,
  onAddToCart,
  onAddToGiftBox,
  onSelectFeaturedBox,
  onAddBoxToCart,
}: HomePageProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isBannerPaused, setIsBannerPaused] = useState(false);

  const isEn = language === 'en';
  const tHome = UI_TEXT[language].home;

  const boxQtyMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of giftBoxItems) {
      map.set(item.product.id, item.quantity);
    }
    return map;
  }, [giftBoxItems]);

  const slideCount = HERO_BANNER_SLIDES.length;
  const currentSlide =
    HERO_BANNER_SLIDES[activeSlideIndex] ?? HERO_BANNER_SLIDES[0];

  useEffect(() => {
    if (isBannerPaused || slideCount <= 1) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slideCount);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isBannerPaused, slideCount]);

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slideCount);
  };

  // Balanced highlights across all 3 product groups
  const showcaseProducts = [
    products.find((p) => p.id === 'che-bup-tim-thanh-ba'),
    products.find((p) => p.id === 'tra-dinh-cao-cap-hoai-trung'),
    products.find((p) => p.id === 'my-gao-sach-sinh-ra-tu-lang-hung-lo'),
    products.find((p) => p.id === 'thit-chua-thanh-son'),
  ].filter((p): p is Product => Boolean(p));

  return (
    <div className="bg-[#fcfdfc]">
      {/* 1. Full-Width Auto-Running Hero Banner Carousel with Unobtrusive Bottom Overlay */}
      <section className="bg-white py-3 sm:py-4 border-b border-[#e6eee9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="group relative w-full h-[300px] sm:h-[380px] lg:h-[460px] rounded-md overflow-hidden bg-[#1a3d1f]"
            onMouseEnter={() => setIsBannerPaused(true)}
            onMouseLeave={() => setIsBannerPaused(false)}
            onFocusCapture={() => setIsBannerPaused(true)}
            onBlurCapture={() => setIsBannerPaused(false)}
            aria-roledescription="carousel"
            aria-label={
              isEn
                ? 'Phú Thọ Specialties Banner Slideshow'
                : 'Trình chiếu banner đặc sản Phú Thọ'
            }
          >
            {HERO_BANNER_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive
                      ? 'opacity-100 scale-100 z-0'
                      : 'opacity-0 scale-[1.02] z-0 pointer-events-none'
                  }`}
                >
                  <SafeImage
                    src={slide.image}
                    alt={isEn ? slide.altEn : slide.alt}
                    fallbackLabel={isEn ? slide.captionEn : slide.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}

            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none z-[1]" />

            <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsBannerPaused((p) => !p)}
                aria-label={
                  isBannerPaused
                    ? isEn
                      ? 'Resume banner slideshow'
                      : 'Tiếp tục chạy banner'
                    : isEn
                      ? 'Pause banner slideshow'
                      : 'Tạm dừng banner'
                }
                className="w-7 h-7 inline-flex items-center justify-center rounded-sm bg-black/45 hover:bg-black/65 text-white border border-white/20 transition-colors cursor-pointer"
              >
                {isBannerPaused ? (
                  <Play className="w-3.5 h-3.5" />
                ) : (
                  <Pause className="w-3.5 h-3.5" />
                )}
              </button>
              <span className="px-2 py-1 text-[11px] font-bold tabular-nums bg-black/45 text-white rounded-sm border border-white/20">
                {activeSlideIndex + 1} / {slideCount}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label={isEn ? 'Previous banner' : 'Banner trước'}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 inline-flex items-center justify-center rounded-sm bg-black/40 hover:bg-black/65 text-white border border-white/15 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              aria-label={isEn ? 'Next banner' : 'Banner tiếp theo'}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 inline-flex items-center justify-center rounded-sm bg-black/40 hover:bg-black/65 text-white border border-white/15 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute inset-x-0 bottom-0 z-10 px-5 sm:px-8 lg:px-10 pb-4 pt-8 flex flex-col gap-3">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-5">
                <div className="max-w-xl space-y-1">
                  <div className="text-[11px] sm:text-xs font-bold text-[#e6b64a]">
                    {isEn ? currentSlide.captionEn : currentSlide.caption}
                  </div>
                  <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold leading-snug text-white drop-shadow-sm">
                    {isEn ? currentSlide.titleEn : currentSlide.title}
                  </h1>
                  <p className="hidden sm:block text-xs sm:text-sm font-medium text-white/90 line-clamp-1">
                    {isEn
                      ? currentSlide.regionLabelEn
                      : currentSlide.regionLabel}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onNavigate(currentSlide.primaryTarget)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>
                      {isEn
                        ? currentSlide.primaryCtaLabelEn
                        : currentSlide.primaryCtaLabel}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(currentSlide.secondaryTarget)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-[#1e2a22] bg-[#e6b64a] hover:bg-[#d9a738] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Gift className="w-4 h-4" />
                    <span>
                      {isEn
                        ? currentSlide.secondaryCtaLabelEn
                        : currentSlide.secondaryCtaLabel}
                    </span>
                  </button>
                </div>
              </div>

              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label={isEn ? 'Choose slide' : 'Chọn banner'}
              >
                {HERO_BANNER_SLIDES.map((slide, idx) => {
                  const active = idx === activeSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-label={
                        isEn
                          ? `Slide ${idx + 1}: ${slide.captionEn}`
                          : `Banner ${idx + 1}: ${slide.caption}`
                      }
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-1.5 rounded-sm transition-all cursor-pointer ${
                        active
                          ? 'w-7 bg-[#e6b64a]'
                          : 'w-2.5 bg-white/45 hover:bg-white/75'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Exact 3 Product Groups Strip */}
      <section className="bg-[#f7fbf8] border-b border-[#e6eee9] py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-[#228654]">
                {tHome.categoriesKicker}
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#1e2a22] mt-0.5">
                {tHome.categoriesTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="text-xs sm:text-sm font-bold text-[#228654] hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <span>{tHome.viewAllCatalog}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRODUCT_CATEGORIES.map((cat) => {
              const catLabel = getCategoryLabel(cat.name, language);
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => onSelectCategory(cat.name)}
                  className="group text-left bg-white border border-[#e6eee9] hover:border-[#228654] rounded-lg overflow-hidden transition-all flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[16/10] w-full bg-[#f7fbf8] overflow-hidden">
                    <SafeImage
                      src={cat.image}
                      alt={catLabel}
                      fallbackLabel={catLabel}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold text-[#1e2a22] group-hover:text-[#228654]">
                        {catLabel}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#5f6d66] leading-relaxed">
                        {isEn ? cat.shortDescEn : cat.shortDesc}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-[#228654] pt-1">
                      {cat.count} {isEn ? 'products →' : 'sản phẩm →'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Specialties */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e6eee9] pb-3.5">
          <div>
            <div className="text-xs font-bold text-[#228654]">
              {tHome.featuredProductsKicker}
            </div>
            <h2 className="font-display text-2xl font-extrabold text-[#1e2a22] mt-0.5">
              {tHome.featuredProductsTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#228654] hover:underline whitespace-nowrap cursor-pointer"
          >
            <span>{tHome.viewAllCatalog}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
          {showcaseProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              onViewDetail={onViewProduct}
              onAddToCart={onAddToCart}
              onAddToGiftBox={onAddToGiftBox}
              inCartQuantity={cartQtyMap.get(product.id) ?? 0}
              inBoxQuantity={boxQtyMap.get(product.id) ?? 0}
            />
          ))}
        </div>
      </section>

      {/* 4. Curated 5 Suggested Gift Boxes */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e6eee9] pb-3.5 mb-6">
          <div>
            <div className="text-xs font-bold text-[#228654]">
              {tHome.featuredBoxesKicker}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1e2a22] mt-0.5">
              {isEn
                ? '5 Suggested Gift Box Combinations'
                : '5 Gợi ý ghép thành box quà'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('gift-builder')}
            className="text-xs sm:text-sm font-bold text-[#228654] hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <span>{tHome.customBoxLink}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_GIFT_BOXES.map((box) => {
            const boxItems = box.productIds
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is Product => Boolean(p));
            const priceEval = evaluateGiftBoxPrice(boxItems);
            const boxName = isEn ? box.nameEn : box.name;

            return (
              <article
                key={box.id}
                className="flex flex-col justify-between bg-white border border-[#e6eee9] rounded-lg overflow-hidden hover:border-[#228654]/45 transition-all"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#f7fbf8] overflow-hidden">
                    <SafeImage
                      src={box.image}
                      alt={boxName}
                      fallbackLabel={boxName}
                    />
                  </div>

                  <div className="p-5 pb-0 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-[#b7791f]">
                        {getOccasionLabel(box.occasion, language)}
                      </span>
                      <span className="text-[#5f6d66]">
                        {boxItems.length} {isEn ? 'items' : 'món'}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-extrabold text-[#1e2a22]">
                      {boxName}
                    </h3>
                    <p className="text-xs text-[#5f6d66] leading-relaxed">
                      {isEn ? box.descriptionEn : box.description}
                    </p>

                    <ul className="pt-2.5 border-t border-[#f2f6f3] space-y-1.5 text-xs text-[#1e2a22]">
                      {boxItems.map((item) => (
                        <li key={item.id} className="flex justify-between gap-2">
                          <span className="truncate font-medium">
                            • {getProductName(item, language)}
                          </span>
                          <span className="tabular-nums text-[#5f6d66] shrink-0">
                            {getProductPriceDisplay(item, language)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 pt-4 space-y-3">
                  <div className="pt-3 border-t border-[#f2f6f3] flex items-baseline justify-between gap-2">
                    <span className="text-xs text-[#5f6d66]">
                      {isEn ? 'Total box value' : 'Tổng giá box'}
                    </span>
                    <span className="text-base font-extrabold text-[#228654] tabular-nums">
                      {isEn ? priceEval.summaryTextEn : priceEval.summaryTextVi}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectFeaturedBox(box.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1e2a22] hover:text-[#228654] bg-[#f7fbf8] hover:bg-[#e8f5ee] border border-[#e6eee9] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                      <span>{tHome.chooseBoxBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddBoxToCart(box.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold bg-[#228654] hover:bg-[#08734d] text-white rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>{tHome.addBoxToCartBtn}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Cẩm nang & Câu chuyện từ Đất Tổ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#228654]">
            {isEn ? 'Handbook & Heritage' : 'Cẩm nang & Di sản'}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1e2a22]">
            {tHome.storyHeading}
          </h2>
          <p className="text-sm text-[#5f6d66] max-w-xl">
            {isEn
              ? `Real producer & craft-village stories across the 3 local specialty groups (${products.length} verified-photo specialties).`
              : `Câu chuyện cơ sở sản xuất & làng nghề gắn với 3 nhóm đặc sản trong danh mục ${products.length} sản phẩm Phú Thọ.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRAFT_STORIES.map((story) => {
            const storyTitle = isEn ? story.titleEn : story.title;
            return (
              <article
                key={story.id}
                className="bg-white border border-[#e6eee9] rounded-lg overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#f7fbf8] overflow-hidden">
                  <SafeImage
                    src={story.image}
                    alt={storyTitle}
                    fallbackLabel={storyTitle}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#5f6d66]">
                      <span className="font-semibold text-[#228654] truncate">
                        {getCategoryLabel(story.category, language)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 shrink-0">
                        <MapPin className="w-3 h-3" />
                        {isEn ? story.localityEn : story.locality}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1e2a22] leading-snug">
                      {storyTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5f6d66] leading-relaxed line-clamp-3">
                      {isEn ? story.excerptEn : story.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f2f6f3] flex items-center justify-between">
                    <span className="text-xs text-[#5f6d66] truncate">
                      {isEn ? story.artisanNameEn : story.artisanName}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('stories')}
                      className="text-xs font-bold text-[#228654] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isEn ? 'Read more →' : 'Đọc tiếp →'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-[#228654]">
                {isEn ? 'Customer Experience' : 'Trải nghiệm khách hàng'}
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#1e2a22] mt-0.5">
                {isEn
                  ? 'Feedback from OCOP Gift Box Buyers'
                  : 'Cảm nhận từ khách chọn quà OCOP Phú Thọ'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#e6eee9] rounded-lg p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#1e2a22]">
                        {isEn ? item.authorEn : item.author}
                      </div>
                      <div className="text-xs text-[#5f6d66]">
                        {isEn ? item.locationEn : item.location}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1 text-sm font-bold text-[#1e2a22] tabular-nums">
                      <Star className="w-4 h-4 text-[#e6b64a] fill-[#e6b64a]" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#38473e] leading-relaxed">
                    &ldquo;{isEn ? item.quoteEn : item.quote}&rdquo;
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
