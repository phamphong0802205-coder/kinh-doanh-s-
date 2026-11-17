import { ArrowUpRight, Gift, ShoppingBag } from 'lucide-react';
import {
  getCategoryLabel,
  getProductName,
  getProductPriceDisplay,
} from '../data/mockOcopData';
import { UI_TEXT } from '../i18n/translations';
import { Language, Product } from '../types/ocop';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  language?: Language;
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToGiftBox: (product: Product) => void;
  inCartQuantity?: number;
  inBoxQuantity?: number;
}

export function ProductCard({
  product,
  language = 'vi',
  onViewDetail,
  onAddToCart,
  onAddToGiftBox,
  inCartQuantity = 0,
  inBoxQuantity = 0,
}: ProductCardProps) {
  const t = UI_TEXT[language].common;
  const isEn = language === 'en';
  const productName = getProductName(product, language);
  const categoryLabel = getCategoryLabel(product.category, language);
  const shortDesc = isEn ? product.shortDescriptionEn : product.shortDescription;
  const ocopBadge = isEn
    ? product.ocopTierSampleEn ?? product.ocopTierSample
    : product.ocopTierSample;
  const imageAlt = isEn
    ? product.imageAltEn ??
      `${productName} (${product.imageCaptionEn ?? product.imageCaption})`
    : product.imageAlt ?? `${productName} (${product.imageCaption})`;

  const hasFixedPrice =
    typeof product.price === 'number' && Number.isFinite(product.price);
  const hasRangePrice = !hasFixedPrice && Boolean(product.priceRange);
  const hasAnyPrice = hasFixedPrice || hasRangePrice;
  const priceDisplay = getProductPriceDisplay(product, language);
  const packagingLabel =
    (isEn
      ? product.weightEn ?? product.unitEn ?? product.unit
      : product.weight ?? product.unit) ?? t.updating;

  return (
    <article className="group flex flex-col bg-white border border-[#e6eee9] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[#228654]/45 hover:shadow-sm">
      <button
        type="button"
        onClick={() => onViewDetail(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7fbf8] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#228654]"
      >
        <SafeImage
          src={product.image}
          alt={imageAlt}
          fallbackLabel={productName}
          emptyStateLabel={t.unverifiedPhotoLabel}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.isVerifiedProductPhoto && product.image && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[11px] font-medium bg-[#1e2a22]/80 text-white rounded-sm">
            {t.verifiedPhotoBadge}
          </span>
        )}
      </button>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-[#5f6d66]">
          <span className="font-semibold text-[#228654] line-clamp-1">
            {categoryLabel}
          </span>
          {product.locality && (
            <>
              <span aria-hidden="true">·</span>
              <span>{product.locality}</span>
            </>
          )}
          {ocopBadge && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#b7791f] font-medium">{ocopBadge}</span>
            </>
          )}
        </div>

        <h3 className="mt-2 font-display text-base font-bold text-[#1e2a22] leading-snug">
          <button
            type="button"
            onClick={() => onViewDetail(product)}
            className="text-left hover:text-[#228654] transition-colors cursor-pointer"
          >
            <span className="text-xs font-mono text-[#5f6d66] mr-1.5 tabular-nums">
              #{String(product.orderNumber).padStart(2, '0')}
            </span>
            {productName}
          </button>
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-[#5f6d66] line-clamp-2 leading-relaxed flex-1">
          {shortDesc}
        </p>

        <div className="mt-4 pt-3.5 border-t border-[#f2f6f3] space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[11px] text-[#5f6d66]">
                {hasFixedPrice
                  ? isEn
                    ? 'Price'
                    : 'Giá bán'
                  : hasRangePrice
                    ? isEn
                      ? 'Price range'
                      : 'Khoảng giá'
                    : t.unpriced}
              </div>
              <div
                className={`text-sm sm:text-base font-extrabold tabular-nums truncate ${
                  hasAnyPrice ? 'text-[#228654]' : 'text-[#b7791f]'
                }`}
              >
                {hasAnyPrice ? priceDisplay : t.updating}
              </div>
            </div>
            <div className="text-right text-[11px] text-[#5f6d66] shrink-0 max-w-[46%]">
              <div>{isEn ? 'Packaging' : 'Quy cách'}</div>
              <div className="font-medium text-[#1e2a22] truncate">
                {packagingLabel}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={() => onViewDetail(product)}
              className="inline-flex items-center gap-1 font-semibold text-[#5f6d66] hover:text-[#228654] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{t.viewDetail}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => onAddToGiftBox(product)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 font-semibold text-[#228654] bg-[#f7fbf8] hover:bg-[#e8f5ee] border border-[#228654]/25 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 shrink-0" />
              <span>
                {inBoxQuantity > 0
                  ? isEn
                    ? `In box (${inBoxQuantity})`
                    : `Box (${inBoxQuantity})`
                  : t.addToGiftBox}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span>
              {inCartQuantity > 0
                ? isEn
                  ? `In cart (${inCartQuantity}) · +1`
                  : `Trong giỏ (${inCartQuantity}) · +1`
                : t.addToCart}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
