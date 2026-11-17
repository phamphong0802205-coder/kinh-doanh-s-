import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Gift, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import {
  FEATURED_GIFT_BOXES,
  evaluateGiftBoxPrice,
  getCategoryLabel,
  getOccasionLabel,
  getProductName,
  getProductPriceDisplay,
} from '../data/mockOcopData';
import { UI_TEXT } from '../i18n/translations';
import { Language, Product } from '../types/ocop';
import { SafeImage } from './SafeImage';

export function normalizeSearchText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
    .trim();
}

interface GlobalSearchBarProps {
  products: Product[];
  language: Language;
  onSelectProduct: (product: Product) => void;
  onAddProductToCart: (product: Product) => void;
  onSelectFeaturedBox: (boxId: string) => void;
  onAddFeaturedBoxToCart: (boxId: string) => void;
  onSearchInCatalog?: (keyword: string) => void;
}

const POPULAR_CHIPS_VI = [
  'Chè búp tím',
  'Mỳ gạo Hùng Lô',
  'Mật ong Tam Đảo',
  'Thịt chua',
  'Box Trà Đất Tổ',
  'Box Đặc sản cao cấp',
];

const POPULAR_CHIPS_EN = [
  'Purple Bud Tea',
  'Hung Lo Noodles',
  'Tam Dao Honey',
  'Fermented Pork',
  'Heritage Tea Box',
  'Premium Specialties Box',
];

export function GlobalSearchBar({
  products,
  language,
  onSelectProduct,
  onAddProductToCart,
  onSelectFeaturedBox,
  onAddFeaturedBoxToCart,
  onSearchInCatalog,
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'boxes'>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const isEn = language === 'en';
  const tSearch = UI_TEXT[language].search;
  const popularChips = isEn ? POPULAR_CHIPS_EN : POPULAR_CHIPS_VI;

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const normalizedQuery = useMemo(() => normalizeSearchText(query), [query]);

  const matchedProducts = useMemo(() => {
    if (!normalizedQuery) return [];
    return products.filter((p) => {
      const haystack = normalizeSearchText(
        [
          p.name,
          p.nameEn,
          p.category,
          getCategoryLabel(p.category, 'en'),
          p.locality ?? '',
          p.producer.name ?? '',
          p.shortDescription,
          p.shortDescriptionEn,
          p.weight ?? '',
        ].join(' '),
      );
      return haystack.includes(normalizedQuery);
    });
  }, [products, normalizedQuery]);

  const matchedBoxes = useMemo(() => {
    const allWithItems = FEATURED_GIFT_BOXES.map((box) => {
      const items = box.productIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));
      const priceEval = evaluateGiftBoxPrice(items);
      return { box, items, priceEval };
    });

    if (!normalizedQuery) return [];
    return allWithItems.filter(({ box, items }) => {
      const itemNames = items
        .map((p) => `${p.name} ${p.nameEn}`)
        .join(' ');
      const haystack = normalizeSearchText(
        [
          box.name,
          box.nameEn,
          box.occasion,
          getOccasionLabel(box.occasion, 'en'),
          box.description,
          box.descriptionEn,
          itemNames,
        ].join(' '),
      );
      return haystack.includes(normalizedQuery);
    });
  }, [products, normalizedQuery]);

  const visibleProducts =
    activeTab === 'boxes' ? [] : matchedProducts.slice(0, 8);
  const visibleBoxes =
    activeTab === 'products' ? [] : matchedBoxes.slice(0, 5);
  const totalMatches = matchedProducts.length + matchedBoxes.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!normalizedQuery) {
      setIsOpen(true);
      return;
    }
    if (matchedProducts.length === 1 && matchedBoxes.length === 0) {
      setIsOpen(false);
      onSelectProduct(matchedProducts[0]);
      return;
    }
    if (matchedBoxes.length === 1 && matchedProducts.length === 0) {
      setIsOpen(false);
      onSelectFeaturedBox(matchedBoxes[0].box.id);
      return;
    }
    if (onSearchInCatalog) {
      setIsOpen(false);
      onSearchInCatalog(query.trim());
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#f7fbf8] border-b border-[#e6eee9] relative z-30"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <form
          onSubmit={handleSubmit}
          role="search"
          aria-label={isEn ? 'Search specialties and gift boxes' : 'Tìm kiếm sản phẩm và box quà'}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5f6d66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              placeholder={tSearch.placeholder}
              aria-label={tSearch.placeholder}
              className="w-full h-10 pl-10 pr-9 text-sm bg-white border border-[#e6eee9] rounded-md text-[#1e2a22] placeholder:text-[#7c8881] focus:outline-none focus:border-[#228654] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setIsOpen(true);
                }}
                aria-label={tSearch.clearLabel}
                className="w-7 h-7 inline-flex items-center justify-center rounded text-[#5f6d66] hover:text-[#1e2a22] hover:bg-[#f3fbf6] absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="h-10 px-4 sm:px-5 bg-[#228654] hover:bg-[#08734d] text-white text-xs sm:text-sm font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {tSearch.buttonLabel}
          </button>
        </form>

        {isOpen && (
          <div className="mt-2 bg-white border border-[#e6eee9] rounded-lg shadow-lg overflow-hidden">
            {!normalizedQuery ? (
              <div className="p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#5f6d66]">
                    {tSearch.quickHintLabel}
                  </span>
                  {popularChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setQuery(chip);
                        setActiveTab('all');
                        setIsOpen(true);
                      }}
                      className="px-2.5 py-1 text-xs font-medium bg-[#f7fbf8] hover:bg-[#e8f5ee] text-[#1e2a22] hover:text-[#228654] border border-[#e6eee9] rounded-md transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="px-4 py-2.5 bg-[#f7fbf8] border-b border-[#e6eee9] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('all')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'all'
                          ? 'bg-[#228654] text-white'
                          : 'text-[#5f6d66] hover:bg-white'
                      }`}
                    >
                      {tSearch.allTab} ({totalMatches})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('products')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'products'
                          ? 'bg-[#228654] text-white'
                          : 'text-[#5f6d66] hover:bg-white'
                      }`}
                    >
                      {tSearch.productsTab} ({matchedProducts.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('boxes')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'boxes'
                          ? 'bg-[#228654] text-white'
                          : 'text-[#5f6d66] hover:bg-white'
                      }`}
                    >
                      {tSearch.boxesTab} ({matchedBoxes.length})
                    </button>
                  </div>

                  {onSearchInCatalog && matchedProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onSearchInCatalog(query.trim());
                      }}
                      className="text-xs font-bold text-[#228654] hover:underline whitespace-nowrap cursor-pointer"
                    >
                      {isEn
                        ? `Filter all in catalog (${matchedProducts.length}) →`
                        : `Xem toàn bộ trong danh mục (${matchedProducts.length}) →`}
                    </button>
                  )}
                </div>

                {visibleProducts.length === 0 && visibleBoxes.length === 0 ? (
                  <div className="p-6 text-center text-sm text-[#5f6d66]">
                    {tSearch.noResults}
                  </div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto divide-y divide-[#f2f6f3]">
                    {visibleBoxes.length > 0 && (
                      <div className="p-3 space-y-2 bg-[#fcfdfc]">
                        <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-[#b7791f]">
                          {tSearch.boxesTab} ({matchedBoxes.length})
                        </div>
                        <div className="space-y-2">
                          {visibleBoxes.map(({ box, items, priceEval }) => {
                            const boxName = isEn ? box.nameEn : box.name;
                            return (
                              <div
                                key={box.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 bg-white border border-[#e6eee9] rounded-md hover:border-[#228654]/45 transition-colors"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsOpen(false);
                                    onSelectFeaturedBox(box.id);
                                  }}
                                  className="flex items-center gap-3 min-w-0 text-left flex-1 cursor-pointer"
                                >
                                  <div className="w-12 h-12 rounded overflow-hidden bg-[#f7fbf8] shrink-0">
                                    <SafeImage
                                      src={box.image}
                                      alt={boxName}
                                      fallbackLabel={boxName}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs text-[#b7791f] font-semibold">
                                      {getOccasionLabel(box.occasion, language)} ·{' '}
                                      {items.length}{' '}
                                      {isEn ? 'items' : 'sản phẩm'}
                                    </div>
                                    <div className="text-sm font-bold text-[#1e2a22] truncate">
                                      {boxName}
                                    </div>
                                    <div className="text-xs font-extrabold text-[#228654] tabular-nums">
                                      {isEn
                                        ? priceEval.summaryTextEn
                                        : priceEval.summaryTextVi}
                                    </div>
                                  </div>
                                </button>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsOpen(false);
                                      onSelectFeaturedBox(box.id);
                                    }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#1e2a22] hover:text-[#228654] border border-[#e6eee9] rounded hover:bg-[#f7fbf8] whitespace-nowrap cursor-pointer"
                                  >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    <span>{tSearch.customizeBox}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onAddFeaturedBoxToCart(box.id);
                                      setIsOpen(false);
                                    }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded whitespace-nowrap cursor-pointer"
                                  >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>{tSearch.addToCart}</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {visibleProducts.length > 0 && (
                      <div className="p-3 space-y-2">
                        <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-[#228654]">
                          {tSearch.productsTab} ({matchedProducts.length})
                        </div>
                        <div className="space-y-2">
                          {visibleProducts.map((product) => {
                            const prodName = getProductName(product, language);
                            const unitLabel = isEn
                              ? product.weightEn ?? product.unitEn ?? ''
                              : product.weight ?? product.unit ?? '';
                            return (
                              <div
                                key={product.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 bg-white border border-[#e6eee9] rounded-md hover:border-[#228654]/45 transition-colors"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsOpen(false);
                                    onSelectProduct(product);
                                  }}
                                  className="flex items-center gap-3 min-w-0 text-left flex-1 cursor-pointer"
                                >
                                  <div className="w-12 h-12 rounded overflow-hidden bg-[#f7fbf8] shrink-0">
                                    <SafeImage
                                      src={product.image}
                                      alt={prodName}
                                      fallbackLabel={prodName}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs text-[#5f6d66] truncate">
                                      {getCategoryLabel(product.category, language)}
                                      {product.locality
                                        ? ` · ${product.locality}`
                                        : ''}
                                    </div>
                                    <div className="text-sm font-bold text-[#1e2a22] truncate">
                                      #{String(product.orderNumber).padStart(2, '0')}{' '}
                                      {prodName}
                                    </div>
                                    <div className="text-xs font-extrabold text-[#228654] tabular-nums">
                                      {getProductPriceDisplay(product, language)}
                                      {unitLabel ? (
                                        <span className="font-normal text-[#5f6d66]">
                                          {' '}
                                          / {unitLabel}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </button>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsOpen(false);
                                      onSelectProduct(product);
                                    }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#1e2a22] hover:text-[#228654] border border-[#e6eee9] rounded hover:bg-[#f7fbf8] whitespace-nowrap cursor-pointer"
                                  >
                                    <span>{tSearch.viewDetail}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onAddProductToCart(product);
                                      setIsOpen(false);
                                    }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded whitespace-nowrap cursor-pointer"
                                  >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>{tSearch.addToCart}</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
