export type Language = 'vi' | 'en';

export type PageView =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'gift-builder'
  | 'stories'
  | 'experiences';

export type ProductCategory =
  | 'Nhóm 1 – Trà và đồ uống'
  | 'Nhóm 2 – Đặc sản khô, đồ ăn vặt và nông sản chế biến'
  | 'Nhóm 3 – Gia vị, mật ong và thực phẩm địa phương';

export type GiftPreferenceKey = 'tra-do-uong' | 'dac-san-kho' | 'gia-vi-mat-ong';

export type GiftOccasion =
  | 'Biếu gia đình'
  | 'Đối tác'
  | 'Lễ Tết'
  | 'Sinh nhật'
  | 'Khác';

export type PhuThoLocality =
  | 'Thanh Ba'
  | 'Tân Sơn'
  | 'Việt Trì'
  | 'Thanh Sơn'
  | 'Tam Nông'
  | 'Cẩm Khê'
  | 'Đoan Hùng';

export interface ProducerVisitInfo {
  verified: boolean;
  acceptsVisitors: boolean | null;
  confirmedHours?: string;
  confirmedDays?: string;
  activities?: string[];
  activitiesEn?: string[];
  mapGuide?: string;
  mapGuideEn?: string;
  contactMethod: string;
  contactMethodEn: string;
}

export interface ProductLink {
  label: string;
  labelEn: string;
  url: string;
}

export interface ProductGalleryImage {
  url: string;
  alt: string;
  altEn: string;
  caption?: string;
  captionEn?: string;
  source?: string;
}

export interface ProducerInfo {
  id: string;
  name: string | null;
  locality: string | null;
  localityEn?: string | null;
  address: string | null;
  addressEn?: string | null;
  mapUrl?: string | null;
  contactNote: string;
  contactNoteEn: string;
  visitInfo: ProducerVisitInfo;
}

export interface Product {
  id: string;
  orderNumber: number;
  name: string;
  nameEn: string;
  category: ProductCategory;
  price: number | null;
  priceRange?: string | null;
  priceRangeEn?: string | null;
  unit: string | null;
  unitEn?: string | null;
  weight: string | null;
  weightEn?: string | null;
  locality: string | null;
  ingredients: string | null;
  ingredientsEn?: string | null;
  shelfLife?: string | null;
  shelfLifeEn?: string | null;
  ocopTierSample: string | null;
  ocopTierSampleEn?: string | null;
  image: string | null;
  imageAlt?: string;
  imageAltEn?: string;
  imageCaption: string;
  imageCaptionEn: string;
  imageSource?: string | null;
  secondaryImage?: string | null;
  secondaryImageAlt?: string | null;
  secondaryImageAltEn?: string | null;
  secondaryImageCaption?: string | null;
  secondaryImageCaptionEn?: string | null;
  secondaryImageSource?: string | null;
  galleryImages?: ProductGalleryImage[];
  isVerifiedProductPhoto: boolean;
  shortDescription: string;
  shortDescriptionEn: string;
  story: string | null;
  storyEn: string | null;
  originNote: string | null;
  originNoteEn?: string | null;
  culturalNote: string | null;
  culturalNoteEn: string | null;
  processSteps: string[];
  processStepsEn?: string[];
  articleLinks?: ProductLink[];
  videoUrl?: string | null;
  mapUrl?: string | null;
  traceabilityUrl?: string | null;
  storyUrl?: string | null;
  preferenceTags: GiftPreferenceKey[];
  producer: ProducerInfo;
  stock: number | null;
  lowStockThreshold: number | null;
}

export interface GiftBoxSelectionItem {
  product: Product;
  quantity: number;
}

export interface HeroBannerSlide {
  id: string;
  image: string;
  alt: string;
  altEn: string;
  caption: string;
  captionEn: string;
  kicker: string;
  kickerEn: string;
  title: string;
  titleEn: string;
  regionLabel: string;
  regionLabelEn: string;
  subtitle: string;
  subtitleEn: string;
  primaryCtaLabel: string;
  primaryCtaLabelEn: string;
  primaryTarget: PageView;
  secondaryCtaLabel: string;
  secondaryCtaLabelEn: string;
  secondaryTarget: PageView;
}

export interface FeaturedGiftBox {
  id: string;
  name: string;
  nameEn: string;
  occasion: GiftOccasion;
  description: string;
  descriptionEn: string;
  image: string;
  productIds: string[];
  packagingNote: string;
  packagingNoteEn: string;
}

export interface CraftStory {
  id: string;
  title: string;
  titleEn: string;
  locality: string;
  localityEn: string;
  category: ProductCategory;
  image: string;
  excerpt: string;
  excerptEn: string;
  content: string[];
  contentEn: string[];
  artisanName: string;
  artisanNameEn: string;
}

export interface CraftVillageVideo {
  id: string;
  title: string;
  titleEn: string;
  youtubeId: string;
  url: string;
  durationNote?: string;
}

export interface CraftExperience {
  id: string;
  title: string;
  titleEn: string;
  locality: string;
  localityEn: string;
  districtTag: string;
  districtTagEn: string;
  durationSample: string;
  durationSampleEn: string;
  groupSizeSample: string;
  groupSizeSampleEn: string;
  image: string;
  summary: string;
  summaryEn: string;
  highlights: string[];
  highlightsEn: string[];
  scheduleDisclaimer: string;
  scheduleDisclaimerEn: string;
  hostProducer: string;
  hostProducerEn: string;
  visitorVerified?: boolean;
  address: string;
  addressEn: string;
  mapUrl: string | null;
  mapQuery: string;
  secondaryMapUrl?: string | null;
  secondaryMapLabel?: string;
  secondaryMapLabelEn?: string;
  traceabilityUrl?: string | null;
  videos: CraftVillageVideo[];
  articles: ProductLink[];
  relatedProductIds: string[];
}

export interface CartItem {
  cartKey: string;
  type: 'product' | 'custom-box';
  productId?: string;
  name: string;
  unitPrice: number | null;
  quantity: number;
  image: string | null;
  subtitle: string;
  includedItems?: {
    productId?: string;
    name: string;
    price: number | null;
    priceRange?: string;
    quantity?: number;
  }[];
  giftNote?: string;
  giftBoxMeta?: {
    isAiDesigned: boolean;
    occasion: GiftOccasion;
    recipient: string;
    message: string;
  };
}

export type OrderStatus =
  | 'Hoàn thành'
  | 'Đang xử lý'
  | 'Chờ xác nhận'
  | 'Đã hủy';

export interface SampleOrder {
  id: string;
  date: string;
  customerName: string;
  customerNameEn: string;
  itemsSummary: string;
  itemsSummaryEn: string;
  productIds?: string[];
  amount: number;
  status: OrderStatus;
  timeframeTag: '7d' | '30d' | 'quarter' | 'year';
}

export type DashboardTimeframe = '7d' | '30d' | 'quarter' | 'year';

export type TrendGranularity = 'day' | 'month' | 'season';

export interface MonthlyRevenuePoint {
  label: string;
  labelEn: string;
  revenue: number;
  orders: number;
}

export interface ProductBiMetric {
  productId: string;
  views: number;
  searches: number;
  addToCart: number;
  purchases: number;
  unitsSold: number;
  avgRating: number;
  reviewCount: number;
}

export interface FeedbackThemeSample {
  id: string;
  theme: string;
  themeEn: string;
  category: ProductCategory | 'Tất cả';
  mentionsCount: number;
  sentiment: 'Tích cực' | 'Cần lưu ý';
  sampleQuote: string;
  sampleQuoteEn: string;
}

export interface ComboPerformanceSample {
  id: string;
  name: string;
  nameEn: string;
  typeLabel: 'Combo / Box quà' | 'Bán lẻ đơn sản phẩm';
  price: number;
  conversionRatePct: number;
  ordersCount: number;
  note: string;
  noteEn: string;
}

export interface StockMovementRecord {
  id: string;
  date: string;
  productId: string;
  productName: string;
  productNameEn: string;
  changeType: 'Nhập kho mẫu' | 'Xuất bán mẫu' | 'Điều chỉnh phiên';
  delta: number;
  note: string;
  noteEn: string;
}

export interface AiBusinessRecommendation {
  id: string;
  dataSource: string;
  dataSourceEn: string;
  period: string;
  periodEn: string;
  finding: string;
  findingEn: string;
  suggestedAction: string;
  suggestedActionEn: string;
  confidenceLabel: string;
  confidenceLabelEn: string;
  targetSection: 'overview' | 'funnel' | 'inventory' | 'combos' | 'reviews';
  targetLabel: string;
  targetLabelEn: string;
  relatedProductId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
