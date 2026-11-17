import { useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Info,
  MapPin,
  MessageSquare,
  Navigation,
  PlayCircle,
  QrCode,
  Sparkles,
  Users,
  Video,
  X,
} from 'lucide-react';
import {
  CRAFT_EXPERIENCES,
  getProductName,
  getProductPriceDisplay,
} from '../data/mockOcopData';
import { CraftExperience, Language, Product } from '../types/ocop';
import { SafeImage } from '../components/SafeImage';

interface ExperiencesPageProps {
  language: Language;
  products: Product[];
  onAskAi: (prompt: string) => void;
  onViewProduct: (product: Product) => void;
}

export function ExperiencesPage({
  language,
  products,
  onAskAi,
  onViewProduct,
}: ExperiencesPageProps) {
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [activeVillageId, setActiveVillageId] = useState<string>(
    CRAFT_EXPERIENCES[0].id,
  );
  const [bookingExp, setBookingExp] = useState<CraftExperience | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorDate, setVisitorDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const explorerRef = useRef<HTMLDivElement | null>(null);
  const isEn = language === 'en';

  const districtOptions = useMemo(() => {
    const seen = new Set<string>();
    const list: { tag: string; label: string; labelEn: string }[] = [];
    for (const exp of CRAFT_EXPERIENCES) {
      if (!seen.has(exp.districtTag)) {
        seen.add(exp.districtTag);
        list.push({
          tag: exp.districtTag,
          label: exp.districtTag,
          labelEn: exp.districtTagEn,
        });
      }
    }
    return list;
  }, []);

  const filteredVillages = useMemo(() => {
    if (districtFilter === 'ALL') return CRAFT_EXPERIENCES;
    return CRAFT_EXPERIENCES.filter((exp) => exp.districtTag === districtFilter);
  }, [districtFilter]);

  const activeVillage = useMemo(
    () =>
      CRAFT_EXPERIENCES.find((exp) => exp.id === activeVillageId) ??
      CRAFT_EXPERIENCES[0],
    [activeVillageId],
  );

  // Selected video defaults to first video of activeVillage, or can be switched in gallery
  const [selectedGalleryVideoKey, setSelectedGalleryVideoKey] = useState<
    string | null
  >(null);

  const allVillageVideos = useMemo(
    () =>
      CRAFT_EXPERIENCES.flatMap((exp) =>
        exp.videos.map((v) => ({
          ...v,
          villageId: exp.id,
          villageName: exp.title,
          villageNameEn: exp.titleEn,
          locality: exp.locality,
          localityEn: exp.localityEn,
        })),
      ),
    [],
  );

  const activeGalleryVideo =
    allVillageVideos.find((v) => v.id === selectedGalleryVideoKey) ??
    allVillageVideos[0];

  const relatedProducts = useMemo(
    () =>
      activeVillage.relatedProductIds
        .map((pid) => products.find((p) => p.id === pid))
        .filter((p): p is Product => Boolean(p)),
    [activeVillage, products],
  );

  const handleSelectVillage = (exp: CraftExperience) => {
    setActiveVillageId(exp.id);
    if (exp.videos.length > 0) {
      setSelectedGalleryVideoKey(exp.videos[0].id);
    }
    explorerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenInquiry = (exp: CraftExperience) => {
    setBookingExp(exp);
    setSubmitted(false);
    setVisitorName('');
    setVisitorPhone('');
    setVisitorDate('');
  };

  const activeTitle = isEn ? activeVillage.titleEn : activeVillage.title;
  const activeLocality = isEn
    ? activeVillage.localityEn
    : activeVillage.locality;
  const activeAddress = isEn ? activeVillage.addressEn : activeVillage.address;
  const activeSummary = isEn ? activeVillage.summaryEn : activeVillage.summary;
  const activeHighlights = isEn
    ? activeVillage.highlightsEn
    : activeVillage.highlights;
  const activeDisclaimer = isEn
    ? activeVillage.scheduleDisclaimerEn
    : activeVillage.scheduleDisclaimer;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeVillage.mapQuery,
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header & Honest Status Note */}
      <div className="space-y-4 max-w-4xl">
        <div className="text-xs font-bold text-[#228654]">
          {isEn
            ? `Phú Thọ Craft Villages & Specialty Hubs · ${CRAFT_EXPERIENCES.length} Destinations`
            : `Hệ thống Làng nghề & Vùng nguyên liệu Phú Thọ · ${CRAFT_EXPERIENCES.length} điểm đến`}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e2a22] text-balance">
          {isEn
            ? 'Craft Village Experiences, Map & Media'
            : 'Trải nghiệm Làng nghề, Bản đồ & Tư liệu Phú Thọ'}
        </h1>
        <p className="text-sm sm:text-base text-[#5f6d66] leading-relaxed">
          {isEn
            ? 'Select any Phú Thọ craft village below to inspect its exact map location, watch documentary videos, read local press stories, and discover specialties made there.'
            : 'Nhấn chọn từng làng nghề Phú Thọ bên dưới để xem ngay vị trí bản đồ chi tiết, theo dõi video phóng sự, đọc các bài báo giới thiệu và khám phá đặc sản tương ứng.'}
        </p>

        <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-4 flex items-start gap-3 text-xs sm:text-sm text-[#38473e]">
          <Info className="w-4 h-4 text-[#228654] shrink-0 mt-0.5" />
          <span>
            {isEn
              ? 'Hung Lo Rice Noodle Cooperative welcomes pre-booked group tours directly on-site. For all other craft villages, please view the Google Maps pin and arrange an appointment ahead of your trip.'
              : 'Hợp tác xã Mỳ gạo Hùng Lô mở cửa đón đoàn tham quan theo lịch hẹn trước. Với các làng nghề và cơ sở sản xuất khác, vui lòng xem vị trí bản đồ và liên hệ đặt lịch trước khi ghé thăm.'}
          </span>
        </div>
      </div>

      {/* District Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDistrictFilter('ALL')}
              className={`px-3.5 py-2 text-xs font-bold rounded-md border transition-colors cursor-pointer ${
                districtFilter === 'ALL'
                  ? 'bg-[#228654] text-white border-[#228654]'
                  : 'bg-white text-[#38473e] border-[#e6eee9] hover:border-[#228654]'
              }`}
            >
              {isEn
                ? `All regions (${CRAFT_EXPERIENCES.length})`
                : `Tất cả địa phương (${CRAFT_EXPERIENCES.length})`}
            </button>
            {districtOptions.map((opt) => {
              const count = CRAFT_EXPERIENCES.filter(
                (e) => e.districtTag === opt.tag,
              ).length;
              const active = districtFilter === opt.tag;
              return (
                <button
                  key={opt.tag}
                  type="button"
                  onClick={() => {
                    setDistrictFilter(opt.tag);
                    const firstInFilter = CRAFT_EXPERIENCES.find(
                      (e) => e.districtTag === opt.tag,
                    );
                    if (firstInFilter) {
                      setActiveVillageId(firstInFilter.id);
                    }
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#228654] text-white border-[#228654]'
                      : 'bg-white text-[#38473e] border-[#e6eee9] hover:border-[#228654]'
                  }`}
                >
                  {isEn ? opt.labelEn : opt.label} ({count})
                </button>
              );
            })}
          </div>
          <span className="text-xs text-[#5f6d66]">
            {isEn
              ? 'Click any village card to view its map, videos & articles'
              : 'Ấn vào từng làng nghề để mở bản đồ vị trí, video & bài báo'}
          </span>
        </div>

        {/* All Craft Villages Selectable Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVillages.map((exp) => {
            const isSelected = exp.id === activeVillage.id;
            const expTitle = isEn ? exp.titleEn : exp.title;
            const expLocality = isEn ? exp.localityEn : exp.locality;
            const expSummary = isEn ? exp.summaryEn : exp.summary;

            return (
              <article
                key={exp.id}
                onClick={() => handleSelectVillage(exp)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectVillage(exp);
                  }
                }}
                aria-pressed={isSelected}
                className={`group rounded-lg overflow-hidden flex flex-col border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#f7fbf8] border-[#228654] ring-2 ring-[#228654]/20 shadow-sm'
                    : 'bg-white border-[#e6eee9] hover:border-[#228654]/60'
                }`}
              >
                <div className="relative aspect-[16/9] bg-[#f7fbf8] overflow-hidden">
                  <SafeImage
                    src={exp.image}
                    alt={expTitle}
                    fallbackLabel={expTitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {exp.visitorVerified ? (
                      <span className="px-2 py-0.5 text-[11px] font-bold bg-[#228654] text-white rounded-sm">
                        {isEn ? 'Welcomes visitors' : 'Đón khách theo hẹn'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#1e2a22]/75 text-white rounded-sm">
                        {isEn ? 'Contact before visit' : 'Liên hệ trước'}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 text-[11px] font-bold bg-[#e6b64a] text-[#1e2a22] rounded-sm">
                      {isEn ? 'Viewing on Map ↓' : 'Đang xem bản đồ ↓'}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#228654] font-bold">
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{expLocality}</span>
                      </span>
                    </div>

                    <h2 className="font-display text-base font-extrabold text-[#1e2a22] leading-snug group-hover:text-[#228654] transition-colors">
                      {expTitle}
                    </h2>

                    <p className="text-xs text-[#5f6d66] leading-relaxed line-clamp-2">
                      {expSummary}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[#e6eee9] flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-[#38473e]">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1 text-[#228654]">
                        <Navigation className="w-3 h-3" />
                        {exp.mapUrl
                          ? isEn
                            ? 'Pinned Map'
                            : 'Có bản đồ'
                          : isEn
                            ? 'Province area'
                            : 'Vùng Phú Thọ'}
                      </span>
                      {exp.videos.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[#b7791f]">
                          <Video className="w-3 h-3" />
                          {exp.videos.length} video
                        </span>
                      )}
                      {exp.articles.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[#5f6d66]">
                          <FileText className="w-3 h-3" />
                          {exp.articles.length}{' '}
                          {isEn ? 'articles' : 'bài báo'}
                        </span>
                      )}
                    </div>
                    <span className="text-[#228654] font-bold">
                      {isEn ? 'Select →' : 'Xem chi tiết →'}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Selected Craft Village Interactive Map, Videos & Articles Explorer */}
      <section
        ref={explorerRef}
        className="scroll-mt-24 bg-white border border-[#228654]/30 rounded-xl overflow-hidden shadow-sm"
        aria-label={isEn ? 'Selected Craft Village Map & Details' : 'Chi tiết & Bản đồ Làng nghề đang chọn'}
      >
        {/* Top Highlight Bar */}
        <div className="bg-[#f7fbf8] border-b border-[#e6eee9] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#228654]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeLocality}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#b7791f]">
                {activeVillage.visitorVerified
                  ? isEn
                    ? 'Confirmed visitor-friendly'
                    : 'Đã xác nhận đón khách tham quan'
                  : isEn
                    ? 'Visit by prior appointment'
                    : 'Tham quan theo lịch hẹn trước'}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1e2a22]">
              {activeTitle}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenInquiry(activeVillage)}
              className="px-4 py-2 text-xs font-bold bg-[#228654] hover:bg-[#08734d] text-white rounded-md transition-colors cursor-pointer"
            >
              {isEn ? 'Book Experience' : 'Đặt lịch trải nghiệm'}
            </button>
            <button
              type="button"
              onClick={() =>
                onAskAi(
                  isEn
                    ? `Tell me about visiting ${activeVillage.titleEn} and products made there.`
                    : `Cho tôi biết thông tin tham quan, bản đồ và đặc sản của ${activeVillage.title}.`,
                )
              }
              className="px-3.5 py-2 text-xs font-semibold bg-white hover:bg-[#e8f5ee] text-[#228654] border border-[#228654]/25 rounded-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isEn ? 'Ask AI' : 'Hỏi AI'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Narrative, Highlights, Related Products & Articles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#f7fbf8] border border-[#e6eee9]">
              <SafeImage
                src={activeVillage.image}
                alt={activeTitle}
                fallbackLabel={activeTitle}
              />
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#5f6d66]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#228654]" />
                {isEn
                  ? activeVillage.durationSampleEn
                  : activeVillage.durationSample}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#228654]" />
                {isEn
                  ? activeVillage.groupSizeSampleEn
                  : activeVillage.groupSizeSample}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#38473e] leading-relaxed">
              {activeSummary}
            </p>

            <div className="bg-[#fcfdfc] border border-[#e6eee9] rounded-lg p-4 space-y-2">
              <div className="text-xs font-bold text-[#1e2a22]">
                {isEn
                  ? 'Highlights & Heritage Craft Notes'
                  : 'Điểm nổi bật của làng nghề'}
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#38473e]">
                {activeHighlights.map((hl, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {hl}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs font-medium text-[#b7791f] bg-[#fff8e6] border border-[#e6b64a]/50 rounded-md p-3 leading-relaxed">
              {activeDisclaimer}
            </p>

            {/* Articles Introducing This Craft Village */}
            <div className="space-y-3 pt-2 border-t border-[#f2f6f3]">
              <h3 className="text-sm font-bold text-[#1e2a22] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#228654]" />
                <span>
                  {isEn
                    ? `Press & Portal Articles (${activeVillage.articles.length})`
                    : `Bài báo & tư liệu giới thiệu làng nghề (${activeVillage.articles.length})`}
                </span>
              </h3>
              <div className="space-y-2">
                {activeVillage.articles.map((article, idx) => (
                  <a
                    key={`${article.url}-${idx}`}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#f7fbf8] hover:bg-[#e8f5ee] border border-[#e6eee9] text-xs sm:text-sm font-medium text-[#1e2a22] transition-colors"
                  >
                    <span className="truncate">
                      {isEn ? article.labelEn : article.label}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#228654] shrink-0" />
                  </a>
                ))}
                {activeVillage.traceabilityUrl && (
                  <a
                    href={activeVillage.traceabilityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-md bg-[#fff8e6] hover:bg-[#fcedc5] border border-[#e6b64a]/60 text-xs sm:text-sm font-semibold text-[#1e2a22] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#b7791f] shrink-0" />
                      <span>
                        {isEn
                          ? 'Official Traceability Record (HTX8403035)'
                          : 'Hồ sơ truy xuất nguồn gốc chính thức (HTX8403035)'}
                      </span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#b7791f] shrink-0" />
                  </a>
                )}
              </div>
            </div>

            {/* Related Specialties From This Craft Village */}
            {relatedProducts.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-[#f2f6f3]">
                <h3 className="text-sm font-bold text-[#1e2a22] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#b7791f]" />
                  <span>
                    {isEn
                      ? `Specialties From This Village (${relatedProducts.length})`
                      : `Đặc sản gắn với làng nghề này (${relatedProducts.length})`}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {relatedProducts.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => onViewProduct(prod)}
                      className="flex items-center gap-2.5 p-2 rounded-md bg-white hover:bg-[#f7fbf8] border border-[#e6eee9] hover:border-[#228654] text-left transition-colors cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-sm overflow-hidden bg-[#f7fbf8] shrink-0">
                        <SafeImage
                          src={prod.image}
                          alt={getProductName(prod, language)}
                          fallbackLabel={getProductName(prod, language)}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#1e2a22] truncate">
                          {getProductName(prod, language)}
                        </div>
                        <div className="text-[11px] font-semibold text-[#228654] tabular-nums">
                          {getProductPriceDisplay(prod, language)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Map Location + Embedded Video for Selected Village */}
          <div className="lg:col-span-6 space-y-6">
            {/* Map Card */}
            <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-4 sm:p-5 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-[#228654] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>
                      {isEn ? 'Village Map Location' : 'Vị trí bản đồ làng nghề'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#1e2a22] mt-0.5">
                    {activeAddress}
                  </p>
                </div>

                {activeVillage.mapUrl && (
                  <a
                    href={activeVillage.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#e6b64a] hover:bg-[#d9a738] text-[#1e2a22] rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {isEn ? 'Open Google Maps' : 'Mở Google Maps'}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="aspect-[16/10] w-full rounded-md overflow-hidden border border-[#e6eee9] bg-white">
                <iframe
                  key={activeVillage.id}
                  title={`${activeTitle} - Map`}
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5f6d66]">
                <span>
                  {isEn
                    ? `Producer / Unit: ${activeVillage.hostProducerEn}`
                    : `Đơn vị / Cơ sở: ${activeVillage.hostProducer}`}
                </span>
                {activeVillage.secondaryMapUrl && (
                  <a
                    href={activeVillage.secondaryMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#228654] hover:underline"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>
                      {isEn
                        ? activeVillage.secondaryMapLabelEn ?? 'Secondary facility map'
                        : activeVillage.secondaryMapLabel ?? 'Bản đồ cơ sở thứ 2'}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Video Card for Selected Craft Village */}
            <div className="bg-white border border-[#e6eee9] rounded-lg p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[#1e2a22] flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#b7791f]" />
                  <span>
                    {isEn
                      ? 'Craft Village Introduction Video'
                      : 'Video giới thiệu làng nghề'}
                  </span>
                </h3>
                {activeVillage.videos[0] && (
                  <a
                    href={activeVillage.videos[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#228654] hover:underline"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {activeVillage.videos.length > 0 ? (
                <div className="space-y-3">
                  {activeVillage.videos.map((video) => (
                    <div key={video.id} className="space-y-2">
                      <div className="aspect-video w-full rounded-md overflow-hidden border border-[#e6eee9] bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                          title={isEn ? video.titleEn : video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          className="w-full h-full border-0"
                        />
                      </div>
                      <p className="text-xs font-semibold text-[#38473e]">
                        {isEn ? video.titleEn : video.title}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-md p-4 text-xs text-[#5f6d66] space-y-2 leading-relaxed">
                  <p>
                    {isEn
                      ? 'This craft village includes verified press features and map navigation on the left. You can also explore documentary videos from other Phú Thọ craft villages in the gallery below.'
                      : 'Làng nghề này đã có đầy đủ tư liệu báo chí và bản đồ chỉ đường ở cột bên trái. Quý khách có thể xem thêm các phóng sự video làng nghề Phú Thọ tại thư viện bên dưới.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full Craft Village Video & Press Media Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-[#228654]">
              {isEn ? 'Documentary Gallery' : 'Kho tư liệu truyền thông'}
            </div>
            <h2 className="font-display text-2xl font-extrabold text-[#1e2a22] mt-0.5">
              {isEn
                ? 'Phú Thọ Craft Village Videos'
                : 'Thư viện Video giới thiệu Làng nghề Phú Thọ'}
            </h2>
          </div>
          <span className="text-xs text-[#5f6d66]">
            {allVillageVideos.length}{' '}
            {isEn
              ? 'verified documentary & feature clips'
              : 'video tư liệu thực tế các làng nghề'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#e6eee9] rounded-xl p-5 sm:p-6">
          <div className="lg:col-span-7 space-y-3">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black border border-[#e6eee9]">
              <iframe
                key={activeGalleryVideo.id}
                src={`https://www.youtube.com/embed/${activeGalleryVideo.youtubeId}?rel=0`}
                title={
                  isEn
                    ? activeGalleryVideo.titleEn
                    : activeGalleryVideo.title
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-[#228654]">
                  {isEn
                    ? activeGalleryVideo.localityEn
                    : activeGalleryVideo.locality}
                </div>
                <h3 className="font-display text-base sm:text-lg font-extrabold text-[#1e2a22]">
                  {isEn
                    ? activeGalleryVideo.titleEn
                    : activeGalleryVideo.title}
                </h3>
              </div>
              <a
                href={activeGalleryVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#f7fbf8] hover:bg-[#e8f5ee] text-[#228654] border border-[#228654]/25 rounded-md"
              >
                <span>{isEn ? 'Watch on YouTube' : 'Mở trên YouTube'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {allVillageVideos.map((vid) => {
              const active = vid.id === activeGalleryVideo.id;
              return (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => {
                    setSelectedGalleryVideoKey(vid.id);
                    setActiveVillageId(vid.villageId);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                    active
                      ? 'bg-[#f7fbf8] border-[#228654] ring-1 ring-[#228654]/25'
                      : 'bg-white border-[#e6eee9] hover:border-[#228654]/50'
                  }`}
                >
                  <PlayCircle
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      active ? 'text-[#228654]' : 'text-[#b7791f]'
                    }`}
                  />
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="text-[11px] font-bold text-[#228654]">
                      {isEn ? vid.localityEn : vid.locality}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#1e2a22] leading-snug">
                      {isEn ? vid.titleEn : vid.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Booking Modal */}
      {bookingExp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2a22]/50 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={
            isEn ? 'Book Craft Village Experience' : 'Đặt lịch trải nghiệm làng nghề'
          }
        >
          <div className="w-full max-w-md bg-[#fcfdfc] border border-[#e6eee9] rounded-lg shadow-xl overflow-hidden">
            <div className="px-5 py-4 bg-white border-b border-[#e6eee9] flex items-center justify-between">
              <h3 className="font-display text-lg font-extrabold text-[#1e2a22]">
                {isEn ? 'Book Experience' : 'Đặt lịch trải nghiệm'}
              </h3>
              <button
                type="button"
                onClick={() => setBookingExp(null)}
                aria-label={isEn ? 'Close dialog' : 'Đóng hộp thoại'}
                className="w-8 h-8 inline-flex items-center justify-center rounded-md text-[#5f6d66] hover:bg-[#f3fbf6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {submitted ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#228654]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold text-sm">
                      {isEn
                        ? 'Experience booking request recorded'
                        : 'Đã ghi nhận yêu cầu đặt lịch trải nghiệm'}
                    </span>
                  </div>
                  <div className="bg-white border border-[#e6eee9] rounded-md p-3.5 space-y-1.5 text-xs">
                    <div className="flex justify-between gap-2">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Visitor' : 'Khách tham quan'}
                      </span>
                      <span className="font-semibold text-[#1e2a22]">
                        {visitorName}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Phone' : 'Số điện thoại'}
                      </span>
                      <span className="font-mono font-semibold text-[#228654] tabular-nums">
                        {visitorPhone}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#5f6d66]">
                        {isEn ? 'Preferred date' : 'Ngày dự kiến'}
                      </span>
                      <span className="font-mono text-[#1e2a22] tabular-nums">
                        {visitorDate}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#38473e] leading-relaxed">
                    {isEn ? (
                      <>
                        Your experience request for{' '}
                        <strong>{bookingExp.titleEn}</strong> has been recorded
                        in this session. To confirm your visit schedule, please
                        contact <strong>{bookingExp.hostProducerEn}</strong>{' '}
                        directly.
                      </>
                    ) : (
                      <>
                        Yêu cầu đặt lịch trải nghiệm tại{' '}
                        <strong>{bookingExp.title}</strong> đã được ghi nhận
                        trong phiên. Để xác nhận lịch đón tiếp cụ thể, vui lòng
                        liên hệ trực tiếp với{' '}
                        <strong>{bookingExp.hostProducer}</strong>.
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingExp(null)}
                    className="w-full py-2.5 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md cursor-pointer"
                  >
                    {isEn ? 'Close' : 'Đóng'}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="text-xs text-[#5f6d66] leading-relaxed">
                    {isEn ? 'Craft Village:' : 'Làng nghề / Điểm đến:'}{' '}
                    <strong className="text-[#1e2a22]">
                      {isEn ? bookingExp.titleEn : bookingExp.title}
                    </strong>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn ? 'Visitor full name' : 'Họ tên khách tham quan'}
                    </label>
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder={isEn ? 'e.g. Le Minh' : 'Ví dụ: Lê Minh'}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn ? 'Customer phone number' : 'Số điện thoại khách hàng'}
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      required
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder={isEn ? 'e.g. 0388 195 865' : 'Ví dụ: 0388 195 865'}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                      {isEn
                        ? 'Preferred experience date'
                        : 'Ngày dự kiến trải nghiệm'}
                    </label>
                    <input
                      type="date"
                      required
                      value={visitorDate}
                      onChange={(e) => setVisitorDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                    />
                  </div>

                  <p className="text-[11px] font-medium text-[#b7791f] leading-relaxed">
                    {isEn
                      ? bookingExp.scheduleDisclaimerEn
                      : bookingExp.scheduleDisclaimer}
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md cursor-pointer"
                  >
                    {isEn
                      ? 'Confirm experience booking'
                      : 'Xác nhận đặt lịch trải nghiệm'}
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
