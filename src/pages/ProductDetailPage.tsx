import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Compass,
  ExternalLink,
  FileText,
  Gift,
  Info,
  MapPin,
  MessageSquare,
  Minus,
  PhoneCall,
  Plus,
  QrCode,
  ShoppingBag,
  Video,
  X,
} from 'lucide-react';
import {
  getCategoryLabel,
  getProductName,
  getProductPriceDisplay,
} from '../data/mockOcopData';
import { UI_TEXT } from '../i18n/translations';
import { Language, Product } from '../types/ocop';
import { SafeImage } from '../components/SafeImage';

interface ProductDetailPageProps {
  product: Product;
  language: Language;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddToGiftBox: (product: Product, quantity: number) => void;
  onAskAi: (prompt: string, contextProductId?: string) => void;
  onOpenVisitBooking: (producerId: string) => void;
}

export function ProductDetailPage({
  product,
  language,
  onBack,
  onAddToCart,
  onAddToGiftBox,
  onAskAi,
  onOpenVisitBooking,
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactNote, setContactNote] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    setActivePhotoIndex(0);
    setQuantity(1);
  }, [product.id]);

  const isEn = language === 'en';
  const t = UI_TEXT[language].productDetail;
  const tCommon = UI_TEXT[language].common;
  const updating = t.updatingLabel;

  const productName = getProductName(product, language);
  const categoryLabel = getCategoryLabel(product.category, language);
  const localizedDesc = isEn
    ? product.shortDescriptionEn
    : product.shortDescription;
  const localizedStory = isEn ? product.storyEn : product.story;
  const localizedOrigin = isEn
    ? product.originNoteEn ?? product.originNote
    : product.originNote;
  const localizedCulturalNote = isEn
    ? product.culturalNoteEn
    : product.culturalNote;
  const localizedProcessSteps =
    isEn && product.processStepsEn && product.processStepsEn.length > 0
      ? product.processStepsEn
      : product.processSteps;
  const ocopBadge = isEn
    ? product.ocopTierSampleEn ?? product.ocopTierSample
    : product.ocopTierSample;

  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : product.image
        ? [
            {
              url: product.image,
              alt: product.imageAlt ?? productName,
              altEn: product.imageAltEn ?? productName,
              caption: product.imageCaption,
              captionEn: product.imageCaptionEn,
              source: product.imageSource ?? undefined,
            },
          ]
        : [];

  const activePhoto = gallery[activePhotoIndex] ?? gallery[0] ?? null;
  const mainImageSrc = activePhoto ? activePhoto.url : product.image;
  const imageAlt = activePhoto
    ? isEn
      ? activePhoto.altEn
      : activePhoto.alt
    : isEn
      ? product.imageAltEn ?? productName
      : product.imageAlt ?? productName;
  const imageCaption = activePhoto
    ? isEn
      ? activePhoto.captionEn ?? activePhoto.caption ?? product.imageCaptionEn
      : activePhoto.caption ?? product.imageCaption
    : isEn
      ? product.imageCaptionEn
      : product.imageCaption;
  const activeImageSource = activePhoto?.source ?? product.imageSource;

  const secondaryAlt = isEn
    ? product.secondaryImageAltEn ??
      product.secondaryImageAlt ??
      `${productName} - ${t.secondaryPhotoHeading}`
    : product.secondaryImageAlt ?? `${productName} - ${t.secondaryPhotoHeading}`;
  const secondaryCaption = isEn
    ? product.secondaryImageCaptionEn ?? product.secondaryImageCaption
    : product.secondaryImageCaption;

  const visit = product.producer.visitInfo;
  const localizedActivities = isEn
    ? visit.activitiesEn ?? visit.activities
    : visit.activities;
  const localizedMapGuide = isEn
    ? visit.mapGuideEn ?? visit.mapGuide
    : visit.mapGuide;
  const visitContactMethod = isEn
    ? visit.contactMethodEn ?? visit.contactMethod
    : visit.contactMethod;
  const producerContactNote = isEn
    ? product.producer.contactNoteEn ?? product.producer.contactNote
    : product.producer.contactNote;
  const producerAddress = isEn
    ? product.producer.addressEn ?? product.producer.address
    : product.producer.address;
  const unitDisplay = isEn ? product.unitEn ?? product.unit : product.unit;
  const weightDisplay =
    (isEn ? product.weightEn ?? unitDisplay : product.weight ?? unitDisplay) ??
    updating;
  const ingredientsDisplay =
    (isEn ? product.ingredientsEn ?? product.ingredients : product.ingredients) ??
    updating;
  const shelfLifeDisplay =
    (isEn ? product.shelfLifeEn ?? product.shelfLife : product.shelfLife) ??
    updating;

  const hasFixedPrice =
    typeof product.price === 'number' && Number.isFinite(product.price);
  const hasRangePrice = !hasFixedPrice && Boolean(product.priceRange);
  const hasAnyPrice = hasFixedPrice || hasRangePrice;
  const priceDisplay = getProductPriceDisplay(product, language);

  const hasReferences = Boolean(
    product.mapUrl ||
      product.videoUrl ||
      product.traceabilityUrl ||
      product.storyUrl ||
      (product.articleLinks && product.articleLinks.length > 0),
  );

  const handleOpenContact = () => {
    setContactSubmitted(false);
    setContactName('');
    setContactPhone('');
    setContactNote('');
    setContactOpen(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f6d66] hover:text-[#228654] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToCatalog}</span>
        </button>
      </div>

      {/* Main Product Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#f7fbf8] border border-[#e6eee9]">
              <SafeImage
                src={mainImageSrc}
                alt={imageAlt}
                fallbackLabel={productName}
                emptyStateLabel={tCommon.unverifiedPhotoLabel}
              />
              {product.isVerifiedProductPhoto && mainImageSrc && (
                <span className="absolute bottom-3 left-3 px-2.5 py-1 text-xs font-semibold bg-[#1e2a22]/80 text-white rounded-sm">
                  {tCommon.verifiedPhotoBadge}
                </span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {gallery.map((photo, idx) => (
                  <button
                    key={`${photo.url}-${idx}`}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={isEn ? photo.altEn : photo.alt}
                    className={`aspect-[4/3] rounded-md overflow-hidden border transition-all cursor-pointer bg-[#f7fbf8] ${
                      idx === activePhotoIndex
                        ? 'border-[#228654] ring-2 ring-[#228654]/25'
                        : 'border-[#e6eee9] hover:border-[#228654]/50'
                    }`}
                  >
                    <SafeImage
                      src={photo.url}
                      alt={isEn ? photo.altEn : photo.alt}
                      fallbackLabel={productName}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-2.5 text-xs text-[#5f6d66] space-y-1">
              <p>
                {product.isVerifiedProductPhoto && mainImageSrc
                  ? imageCaption
                  : t.unverifiedPhotoNote}
                {product.locality ? ` · ${product.locality}, Phú Thọ` : ''}
              </p>
              {product.isVerifiedProductPhoto && activeImageSource && (
                <p className="truncate">
                  {t.imageSourceLabel}:{' '}
                  <a
                    href={activeImageSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#228654] hover:underline font-medium"
                  >
                    {activeImageSource}
                  </a>
                </p>
              )}
            </div>
          </div>

          {product.secondaryImage && (
            <div className="bg-white border border-[#e6eee9] rounded-lg p-3.5 space-y-2.5">
              <div className="text-xs font-bold text-[#1e2a22]">
                {t.secondaryPhotoHeading}
              </div>
              <div className="aspect-[16/9] w-full rounded-md overflow-hidden bg-[#f7fbf8] border border-[#e6eee9]">
                <SafeImage
                  src={product.secondaryImage}
                  alt={secondaryAlt}
                  fallbackLabel={productName}
                />
              </div>
              <div className="text-[11px] text-[#5f6d66] space-y-0.5">
                {secondaryCaption && <p>{secondaryCaption}</p>}
                {product.secondaryImageSource && (
                  <p className="truncate">
                    {t.imageSourceLabel}:{' '}
                    <a
                      href={product.secondaryImageSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#228654] hover:underline"
                    >
                      {product.secondaryImageSource}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 bg-white border border-[#e6eee9] rounded-lg p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5f6d66]">
              <span className="font-bold text-[#228654]">{categoryLabel}</span>
              {product.locality && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{product.locality}, Phú Thọ</span>
                </>
              )}
              {ocopBadge && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#b7791f] font-semibold">
                    {ocopBadge}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1e2a22] leading-tight">
              {productName}
            </h1>

            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <span
                className={`text-2xl font-extrabold tabular-nums ${
                  hasAnyPrice ? 'text-[#228654]' : 'text-[#b7791f]'
                }`}
              >
                {hasAnyPrice ? priceDisplay : updating}
              </span>
              <span className="text-sm text-[#5f6d66]">
                {hasFixedPrice
                  ? `/ ${unitDisplay ?? updating}`
                  : hasRangePrice
                    ? `· ${t.priceRangeLabel}`
                    : `· ${tCommon.unpriced}`}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#38473e] leading-relaxed">
            {localizedDesc}
          </p>

          <dl className="divide-y divide-[#f2f6f3] border-y border-[#f2f6f3] text-xs sm:text-sm">
            <div className="py-2.5 flex items-center justify-between gap-4">
              <dt className="text-[#5f6d66]">
                {isEn ? 'Packaging / Weight' : 'Quy cách / Khối lượng'}
              </dt>
              <dd className="font-semibold text-[#1e2a22] text-right">
                {weightDisplay}
              </dd>
            </div>
            <div className="py-2.5 flex items-center justify-between gap-4">
              <dt className="text-[#5f6d66]">
                {isEn ? 'Ingredients' : 'Thành phần'}
              </dt>
              <dd className="font-semibold text-[#1e2a22] text-right max-w-[65%]">
                {ingredientsDisplay}
              </dd>
            </div>
            <div className="py-2.5 flex items-center justify-between gap-4">
              <dt className="text-[#5f6d66]">
                {isEn ? 'Locality' : 'Địa phương'}
              </dt>
              <dd className="font-semibold text-[#1e2a22] text-right">
                {product.locality ?? updating}
              </dd>
            </div>
            <div className="py-2.5 flex items-center justify-between gap-4">
              <dt className="text-[#5f6d66]">{t.sampleStockLabel}</dt>
              <dd className="font-semibold text-[#228654] text-right tabular-nums">
                {product.stock !== null
                  ? product.stock > 0
                    ? `${product.stock} ${t.inStockSuffix}`
                    : t.outOfStock
                  : updating}
              </dd>
            </div>
          </dl>

          {/* Quantity & Actions */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-[#e6eee9] rounded-md bg-[#f7fbf8] h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label={isEn ? 'Decrease quantity' : 'Giảm số lượng'}
                  className="w-10 h-full inline-flex items-center justify-center text-[#1e2a22] hover:bg-[#e8f5ee] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label={isEn ? 'Increase quantity' : 'Tăng số lượng'}
                  className="w-10 h-full inline-flex items-center justify-center text-[#1e2a22] hover:bg-[#e8f5ee] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 min-w-[160px] h-11 inline-flex items-center justify-center gap-2 px-5 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>{t.addToCart}</span>
              </button>

              <button
                type="button"
                onClick={() => onAddToGiftBox(product, quantity)}
                className="h-11 inline-flex items-center justify-center gap-2 px-4 bg-[#f3fbf6] hover:bg-[#e8f5ee] text-[#228654] border border-[#228654]/30 text-sm font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                <Gift className="w-4 h-4 shrink-0" />
                <span>{t.addToGiftBox}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleOpenContact}
                className="h-11 inline-flex items-center justify-center gap-2 px-4 bg-[#fff8e6] hover:bg-[#fcedc5] text-[#1e2a22] border border-[#e6b64a]/70 text-sm font-bold rounded-md transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#b7791f]" />
                <span>{t.contactMoreBtn}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onAskAi(
                    isEn
                      ? `Tell me what verified information is available for "${productName}".`
                      : `Hãy cho tôi biết thông tin hiện có về sản phẩm "${product.name}".`,
                    product.id,
                  )
                }
                className="h-11 inline-flex items-center justify-center gap-2 px-4 bg-[#f7fbf8] hover:bg-[#e8f5ee] text-[#228654] border border-[#228654]/25 text-sm font-bold rounded-md transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#b7791f]" />
                <span>{t.askAiBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story, Origin & Producer Details */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-[#e6eee9] rounded-lg p-6 sm:p-8 space-y-6">
            <div className="space-y-2.5">
              <h2 className="font-display text-2xl font-extrabold text-[#1e2a22]">
                {t.storyHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#38473e] leading-relaxed">
                {localizedStory ?? localizedDesc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#f2f6f3] space-y-2">
              <h3 className="text-base font-bold text-[#1e2a22]">
                {t.originHeading}
              </h3>
              <p className="text-sm text-[#38473e] leading-relaxed">
                {localizedOrigin ??
                  (isEn
                    ? `Crafted in ${product.locality ?? 'Phú Thọ'} by ${product.producer.name ?? 'local producers'}.`
                    : `Sản xuất tại ${product.locality ?? 'Phú Thọ'} bởi ${product.producer.name ?? 'cơ sở địa phương'}.`)}
              </p>
            </div>

            {localizedCulturalNote && (
              <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#b7791f]">
                  <Compass className="w-4 h-4" />
                  <span>{t.culturalContextHeading}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1e2a22] leading-relaxed">
                  {localizedCulturalNote}
                </p>
              </div>
            )}

            {localizedProcessSteps.length > 0 && (
              <div className="pt-4 border-t border-[#f2f6f3] space-y-3">
                <h3 className="text-sm font-bold text-[#1e2a22]">
                  {t.processHeading}
                </h3>
                <ol className="space-y-2.5 text-sm text-[#38473e]">
                  {localizedProcessSteps.map((step, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-[#fcfdfc] border border-[#e6eee9] rounded-md leading-relaxed"
                    >
                      <span className="font-mono text-xs font-bold text-[#228654] mr-2">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="bg-white border border-[#e6eee9] rounded-lg p-6 sm:p-8 space-y-5">
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-[#b7791f]">
                {visit.verified && visit.acceptsVisitors
                  ? t.visitConfirmedTag
                  : t.visitUnconfirmedTag}
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#1e2a22]">
                {t.visitSectionTitle}
              </h2>
              <p className="text-sm text-[#5f6d66] leading-relaxed">
                {t.visitInviteLead}
              </p>
            </div>

            {visit.verified && visit.acceptsVisitors ? (
              <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md p-5 space-y-3.5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-[#5f6d66]">
                      {t.visitHoursLabel}
                    </div>
                    <div className="font-semibold text-[#1e2a22] mt-0.5">
                      {visit.confirmedHours ?? updating}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5f6d66]">
                      {t.visitDaysLabel}
                    </div>
                    <div className="font-semibold text-[#1e2a22] mt-0.5">
                      {visit.confirmedDays ?? updating}
                    </div>
                  </div>
                </div>

                {localizedActivities && localizedActivities.length > 0 && (
                  <div className="pt-2 border-t border-[#e6eee9]">
                    <div className="text-xs text-[#5f6d66] mb-1.5">
                      {t.visitActivitiesLabel}
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#38473e]">
                      {localizedActivities.map((act, idx) => (
                        <li key={idx}>• {act}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {localizedMapGuide && (
                  <div className="pt-2 border-t border-[#e6eee9]">
                    <div className="text-xs text-[#5f6d66]">
                      {t.visitMapGuideLabel}
                    </div>
                    <p className="text-xs sm:text-sm text-[#38473e] mt-0.5 leading-relaxed">
                      {localizedMapGuide}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-[#e6eee9]">
                  <div className="text-xs text-[#5f6d66]">
                    {t.visitContactLabel}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1e2a22] mt-0.5">
                    {visitContactMethod}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#fff8e6] border border-[#e6b64a]/60 rounded-md p-4 flex items-start gap-3 text-sm text-[#1e2a22]">
                <Info className="w-4 h-4 text-[#b7791f] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{t.visitUnconfirmedText}</p>
                  <p className="text-xs text-[#5f6d66]">{visitContactMethod}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenVisitBooking(product.producer.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-[#228654] hover:bg-[#08734d] text-white rounded-md transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookVisitBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => onAskAi(t.askVisitQuestionText, product.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#f7fbf8] hover:bg-[#e8f5ee] text-[#228654] border border-[#228654]/25 rounded-md transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#b7791f]" />
                <span>{t.askVisitQuestionBtn}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#e6eee9] rounded-lg p-6 space-y-4">
            <div className="text-xs font-semibold text-[#5f6d66]">
              {t.producerHeading}
            </div>
            <h2 className="font-display text-xl font-bold text-[#1e2a22]">
              {product.producer.name ?? updating}
            </h2>
            <p className="text-sm text-[#38473e] leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#228654] shrink-0 mt-0.5" />
              <span>{producerAddress ?? updating}</span>
            </p>
            <p className="text-xs text-[#5f6d66] leading-relaxed">
              {producerContactNote}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleOpenContact}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#228654] bg-[#f3fbf6] hover:bg-[#e8f5ee] border border-[#228654]/25 rounded-md transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t.contactMoreBtn}</span>
              </button>
              {product.mapUrl && (
                <a
                  href={product.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#1e2a22] bg-[#fff8e6] hover:bg-[#fcedc5] border border-[#e6b64a]/70 rounded-md transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#b7791f]" />
                  <span>{t.openGoogleMap}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {hasReferences && (
            <div className="bg-white border border-[#e6eee9] rounded-lg p-6 space-y-3.5">
              <h2 className="text-base font-bold text-[#1e2a22]">
                {t.referencesHeading}
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                {product.videoUrl && (
                  <a
                    href={product.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#f7fbf8] hover:bg-[#e8f5ee] border border-[#e6eee9] text-[#1e2a22] font-medium transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#b7791f] shrink-0" />
                      <span>{t.watchVideo}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#5f6d66] shrink-0" />
                  </a>
                )}

                {product.traceabilityUrl && (
                  <a
                    href={product.traceabilityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#f7fbf8] hover:bg-[#e8f5ee] border border-[#e6eee9] text-[#1e2a22] font-medium transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#228654] shrink-0" />
                      <span>{t.traceabilityLabel}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#5f6d66] shrink-0" />
                  </a>
                )}

                {product.articleLinks?.map((link, idx) => (
                  <a
                    key={`${link.url}-${idx}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#fcfdfc] hover:bg-[#f3fbf6] border border-[#e6eee9] text-[#1e2a22] font-medium transition-colors"
                  >
                    <span className="inline-flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-[#228654] shrink-0" />
                      <span className="truncate">
                        {isEn ? link.labelEn : link.label}
                      </span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#5f6d66] shrink-0" />
                  </a>
                ))}

                {product.storyUrl && (
                  <a
                    href={product.storyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#fcfdfc] hover:bg-[#f3fbf6] border border-[#e6eee9] text-[#1e2a22] font-medium transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#b7791f] shrink-0" />
                      <span>{t.readStorySource}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#5f6d66] shrink-0" />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#b7791f] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-[#1e2a22]">
                  {t.ocopInfoHeading}
                </h2>
                <p className="text-xs text-[#5f6d66] mt-1 leading-relaxed">
                  {ocopBadge
                    ? ocopBadge
                    : isEn
                      ? 'Traditional Phú Thọ local specialty. OCOP star tiers are displayed only when official certificates are published.'
                      : 'Đặc sản truyền thống địa phương Phú Thọ. Hạng sao OCOP được hiển thị khi sản phẩm có quyết định chứng nhận chính thức.'}
                </p>
              </div>
            </div>

            <dl className="divide-y divide-[#f2f6f3] text-xs sm:text-sm bg-white border border-[#e6eee9] rounded-md px-4">
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#5f6d66]">
                  {isEn ? 'Classification' : 'Phân loại OCOP'}
                </dt>
                <dd className="font-medium text-[#1e2a22] text-right">
                  {ocopBadge ??
                    (isEn
                      ? 'Traditional Local Specialty'
                      : 'Đặc sản truyền thống địa phương')}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#5f6d66]">
                  {isEn ? 'Producer Entity' : 'Đơn vị chủ thể'}
                </dt>
                <dd className="font-medium text-[#1e2a22] text-right">
                  {product.producer.name ?? updating}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#5f6d66]">
                  {isEn ? 'Shelf Life & Storage' : 'Hạn dùng & bảo quản'}
                </dt>
                <dd className="font-medium text-[#1e2a22] text-right max-w-[60%]">
                  {shelfLifeDisplay}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Contact Inquiry Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2a22]/50 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={
            isEn
              ? 'Contact for more product information'
              : 'Liên hệ tư vấn sản phẩm'
          }
        >
          <div className="w-full max-w-md bg-[#fcfdfc] border border-[#e6eee9] rounded-lg shadow-xl overflow-hidden">
            <div className="px-5 py-4 bg-white border-b border-[#e6eee9] flex items-center justify-between">
              <h3 className="font-display text-lg font-extrabold text-[#1e2a22]">
                {isEn ? 'Product Consultation & Bulk Quote' : 'Liên hệ tư vấn & đặt sỉ/lẻ'}
              </h3>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                aria-label={isEn ? 'Close dialog' : 'Đóng hộp thoại'}
                className="w-8 h-8 inline-flex items-center justify-center rounded-md text-[#5f6d66] hover:bg-[#f3fbf6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {contactSubmitted ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#228654]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-bold text-sm">
                      {isEn
                        ? 'Inquiry recorded successfully'
                        : 'Đã ghi nhận yêu cầu tư vấn'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#38473e] leading-relaxed">
                    {isEn ? (
                      <>
                        Selected product: <strong>{productName}</strong>. Our
                        support team (0388 195 865) can assist with wholesale
                        packs and corporate gifting.
                      </>
                    ) : (
                      <>
                        Sản phẩm quan tâm: <strong>{productName}</strong>. Mọi
                        yêu cầu báo giá sỉ/lẻ hoặc đặt hộp quà vui lòng kết nối
                        trực tiếp qua hotline <strong>0388 195 865</strong>.
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactOpen(false)}
                    className="w-full py-2.5 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md cursor-pointer"
                  >
                    {isEn ? 'Close' : 'Đóng'}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md p-3 text-xs text-[#38473e] leading-relaxed">
                    {isEn ? (
                      <>
                        Need wholesale quantities, custom gift wrapping, or
                        shipping details for <strong>{productName}</strong>?
                        Leave your contact information below.
                      </>
                    ) : (
                      <>
                        Bạn cần đặt số lượng lớn, đóng hộp quà doanh nghiệp hoặc
                        hỏi thêm về <strong>{productName}</strong>? Hãy để lại
                        thông tin bên dưới.
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn ? 'Your full name' : 'Họ tên của bạn'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={
                        isEn ? 'e.g. Nguyen Minh' : 'Ví dụ: Nguyễn Minh'
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn
                        ? 'Phone number or email'
                        : 'Số điện thoại hoặc email'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="0388 195 865"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn
                        ? 'Questions (wholesale pricing, gift wrapping, shipping...)'
                        : 'Nội dung cần hỏi (báo giá sỉ/lẻ, đóng gói quà tặng, vận chuyển...)'}
                    </label>
                    <textarea
                      rows={3}
                      value={contactNote}
                      onChange={(e) => setContactNote(e.target.value)}
                      placeholder={
                        isEn
                          ? 'e.g. Please share wholesale prices and corporate gift box options...'
                          : 'Ví dụ: Xin báo giá sỉ/lẻ và phương án đóng hộp quà biếu...'
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md cursor-pointer"
                  >
                    {isEn ? 'Send inquiry' : 'Gửi yêu cầu tư vấn'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
