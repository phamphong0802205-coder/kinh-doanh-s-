import {
  AiBusinessRecommendation,
  ComboPerformanceSample,
  CraftExperience,
  CraftStory,
  DashboardTimeframe,
  FeaturedGiftBox,
  FeedbackThemeSample,
  GiftOccasion,
  GiftPreferenceKey,
  HeroBannerSlide,
  Language,
  MonthlyRevenuePoint,
  ProducerInfo,
  Product,
  ProductBiMetric,
  ProductCategory,
  ProductGalleryImage,
  ProductLink,
  SampleOrder,
  StockMovementRecord,
  TrendGranularity,
} from '../types/ocop';

export const IMAGE_ASSETS = {
  heroTeaHills:
    'https://dulichphutho.gov.vn/content-uploads/2025/02/suong-von-may-tren-doi-che-long-coc-637088005546655912.jpg',
  longCoc:
    'https://dulichphutho.gov.vn/content-uploads/2026/10/longcoc1.jpg',
  traPhuTho:
    'https://dulichphutho.gov.vn/content-uploads/2025/02/nuoc-uong-che-xanh-phu-tho-dam-da-huong-vi-trung-du-637602300638496452-1.jpg',
  miGaoHungLo1:
    'https://dulichphutho.gov.vn/content-uploads/2025/02/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang-636803814284334606-1.jpg',
  tuongLangBo1:
    'https://dulichphutho.gov.vn/content-uploads/2025/02/tuong-lang-bo-dac-san-truyen-thong-nguoi-dan-viet-636381678903842476.jpg',
  tuongLangBo2:
    'https://dulichphutho.gov.vn/content-uploads/2025/02/tuong-lang-bo-dac-san-nuc-tieng-vung-que-thanh-thuy-637632352926103914.jpg',
  thitChua1:
    'https://dulichphutho.gov.vn/content-uploads/2025/02/dac-san-thit-chua-thanh-son-mon-qua-ngon-tu-vung-dat-to-636760792765918913-1.jpg',
  giftBox:
    '/assets/aistudio/1794840176455_2889134475748660333_2889134475748660333_2856c860e311f258f9096b9004d8ba1e_442cc781.jpg',
  giftBoxBanner:
    '/assets/aistudio/1794840176455_2889134475748660333_2889134475748660333_2856c860e311f258f9096b9004d8ba1e_442cc781.jpg',
  giftBoxTraDatTo:
    '/assets/aistudio/1794896047313_2889134475748660333_2889134475748660333_bf57030f04f50d9bea023f484af217dc_948a1abc.jpg',
  giftBoxNongSan:
    '/assets/aistudio/1794896047297_2889134475748660333_2889134475748660333_adade189cb39e6d9551a8f25964b338c_c70bf8d4.jpg',
  giftBoxViQue:
    '/assets/aistudio/1794895831273_2889134475748660333_2889134475748660333_8d5ebcc07e8bbb41c233705f9c8a1497_c053a2de.jpg',
  giftBoxNgotLanh:
    '/assets/aistudio/1794896047278_2889134475748660333_2889134475748660333_f4cfd66e51e7131fdeb3cf15d3b9c4d1_1d1e942b.jpg',
  giftBoxCaoCap:
    '/assets/aistudio/1794895733338_2889134475748660333_2889134475748660333_4684b9ee21a80f3d79c5fd91d555fc1b_33d1611e.jpg',
  hungLoVillage:
    'https://dulichphutho.gov.vn/content-uploads/2026/01/Lang-co-Hung-Lo.jpg',
  zaloQrStaff: '/assets/aistudio/image_8d08f582.png',
};

export const CATEGORY_1: ProductCategory = 'Nhóm 1 – Trà và đồ uống';
export const CATEGORY_2: ProductCategory =
  'Nhóm 2 – Đặc sản khô, đồ ăn vặt và nông sản chế biến';
export const CATEGORY_3: ProductCategory =
  'Nhóm 3 – Gia vị, mật ong và thực phẩm địa phương';

export const CATEGORY_LABEL_EN: Record<ProductCategory, string> = {
  'Nhóm 1 – Trà và đồ uống': 'Group 1 – Tea & Beverages',
  'Nhóm 2 – Đặc sản khô, đồ ăn vặt và nông sản chế biến':
    'Group 2 – Dried Specialties, Snacks & Processed Produce',
  'Nhóm 3 – Gia vị, mật ong và thực phẩm địa phương':
    'Group 3 – Spices, Honey & Local Foods',
};

export function getCategoryLabel(
  category: ProductCategory | 'Tất cả',
  language: Language = 'vi',
): string {
  if (category === 'Tất cả') {
    return language === 'en' ? 'All' : 'Tất cả';
  }
  return language === 'en' ? CATEGORY_LABEL_EN[category] : category;
}

export const OCCASION_LABEL_EN: Record<GiftOccasion, string> = {
  'Biếu gia đình': 'Family Gift',
  'Đối tác': 'Business Partner',
  'Lễ Tết': 'Festive & Tet',
  'Sinh nhật': 'Birthday',
  Khác: 'Other',
};

export function getOccasionLabel(
  occasion: GiftOccasion,
  language: Language = 'vi',
): string {
  return language === 'en' ? OCCASION_LABEL_EN[occasion] : occasion;
}

export function getProductName(
  product: Pick<Product, 'name' | 'nameEn'>,
  language: Language = 'vi',
): string {
  return language === 'en' ? product.nameEn : product.name;
}

export function getProductPriceDisplay(
  product: Pick<Product, 'price' | 'priceRange' | 'priceRangeEn'>,
  language: Language = 'vi',
): string {
  if (typeof product.price === 'number' && Number.isFinite(product.price)) {
    return formatVnd(product.price, language);
  }
  if (product.priceRange) {
    return language === 'en'
      ? product.priceRangeEn ?? product.priceRange
      : product.priceRange;
  }
  return language === 'en' ? 'Updating' : 'Đang cập nhật';
}

export const GIFT_OCCASIONS: GiftOccasion[] = [
  'Biếu gia đình',
  'Đối tác',
  'Lễ Tết',
  'Sinh nhật',
  'Khác',
];

interface RawCatalogEntry {
  orderNumber: number;
  id: string;
  name: string;
  nameEn: string;
  category: ProductCategory;
  price?: number | null;
  priceRange?: string | null;
  priceRangeEn?: string | null;
  unit?: string | null;
  unitEn?: string | null;
  weight?: string | null;
  weightEn?: string | null;
  locality?: string | null;
  ingredients?: string | null;
  ingredientsEn?: string | null;
  shelfLife?: string | null;
  shelfLifeEn?: string | null;
  ocopTierSample?: string | null;
  ocopTierSampleEn?: string | null;
  image: string | null;
  imageAlt: string;
  imageAltEn: string;
  imageCaption: string;
  imageCaptionEn: string;
  imageSource: string | null;
  secondaryImage?: string | null;
  secondaryImageAlt?: string | null;
  secondaryImageAltEn?: string | null;
  secondaryImageCaption?: string | null;
  secondaryImageCaptionEn?: string | null;
  secondaryImageSource?: string | null;
  galleryImages?: ProductGalleryImage[];
  isVerifiedProductPhoto: boolean;
  preferenceTags: GiftPreferenceKey[];
  shortDescription: string;
  shortDescriptionEn: string;
  story?: string | null;
  storyEn?: string | null;
  originNote?: string | null;
  originNoteEn?: string | null;
  culturalNote?: string | null;
  culturalNoteEn?: string | null;
  processSteps?: string[];
  processStepsEn?: string[];
  articleLinks?: ProductLink[];
  videoUrl?: string | null;
  mapUrl?: string | null;
  traceabilityUrl?: string | null;
  storyUrl?: string | null;
  producer?: Partial<ProducerInfo>;
}

const RAW_CATALOG: RawCatalogEntry[] = [
  // ==========================================================
  // Nhóm 1 – Trà và đồ uống (1 - 10)
  // ==========================================================
  {
    orderNumber: 1,
    id: 'che-bup-tim-thanh-ba',
    name: 'Chè búp tím Thanh Ba',
    nameEn: 'Thanh Ba Purple Bud Tea',
    category: CATEGORY_1,
    price: 300000,
    unit: 'hộp 150g',
    unitEn: '150g box',
    weight: '150g',
    weightEn: '150g (gift box)',
    locality: 'Thanh Ba',
    ingredients: '100% búp chè tím cổ Thanh Ba sao sấy truyền thống',
    ingredientsEn: '100% Thanh Ba heirloom purple tea buds',
    shelfLife: '12 tháng nơi khô ráo, tránh ánh nắng trực tiếp',
    shelfLifeEn: '12 months in a cool, dry place away from sunlight',
    image:
      'https://chebuptim.vn/wp-content/uploads/2025/05/che-bup-tim-thanh-ba-ocop-5-sao.jpg',
    imageAlt:
      'Hộp và túi bao bì Chè Búp Tím Thanh Ba cùng cánh chè khô tại website chính thức chebuptim.vn',
    imageAltEn:
      'Official packaging box, pouch, and dry leaves of Thanh Ba Purple Bud Tea from chebuptim.vn',
    imageCaption: 'Ảnh sản phẩm & bao bì chính thức Chè búp tím Thanh Ba (chebuptim.vn)',
    imageCaptionEn: 'Official product & packaging photo of Thanh Ba Purple Bud Tea (chebuptim.vn)',
    imageSource: 'https://chebuptim.vn/',
    secondaryImage: 'https://i.baophutho.vn/news/2340/108d2142709t3359l1-06.webp',
    secondaryImageAlt: 'Sản phẩm Chè búp tím Thanh Ba trên Báo Phú Thọ',
    secondaryImageAltEn: 'Thanh Ba Purple Bud Tea product photo from Bao Phu Tho',
    secondaryImageCaption: 'Hình ảnh Chè búp tím Thanh Ba (baophutho.vn)',
    secondaryImageCaptionEn: 'Thanh Ba Purple Bud Tea showcase photo (baophutho.vn)',
    secondaryImageSource: 'https://baophutho.vn/',
    galleryImages: [
      {
        url: 'https://chebuptim.vn/wp-content/uploads/2025/05/che-bup-tim-thanh-ba-ocop-5-sao.jpg',
        alt: 'Hộp và túi bao bì Chè Búp Tím Thanh Ba tại chebuptim.vn',
        altEn: 'Official box and pouch of Thanh Ba Purple Bud Tea from chebuptim.vn',
        caption: 'Bao bì hộp Chè búp tím Thanh Ba (chebuptim.vn)',
        captionEn: 'Box packaging of Thanh Ba Purple Bud Tea (chebuptim.vn)',
        source: 'https://chebuptim.vn/',
      },
      {
        url: 'https://i.baophutho.vn/news/2340/108d2142709t3359l1-06.webp',
        alt: 'Ảnh sản phẩm Chè búp tím Thanh Ba đăng tải trên Báo Phú Thọ',
        altEn: 'Thanh Ba Purple Bud Tea featured on Bao Phu Tho',
        caption: 'Ảnh sản phẩm Chè búp tím Thanh Ba (i.baophutho.vn)',
        captionEn: 'Thanh Ba Purple Bud Tea product photo (i.baophutho.vn)',
        source: 'https://baophutho.vn/',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Giống chè cổ quý hiếm tại vùng trung du Thanh Ba với búp và cuống lá non màu tím đặc trưng, canh tác theo hướng hữu cơ và kết hợp sao sấy thủ công.',
    shortDescriptionEn:
      'Rare heirloom tea cultivar from Thanh Ba midlands featuring signature purple buds and stems, grown organically with artisanal roasting.',
    story:
      'Chè búp tím Thanh Ba là giống chè cổ có từ lâu đời tại vùng trung du Phú Thọ, nổi bật với búp và cuống lá non mang sắc tím đặc trưng. Trước nguy cơ mai một vì năng suất thấp, bà Lê Thị Hồng Phương – Giám đốc Công ty TNHH Đầu tư và Phát triển Trà UT – đã kiên trì quy hoạch vùng nguyên liệu liên kết (đạt 17 ha vào năm 2023), ứng dụng canh tác hướng hữu cơ cùng phân bón hữu cơ, chế phẩm sinh học và đầu tư thiết bị kết hợp sao sấy thủ công. Sản phẩm vừa bảo tồn nguồn gen quý bản địa, vừa tạo sinh kế ổn định cho người dân địa phương, đặc biệt là lao động nữ.',
    storyEn:
      'Thanh Ba Purple Bud Tea is an ancient Phú Thọ midland cultivar prized for its distinctive purple young buds and stems. Facing decline due to lower yields, Ms. Lê Thị Hồng Phương—Director of Trà UT Investment & Development Co., Ltd.—spearheaded a conservation initiative establishing 17 ha of partner tea gardens by 2023 using organic-oriented cultivation, bio-fertilizers, and blended machinery with traditional hand-roasting, creating steady rural employment especially for local women.',
    originNote:
      'Vùng nguyên liệu liên kết dài hạn tại huyện Thanh Ba, tỉnh Phú Thọ (17 ha ghi nhận năm 2023), canh tác theo hướng hữu cơ.',
    originNoteEn:
      'Long-term partnered cultivation zone in Thanh Ba District, Phú Thọ (17 ha recorded in 2023) following organic-oriented farming.',
    culturalNote:
      'Mang câu chuyện bảo tồn nguồn gen chè bản địa quý hiếm của vùng Đất Tổ và phát huy tài nguyên nông nghiệp gắn với lao động nữ địa phương.',
    culturalNoteEn:
      'Embodies heritage conservation of rare native tea genetics in Phú Thọ alongside women-led rural livelihoods.',
    articleLinks: [
      {
        label: 'Chè búp tím Thanh Ba – Du lịch Phú Thọ',
        labelEn: 'Thanh Ba Purple Bud Tea – Phu Tho Tourism Portal',
        url: 'https://dulichphutho.gov.vn/che-bup-tim-thanh-ba.html',
      },
      {
        label: 'Tham khảo sản phẩm hộp 150g (Đường Châu)',
        labelEn: '150g Box Reference (Duong Chau)',
        url: 'https://duongchau.com.vn/product/che-bup-tim-thanh-ba-hop-150g/',
      },
    ],
    videoUrl: 'https://youtu.be/Fe0j6Ktun3U?si=Wlpj0f-ywlBfxl6V',
    mapUrl: 'https://maps.app.goo.gl/dtngdnVVoSyujRSV7',
    storyUrl:
      'https://sokhoahoccongnghe.phutho.gov.vn/images/newsletters/2024/05/09/ruot-khcn-1-2024-828.pdf',
    producer: {
      id: 'producer-che-bup-tim-thanh-ba',
      name: 'Công ty TNHH Đầu tư và Phát triển Trà UT',
      locality: 'Thanh Ba',
      localityEn: 'Thanh Ba',
      address: 'Huyện Thanh Ba, tỉnh Phú Thọ (xem chỉ đường trên Google Maps)',
      addressEn: 'Thanh Ba District, Phú Thọ Province (view on Google Maps)',
      mapUrl: 'https://maps.app.goo.gl/dtngdnVVoSyujRSV7',
      contactNote:
        'Giám đốc Lê Thị Hồng Phương. Vui lòng xem vị trí trên bản đồ hoặc liên hệ trước khi đến tham quan.',
      contactNoteEn:
        'Director: Ms. Lê Thị Hồng Phương. View map pin or contact producer prior to visiting.',
    },
  },
  {
    orderNumber: 2,
    id: 'tra-dinh-cao-cap-hoai-trung',
    name: 'Trà Đinh cao cấp Hoài Trung',
    nameEn: 'Hoai Trung Premium Dinh Tea',
    category: CATEGORY_1,
    price: 350000,
    priceRange: '150.000đ – 600.000đ',
    priceRangeEn: '150,000 – 600,000 VND',
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g (dải đóng gói 100g – 500g)',
    weightEn: '200g (available 100g – 500g)',
    locality: 'Thanh Ba',
    ingredients: '100% búp chè đinh non tuyển chọn theo tiêu chuẩn VietGAP',
    ingredientsEn: '100% hand-picked tender VietGAP dinh tea buds',
    shelfLife: '18 tháng trong bao bì kín, nơi khô thoáng',
    shelfLifeEn: '18 months sealed in a dry, cool place',
    ocopTierSample: 'OCOP 5 sao cấp quốc gia (2023)',
    ocopTierSampleEn: 'National 5-Star OCOP (2023)',
    image:
      'https://hoaitrungtea.com/wp-content/uploads/2017/11/M%E1%BB%9Bi-%C4%90inh-600x362.jpg',
    imageAlt:
      'Hộp quà và gói Trà Đinh cao cấp Hoài Trung chụp thực tế trên trang chủ hoaitrungtea.com',
    imageAltEn:
      'Gift box and pouches of Hoai Trung Premium Dinh Tea photographed on hoaitrungtea.com',
    imageCaption: 'Ảnh sản phẩm & bao bì chính thức Trà Đinh cao cấp Hoài Trung (hoaitrungtea.com)',
    imageCaptionEn: 'Official product & packaging photo of Hoai Trung Premium Dinh Tea (hoaitrungtea.com)',
    imageSource: 'https://hoaitrungtea.com/',
    secondaryImage:
      'https://image.vietnamnews.vn/uploadvnnews/Article/2023/10/13/310537_4664413797734963_pack.jpg',
    secondaryImageAlt:
      'Dây chuyền đóng gói sản phẩm Trà Đinh cao cấp Hoài Trung đạt OCOP 5 sao',
    secondaryImageAltEn:
      'Packaging line for National 5-Star OCOP Hoai Trung Premium Dinh Tea',
    secondaryImageCaption:
      'Ảnh sản xuất & đóng gói Trà Đinh Hoài Trung (vietnamnews.vn)',
    secondaryImageCaptionEn:
      'Production & packaging at Hoai Trung Tea (vietnamnews.vn)',
    secondaryImageSource:
      'https://baotintuc.vn/san-pham-ocop-5-sao-cap-quoc-gia-dau-tien-cua-tinh-phu-tho-post717384.html',
    galleryImages: [
      {
        url: 'https://hoaitrungtea.com/wp-content/uploads/2017/11/M%E1%BB%9Bi-%C4%90inh-600x362.jpg',
        alt: 'Hộp quà Trà Đinh cao cấp Hoài Trung trên hoaitrungtea.com',
        altEn: 'Hoai Trung Premium Dinh Tea gift box on hoaitrungtea.com',
        caption: 'Hộp quà Trà Đinh cao cấp Hoài Trung (hoaitrungtea.com)',
        captionEn: 'Hoai Trung Premium Dinh Tea gift packaging (hoaitrungtea.com)',
        source: 'https://hoaitrungtea.com/',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3rKaZ6ghQhZNP5adT43bnpwPeHTzYukt9a4EC_j4SQ&s=10',
        alt: 'Sản phẩm Trà Đinh cao cấp Hoài Trung',
        altEn: 'Hoai Trung Premium Dinh Tea product shot',
        caption: 'Hình ảnh sản phẩm Trà Đinh Hoài Trung',
        captionEn: 'Hoai Trung Dinh Tea product image',
      },
      {
        url: 'https://image.vietnamnews.vn/uploadvnnews/Article/2023/10/13/310537_4664413797734963_pack.jpg',
        alt: 'Sản xuất và đóng gói Trà Đinh Hoài Trung',
        altEn: 'Tea processing and packing at Hoai Trung facility',
        caption: 'Ảnh sản xuất Trà Đinh Hoài Trung (vietnamnews.vn)',
        captionEn: 'Hoai Trung Tea production line (vietnamnews.vn)',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Sản phẩm OCOP 5 sao cấp quốc gia đầu tiên của tỉnh Phú Thọ (2023), tuyển chọn búp chè non VietGAP, hữu cơ và có thêm quy cách túi lọc tiện dụng.',
    shortDescriptionEn:
      'Phú Thọ’s first National 5-Star OCOP specialty (2023), crafted from VietGAP & organic tender tea buds with artisanal rolling and roasting.',
    story:
      'Trên vùng đất trung du Phú Thọ, bà Bùi Thị Mão – Giám đốc Công ty TNHH Chè Hoài Trung – đã dành hơn 20 năm tìm tòi, học hỏi kinh nghiệm sản xuất chè tại Nhật Bản và Trung Quốc để nâng tầm thương hiệu chè quê hương. Trà Đinh cao cấp Hoài Trung sử dụng những búp chè non tuyển chọn theo chuẩn VietGAP, hữu cơ, trải qua quy trình hong, vò, sao, sấy công phu và cải tiến thành phẩm túi lọc tiện dụng. Năm 2023, sản phẩm được công nhận OCOP 5 sao cấp quốc gia – sản phẩm OCOP 5 sao đầu tiên của tỉnh Phú Thọ – đồng thời tạo việc làm thường xuyên cho khoảng 50 lao động (75% là phụ nữ nông thôn).',
    storyEn:
      'For over 20 years, Ms. Bùi Thị Mão—Director of Hoài Trung Tea Co., Ltd.—studied tea craftsmanship in Japan and China to elevate Phú Thọ tea. Crafted from hand-picked VietGAP and organic buds through meticulous withering, rolling, roasting, and drying (plus modern tea-bag formats), Hoai Trung Premium Dinh Tea earned National 5-Star OCOP status in 2023—the very first in Phú Thọ—supporting steady jobs for roughly 50 workers, 75% of whom are rural women.',
    originNote:
      'Vùng nguyên liệu sản xuất hữu cơ theo tiêu chuẩn VietGAP tại tỉnh Phú Thọ.',
    originNoteEn:
      'Organic-oriented and VietGAP-certified tea raw-material zone in Phú Thọ.',
    culturalNote:
      'Biểu tượng tự hào của ngành chè Đất Tổ khi đạt danh hiệu OCOP 5 sao cấp quốc gia đầu tiên của tỉnh năm 2023.',
    culturalNoteEn:
      'A proud milestone as Phú Thọ Province’s very first National 5-Star OCOP product in 2023.',
    processSteps: [
      'Tuyển chọn búp chè non đạt chuẩn VietGAP / hướng hữu cơ.',
      'Trải qua công đoạn hong, vò, sao và sấy công phu giữ trọn hương trà.',
      'Hoàn thiện đóng gói hộp quà truyền thống hoặc cắt nhỏ đóng túi lọc tiện dụng.',
    ],
    processStepsEn: [
      'Select tender tea buds harvested from VietGAP / organic-oriented gardens.',
      'Process carefully through withering, rolling, pan-roasting, and drying.',
      'Pack into luxury gift tins/boxes or convenient tea-bag sachets.',
    ],
    articleLinks: [
      {
        label: 'Sản phẩm OCOP 5 sao cấp quốc gia đầu tiên của tỉnh Phú Thọ (Báo Tin Tức)',
        labelEn: 'Phú Thọ’s First National 5-Star OCOP Product (VietnamNews/Baotintuc)',
        url: 'https://baotintuc.vn/san-pham-ocop-5-sao-cap-quoc-gia-dau-tien-cua-tinh-phu-tho-post717384.html',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/L7zk5Z8zYL8J1hTL9',
    storyUrl:
      'https://phutho.dcs.vn/AllUpload/FCKUploads/0f5b119c-00f9-4acc-9790-902aaa07daf0/NTM%20Phu%20Tho%202025_compressed.pdf',
    producer: {
      id: 'producer-tra-dinh-hoai-trung',
      name: 'Công ty TNHH Chè Hoài Trung',
      locality: 'Thanh Ba',
      localityEn: 'Thanh Ba',
      address: 'Tỉnh Phú Thọ (xem chỉ đường trên Google Maps)',
      addressEn: 'Phú Thọ Province (view on Google Maps)',
      mapUrl: 'https://maps.app.goo.gl/L7zk5Z8zYL8J1hTL9',
      contactNote:
        'Giám đốc Bùi Thị Mão. Giá niêm yết từ 150.000đ đến 600.000đ tùy quy cách hộp/túi.',
      contactNoteEn:
        'Director: Ms. Bùi Thị Mão. Listed prices range from 150,000 to 600,000 VND depending on pack format.',
    },
  },
  {
    orderNumber: 3,
    id: 'che-long-coc',
    name: 'Chè Long Cốc',
    nameEn: 'Long Coc Tea',
    category: CATEGORY_1,
    price: 130000,
    unit: 'gói 200g',
    unitEn: '200g pouch',
    weight: '200g',
    weightEn: '200g (vacuum pouch)',
    locality: 'Tân Sơn',
    ingredients: '100% búp chè xanh vùng đồi Long Cốc, Tân Sơn',
    ingredientsEn: '100% green tea buds from Long Coc hills, Tan Son',
    shelfLife: '12 tháng kể từ ngày đóng gói, bảo quản kín khí',
    shelfLifeEn: '12 months from packing date in airtight storage',
    ocopTierSample: 'OCOP 4 sao (Chè Bát Tiên Long Cốc)',
    ocopTierSampleEn: '4-Star OCOP (Long Coc Bat Tien Tea)',
    image:
      'https://hoinongdan.phutho.gov.vn/images/upload/images/image-20241218110340-2.jpeg',
    imageAlt:
      'Hộp và túi hút chân không Chè Long Cốc đăng tải trên Cổng Hội Nông dân tỉnh Phú Thọ',
    imageAltEn:
      'Box and vacuum-sealed bags of Long Coc Tea featured on the Phú Thọ Farmers Association portal',
    imageCaption: 'Ảnh hộp sản phẩm Chè Long Cốc (hoinongdan.phutho.gov.vn)',
    imageCaptionEn: 'Official product box photo of Long Coc Tea (hoinongdan.phutho.gov.vn)',
    imageSource:
      'https://hoinongdan.phutho.gov.vn/blog/xa-long-coc-huyen-tan-son-phat-trien-thuong-hieu-che.html',
    secondaryImage:
      'https://hoinongdan.phutho.gov.vn/images/upload/images/image-20241218110340-1.jpeg',
    secondaryImageAlt:
      'Người dân vùng chè Long Cốc thu hái búp chè tại đồi chè Tân Sơn, Phú Thọ',
    secondaryImageAltEn:
      'Local tea growers harvesting fresh buds on Long Coc tea hills in Tan Son, Phú Thọ',
    secondaryImageCaption:
      'Vùng nguyên liệu thu hái chè Long Cốc, Phú Thọ (hoinongdan.phutho.gov.vn)',
    secondaryImageCaptionEn:
      'Long Coc tea harvesting area in Phú Thọ (hoinongdan.phutho.gov.vn)',
    secondaryImageSource:
      'https://hoinongdan.phutho.gov.vn/blog/xa-long-coc-huyen-tan-son-phat-trien-thuong-hieu-che.html',
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Đặc sản chè vùng đồi bát úp Long Cốc (Tân Sơn), đóng gói hút chân không 200g giữ trọn hương thơm chè trung du gắn với cảnh quan du lịch.',
    shortDescriptionEn:
      'Mountain tea specialty from Long Coc’s iconic bowl-shaped tea hills (Tan Son), vacuum-packed in 200g pouches by local cooperative growers.',
    story:
      'Ẩn hiện giữa những quả đồi bát úp xanh mướt của huyện Tân Sơn, xã Long Cốc từ lâu nổi danh với nghề trồng chè truyền thống tạo sinh kế bền vững cho đồng bào địa phương. Theo tư liệu Cổng Hội Nông dân tỉnh Phú Thọ, người dân Long Cốc đã tổ chức sản xuất theo vùng nguyên liệu tập trung cùng HTX Sản xuất Chè an toàn Long Cốc, hoàn thiện bao bì hút chân không 200g và hộp quà nhận diện thương hiệu gắn với cảnh quan đồi chè du lịch.',
    storyEn:
      'Nestled among the mist-draped bowl-shaped hills of Tan Son District, Long Coc Commune has long sustained local farming families through traditional tea cultivation. Together with Long Coc Safe Tea Production Cooperative, growers have unified cultivation zones, vacuum-sealed 200g pouches, and gift boxes linked with hillside eco-tourism.',
    originNote:
      'Vùng đồi chè xã Long Cốc, huyện Tân Sơn, tỉnh Phú Thọ.',
    originNoteEn:
      'Long Coc Commune tea hills, Tan Son District, Phú Thọ Province.',
    culturalNote:
      'Gắn với danh thắng Đồi chè Long Cốc – biểu tượng nông nghiệp gắn du lịch sinh thái vùng trung du miền núi Tân Sơn.',
    culturalNoteEn:
      'Associated with the famed Long Coc Tea Hills, a signature midland agricultural-tourism landmark of Tan Son.',
    articleLinks: [
      {
        label: 'Xã Long Cốc phát triển thương hiệu chè (Hội Nông dân Phú Thọ)',
        labelEn: 'Long Coc Commune Developing Its Tea Brand (Phu Tho Farmers Portal)',
        url: 'https://hoinongdan.phutho.gov.vn/blog/xa-long-coc-huyen-tan-son-phat-trien-thuong-hieu-che.html',
      },
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Doi+che+Long+Coc+Tan+Son+Phu+Tho',
    storyUrl:
      'https://hoinongdan.phutho.gov.vn/blog/xa-long-coc-huyen-tan-son-phat-trien-thuong-hieu-che.html',
    producer: {
      id: 'producer-che-long-coc',
      name: 'HTX Sản xuất Chè an toàn Long Cốc',
      locality: 'Tân Sơn',
      localityEn: 'Tan Son',
      address: 'Xã Long Cốc, huyện Tân Sơn, tỉnh Phú Thọ',
      addressEn: 'Long Coc Commune, Tan Son District, Phú Thọ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Doi+che+Long+Coc+Tan+Son+Phu+Tho',
      contactNote:
        'HTX Sản xuất Chè an toàn Long Cốc. Liên hệ trước để sắp xếp tham quan đồi chè và xưởng sao chế biến.',
      contactNoteEn:
        'Long Coc Safe Tea Production Cooperative. Contact ahead to arrange tea-hill and processing workshop visits.',
    },
  },
  {
    orderNumber: 4,
    id: 'che-da-hen',
    name: 'Chè Đá Hen',
    nameEn: 'Da Hen Tea',
    category: CATEGORY_1,
    price: 100000,
    unit: 'gói 200g',
    unitEn: '200g pouch',
    weight: '200g',
    weightEn: '200g',
    locality: 'Cẩm Khê',
    ingredients: '100% chè xanh búp non làng nghề Đá Hen, Cẩm Khê',
    ingredientsEn: '100% green tea leaves from Da Hen Craft Village, Cam Khe',
    shelfLife: '12 tháng nơi khô ráo, kín nắng',
    shelfLifeEn: '12 months in a cool, dark dry place',
    ocopTierSample: 'OCOP 4 sao (Chè Đá Hen hảo hạng · 2023)',
    ocopTierSampleEn: '4-Star OCOP (Premium Da Hen Tea · 2023)',
    image: 'https://tradahen.vn/wp-content/uploads/2026/08/IMG_0880.jpeg',
    imageAlt:
      'Túi sản phẩm Trà Đá Hen đóng gói chính thức từ website tradahen.vn',
    imageAltEn:
      'Official packaged bag of Da Hen Tea from tradahen.vn',
    imageCaption: 'Ảnh sản phẩm & bao bì chính thức Trà Đá Hen (tradahen.vn)',
    imageCaptionEn: 'Official product & packaging photo of Da Hen Tea (tradahen.vn)',
    imageSource: 'https://tradahen.vn/',
    secondaryImage:
      'https://tradahen.vn/wp-content/uploads/2025/12/486989298_1168105171981254_8029867342238849877_n.jpg',
    secondaryImageAlt:
      'Bao bì túi vàng Trà Đá Hen chính thức tại tradahen.vn',
    secondaryImageAltEn:
      'Official gold-pouch packaging of Da Hen Tea from tradahen.vn',
    secondaryImageCaption: 'Mẫu bao bì túi vàng Trà Đá Hen (tradahen.vn)',
    secondaryImageCaptionEn: 'Gold-pouch edition of Da Hen Tea (tradahen.vn)',
    secondaryImageSource: 'https://tradahen.vn/',
    galleryImages: [
      {
        url: 'https://tradahen.vn/wp-content/uploads/2026/08/IMG_0880.jpeg',
        alt: 'Túi sản phẩm Trà Đá Hen chính thức tại tradahen.vn',
        altEn: 'Official pouch of Da Hen Tea from tradahen.vn',
        caption: 'Bao bì Trà Đá Hen (tradahen.vn)',
        captionEn: 'Da Hen Tea pouch (tradahen.vn)',
        source: 'https://tradahen.vn/',
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljb4tbt0yebw76',
        alt: 'Ảnh sản phẩm Chè Đá Hen đóng gói thương mại',
        altEn: 'Commercial package of Da Hen Tea',
        caption: 'Sản phẩm Chè Đá Hen đóng gói',
        captionEn: 'Packaged Da Hen Tea product',
      },
      {
        url: 'https://tradahen.vn/wp-content/uploads/2025/12/486989298_1168105171981254_8029867342238849877_n.jpg',
        alt: 'Mẫu bao bì túi vàng Trà Đá Hen',
        altEn: 'Gold-pouch packaging of Da Hen Tea',
        caption: 'Bao bì túi vàng Trà Đá Hen (tradahen.vn)',
        captionEn: 'Gold-pouch Da Hen Tea (tradahen.vn)',
        source: 'https://tradahen.vn/',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Đặc sản chè xanh làng nghề xã Đồng Lương (Cẩm Khê), được bảo hộ nhãn hiệu tập thể năm 2023 và dòng Chè Đá Hen hảo hạng đạt OCOP 4 sao.',
    shortDescriptionEn:
      'Green tea craft-village specialty from Dong Luong Commune (Cam Khe), granted a collective trademark in 2023 with its Premium line earning 4-Star OCOP.',
    story:
      'Tại xã Đồng Lương, huyện Cẩm Khê, cây chè được đưa vào trồng từ năm 2001. Đến năm 2010, làng nghề sản xuất và chế biến chè Đá Hen ra đời và đến năm 2017, HTX Sản xuất và chế biến chè Đá Hen được thành lập, đầu tư máy sao, máy vò, máy tách cẫng và đóng gói đồng bộ cho khoảng 80 hộ thành viên. Tháng 7/2023, HTX được cấp văn bằng bảo hộ nhãn hiệu tập thể Chè xanh Đá Hen, sản phẩm Chè Đá Hen hảo hạng đạt chứng nhận OCOP 4 sao với tem truy xuất nguồn gốc rõ ràng.',
    storyEn:
      'Tea cultivation began in Dong Luong Commune (Cam Khe) in 2001, growing into the Da Hen Tea Craft Village in 2010 and Da Hen Tea Cooperative in 2017 with roughly 80 participating households. In July 2023, the cooperative secured collective trademark protection for Da Hen Green Tea, and its Premium Da Hen Tea earned 4-Star OCOP certification complete with digital traceability.',
    originNote:
      'Làng nghề chè xã Đồng Lương, huyện Cẩm Khê, tỉnh Phú Thọ (~80 hộ tham gia sản xuất và chế biến).',
    originNoteEn:
      'Da Hen Tea Craft Village in Dong Luong Commune, Cam Khe District, Phú Thọ (~80 member households).',
    culturalNote:
      'Đại diện cho tinh thần liên kết làng nghề trung du Cẩm Khê chuyển từ sản xuất nhỏ lẻ sang thương hiệu tập thể hiện đại.',
    culturalNoteEn:
      'Represents collective craft-village innovation in Cam Khe midlands transitioning to protected regional branding.',
    articleLinks: [
      {
        label: 'Đặc sản chè xanh HTX Chè Đá Hen (Du lịch Phú Thọ)',
        labelEn: 'Da Hen Tea Cooperative Specialty (Phu Tho Tourism)',
        url: 'https://dulichphutho.gov.vn/dac-san-che-xanh-cua-hop-tac-xa-san-xuat-che-bien-che-da-hen.html',
      },
      {
        label: 'Những giống chè mới đánh thức vùng đồi (Nông nghiệp & Môi trường)',
        labelEn: 'New Tea Varieties Awakening the Hills',
        url: 'https://nongnghiepmoitruong.vn/nhung-giong-che-moi-danh-thuc-nhung-vung-doi-ngu-say-d357220.html',
      },
    ],
    traceabilityUrl: 'https://hoptacxa.vn/vn/trace-code/HTX8403035',
    mapUrl: 'https://maps.app.goo.gl/cS8gPjKtzhoD46ub9',
    storyUrl:
      'https://nongnghiepmoitruong.vn/nhung-giong-che-moi-danh-thuc-nhung-vung-doi-ngu-say-d357220.html',
    producer: {
      id: 'producer-che-da-hen',
      name: 'HTX Sản xuất và chế biến chè Đá Hen',
      locality: 'Cẩm Khê',
      localityEn: 'Cam Khe',
      address: 'Xã Đồng Lương, huyện Cẩm Khê, tỉnh Phú Thọ',
      addressEn: 'Dong Luong Commune, Cam Khe District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/cS8gPjKtzhoD46ub9',
      contactNote:
        'Có mã truy xuất nguồn gốc chính thức HTX8403035 trên hoptacxa.vn. Vui lòng liên hệ trước khi đến.',
      contactNoteEn:
        'Official traceability code HTX8403035 on hoptacxa.vn. Please contact before visiting.',
    },
  },
  {
    orderNumber: 5,
    id: 'che-thanh-nam',
    name: 'Chè Thành Nam',
    nameEn: 'Thanh Nam Tea',
    category: CATEGORY_1,
    price: 380000,
    priceRange: '300.000đ – 1.500.000đ/kg',
    priceRangeEn: '300,000 – 1,500,000 VND/kg',
    unit: 'túi 500g',
    unitEn: '500g pack',
    weight: '500g (quy cách 200g – 1kg)',
    weightEn: '500g (200g – 1kg options)',
    locality: 'Thanh Sơn',
    ingredients: '100% búp chè trung du Thanh Sơn chế biến theo dòng',
    ingredientsEn: '100% selected Thanh Son midland tea buds',
    shelfLife: '12 tháng bảo quản kín, tránh ẩm và mùi lạ',
    shelfLifeEn: '12 months sealed away from moisture and strong odors',
    ocopTierSample: 'OCOP 3–4 sao (HTX Chè Thành Nam)',
    ocopTierSampleEn: '3–4 Star OCOP (Thanh Nam Cooperative)',
    image:
      'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/472774217_618211387325224_5530028883243673782_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x792&ctp=s720x720&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=FyKuZNNqQIsQ7kNvwEy2F1p&_nc_oc=AdqaX4nwgQXRzr2Lt1IjnPQ0ZUlKNz_dOvUSIPlfp7kS9ElVxkgSxXBeDnso_ZC7jlkp7Qb9YwCHLJjuuAdcBgwZ&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=k5DZsURBS25-Wa_Z_3qnvw&_nc_ss=782a8&oh=00_AQQXo6QETWwke24YhQEua7KmKhTgkA-C1kcncD3t_vNtGg&oe=6B010892',
    imageAlt: 'Sản phẩm Chè Thành Nam của HTX Chè Thành Nam tại Thanh Sơn, Phú Thọ',
    imageAltEn: 'Thanh Nam Tea product from Thanh Nam Tea Cooperative in Thanh Son, Phú Thọ',
    imageCaption: 'Ảnh sản phẩm Chè Thành Nam (HTX Chè Thành Nam)',
    imageCaptionEn: 'Product photo of Thanh Nam Tea (Thanh Nam Cooperative)',
    imageSource:
      'https://baophutho.vn/tang-cuong-hoat-dong-xuc-tien-thuong-mai-mo-rong-thi-truong-dip-cuoi-nam-263710.htm',
    secondaryImage:
      'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/470892562_606584351821261_7079610109952320459_n.jpg?stp=dst-jpg_tt6&cstp=mx1242x743&ctp=s1242x743&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=GReQNyJ2rCIQ7kNvwF_z6SQ&_nc_oc=Adr-fFwA_e_d-OSUlXxQlFbRY-AwzAHUm9RYMz8AG-ZLGuCIadWek4nLYZG0Kedj_I_rhIlNbI6ZlQnBHVsDZ2G-&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=gCmXEXE65T2Fqisua_UZqw&_nc_ss=782a8&oh=00_AQRCjYFw-ZGf3A6u9D99tNu2SQYrfqAkocp7Kg4tCoFltw&oe=6B00E22C',
    secondaryImageAlt: 'Khu vực chế biến sản xuất của HTX Chè Thành Nam',
    secondaryImageAltEn: 'Tea processing facility of Thanh Nam Tea Cooperative',
    secondaryImageCaption: 'Ảnh cơ sở sản xuất Chè Thành Nam',
    secondaryImageCaptionEn: 'Production facility of Thanh Nam Tea',
    secondaryImageSource:
      'https://baophutho.vn/tang-cuong-hoat-dong-xuc-tien-thuong-mai-mo-rong-thi-truong-dip-cuoi-nam-263710.htm',
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Đa dạng các dòng chè đinh, chè tôm nõn, chè hoa nhài, móc câu và ô long của HTX Chè Thành Nam (Thanh Sơn) với vùng nguyên liệu khoảng 100 ha.',
    shortDescriptionEn:
      'Crafted by Thanh Nam Tea Cooperative in Thanh Son across ~100 ha of tea hills, offering Dinh, Tom Non, Jasmine, Moc Cau, and Oolong teas.',
    story:
      'HTX Chè Thành Nam được thành lập năm 2020 bởi bà Dương Thị Duyên tại vùng đất Thanh Sơn. Đơn vị đã liên kết hộ trồng chè xây dựng vùng nguyên liệu khoảng 100 ha (80 ha liên kết, 20 ha tự quản) và nhà xưởng hơn 3.000 m², phát triển các dòng chè đinh, tôm nõn, hoa nhài, móc câu, ô long dán tem truy xuất nguồn gốc. Ghi nhận năm 2021 có 2 sản phẩm đạt OCOP 3 sao (chè tôm nõn, chè hoa nhài), và bài báo gần đây đề cập HTX có 6 sản phẩm OCOP gồm 2 sản phẩm 3 sao và 4 sản phẩm 4 sao (đang cập nhật quyết định từng dòng).',
    storyEn:
      'Founded in 2020 by Ms. Dương Thị Duyên in Thanh Son, Thanh Nam Tea Cooperative partners with growers across roughly 100 ha of tea gardens and a 3,000+ m² workshop. The cooperative produces Dinh, Tom Non, Jasmine, Moc Cau, and Oolong teas with traceability stamps. Tom Non and Jasmine teas earned 3-Star OCOP in 2021, while recent reports note 6 total OCOP lines (two 3-star, four 4-star; per-item certificates pending confirmation).',
    originNote:
      'Huyện Thanh Sơn, tỉnh Phú Thọ (vùng nguyên liệu ~100 ha, xưởng chế biến >3.000 m²).',
    originNoteEn:
      'Thanh Son District, Phú Thọ (~100 ha tea sourcing zone, >3,000 m² processing facility).',
    culturalNote:
      'Thương hiệu chè Thanh Sơn phát triển từ mô hình hợp tác xã liên kết hộ dân tới các dòng quà tặng thương mại và xuất khẩu.',
    culturalNoteEn:
      'Showcases Thanh Son cooperative tea craft scaling from family farms into commercial gift lines and export markets.',
    articleLinks: [
      {
        label: 'Mở rộng thị trường tiêu thụ chè Thành Nam (Báo Phú Thọ)',
        labelEn: 'Expanding Markets for Thanh Nam Tea (Bao Phu Tho)',
        url: 'https://baophutho.vn/tang-cuong-hoat-dong-xuc-tien-thuong-mai-mo-rong-thi-truong-dip-cuoi-nam-263710.htm',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/Tm6vdyxeZtmbtTgF8',
    storyUrl:
      'https://baophutho.vn/tang-cuong-hoat-dong-xuc-tien-thuong-mai-mo-rong-thi-truong-dip-cuoi-nam-263710.htm',
    producer: {
      id: 'producer-che-thanh-nam',
      name: 'HTX Chè Thành Nam',
      locality: 'Thanh Sơn',
      localityEn: 'Thanh Son',
      address: 'Huyện Thanh Sơn, tỉnh Phú Thọ',
      addressEn: 'Thanh Son District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/Tm6vdyxeZtmbtTgF8',
      contactNote:
        'Người sáng lập: bà Dương Thị Duyên. Giá dao động 300.000 – 1.500.000 đồng/kg tùy dòng chè.',
      contactNoteEn:
        'Founder: Ms. Dương Thị Duyên. Listed range 300,000 – 1,500,000 VND/kg depending on tea grade.',
    },
  },
  {
    orderNumber: 6,
    id: 'che-suong-som-xuan-son',
    name: 'Chè Sương sớm Xuân Sơn',
    nameEn: 'Xuan Son Morning Mist Tea',
    category: CATEGORY_1,
    price: 300000,
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g',
    weightEn: '200g',
    locality: 'Tân Sơn',
    ingredients: '100% búp chè VietGAP xã Xuân Đài, khu vực Xuân Sơn',
    ingredientsEn: '100% VietGAP tea buds from Xuan Dai, Xuan Son region',
    shelfLife: '12 tháng nơi khô mát, đậy kín sau khi mở',
    shelfLifeEn: '12 months cool & dry, reseal tightly after opening',
    ocopTierSample: 'OCOP 3 sao (2023)',
    ocopTierSampleEn: '3-Star OCOP (2023)',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-wqs6twdvo8BkLwv6NkdG9RAylVMOypdhpSsTngxlA&s=10',
    imageAlt: 'Bao bì sản phẩm Chè Sương sớm Xuân Sơn của HTX Xuân Đài',
    imageAltEn: 'Packaging of Xuan Son Morning Mist Tea by Xuan Dai Cooperative',
    imageCaption: 'Ảnh sản phẩm Chè Sương sớm Xuân Sơn',
    imageCaptionEn: 'Product photo of Xuan Son Morning Mist Tea',
    imageSource:
      'https://baophutho.vn/chap-canh-cho-thuong-hieu-che-suong-som-xuan-son-255686.htm',
    secondaryImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4EQGaIQaVmuqGl5uqR-u_FvyMV5GUVQ9vIjd2OPbz0A&s',
    secondaryImageAlt: 'Vùng sản xuất và chế biến Chè Sương sớm Xuân Sơn',
    secondaryImageAltEn: 'Production and tea hills of Xuan Son Morning Mist Tea',
    secondaryImageCaption: 'Ảnh vùng nguyên liệu / sản xuất Chè Sương sớm Xuân Sơn',
    secondaryImageCaptionEn: 'Tea region & production of Xuan Son Morning Mist Tea',
    secondaryImageSource:
      'https://baophutho.vn/chap-canh-cho-thuong-hieu-che-suong-som-xuan-son-255686.htm',
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Bắt nguồn từ vùng chè truyền thống xã Xuân Đài (khu vực Xuân Sơn), canh tác theo quy trình VietGAP và đạt chứng nhận OCOP 3 sao năm 2023.',
    shortDescriptionEn:
      'Rooted in Xuan Dai Commune’s mountain tea hills near Xuan Son, produced under VietGAP standards and certified 3-Star OCOP in 2023.',
    story:
      'Chè Sương Sớm Xuân Sơn bắt nguồn từ vùng chè truyền thống của xã Xuân Đài, nơi khí hậu và thổ nhưỡng vùng núi trung du nuôi dưỡng những búp chè đặc trưng. Từ năm 2019, HTX Dịch vụ Nông lâm nghiệp Xuân Đài đã đứng ra liên kết các hộ dân, hướng dẫn quy trình VietGAP, đầu tư máy móc chế biến và chuẩn hóa đóng gói. Năm 2023, sản phẩm được công nhận đạt chuẩn OCOP 3 sao.',
    storyEn:
      'Originated in the traditional mountain tea gardens of Xuan Dai Commune (Tân Sơn / Xuân Sơn area), Xuan Son Morning Mist Tea reflects generations of highland tea stewardship. Starting in 2019, Xuan Dai Agriculture-Forestry Service Cooperative unified local growers under VietGAP practices and modern processing, earning 3-Star OCOP certification in 2023.',
    originNote:
      'Xã Xuân Đài, huyện Tân Sơn (khu vực Vườn quốc gia Xuân Sơn), tỉnh Phú Thọ; sản xuất theo quy trình VietGAP.',
    originNoteEn:
      'Xuan Dai Commune, Tan Son District (Xuan Son region), Phú Thọ; VietGAP-guided cultivation.',
    culturalNote:
      'Gắn với nỗ lực liên kết sản xuất nông nghiệp miền núi nhằm nâng tầm giá trị cây chè vùng Xuân Sơn.',
    culturalNoteEn:
      'Highlights collective highland farming around Xuan Son to elevate livelihoods through quality tea.',
    articleLinks: [
      {
        label: 'Chắp cánh cho thương hiệu Chè Sương sớm Xuân Sơn (Báo Phú Thọ)',
        labelEn: 'Elevating Xuan Son Morning Mist Tea Brand (Bao Phu Tho)',
        url: 'https://baophutho.vn/chap-canh-cho-thuong-hieu-che-suong-som-xuan-son-255686.htm',
      },
    ],
    storyUrl:
      'https://baophutho.vn/chap-canh-cho-thuong-hieu-che-suong-som-xuan-son-255686.htm',
    producer: {
      id: 'producer-che-suong-som-xuan-son',
      name: 'HTX Dịch vụ Nông lâm nghiệp Xuân Đài',
      locality: 'Tân Sơn',
      localityEn: 'Tan Son',
      address: 'Xã Xuân Đài, huyện Tân Sơn, tỉnh Phú Thọ',
      addressEn: 'Xuan Dai Commune, Tan Son District, Phú Thọ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Xa+Xuan+Dai+Tan+Son+Phu+Tho',
      contactNote:
        'HTX Dịch vụ Nông lâm nghiệp Xuân Đài. Vui lòng liên hệ cơ sở trước khi đến để được đón tiếp chu đáo.',
      contactNoteEn:
        'Xuan Dai Agriculture-Forestry Service Cooperative. Contact ahead before visiting the facility.',
    },
  },
  {
    orderNumber: 7,
    id: 'tra-matcha-maika',
    name: 'Trà Matcha Maika',
    nameEn: 'Maika Matcha Tea',
    category: CATEGORY_1,
    price: 80000,
    unit: 'túi 100g',
    unitEn: '100g pouch',
    weight: '100g',
    weightEn: '100g',
    locality: 'Thanh Thủy',
    ingredients: '100% bột lá trà xanh Thanh Thủy nghiền mịn tự nhiên',
    ingredientsEn: '100% finely milled natural Thanh Thuy green tea powder',
    shelfLife: '12 tháng nơi khô mát, tránh ánh nắng trực tiếp',
    shelfLifeEn: '12 months in a cool, dark place',
    image:
      'https://maikatea.vn/thumbs/1280x1280x2/upload/product/tra-matcha-7667.jpg',
    imageAlt:
      'Bao bì túi Trà Matcha Maika chính hãng từ website maikatea.vn',
    imageAltEn:
      'Official pouch packaging of Maika Matcha Tea from maikatea.vn',
    imageCaption: 'Ảnh sản phẩm chính thức Trà Matcha Maika (maikatea.vn)',
    imageCaptionEn: 'Official product photo of Maika Matcha Tea (maikatea.vn)',
    imageSource: 'https://maikatea.vn/',
    galleryImages: [
      {
        url: 'https://maikatea.vn/thumbs/1280x1280x2/upload/product/tra-matcha-7667.jpg',
        alt: 'Bao bì Trà Matcha Maika chính thức tại maikatea.vn',
        altEn: 'Official pouch of Maika Matcha Tea on maikatea.vn',
        caption: 'Ảnh chính thức Trà Matcha Maika (maikatea.vn)',
        captionEn: 'Official photo of Maika Matcha Tea (maikatea.vn)',
        source: 'https://maikatea.vn/',
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk148xgv0a2qf5.webp',
        alt: 'Ảnh sản phẩm Trà Matcha Maika dạng thương mại',
        altEn: 'Commercial package of Maika Matcha Tea',
        caption: 'Ảnh sản phẩm Trà Matcha Maika',
        captionEn: 'Maika Matcha Tea package photo',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Bột trà xanh Matcha phát triển bởi Công ty TNHH Maika Food tại xã Xuân Lộc (Thanh Thủy) từ nguồn nguyên liệu chè địa phương.',
    shortDescriptionEn:
      'Natural green matcha powder crafted by Maika Food Co., Ltd. in Xuan Loc (Thanh Thuy) from locally sourced tea leaves.',
    story:
      'Gắn với hành trình của bà Nguyễn Thị Hương – Giám đốc Công ty TNHH Maika Food (sinh ra và lớn lên tại xã Xuân Lộc, Thanh Thủy). Tốt nghiệp ngành Sinh năm 2001, trăn trở trước đầu ra chè truyền thống, bà thành lập Maika Food vào tháng 12/2019, liên kết vùng nguyên liệu chè địa phương và ra mắt sản phẩm đầu tiên là Trà Matcha Maika trước khi phát triển thêm các dòng Sencha và hoa quả sấy.',
    storyEn:
      'Created by Ms. Nguyễn Thị Hương—Director of Maika Food Co., Ltd. from Xuan Loc Commune, Thanh Thuy. After studying Biology and seeking stronger value for local tea farmers, she founded Maika Food in December 2019 and launched Maika Matcha as the company’s flagship tea before expanding into Sencha and freeze-dried snacks.',
    originNote:
      'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ; liên kết vùng nguyên liệu cùng các hộ trồng chè địa phương.',
    originNoteEn:
      'Xuan Loc Commune, Thanh Thuy District, Phú Thọ; partnered sourcing with local tea growers.',
    culturalNote:
      'Minh họa hướng đi chế biến sâu của doanh nghiệp địa phương nhằm đa dạng hóa sản phẩm từ cây chè Đất Tổ.',
    culturalNoteEn:
      'Showcases value-added tea innovation bringing modern matcha formats to Phú Thọ’s tea harvest.',
    articleLinks: [
      {
        label: 'Nâng cao chất lượng sản phẩm Trà Matcha Maika (Kinh tế Đồ uống)',
        labelEn: 'Elevating Maika Matcha Tea Quality',
        url: 'https://kinhtedouong.vn/phu-tho-nang-cao-chat-luong-san-pham-tra-matcha-maika-124939.html',
      },
      {
        label: 'Người phụ nữ sở hữu 2 sản phẩm OCOP 4 sao (Nông thôn mới Phú Thọ)',
        labelEn: 'Woman Entrepreneur Behind Two 4-Star OCOP Products',
        url: 'https://nongthonmoiphutho.vn/nguoi-phu-nu-so-huu-2-san-pham-ocop-4-sao-939',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    storyUrl:
      'https://nongthonmoiphutho.vn/nguoi-phu-nu-so-huu-2-san-pham-ocop-4-sao-939',
    producer: {
      id: 'producer-maika-food',
      name: 'Công ty TNHH Maika Food',
      locality: 'Thanh Thủy',
      localityEn: 'Thanh Thuy',
      address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
      addressEn: 'Xuan Loc Commune, Thanh Thuy District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
      contactNote:
        'Giám đốc Nguyễn Thị Hương. Vui lòng xem bản đồ hoặc liên hệ trước khi đến cơ sở.',
      contactNoteEn:
        'Director: Ms. Nguyễn Thị Hương. Check Google Maps or contact before visiting.',
    },
  },
  {
    orderNumber: 8,
    id: 'tra-matcha-sua-maika',
    name: 'Trà Matcha sữa Maika',
    nameEn: 'Maika Milk Matcha Tea',
    category: CATEGORY_1,
    price: 68000,
    unit: 'hộp 170g (10 gói)',
    unitEn: '170g box (10 sachets)',
    weight: '170g (10 gói × 17g)',
    weightEn: '170g (10 × 17g sachets)',
    locality: 'Thanh Thủy',
    ingredients: 'Bột trà xanh Matcha Thanh Thủy, kem thực vật, sữa bột, đường',
    ingredientsEn: 'Thanh Thuy Matcha powder, non-dairy creamer, milk powder, sugar',
    shelfLife: '12 tháng nơi khô ráo, thoáng mát',
    shelfLifeEn: '12 months in a cool, dry place',
    ocopTierSample: 'OCOP 4 sao cấp tỉnh (Maika Food)',
    ocopTierSampleEn: 'Provincial 4-Star OCOP (Maika Food)',
    image:
      'https://maikatea.vn/thumbs/1600x1600x2/upload/product/z4574826676506222af2329213591de28d47d51dc90bb1-6843.jpg',
    imageAlt:
      'Hộp Trà Matcha sữa Maika 3in1 chính hãng từ website maikatea.vn',
    imageAltEn:
      'Official 3-in-1 box of Maika Milk Matcha Tea from maikatea.vn',
    imageCaption: 'Ảnh sản phẩm chính thức Trà Matcha sữa Maika (maikatea.vn)',
    imageCaptionEn: 'Official product photo of Maika Milk Matcha Tea (maikatea.vn)',
    imageSource: 'https://maikatea.vn/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Thức uống hòa tan 3in1 kết hợp bột trà xanh Matcha vùng Thanh Thủy của Công ty TNHH Maika Food, hộp 170g (10 gói) tiện lợi pha nóng hoặc đá.',
    shortDescriptionEn:
      'Convenient 3-in-1 milk matcha blend from Maika Food (Thanh Thuy) crafted from locally sourced green tea in a 170g box (10 sachets).',
    story:
      'Nối tiếp thành công từ bột trà xanh Matcha 100% tự nhiên ra mắt cuối năm 2019 tại xã Xuân Lộc (Thanh Thủy), Giám đốc Nguyễn Thị Hương nhận thấy nhiều bạn trẻ và nhân viên văn phòng ưa chuộng hương vị matcha pha sẵn tiện lợi. Từ vùng nguyên liệu chè liên kết địa phương, Maika Food phát triển dòng Trà Matcha sữa Maika đóng hộp 3in1 dễ pha chế, đưa hương chè vùng đất sông Đà đến gần hơn với nhịp sống hiện đại.',
    storyEn:
      'Following the 2019 launch of 100% natural Maika Matcha powder in Xuan Loc (Thanh Thuy), Founder Nguyễn Thị Hương noticed growing demand among young tea drinkers and office workers for an easy-to-prepare beverage. Using locally partnered tea leaves from the Da River basin, Maika Food created the 3-in-1 Maika Milk Matcha box to bring traditional Phú Thọ tea culture into modern everyday routines.',
    originNote:
      'Chế biến bởi Công ty TNHH Maika Food tại xã Xuân Lộc, huyện Thanh Thủy từ nguồn nguyên liệu chè liên kết địa phương.',
    originNoteEn:
      'Crafted by Maika Food Co., Ltd. in Xuan Loc Commune, Thanh Thuy using locally partnered tea crops.',
    culturalNote:
      'Góp phần trẻ hóa cách thưởng thức chè trung du Phú Thọ thông qua dòng đồ uống hòa tan hiện đại.',
    culturalNoteEn:
      'Modernizes Phú Thọ midland tea enjoyment for younger generations and gifting convenience.',
    articleLinks: [
      {
        label: 'Chuyện người phụ nữ xây dựng thương hiệu Trà Matcha Maika',
        labelEn: 'Story Behind the Maika Matcha Tea Brand',
        url: 'https://kinhtedouong.vn/chuyen-nguoi-phu-nu-xay-dung-thuong-hieu-tra-matcha-maika-125459.html',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    storyUrl:
      'https://kinhtedouong.vn/chuyen-nguoi-phu-nu-xay-dung-thuong-hieu-tra-matcha-maika-125459.html',
    producer: {
      id: 'producer-maika-food',
      name: 'Công ty TNHH Maika Food',
      locality: 'Thanh Thủy',
      localityEn: 'Thanh Thuy',
      address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
      addressEn: 'Xuan Loc Commune, Thanh Thuy District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    },
  },
  {
    orderNumber: 9,
    id: 'tra-xanh-sencha-maika',
    name: 'Trà xanh Sencha Maika',
    nameEn: 'Maika Green Sencha Tea',
    category: CATEGORY_1,
    price: 50000,
    unit: 'hộp túi lọc',
    unitEn: 'tea-bag box',
    weight: '40g (20 túi lọc × 2g)',
    weightEn: '40g (20 × 2g tea bags)',
    locality: 'Thanh Thủy',
    ingredients: '100% lá trà xanh Sencha vùng Thanh Thủy',
    ingredientsEn: '100% Thanh Thuy Sencha green tea leaves',
    shelfLife: '18 tháng nơi khô ráo, tránh ẩm',
    shelfLifeEn: '18 months in a dry place',
    ocopTierSample: 'OCOP 4 sao cấp tỉnh (2022)',
    ocopTierSampleEn: 'Provincial 4-Star OCOP (2022)',
    image:
      'https://maikatea.vn/thumbs/1600x1600x2/upload/product/b12c6511e0944fca1685-6900.jpg',
    imageAlt:
      'Hộp Trà xanh Sencha Maika chính hãng từ website maikatea.vn',
    imageAltEn:
      'Official box of Maika Green Sencha Tea from maikatea.vn',
    imageCaption: 'Ảnh sản phẩm chính thức Trà xanh Sencha Maika (maikatea.vn)',
    imageCaptionEn: 'Official product photo of Maika Green Sencha Tea (maikatea.vn)',
    imageSource: 'https://maikatea.vn/',
    galleryImages: [
      {
        url: 'https://maikatea.vn/thumbs/1600x1600x2/upload/product/b12c6511e0944fca1685-6900.jpg',
        alt: 'Hộp Trà xanh Sencha Maika chính hãng từ maikatea.vn',
        altEn: 'Official box of Maika Green Sencha Tea from maikatea.vn',
        caption: 'Hộp Trà xanh Sencha Maika (maikatea.vn)',
        captionEn: 'Maika Green Sencha Tea box (maikatea.vn)',
        source: 'https://maikatea.vn/',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1wNqO3L0D-TevHpYZDHUmykhBLGJAoc_6sWep54AbHw&s=10',
        alt: 'Ảnh sản phẩm Trà xanh Sencha Maika',
        altEn: 'Maika Green Sencha Tea package image',
        caption: 'Sản phẩm Trà xanh Sencha Maika',
        captionEn: 'Maika Green Sencha Tea product view',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Trà xanh Sencha túi lọc tiện dụng chế biến từ vùng nguyên liệu chè Thanh Thủy, được công nhận OCOP 4 sao cấp tỉnh ngày 22/9/2022.',
    shortDescriptionEn:
      'Convenient Sencha green tea bags produced from Thanh Thuy tea leaves, certified Provincial 4-Star OCOP on Sep 22, 2022.',
    story:
      'Maika Food được thành lập tháng 12/2019 bởi bà Nguyễn Thị Hương tại xã Xuân Lộc, huyện Thanh Thủy với mong muốn nâng cao giá trị cây chè địa phương. Trong định hướng chế biến sâu, Trà xanh Sencha được phát triển thành trà túi lọc tiện dụng, kết hợp nguyên liệu chè Thanh Thủy với công nghệ giữ trọn đặc tính lá trà. Ngày 22/9/2022, sản phẩm được công nhận đạt OCOP 4 sao cấp tỉnh.',
    storyEn:
      'Founded in December 2019 by Ms. Nguyễn Thị Hương in Xuan Loc, Thanh Thuy, Maika Food set out to raise local tea incomes through value-added processing. Green Sencha Tea was crafted in convenient tea bags while preserving fresh leaf characteristics, earning Provincial 4-Star OCOP certification on September 22, 2022.',
    originNote:
      'Liên kết các hộ nông dân trồng chè tại huyện Thanh Thủy, tỉnh Phú Thọ.',
    originNoteEn:
      'Partnered tea farms in Thanh Thuy District, Phú Thọ Province.',
    culturalNote:
      'Dòng trà túi lọc hiện đại dễ pha thưởng thức, đồng thời thích hợp làm quà tặng gọn đẹp trong các box trà Đất Tổ.',
    culturalNoteEn:
      'A modern, approachable tea-bag craft that fits neatly into Phú Thọ gift sets.',
    articleLinks: [
      {
        label: 'Chuyện người phụ nữ xây dựng thương hiệu Trà Matcha Maika',
        labelEn: 'Story Behind the Maika Matcha & Sencha Tea Brand',
        url: 'https://kinhtedouong.vn/chuyen-nguoi-phu-nu-xay-dung-thuong-hieu-tra-matcha-maika-125459.html',
      },
      {
        label: 'Người phụ nữ sở hữu 2 sản phẩm OCOP 4 sao',
        labelEn: 'Entrepreneur With Two 4-Star OCOP Products',
        url: 'https://nongthonmoiphutho.vn/nguoi-phu-nu-so-huu-2-san-pham-ocop-4-sao-939',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    storyUrl:
      'https://nongthonmoiphutho.vn/nguoi-phu-nu-so-huu-2-san-pham-ocop-4-sao-939',
    producer: {
      id: 'producer-maika-food',
      name: 'Công ty TNHH Maika Food',
      locality: 'Thanh Thủy',
      localityEn: 'Thanh Thuy',
      address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
      addressEn: 'Xuan Loc Commune, Thanh Thuy District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    },
  },
  {
    orderNumber: 10,
    id: 'tra-sencha-gao-lut-maika',
    name: 'Trà sencha gạo lứt Maika',
    nameEn: 'Maika Brown Rice Sencha Tea',
    category: CATEGORY_1,
    price: 70000,
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g (túi lọc tiện dụng)',
    weightEn: '200g (convenient tea bags)',
    locality: 'Thanh Thủy',
    ingredients: 'Lá trà xanh Sencha Thanh Thủy phối trộn gạo lứt rang thơm',
    ingredientsEn: 'Thanh Thuy Sencha green tea leaves & roasted brown rice',
    shelfLife: '18 tháng nơi khô mát, tránh ánh nắng',
    shelfLifeEn: '18 months in a cool, dry spot away from sunlight',
    image:
      'https://maikatea.vn/thumbs/1600x1600x2/upload/product/z45741134189893e1c3458b2317402ffe503f4f68696d1-9056.jpg',
    imageAlt:
      'Hộp Trà sencha gạo lứt Maika chính hãng từ website maikatea.vn',
    imageAltEn:
      'Official box of Maika Brown Rice Sencha Tea from maikatea.vn',
    imageCaption: 'Ảnh sản phẩm chính thức Trà sencha gạo lứt Maika (maikatea.vn)',
    imageCaptionEn: 'Official product photo of Maika Brown Rice Sencha Tea (maikatea.vn)',
    imageSource: 'https://maikatea.vn/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['tra-do-uong'],
    shortDescription:
      'Dòng trà túi lọc kết hợp lá chè Sencha Thanh Thủy và gạo lứt rang thơm bùi của Công ty TNHH Maika Food, hộp 200g tiện lợi cho thưởng trà hằng ngày.',
    shortDescriptionEn:
      'Tea-bag fusion of Thanh Thuy Sencha green tea leaves and roasted brown rice by Maika Food in a convenient 200g box.',
    story:
      'Trên nền tảng sản phẩm Trà xanh Sencha đạt OCOP 4 sao, Công ty TNHH Maika Food (xã Xuân Lộc, huyện Thanh Thủy) tiếp tục nghiên cứu phối trộn lá trà Sencha vùng chè Thanh Thủy với hạt gạo lứt rang chín tới để tạo nên Trà sencha gạo lứt Maika. Sự kết hợp giữa vị chát dịu của lá trà trung du và hương gạo rang ấm áp mang lại một lựa chọn thanh nhẹ cho gia đình, thường được ghép trong các box quà “Ngọt lành”.',
    storyEn:
      'Expanding on its 4-Star OCOP Green Sencha line in Xuan Loc (Thanh Thuy), Maika Food developed Brown Rice Sencha Tea by blending Thanh Thuy steamed green tea leaves with fragrant roasted brown rice. Pairing gentle midland tea crispness with toasty rice warmth, this approachable tea-bag box fits naturally into daily household wellness and curated gift hampers.',
    originNote:
      'Sản xuất tại Công ty TNHH Maika Food, xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ.',
    originNoteEn:
      'Processed at Maika Food Co., Ltd., Xuan Loc Commune, Thanh Thuy District, Phú Thọ.',
    culturalNote:
      'Thể hiện tinh thần sáng tạo của doanh nghiệp chè Thanh Thủy khi kết hợp hai nông sản quen thuộc của làng quê Đất Tổ: cây chè và hạt gạo.',
    culturalNoteEn:
      'Combines two timeless staples of rural Đất Tổ—hillside tea and roasted rice—in a modern daily beverage.',
    articleLinks: [
      {
        label: 'Người phụ nữ sở hữu 2 sản phẩm OCOP 4 sao (Nông thôn mới Phú Thọ)',
        labelEn: 'Entrepreneur With Two 4-Star OCOP Products',
        url: 'https://nongthonmoiphutho.vn/nguoi-phu-nu-so-huu-2-san-pham-ocop-4-sao-939',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    storyUrl:
      'https://nongthonmoiphutho.vn/nguoi-phu-nu-so-huu-2-san-pham-ocop-4-sao-939',
    producer: {
      id: 'producer-maika-food',
      name: 'Công ty TNHH Maika Food',
      locality: 'Thanh Thủy',
      localityEn: 'Thanh Thuy',
      address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
      addressEn: 'Xuan Loc Commune, Thanh Thuy District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    },
  },

  // ==========================================================
  // Nhóm 2 – Đặc sản khô, đồ ăn vặt và nông sản chế biến (11 - 18)
  // ==========================================================
  {
    orderNumber: 11,
    id: 'my-gao-sach-sinh-ra-tu-lang-hung-lo',
    name: 'Mỳ gạo sạch sinh ra từ làng Hùng Lô',
    nameEn: 'Hung Lo Village Clean Rice Noodles',
    category: CATEGORY_2,
    price: 40000,
    unit: 'gói 1kg',
    unitEn: '1kg pack',
    weight: '1kg',
    weightEn: '1kg',
    locality: 'Việt Trì',
    ingredients: '100% gạo tẻ sạch chọn lọc, nước sạch, không chất tẩy trắng hay hàn the',
    ingredientsEn: '100% selected clean rice and pure water, zero bleaching agents or borax',
    shelfLife: '12 tháng nơi khô ráo, thoáng mát',
    shelfLifeEn: '12 months stored dry and cool',
    image:
      'https://dulichphutho.gov.vn/content-uploads/2025/02/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang-636803814284334606-1.jpg',
    imageAlt:
      'Giàn phơi mỳ gạo sạch tại Hợp tác xã Mỳ gạo Hùng Lô, Việt Trì, Phú Thọ trên dulichphutho.gov.vn',
    imageAltEn:
      'Drying racks of clean rice noodles at Hung Lo Rice Noodle Cooperative in Viet Tri, Phú Thọ on dulichphutho.gov.vn',
    imageCaption:
      'Ảnh cơ sở sản xuất & phơi mỳ gạo sạch làng Hùng Lô (dulichphutho.gov.vn)',
    imageCaptionEn:
      'Production & drying yard photo of Hung Lo Village Clean Rice Noodles (dulichphutho.gov.vn)',
    imageSource: 'https://dulichphutho.gov.vn/',
    secondaryImage:
      'https://dulichphutho.gov.vn/uploads/content/2018/12/3900/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang-636803814284334606.jpg',
    secondaryImageAlt: 'Phơi mỳ gạo sạch làng cổ Hùng Lô, Việt Trì',
    secondaryImageAltEn: 'Sun-drying clean rice noodles in Hung Lo ancient village',
    secondaryImageCaption: 'Quy trình phơi mỳ gạo sạch tại làng Hùng Lô (dulichphutho.gov.vn)',
    secondaryImageCaptionEn: 'Rice noodle drying racks in Hung Lo village (dulichphutho.gov.vn)',
    secondaryImageSource:
      'https://dulichphutho.gov.vn/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang.html',
    galleryImages: [
      {
        url: 'https://dulichphutho.gov.vn/content-uploads/2025/02/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang-636803814284334606-1.jpg',
        alt: 'Giàn phơi mỳ gạo sạch HTX Mỳ gạo Hùng Lô',
        altEn: 'Drying racks at Hung Lo Rice Noodle Cooperative',
        caption: 'Giàn phơi mỳ gạo sạch làng Hùng Lô (dulichphutho.gov.vn)',
        captionEn: 'Hung Lo drying yard (dulichphutho.gov.vn)',
        source: 'https://dulichphutho.gov.vn/',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOw3KDTbqjb2U6qGDAMX2_yCEGv8KgVCEtXmOMQQN2Q&s=10',
        alt: 'Sản phẩm Mỳ gạo sạch Hùng Lô đóng gói',
        altEn: 'Packaged Hung Lo Clean Rice Noodles',
        caption: 'Sản phẩm đóng gói Mỳ gạo sạch Hùng Lô',
        captionEn: 'Hung Lo Rice Noodles packaging',
      },
      {
        url: 'https://dulichphutho.gov.vn/uploads/content/2018/12/3900/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang-636803814284334606.jpg',
        alt: 'Phơi mỳ thành phẩm tại HTX Mỳ gạo Hùng Lô',
        altEn: 'Drying finished noodles at Hung Lo cooperative',
        caption: 'Công đoạn phơi mỳ từ sáng sớm tại Hùng Lô',
        captionEn: 'Early-morning noodle drying in Hung Lo',
        source: 'https://dulichphutho.gov.vn/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang.html',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Sản phẩm của làng nghề truyền thống Hùng Lô (Việt Trì) thành lập HTX từ 7/2016, chế biến sạch từ gạo chọn lọc theo 5 công đoạn nghiêm ngặt.',
    shortDescriptionEn:
      'Produced by Hung Lo Craft Village Cooperative (Viet Tri), crafted from selected clean rice through 5 traditional hygienic steps.',
    story:
      'Làng cổ Hùng Lô (TP. Việt Trì) nổi tiếng là làng “Đa nghề” bên dòng sông Lô, gắn với Đình cổ Hùng Lô và điệu hát Xoan. Nghề làm mì gạo được công nhận là làng nghề truyền thống từ năm 2004; đến tháng 7/2016, Hợp tác xã mỳ gạo Hùng Lô được thành lập với khoảng 27 hộ gia đình gắn bó giữ nghề, đăng ký thương hiệu, bao bì nhãn mác riêng và phát triển thêm dòng mì gạo lứt. Hiện nay, cơ sở sản xuất mỳ gạo Hùng Lô thường xuyên đón các đoàn khách trong và ngoài nước tới tham quan, học hỏi và trải nghiệm quy trình làm mì truyền thống.',
    storyEn:
      'Historic Hung Lo Village in Viet Tri—home to the ancient Hung Lo Communal House and UNESCO-recognized Xoan singing—received official Craft Village recognition for rice noodles in 2004. In July 2016, the Hung Lo Rice Noodle Cooperative unified ~27 artisan households under a registered brand, adding brown-rice noodles alongside classic white noodles. Today, the facility actively welcomes domestic and international visitor groups to observe and experience noodle making.',
    originNote:
      'Làng nghề truyền thống xã Hùng Lô, thành phố Việt Trì, tỉnh Phú Thọ (~27 hộ làm nghề trong hợp tác xã).',
    originNoteEn:
      'Hung Lo Traditional Craft Village, Viet Tri City, Phú Thọ (~27 artisan households in the cooperative).',
    culturalNote:
      'Điểm đến văn hóa – làng nghề tiêu biểu tại Việt Trì, kết nối tham quan Đình cổ Hùng Lô, nghe hát Xoan và trải nghiệm phơi mỳ gạo sạch.',
    culturalNoteEn:
      'An iconic heritage stop in Viet Tri combining the ancient Hung Lo Temple, Xoan folk singing, and traditional noodle making.',
    processSteps: [
      'Chọn gạo sạch đạt chuẩn và ngâm khoảng 4 tiếng cho mềm hạt.',
      'Rửa thật sạch gạo đã ngâm rồi đưa vào máy xát thành bột khô mịn.',
      'Trộn bột gạo khô với nước theo tỷ lệ phù hợp để tạo độ dai tự nhiên.',
      'Đổ vào máy đùn tạo sợi mì/bún trắng ngần và cắt thành từng đoạn khoảng 1 cân.',
      'Đưa lên giá phơi từ sáng sớm để mì khô tự nhiên trong ngày, đảm bảo vệ sinh an toàn thực phẩm rồi đóng gói.',
    ],
    processStepsEn: [
      'Select clean rice grains and soak for approximately 4 hours until softened.',
      'Wash thoroughly and mill into fine dry rice flour.',
      'Blend flour with water at calibrated ratios for natural chewiness.',
      'Extrude white noodle strands and cut into roughly 1-kg sections.',
      'Place on drying racks early in the morning to sun-dry cleanly within the day before packaging.',
    ],
    articleLinks: [
      {
        label: 'Làng nghề mì gạo Hùng Lô (Thông tấn xã Việt Nam)',
        labelEn: 'Hung Lo Rice Noodle Craft Village (VNA Long-form)',
        url: 'https://vietnam.vnanet.vn/vietnamese/long-form/lang-nghe-mi-gao-hung-lo-401401.html',
      },
      {
        label: 'Mỳ gạo Hùng Lô khẳng định thương hiệu OCOP',
        labelEn: 'Hung Lo Rice Noodles Establishing OCOP Brand',
        url: 'https://doanhnghieptiepthi.vn/phu-tho-my-gao-hung-lo-khang-dinh-thuong-hieu-san-pham-ocop-16122090915001654.htm',
      },
    ],
    videoUrl: 'https://youtu.be/zNcawB68FJU?si=5rFdjs6MUSy6R22U',
    mapUrl: 'https://maps.app.goo.gl/T9uyMrpPWFS6e2Yx6',
    storyUrl:
      'https://dulichphutho.gov.vn/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang.html',
    producer: {
      id: 'producer-mi-gao-hung-lo',
      name: 'Hợp tác xã Mỳ gạo Hùng Lô',
      locality: 'Việt Trì',
      localityEn: 'Viet Tri',
      address: 'Xã Hùng Lô, thành phố Việt Trì, tỉnh Phú Thọ',
      addressEn: 'Hung Lo Commune, Viet Tri City, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/T9uyMrpPWFS6e2Yx6',
      contactNote:
        'Cơ sở có đón các đoàn khách trong và ngoài nước tham quan, trải nghiệm làm mì gạo; vui lòng liên hệ đặt lịch trước.',
      contactNoteEn:
        'Welcomes domestic and international visitor groups for noodle-craft experiences; please schedule in advance.',
      visitInfo: {
        verified: true,
        acceptsVisitors: true,
        confirmedHours: 'Theo lịch đặt trước với HTX (hoạt động làm mì từ sáng sớm)',
        confirmedDays: 'Liên hệ đặt lịch theo đoàn / cá nhân trước khi đến',
        activities: [
          'Tham quan quy trình xay bột, đùn sợi và phơi mỳ gạo sạch tại sân HTX Hùng Lô',
          'Tìm hiểu lịch sử làng nghề truyền thống bên Đình cổ Hùng Lô',
        ],
        activitiesEn: [
          'Observe rice milling, noodle extrusion, and sun-drying racks at Hung Lo Cooperative',
          'Explore craft-village heritage near ancient Hung Lo Communal House',
        ],
        mapGuide:
          'Xã Hùng Lô, TP. Việt Trì (mở chỉ đường trực tiếp qua liên kết Google Maps bên phải).',
        mapGuideEn:
          'Hung Lo Commune, Viet Tri City (direct Google Maps link available in the Producer card).',
        contactMethod:
          'Liên hệ trực tiếp Hợp tác xã Mỳ gạo Hùng Lô hoặc đặt lịch mẫu trên nền tảng để xác nhận thời gian đón đoàn.',
        contactMethodEn:
          'Contact Hung Lo Rice Noodle Cooperative directly or submit a prototype booking request to confirm visiting hours.',
      },
    },
  },
  {
    orderNumber: 12,
    id: 'mi-gao-cu-thang',
    name: 'Mì gạo Cự Thắng',
    nameEn: 'Cu Thang Rice Noodles',
    category: CATEGORY_2,
    price: 40000,
    unit: 'gói 1kg',
    unitEn: '1kg pack',
    weight: '1kg',
    weightEn: '1kg',
    locality: 'Thanh Sơn',
    ingredients: '100% gạo quê tuyển chọn, không phụ gia bảo quản',
    ingredientsEn: '100% selected local rice, no preservatives',
    shelfLife: '12 tháng nơi khô ráo, buộc kín sau khi mở',
    shelfLifeEn: '12 months in a dry place, seal tightly after opening',
    ocopTierSample: 'OCOP 3 sao',
    ocopTierSampleEn: '3-Star OCOP',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTTrtXG4wtsSb92S7LZp0EPtcHV9RTsd4vtvfnNElkA&s=10',
    imageAlt: 'Bao bì sản phẩm Mì gạo Cự Thắng đạt chứng nhận OCOP 3 sao',
    imageAltEn: 'Packaging of 3-Star OCOP Cu Thang Rice Noodles',
    imageCaption: 'Ảnh sản phẩm Mì gạo Cự Thắng',
    imageCaptionEn: 'Product photo of Cu Thang Rice Noodles',
    imageSource: 'https://baophutho.vn/cu-thang-vuon-len-tu-noi-luc-233861.htm',
    secondaryImage:
      'https://phuthotv.vn/sites/default/files/admin/anh_bai_viet/mi_gao_cu_thang.jpg',
    secondaryImageAlt: 'Phơi mì gạo truyền thống tại xã Cự Thắng, Thanh Sơn, Phú Thọ',
    secondaryImageAltEn: 'Traditional rice noodle drying in Cu Thang Commune, Thanh Son',
    secondaryImageCaption: 'Ảnh sản xuất Mì gạo Cự Thắng (phuthotv.vn)',
    secondaryImageCaptionEn: 'Production yard of Cu Thang Rice Noodles (phuthotv.vn)',
    secondaryImageSource: 'https://phuthotv.vn/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Nghề làm mì gạo truyền thống hơn 20 năm tại xã Cự Thắng (Thanh Sơn), liên kết qua HTX Dịch vụ nông nghiệp Cự Thắng và đạt OCOP 3 sao.',
    shortDescriptionEn:
      'Over 20 years of rice noodle heritage in Cu Thang Commune (Thanh Son), organized by Cu Thang Agricultural Service Cooperative with 3-Star OCOP.',
    story:
      'Nghề làm mì gạo ở Cự Thắng đã gắn bó với người dân địa phương hơn 20 năm, sản lượng từng ghi nhận đạt khoảng 800 kg đến 1 tấn mỗi ngày. HTX Dịch vụ nông nghiệp xã Cự Thắng (với Phó Giám đốc Nguyễn Thị Thanh Mai) đã liên kết các hộ làm mì, ứng dụng tiến bộ kỹ thuật, hoàn thiện bao bì, nhãn mác, mã số mã vạch và đưa sản phẩm đạt chứng nhận OCOP 3 sao.',
    storyEn:
      'Rice noodle making has sustained households in Cu Thang for more than 20 years, producing 800 kg to 1 ton daily. Cu Thang Agricultural Service Cooperative, led by Deputy Director Nguyễn Thị Thanh Mai, unified artisans with upgraded technology, branded packaging, and barcodes—earning 3-Star OCOP recognition.',
    originNote:
      'Xã Cự Thắng, huyện Thanh Sơn, tỉnh Phú Thọ.',
    originNoteEn:
      'Cu Thang Commune, Thanh Son District, Phú Thọ.',
    culturalNote:
      'Nỗ lực nâng tầm hạt gạo quê Thanh Sơn thành sản phẩm hàng hóa chuẩn hóa có truy xuất và thương hiệu địa phương.',
    culturalNoteEn:
      'Demonstrates rural Thanh Son artisans turning household rice noodles into standardized regional goods.',
    articleLinks: [
      {
        label: 'Cự Thắng vươn lên từ nội lực (Báo Phú Thọ)',
        labelEn: 'Cu Thang Rising Through Internal Strength (Bao Phu Tho)',
        url: 'https://baophutho.vn/cu-thang-vuon-len-tu-noi-luc-233861.htm',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/STcifxP6xZA4mLGZA',
    storyUrl: 'https://baophutho.vn/cu-thang-vuon-len-tu-noi-luc-233861.htm',
    producer: {
      id: 'producer-mi-gao-cu-thang',
      name: 'HTX Dịch vụ nông nghiệp xã Cự Thắng',
      locality: 'Thanh Sơn',
      localityEn: 'Thanh Son',
      address: 'Xã Cự Thắng, huyện Thanh Sơn, tỉnh Phú Thọ',
      addressEn: 'Cu Thang Commune, Thanh Son District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/STcifxP6xZA4mLGZA',
      contactNote:
        'Phó Giám đốc HTX: bà Nguyễn Thị Thanh Mai. Vui lòng xem bản đồ hoặc liên hệ trước khi đến.',
      contactNoteEn:
        'Cooperative Deputy Director: Ms. Nguyễn Thị Thanh Mai. Check Google Maps or contact prior to visiting.',
    },
  },
  {
    orderNumber: 13,
    id: 'chuoi-say-banaco',
    name: 'Chuối sấy Banaco',
    nameEn: 'Banaco Dried Banana',
    category: CATEGORY_2,
    price: 120000,
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g',
    weightEn: '200g',
    locality: 'Lâm Thao / Phú Thọ',
    ingredients: '100% chuối tiêu chín tự nhiên vùng Phú Thọ, không đường tinh luyện',
    ingredientsEn: '100% ripe Phú Thọ bananas, no refined added sugar',
    shelfLife: '12 tháng nơi khô mát, tránh ánh nắng',
    shelfLifeEn: '12 months in a cool, dry place',
    image: 'https://banaco.com.vn/upload/LOANANH/01-17.jpg',
    imageAlt:
      'Hộp sản phẩm Chuối sấy Banaco (Ba Hồng Anh) và thành phẩm chuối sấy trên banaco.com.vn',
    imageAltEn:
      'Official Banaco Dried Banana packaging box and slices on banaco.com.vn',
    imageCaption: 'Ảnh sản phẩm chính thức Chuối sấy Banaco (banaco.com.vn)',
    imageCaptionEn: 'Official product photo of Banaco Dried Banana (banaco.com.vn)',
    imageSource: 'https://banaco.com.vn/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Sản phẩm chuối sấy đóng hộp 200g của thương hiệu Banaco (Bản Nguyên, Lâm Thao), giữ vị ngọt tự nhiên không đường tinh luyện nhằm nâng cao giá trị trái chuối bản địa.',
    shortDescriptionEn:
      '200g boxed dried banana snack by Banaco (Ban Nguyen, Lam Thao), naturally sweet with no refined sugar added.',
    story:
      'Cùng với dòng bột ngũ cốc chuối tiêu xanh đạt OCOP 3 sao, Chuối sấy Banaco ra đời từ bài toán giúp nông dân thoát khỏi cảnh “được mùa mất giá” khi tiêu thụ chuối tươi ngắn ngày. Bằng công nghệ chế biến và đóng hộp 200g gọn đẹp, Banaco biến những buồng chuối chín tại vùng nguyên liệu địa phương thành món ăn vặt tiện dụng, dễ bảo quản và sẵn sàng góp mặt trong các hộp quà đặc sản gửi đi muôn nơi.',
    storyEn:
      'Created alongside Banaco’s 3-Star OCOP green banana cereal, Banaco Dried Banana tackles the challenge of short-lived fresh banana harvests and seasonal price drops. By drying and packing local ripe bananas into neat 200g gift-ready boxes, Banaco creates a convenient, shelf-stable snack rooted in regional harvests.',
    originNote:
      'Sản xuất tại Công ty CP Công nghệ chế biến Xuất khẩu BANACO, xã Bản Nguyên, huyện Lâm Thao, tỉnh Phú Thọ.',
    originNoteEn:
      'Produced by BANACO Processing & Export Technology JSC in Ban Nguyen Commune, Lam Thao District, Phú Thọ.',
    culturalNote:
      'Minh họa hướng chuyển đổi từ bán nông sản thô sang chế biến sâu bền vững cho cây chuối quê hương.',
    culturalNoteEn:
      'Illustrates the local shift from perishable fresh produce toward value-added dried fruit craftsmanship.',
    articleLinks: [
      {
        label: 'Trang thông tin chính thức Banaco',
        labelEn: 'Banaco Official Portal',
        url: 'https://banaco.com.vn/',
      },
    ],
    videoUrl: 'https://youtu.be/bZ5rIDgNOWE?si=Ag6EIEm9PDXfWksC',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ban+Nguyen+Lam+Thao+Phu+Tho',
    producer: {
      id: 'producer-banaco',
      name: 'Công ty CP Công nghệ chế biến Xuất khẩu BANACO',
      locality: 'Lâm Thao / Phú Thọ',
      localityEn: 'Lam Thao / Phú Thọ',
      address: 'Khu 4 (Vĩnh Lại), xã Bản Nguyên, huyện Lâm Thao, tỉnh Phú Thọ',
      addressEn: 'Zone 4 (Vinh Lai), Ban Nguyen Commune, Lam Thao District, Phú Thọ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ban+Nguyen+Lam+Thao+Phu+Tho',
      contactNote: 'Hotline hỗ trợ: 0961 183 018 · Email: info@banaco.com.vn',
      contactNoteEn: 'Hotline: 0961 183 018 · Email: info@banaco.com.vn',
    },
  },
  {
    orderNumber: 14,
    id: 'chuoi-say-lanh-maikafood',
    name: 'Chuối sấy lạnh Maikafood',
    nameEn: 'Maikafood Freeze-Dried Banana',
    category: CATEGORY_2,
    price: 65000,
    unit: 'gói 100g',
    unitEn: '100g pouch',
    weight: '100g',
    weightEn: '100g',
    locality: 'Thanh Thủy',
    ingredients: '100% chuối tươi vùng sông Đà sấy thăng hoa / sấy lạnh tự nhiên',
    ingredientsEn: '100% Da River basin bananas processed by natural freeze-drying',
    shelfLife: '12 tháng trong túi zip kín khí, nơi khô ráo',
    shelfLifeEn: '12 months in sealed zip pouch, cool & dry',
    image:
      'https://cdn.nhandan.vn/images/9cS9e8UQSb3CtglMFLt8RuSJ3J0RBVeWTHIlIn0Zr58KMR_tcbAczvzwukw7DdqZZyuVf3LqvJzrXQTmv-Aanw/c2-1744.png.avif',
    imageAlt: 'Sản phẩm Chuối sấy lạnh Maikafood chế biến từ nông sản vùng sông Đà',
    imageAltEn: 'Maikafood Freeze-Dried Banana crafted from Da River basin produce',
    imageCaption: 'Ảnh sản phẩm Chuối sấy lạnh Maikafood (nhandan.vn)',
    imageCaptionEn: 'Product photo of Maikafood Freeze-Dried Banana (nhandan.vn)',
    imageSource: 'https://kinhtedouong.vn/chuyen-nguoi-phu-nu-xay-dung-thuong-hieu-tra-matcha-maika-125459.html',
    galleryImages: [
      {
        url: 'https://cdn.nhandan.vn/images/9cS9e8UQSb3CtglMFLt8RuSJ3J0RBVeWTHIlIn0Zr58KMR_tcbAczvzwukw7DdqZZyuVf3LqvJzrXQTmv-Aanw/c2-1744.png.avif',
        alt: 'Sản phẩm Chuối sấy lạnh Maikafood',
        altEn: 'Maikafood Freeze-Dried Banana package',
        caption: 'Sản phẩm Chuối sấy lạnh Maikafood (nhandan.vn)',
        captionEn: 'Maikafood Freeze-Dried Banana (nhandan.vn)',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPaQGeNLz01Xw_a8CME4ql2p_Xr3q7Nd931pYj90fww&s=10',
        alt: 'Chuối sấy lạnh Maikafood đóng gói',
        altEn: 'Packaged Maikafood Freeze-Dried Banana',
        caption: 'Ảnh bao bì Chuối sấy lạnh Maikafood',
        captionEn: 'Maikafood Freeze-Dried Banana pack',
      },
      {
        url: 'https://static.kinhtedouong.vn/images/upload/bandoc/03162025/117d3113006t9246l1-img-8832.jpg',
        alt: 'Giới thiệu sản phẩm của Công ty TNHH Maika Food',
        altEn: 'Maika Food product showcase',
        caption: 'Sản phẩm nông sản chế biến Maika Food (kinhtedouong.vn)',
        captionEn: 'Maika Food processed produce showcase (kinhtedouong.vn)',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Sản phẩm trái cây sấy lạnh công nghệ hiện đại của Công ty TNHH Maika Food từ nguồn chuối trồng tại Thanh Thủy và các vùng lân cận.',
    shortDescriptionEn:
      'Modern freeze-dried banana snack produced by Maika Food from bananas grown across Thanh Thuy and neighboring areas.',
    story:
      'Tiếp nối thành công từ bột trà xanh Matcha, chị Nguyễn Thị Hương – Giám đốc Công ty TNHH Maika Food tại xã Xuân Lộc, huyện Thanh Thủy – tiếp tục nghiên cứu và đưa vào dây chuyền công nghệ hiện đại để sản xuất các dòng trái cây sấy lạnh như mít, chuối từ nguồn nông sản trồng tại vùng đất sông Đà và địa phương lân cận, nhiều dòng sản phẩm của công ty đã đạt tiêu chuẩn OCOP 4 sao.',
    storyEn:
      'Building on Maika Food’s signature Matcha line in Xuan Loc (Thanh Thuy), Director Nguyễn Thị Hương expanded modern freeze-drying lines for local Da River basin fruits such as banana and jackfruit, adding new value-added snacks alongside the company’s 4-Star OCOP products.',
    originNote:
      'Nguồn chuối trồng trên địa bàn huyện Thanh Thủy và một số địa phương lân cận tỉnh Phú Thọ.',
    originNoteEn:
      'Locally sourced bananas grown in Thanh Thuy District and neighboring areas of Phú Thọ.',
    culturalNote:
      'Kết hợp nông sản tươi vùng sông Đà với công nghệ sấy lạnh giúp giữ trọn hương vị tự nhiên và thuận tiện cho giỏ quà.',
    culturalNoteEn:
      'Pairs Da River agricultural harvests with modern freeze-drying to preserve natural flavor in travel-ready gift packs.',
    articleLinks: [
      {
        label: 'Chuyện người phụ nữ xây dựng thương hiệu Maika Food (Kinh tế Đồ uống)',
        labelEn: 'Maika Food Founder Story (Kinh te Do uong)',
        url: 'https://kinhtedouong.vn/chuyen-nguoi-phu-nu-xay-dung-thuong-hieu-tra-matcha-maika-125459.html',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/Md3fXHPQtatDzmc86?g_st=ic',
    storyUrl:
      'https://kinhtedouong.vn/chuyen-nguoi-phu-nu-xay-dung-thuong-hieu-tra-matcha-maika-125459.html',
    producer: {
      id: 'producer-maika-food',
      name: 'Công ty TNHH Maika Food',
      locality: 'Thanh Thủy',
      localityEn: 'Thanh Thuy',
      address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
      addressEn: 'Xuan Loc Commune, Thanh Thuy District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/Md3fXHPQtatDzmc86?g_st=ic',
    },
  },
  {
    orderNumber: 15,
    id: 'chuoi-say-deo-hoang-cuong',
    name: 'Chuối sấy dẻo Hoàng Cương',
    nameEn: 'Hoang Cuong Soft-Dried Banana',
    category: CATEGORY_2,
    price: 85000,
    unit: 'túi/hộp 1kg',
    unitEn: '1kg pack',
    weight: '1kg',
    weightEn: '1kg',
    locality: 'Thanh Ba',
    ingredients: '100% chuối chín vùng VietGAP Hoàng Cương, không bổ sung đường',
    ingredientsEn: '100% VietGAP Hoang Cuong ripe bananas, zero added sugar',
    shelfLife: '6 tháng nơi khô mát hoặc bảo quản ngăn mát tủ lạnh',
    shelfLifeEn: '6 months cool & dry or refrigerated',
    image:
      'https://baophutho.vn/thumbnail/news/ngot-thom-vi-ch-w720t0-di2642d328d5183632t11000l1-328d5183630t1103.webp',
    imageAlt:
      'Hộp bao bì và mẻ chuối sấy dẻo Hoàng Cương đăng tải trên Báo Phú Thọ',
    imageAltEn:
      'Packaged box and batch of Hoang Cuong Soft-Dried Banana published by Bao Phu Tho',
    imageCaption:
      'Ảnh hộp & sản phẩm Chuối sấy dẻo Hoàng Cương (baophutho.vn)',
    imageCaptionEn:
      'Box & product photo of Hoang Cuong Soft-Dried Banana (baophutho.vn)',
    imageSource: 'https://baophutho.vn/',
    secondaryImage:
      'https://phutho.dcs.vn/AllUpload/FCKUploads/Crop_CKEditorImage_720093919.jpg',
    secondaryImageAlt: 'Mẻ chuối sấy dẻo Hoàng Cương thơm mềm tự nhiên',
    secondaryImageAltEn: 'Hoang Cuong soft-dried bananas with natural golden color',
    secondaryImageCaption: 'Thành phẩm Chuối sấy dẻo Hoàng Cương (phutho.dcs.vn)',
    secondaryImageCaptionEn: 'Finished Hoang Cuong soft-dried bananas (phutho.dcs.vn)',
    secondaryImageSource:
      'https://phutho.dcs.vn/ContentDetail/NewsDetailView?NewsId=0f351b19-ac9a-4dac-9c09-ebeba345cfc1',
    galleryImages: [
      {
        url: 'https://baophutho.vn/thumbnail/news/ngot-thom-vi-ch-w720t0-di2642d328d5183632t11000l1-328d5183630t1103.webp',
        alt: 'Hộp và sản phẩm Chuối sấy dẻo Hoàng Cương trên Báo Phú Thọ',
        altEn: 'Box and batch of Hoang Cuong Soft-Dried Banana on Bao Phu Tho',
        caption: 'Hộp Chuối sấy dẻo Hoàng Cương (baophutho.vn)',
        captionEn: 'Hoang Cuong Soft-Dried Banana box (baophutho.vn)',
        source: 'https://baophutho.vn/',
      },
      {
        url: 'https://phutho.dcs.vn/AllUpload/FCKUploads/Crop_CKEditorImage_720093919.jpg',
        alt: 'Chuối sấy dẻo Hoàng Cương không bổ sung đường',
        altEn: 'Sugar-free Hoang Cuong soft-dried bananas',
        caption: 'Chuối sấy dẻo Hoàng Cương (phutho.dcs.vn)',
        captionEn: 'Hoang Cuong soft-dried banana batch (phutho.dcs.vn)',
      },
      {
        url: 'https://c.baophutho.vn/img/desktop/news/2616/187d3100353t11006l1-187d3100352t1104.webp?r=62',
        alt: 'Quy trình chế biến chuối sấy dẻo tại HTX Hoàng Cương',
        altEn: 'Processing soft-dried bananas at Hoang Cuong cooperative',
        caption: 'Đóng gói Chuối sấy dẻo Hoàng Cương (c.baophutho.vn)',
        captionEn: 'Packaging Hoang Cuong Soft-Dried Banana (c.baophutho.vn)',
      },
      {
        url: 'https://c.baophutho.vn/img/desktop/news/2616/187d3100403t11000l1-187d3100402t1104.webp?r=1',
        alt: 'Vùng trồng chuối an toàn VietGAP Hoàng Cương',
        altEn: 'Hoang Cuong VietGAP banana orchard',
        caption: 'Sản phẩm chuối vùng bãi bồi Hoàng Cương (c.baophutho.vn)',
        captionEn: 'Hoang Cuong alluvial orchard produce (c.baophutho.vn)',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Chế biến từ vùng chuối VietGAP rộng 13 ha bên bãi bồi sông Hồng ở Hoàng Cương bằng hệ thống sấy điện khép kín, không bổ sung đường, hút chân không.',
    shortDescriptionEn:
      'Crafted from 13 ha of VietGAP Red River alluvial bananas in Hoang Cuong using closed electric drying with no added sugar, vacuum-sealed for gifting.',
    story:
      'Nhờ phù sa sông Hồng bồi đắp, vùng Hoàng Cương nổi tiếng với những vườn chuối chín ngọt. Thành lập năm 2021, HTX Chuối an toàn Hoàng Cương đã phát triển vùng trồng 13 ha đạt chuẩn VietGAP, liên kết tiêu thụ khoảng 100 tấn chuối mỗi năm. Để giữ giá trị nông sản và kéo dài thời gian bảo quản, HTX đầu tư hệ thống sấy điện khép kín kiểm soát nhiệt độ ổn định, không bổ sung đường, giữ màu sắc tự nhiên, độ dẻo mềm rồi đóng gói túi PE hút chân không và hộp giấy làm quà biếu.',
    storyEn:
      'Nurtured by fertile Red River alluvial soils, Hoang Cuong is known for sweet bananas. Founded in 2021, Hoang Cuong Safe Banana Cooperative established 13 ha of VietGAP orchards handling ~100 tons per year. Using closed-loop temperature-controlled electric dryers with zero added sugar, the cooperative preserves natural amber color and chewy sweetness in vacuum-sealed pouches and gift boxes.',
    originNote:
      'Vùng bãi bồi sông Hồng tại Hoàng Cương (Thanh Ba, Phú Thọ); 13 ha chuối đạt chuẩn VietGAP của HTX Chuối an toàn Hoàng Cương.',
    originNoteEn:
      'Red River alluvial plains in Hoang Cuong (Thanh Ba, Phú Thọ); 13 ha VietGAP-certified banana zone.',
    culturalNote:
      'Giải bài toán tiêu thụ nông sản theo mùa vụ bằng công nghệ chế biến sâu, giữ trọn vị ngọt nguyên bản của trái chuối quê hương.',
    culturalNoteEn:
      'Transforms seasonal fresh banana harvests into high-value, naturally sweet shelf-stable gifts.',
    processSteps: [
      'Thu hái chuối chín đúng độ từ vùng trồng 13 ha đạt chuẩn VietGAP.',
      'Sơ chế và đưa vào hệ thống sấy điện khép kín kiểm soát nhiệt độ, không bổ sung đường.',
      'Đóng gói túi màng PE hút chân không và hộp giấy tiện lợi cho bảo quản và làm quà biếu.',
    ],
    processStepsEn: [
      'Harvest ripe bananas from 13 ha of VietGAP-certified alluvial orchards.',
      'Prepare and dry in closed temperature-controlled electric chambers with no added sugar.',
      'Vacuum-seal in PE bags and pack into gift boxes for long-lasting freshness.',
    ],
    articleLinks: [
      {
        label: 'Chuối sấy dẻo Hoàng Cương (Cổng thông tin Đảng bộ Phú Thọ)',
        labelEn: 'Hoang Cuong Soft-Dried Banana Feature (Phu Tho Portal)',
        url: 'https://phutho.dcs.vn/ContentDetail/NewsDetailView?NewsId=0f351b19-ac9a-4dac-9c09-ebeba345cfc1',
      },
      {
        label: 'Hoàng Cương tạo đà bứt phá (Báo Phú Thọ)',
        labelEn: 'Hoang Cuong Breakthrough (Bao Phu Tho)',
        url: 'https://baophutho.vn/hoang-cuong-tao-da-but-pha-tu-viec-xac-dinh-dung-trong-tam-252425.htm',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/tNu5SiSRZ1VNMT3S8?g_st=ic',
    storyUrl:
      'https://phutho.dcs.vn/ContentDetail/NewsDetailView?NewsId=0f351b19-ac9a-4dac-9c09-ebeba345cfc1',
    producer: {
      id: 'producer-chuoi-hoang-cuong',
      name: 'HTX Chuối an toàn Hoàng Cương',
      locality: 'Thanh Ba',
      localityEn: 'Thanh Ba',
      address: 'Xã Hoàng Cương, huyện Thanh Ba, tỉnh Phú Thọ',
      addressEn: 'Hoang Cuong Commune, Thanh Ba District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/tNu5SiSRZ1VNMT3S8?g_st=ic',
    },
  },
  {
    orderNumber: 16,
    id: 'bot-ngu-coc-hon-hop-chuoi-tieu-xanh-banaco',
    name: 'Bột ngũ cốc hỗn hợp chuối tiêu xanh Banaco',
    nameEn: 'Banaco Green Banana Mixed Cereal Powder',
    category: CATEGORY_2,
    price: 120000,
    unit: 'hộp 250g',
    unitEn: '250g box',
    weight: '250g',
    weightEn: '250g',
    locality: 'Lâm Thao / Phú Thọ',
    ingredients: 'Bột chuối tiêu xanh giàu tinh bột kháng, gạo lứt, đậu xanh, đậu đen, hạt sen',
    ingredientsEn: 'Green banana flour (resistant starch), brown rice, mung bean, black bean, lotus seed',
    shelfLife: '12 tháng nơi khô ráo, tránh ẩm',
    shelfLifeEn: '12 months in a dry, airtight container',
    ocopTierSample: 'OCOP 3 sao cấp tỉnh Phú Thọ',
    ocopTierSampleEn: 'Phú Thọ Provincial 3-Star OCOP',
    image:
      'https://banaco.com.vn/upload/botchuoi01/anh-hop-bot-chuoi-mau-vang-1.jpg',
    imageAlt:
      'Hộp và gói Bột ngũ cốc hỗn hợp chuối tiêu xanh Banaco (Ba Hồng Anh) trên banaco.com.vn',
    imageAltEn:
      'Official box and sachets of Banaco Green Banana Mixed Cereal Powder on banaco.com.vn',
    imageCaption:
      'Ảnh bao bì chính thức Bột ngũ cốc hỗn hợp chuối tiêu xanh Banaco (banaco.com.vn)',
    imageCaptionEn:
      'Official packaging photo of Banaco Green Banana Mixed Cereal Powder (banaco.com.vn)',
    imageSource: 'https://banaco.com.vn/bot-ngu-coc-hon-hop-chuoi-tieu-xanh',
    galleryImages: [
      {
        url: 'https://banaco.com.vn/upload/botchuoi01/anh-hop-bot-chuoi-mau-vang-1.jpg',
        alt: 'Hộp Bột ngũ cốc hỗn hợp chuối tiêu xanh Banaco',
        altEn: 'Banaco Green Banana Cereal Powder box',
        caption: 'Hộp Bột ngũ cốc chuối tiêu xanh Banaco (banaco.com.vn)',
        captionEn: 'Banaco Green Banana Cereal Powder box (banaco.com.vn)',
        source: 'https://banaco.com.vn/',
      },
      {
        url: 'https://banaco.com.vn/thumb/product/botchuoi/anhhopbotchuoitieumauvangxanh1_400_400.jpg',
        alt: 'Phiên bản hộp Bột chuối tiêu xanh Banaco',
        altEn: 'Banaco green banana powder packaging variant',
        caption: 'Bao bì Bột ngũ cốc chuối tiêu xanh Banaco (banaco.com.vn)',
        captionEn: 'Banaco Cereal Powder packaging (banaco.com.vn)',
      },
      {
        url: 'https://banaco.com.vn/thumb/news/chuoitieuhongbnc_480_270.jpg',
        alt: 'Vùng nguyên liệu chuối tiêu Banaco',
        altEn: 'Banaco banana cultivation material',
        caption: 'Nguyên liệu chuối tiêu Banaco (banaco.com.vn)',
        captionEn: 'Banaco banana raw material (banaco.com.vn)',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbcoywx6MT3EjsmbouNTCDxlaEW_k8L8ImzRNMhpSnA&s',
        alt: 'Sản phẩm Bột ngũ cốc chuối tiêu xanh Banaco',
        altEn: 'Banaco Green Banana Cereal Powder product view',
        caption: 'Ảnh sản phẩm Bột ngũ cốc Banaco',
        captionEn: 'Banaco Cereal Powder product view',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Chế biến sâu từ chuối tiêu xanh giàu tinh bột kháng tự nhiên kết hợp các loại hạt truyền thống, đạt chứng nhận OCOP cấp tỉnh 3 sao của Phú Thọ.',
    shortDescriptionEn:
      'Value-added blend of green bananas (rich in natural resistant starch) and traditional grains; Provincial 3-Star OCOP certified.',
    story:
      'Banaco ra đời với mong muốn nâng tầm giá trị cây chuối tiêu xanh quen thuộc trong đời sống người Việt. Thay vì bán chuối tươi bấp bênh theo mùa, Banaco nghiên cứu chế biến sâu đưa chuối tiêu xanh (giàu tinh bột kháng tự nhiên) kết hợp với các loại hạt truyền thống thành bột ngũ cốc tiện dụng. Sản phẩm đã đạt chứng nhận OCOP cấp tỉnh 3 sao của tỉnh Phú Thọ.',
    storyEn:
      'Banaco was founded to elevate everyday green bananas beyond volatile fresh-fruit harvests. Combining green bananas—naturally rich in resistant starch—with traditional nutritious grains, the company created an instant cereal blend that achieved Phú Thọ Provincial 3-Star OCOP certification.',
    originNote:
      'Vùng nguyên liệu chuối tiêu xanh địa phương tại tỉnh Phú Thọ.',
    originNoteEn:
      'Locally sourced green bananas in Phú Thọ Province.',
    culturalNote:
      'Minh họa hướng chế biến sâu sáng tạo biến nguyên liệu dân dã thành thức uống dinh dưỡng đạt chuẩn OCOP 3 sao.',
    culturalNoteEn:
      'Showcases creative value-added processing turning humble local bananas into a 3-Star OCOP cereal blend.',
    articleLinks: [
      {
        label: 'Trang thông tin chính thức Banaco',
        labelEn: 'Banaco Official Website',
        url: 'https://banaco.com.vn/',
      },
    ],
    videoUrl: 'https://youtu.be/bZ5rIDgNOWE?si=Ag6EIEm9PDXfWksC',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ban+Nguyen+Lam+Thao+Phu+Tho',
    producer: {
      id: 'producer-banaco',
      name: 'Công ty CP Công nghệ chế biến Xuất khẩu BANACO',
      locality: 'Lâm Thao / Phú Thọ',
      localityEn: 'Lam Thao / Phú Thọ',
      address: 'Khu 4 (Vĩnh Lại), xã Bản Nguyên, huyện Lâm Thao, tỉnh Phú Thọ',
      addressEn: 'Zone 4 (Vinh Lai), Ban Nguyen Commune, Lam Thao District, Phú Thọ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ban+Nguyen+Lam+Thao+Phu+Tho',
      contactNote: 'Hotline hỗ trợ: 0961 183 018 · Email: info@banaco.com.vn',
      contactNoteEn: 'Hotline: 0961 183 018 · Email: info@banaco.com.vn',
    },
  },
  {
    orderNumber: 17,
    id: 'dong-trung-ha-thao-anh-minh',
    name: 'Đông trùng hạ thảo Anh Minh',
    nameEn: 'Anh Minh Cordyceps',
    category: CATEGORY_2,
    price: 650000,
    unit: 'hũ/hộp 20g',
    unitEn: '20g jar',
    weight: '20g (sấy thăng hoa)',
    weightEn: '20g (freeze-dried)',
    locality: 'Thanh Thủy',
    ingredients: '100% quả thể nấm Đông trùng hạ thảo Cordyceps militaris nuôi cấy tại Thanh Thủy',
    ingredientsEn: '100% Cordyceps militaris fruiting bodies cultivated in Thanh Thuy',
    shelfLife: '24 tháng nơi khô ráo, đậy nắp kín sau mỗi lần dùng',
    shelfLifeEn: '24 months sealed tightly in a cool, dark place',
    ocopTierSample: 'OCOP 3 sao',
    ocopTierSampleEn: '3-Star OCOP',
    image:
      'https://langngheviet.com.vn/stores/news_dataimages/langnghevietcomvn/122022/20/14/thanh-thuy-phu-tho-dong-trung-ha-thao-san-pham-ocop-3-sao-20-.6381.jpg',
    imageAlt:
      'Đông trùng hạ thảo Anh Minh tại Thanh Thủy, Phú Thọ đăng tải trên langngheviet.com.vn',
    imageAltEn:
      'Anh Minh Cordyceps in Thanh Thuy, Phú Thọ featured on langngheviet.com.vn',
    imageCaption:
      'Ảnh sản phẩm Đông trùng hạ thảo Anh Minh tại Thanh Thủy, Phú Thọ (langngheviet.com.vn)',
    imageCaptionEn:
      'Product photo of Anh Minh Cordyceps in Thanh Thuy, Phú Thọ (langngheviet.com.vn)',
    imageSource: 'https://langngheviet.com.vn/',
    galleryImages: [
      {
        url: 'https://langngheviet.com.vn/stores/news_dataimages/langnghevietcomvn/122022/20/14/thanh-thuy-phu-tho-dong-trung-ha-thao-san-pham-ocop-3-sao-20-.6381.jpg',
        alt: 'Đông trùng hạ thảo Anh Minh tại Thanh Thủy, Phú Thọ',
        altEn: 'Anh Minh Cordyceps in Thanh Thuy, Phú Thọ',
        caption: 'Đông trùng hạ thảo Anh Minh (langngheviet.com.vn)',
        captionEn: 'Anh Minh Cordyceps (langngheviet.com.vn)',
        source: 'https://langngheviet.com.vn/',
      },
      {
        url: 'https://product.hstatic.net/200000851379/product/z5214626586499_6ea3017d06de985b6a058412ee326939_c8c2fa71b77f4ccea97bb2facf0a49ab_grande.jpg',
        alt: 'Hộp sản phẩm Đông trùng hạ thảo Anh Minh',
        altEn: 'Gift jar & box of Anh Minh Cordyceps',
        caption: 'Hộp sản phẩm Đông trùng hạ thảo Anh Minh',
        captionEn: 'Anh Minh Cordyceps packaged jar',
      },
      {
        url: 'https://product.hstatic.net/200000851379/product/5d3_5838_5e4b86152e7e4788b0471818107e402e_grande.jpg',
        alt: 'Sợi nấm Đông trùng hạ thảo Anh Minh sấy khô',
        altEn: 'Dried Anh Minh Cordyceps fruiting bodies',
        caption: 'Thành phẩm Đông trùng hạ thảo Anh Minh',
        captionEn: 'Finished Anh Minh Cordyceps',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Sản phẩm nuôi cấy công nghệ cao tại Thanh Thủy, Phú Thọ do anh Lê Hoàng Hải sáng lập sau gần 2 năm thử nghiệm, đạt chứng nhận OCOP 3 sao.',
    shortDescriptionEn:
      'High-tech cultivated cordyceps founded in Thanh Thuy, Phú Thọ by Mr. Lê Hoàng Hải after nearly two years of trials; certified 3-Star OCOP.',
    story:
      'Ấp ủ ý tưởng khởi nghiệp sau lần tham quan mô hình nuôi cấy đông trùng hạ thảo, anh Lê Hoàng Hải (huyện Thanh Thủy, Phú Thọ) đã tự tìm tòi, học hỏi kinh nghiệm từ nhiều địa phương và thử nghiệm suốt gần 2 năm để sáng lập thương hiệu Đông trùng hạ thảo Anh Minh. Sản phẩm ứng dụng quy trình nuôi cấy trong điều kiện kiểm soát nhiệt độ, độ ẩm và đạt chứng nhận OCOP 3 sao.',
    storyEn:
      'Inspired after visiting a cordyceps cultivation farm, Mr. Lê Hoàng Hải of Thanh Thuy District spent nearly two years researching and running trials before establishing the Anh Minh Cordyceps brand. Grown under controlled cultivation standards, the product achieved 3-Star OCOP certification.',
    originNote:
      'Cơ sở nuôi cấy tại huyện Thanh Thủy, tỉnh Phú Thọ.',
    originNoteEn:
      'Cultivation facility in Thanh Thuy District, Phú Thọ Province.',
    culturalNote:
      'Điểm sáng khởi nghiệp nông nghiệp công nghệ cao của thanh niên huyện Thanh Thủy đạt chuẩn OCOP 3 sao.',
    culturalNoteEn:
      'Highlights youth-led high-tech agricultural entrepreneurship in Thanh Thuy earning 3-Star OCOP recognition.',
    articleLinks: [
      {
        label: 'Thanh Thủy – Đông trùng hạ thảo sản phẩm OCOP 3 sao (Làng nghề Việt)',
        labelEn: 'Thanh Thuy 3-Star OCOP Cordyceps Feature',
        url: 'https://langngheviet.com.vn/thanh-thuy-phu-tho-dong-trung-ha-thao-san-pham-ocop-3-sao-13255.html',
      },
      {
        label: 'Trang giới thiệu Minh Anh Hi-Tech',
        labelEn: 'Minh Anh Hi-Tech Portal',
        url: 'https://minhanhhitech.com/',
      },
    ],
    videoUrl: 'https://youtu.be/3rbFdwIO-Ug?si=ZTWRjIYOA0_Qea40',
    mapUrl: 'https://maps.app.goo.gl/KW2SWTKtJX7xN4AaA?g_st=ic',
    storyUrl:
      'https://langngheviet.com.vn/thanh-thuy-phu-tho-dong-trung-ha-thao-san-pham-ocop-3-sao-13255.html',
    producer: {
      id: 'producer-anh-minh',
      name: 'Cơ sở Đông trùng hạ thảo Anh Minh',
      locality: 'Thanh Thủy',
      localityEn: 'Thanh Thuy',
      address: 'Huyện Thanh Thủy, tỉnh Phú Thọ',
      addressEn: 'Thanh Thuy District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/KW2SWTKtJX7xN4AaA?g_st=ic',
    },
  },
  {
    orderNumber: 18,
    id: 'nam-so-vang-tamogi',
    name: 'Nấm sò vàng Tamogi',
    nameEn: 'Tamogi Golden Oyster Mushroom',
    category: CATEGORY_2,
    price: 95000,
    unit: 'hộp 500g',
    unitEn: '500g box',
    weight: '500g',
    weightEn: '500g',
    locality: 'Phú Thọ',
    ingredients: '100% nấm sò vàng Tamogi tươi nuôi trồng trên giá thể sạch',
    ingredientsEn: '100% fresh Tamogi golden oyster mushrooms on clean substrates',
    shelfLife: '7 ngày trong ngăn mát tủ lạnh (3–5°C) hoặc dùng ngay khi tươi',
    shelfLifeEn: '7 days refrigerated at 3–5°C or cook fresh',
    ocopTierSample: 'OCOP 3 sao tỉnh Phú Thọ',
    ocopTierSampleEn: 'Phú Thọ 3-Star OCOP',
    image:
      'https://vietrap.vn/upload/source/S%E1%BA%A3n%20ph%E1%BA%A9m/z7751545420284_2ed62b482e29cff2292006fd391dacc8.jpg',
    imageAlt:
      'Nấm sò vàng Tamogi nuôi trồng trên giá kệ tại cơ sở VietRAP (vietrap.vn)',
    imageAltEn:
      'Tamogi Golden Oyster Mushrooms grown on cultivation racks at VietRAP (vietrap.vn)',
    imageCaption:
      'Ảnh sản phẩm Nấm sò vàng Tamogi tại cơ sở sản xuất VietRAP (vietrap.vn)',
    imageCaptionEn:
      'Production photo of Tamogi Golden Oyster Mushroom at VietRAP (vietrap.vn)',
    imageSource: 'https://vietrap.vn/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['dac-san-kho'],
    shortDescription:
      'Sản phẩm nấm sò vàng Tamogi đạt chuẩn OCOP 3 sao tỉnh Phú Thọ, nuôi trồng trên hệ thống giá kệ sạch của Công ty Cổ phần VietRAP Đầu tư Thương mại (hộp 500g).',
    shortDescriptionEn:
      'Phú Thọ 3-Star OCOP Tamogi golden oyster mushrooms cultivated on clean indoor racks by VietRAP Investment & Trading JSC (500g box).',
    story:
      'Nấm sò vàng Tamogi đại diện cho hướng canh tác nấm ăn chất lượng cao trên giá thể sạch và hệ thống giá kệ thông thoáng trong nhà kín của Công ty Cổ phần VietRAP Đầu tư Thương mại, giúp bảo đảm vệ sinh an toàn thực phẩm quanh năm thay vì phụ thuộc hoàn toàn vào thời tiết tự nhiên. Từng cụm nấm sắc vàng tươi giòn ngọt đã đạt chứng nhận OCOP 3 sao tỉnh Phú Thọ và được đóng hộp 500g tiện lợi cho bữa ăn gia đình.',
    storyEn:
      'Tamogi Golden Oyster Mushrooms reflect modern indoor rack cultivation at VietRAP Investment & Trading JSC using clean substrates for consistent year-round hygiene and harvest quality. Certified 3-Star OCOP in Phú Thọ, these vibrant golden mushroom clusters offer crisp texture and rich umami flavor in fresh 500g family packs.',
    originNote:
      'Công ty Cổ phần VietRAP Đầu tư Thương mại – Số 21/18/10 đường Võ Nguyên Giáp, tiểu khu Liên Sơn, xã Lương Sơn, tỉnh Phú Thọ.',
    originNoteEn:
      'VietRAP Investment & Trading JSC, No. 21/18/10 Vo Nguyen Giap St., Lien Son Quarter, Luong Son Commune, Phú Thọ.',
    culturalNote:
      'Góp phần làm phong phú nhóm thực phẩm sạch và nông sản chế biến công nghệ sạch đạt chuẩn OCOP tại địa phương.',
    culturalNoteEn:
      'Expands local food diversity with controlled-environment 3-Star OCOP specialty mushroom cultivation.',
    articleLinks: [
      {
        label: 'Trang thông tin cơ sở VietRAP',
        labelEn: 'VietRAP Producer Reference',
        url: 'https://vietrap.vn/',
      },
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=VietRAP+Phu+Tho',
    producer: {
      id: 'producer-vietrap',
      name: 'Công ty Cổ phần VietRAP Đầu tư Thương mại',
      locality: 'Phú Thọ',
      localityEn: 'Phú Thọ',
      address: 'Số 21/18/10 đường Võ Nguyên Giáp, tiểu khu Liên Sơn, xã Lương Sơn, tỉnh Phú Thọ',
      addressEn: '21/18/10 Vo Nguyen Giap St., Lien Son Quarter, Luong Son Commune, Phú Thọ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=VietRAP+Phu+Tho',
      contactNote: 'Hotline hỗ trợ: 0915 387 368. Vui lòng liên hệ trước khi đến tham quan trang trại nấm.',
      contactNoteEn: 'Hotline: 0915 387 368. Please contact before visiting the mushroom farm.',
    },
  },

  // ==========================================================
  // Nhóm 3 – Gia vị, mật ong và thực phẩm địa phương (19 - 28)
  // ==========================================================
  {
    orderNumber: 19,
    id: 'tuong-lang-bo',
    name: 'Tương làng Bợ',
    nameEn: 'Lang Bo Traditional Soy Sauce',
    category: CATEGORY_3,
    price: 100000,
    unit: 'chai 1 lít',
    unitEn: '1-liter bottle',
    weight: '1 lít',
    weightEn: '1 liter',
    locality: 'Thanh Thủy',
    ingredients: 'Gạo nếp đồ xôi lên mốc, đỗ tương, muối hạt, nước giếng khơi mạch rừng',
    ingredientsEn: 'Fermented glutinous rice koji, soybeans, sea salt, forest spring water',
    shelfLife: '12 tháng nơi thoáng mát, đậy kín nắp sau khi dùng',
    shelfLifeEn: '12 months in a cool cupboard, cap tightly after use',
    image:
      'https://ocopvietnam.langngheviet.com.vn/stores/news_dataimages/2024/072024/03/16/in_social/22-120240703160609.jpg?randTime=1794792055',
    imageAlt:
      'Ủ và múc tương truyền thống tại cơ sở sản xuất Tương làng Bợ, Thanh Thủy, Phú Thọ',
    imageAltEn:
      'Traditional soy sauce fermentation and ladling at Lang Bo facility in Thanh Thuy, Phú Thọ',
    imageCaption:
      'Ảnh sản phẩm Tương làng Bợ tại cơ sở sản xuất (ocopvietnam.langngheviet.com.vn)',
    imageCaptionEn:
      'Product photo of Lang Bo Soy Sauce at the production yard (ocopvietnam.langngheviet.com.vn)',
    imageSource: 'https://ocopvietnam.langngheviet.com.vn/',
    secondaryImage:
      'https://dulichphutho.gov.vn/content-uploads/2025/02/tuong-lang-bo-dac-san-nuc-tieng-vung-que-thanh-thuy-637632352926103914.jpg',
    secondaryImageAlt:
      'Sân chum sành phơi ủ tương làng Bợ tại vùng quê Thanh Thủy, Phú Thọ',
    secondaryImageAltEn:
      'Earthenware fermentation jars of Lang Bo soy sauce under the sun in Thanh Thuy, Phú Thọ',
    secondaryImageCaption:
      'Sân chum ủ tương truyền thống làng Bợ, Thanh Thủy (dulichphutho.gov.vn)',
    secondaryImageCaptionEn:
      'Traditional fermentation jar yard in Lang Bo, Thanh Thuy (dulichphutho.gov.vn)',
    secondaryImageSource: 'https://dulichphutho.gov.vn/',
    galleryImages: [
      {
        url: 'https://ocopvietnam.langngheviet.com.vn/stores/news_dataimages/2024/072024/03/16/in_social/22-120240703160609.jpg?randTime=1794792055',
        alt: 'Múc tương truyền thống làng Bợ, Thanh Thủy',
        altEn: 'Ladling fermented Lang Bo traditional soy sauce',
        caption: 'Múc tương tại cơ sở Tương làng Bợ (langngheviet.com.vn)',
        captionEn: 'Lang Bo soy sauce production (langngheviet.com.vn)',
      },
      {
        url: 'https://dulichphutho.gov.vn/content-uploads/2025/02/tuong-lang-bo-dac-san-nuc-tieng-vung-que-thanh-thuy-637632352926103914.jpg',
        alt: 'Sân chum sành phơi nắng ủ Tương làng Bợ',
        altEn: 'Sun-aged earthenware fermentation jars at Lang Bo village',
        caption: 'Sân chum sành ủ tương làng Bợ (dulichphutho.gov.vn)',
        captionEn: 'Earthenware jar yard at Lang Bo (dulichphutho.gov.vn)',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1cW0Wt4J0hm1HWmqsCOS2mLjtDUw7n5KYYrpMX_hRbQ&s=10',
        alt: 'Chai sản phẩm Tương làng Bợ truyền thống',
        altEn: 'Bottled Lang Bo traditional soy sauce',
        caption: 'Sản phẩm Tương làng Bợ',
        captionEn: 'Lang Bo Soy Sauce bottle',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XOGbbLkiQsQTPidNa9zt-N61tFKReVYZ6ntnlsnP6A&s=10',
        alt: 'Hương vị tương làng Bợ vùng quê Thanh Thủy',
        altEn: 'Rich fermented soy sauce from Thanh Thuy',
        caption: 'Tương làng Bợ Thanh Thủy',
        captionEn: 'Lang Bo Soy Sauce showcase',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Đặc sản nổi tiếng vùng quê Thạch Đồng (Thanh Thủy) gắn với câu ca “Nhất kinh kỳ, nhì Bợ Bạt”, lên men tự nhiên từ gạo nếp, nước đỗ và nước giếng khơi mạch rừng.',
    shortDescriptionEn:
      'Historic fermented soy sauce from Thach Dong (Thanh Thuy), aged 1–2 months in earthenware jars with glutinous rice mold, soybeans, and forest spring water.',
    story:
      '“Nhất kinh kỳ, nhì Bợ Bạt” là câu ca truyền miệng nhắc nhớ về làng Bợ (xã Thạch Đồng, huyện Thanh Thủy) xưa trên bến dưới thuyền giao thương nhộn nhịp dọc sông Đà. Tương làng Bợ được làm công phu từ gạo nếp đồ xôi ủ lên mốc khoảng 1 tuần rồi phơi khô, hòa cùng nước đỗ ngâm bằng nước giếng khơi mạch rừng phơi nắng và ủ kỹ từ 1–2 tháng trong chum sành. Tương nguyên chất để càng lâu càng đỏ, vị ngọt đậm đà, đặc biệt hợp kho om các món cá sông Đà.',
    storyEn:
      'Celebrated in the folk saying "First the Capital, second Bo Bat," ancient Bo Village (Thach Dong, Thanh Thuy) thrived along the Da River trade routes. Master makers steam glutinous rice for 1-week mold fermentation, dry it in the sun, blend with soybeans soaked in pure forest-spring well water, and age the mixture for 1–2 months in clay jars—yielding deep amber sweetness prized for braising Da River fish.',
    originNote:
      'Làng Bợ, xã Thạch Đồng, huyện Thanh Thủy, tỉnh Phú Thọ.',
    originNoteEn:
      'Lang Bo, Thach Dong Commune, Thanh Thuy District, Phú Thọ.',
    culturalNote:
      'Gắn với câu ca “Nhất kinh kỳ, nhì Bợ Bạt” và ký ức ẩm thực sông Đà qua nhiều thế hệ.',
    culturalNoteEn:
      'Rooted in the historic river-port proverb "Nhat kinh ky, nhi Bo Bat" and Da River culinary heritage.',
    processSteps: [
      'Đồ xôi gạo nếp và ủ lên mốc khoảng 1 tuần, sau đó trải ra nong phơi cho mốc khô.',
      'Ngâm đỗ bằng nước giếng khơi mạch rừng tinh khiết rồi phơi nắng cho dậy mùi thơm.',
      'Trộn đều mốc khô, nước đỗ và muối thành mốc chè, ủ kỹ 1–2 tháng trong chum sành tới khi ngả màu vàng ươm, đỏ đậm.',
    ],
    processStepsEn: [
      'Steam glutinous rice and ferment into koji mold for ~1 week, then sun-dry on bamboo trays.',
      'Soak soybeans in crisp forest-spring well water and sun-warm to unlock deep aroma.',
      'Combine dried mold, soybean infusion, and sea salt; age 1–2 months in earthenware jars until rich golden-amber.',
    ],
    articleLinks: [
      {
        label: 'Tương làng Bợ – Đặc sản nức tiếng Thanh Thủy (Du lịch Phú Thọ)',
        labelEn: 'Lang Bo Soy Sauce – Thanh Thuy Specialty (Phu Tho Tourism)',
        url: 'https://dulichphutho.gov.vn/tuong-lang-bo-dac-san-nuc-tieng-vung-que-thanh-thuy.html',
      },
      {
        label: 'Nức tiếng tương làng Bợ (Báo Phú Thọ)',
        labelEn: 'Famed Lang Bo Soy Sauce (Bao Phu Tho)',
        url: 'https://baophutho.vn/nuc-tieng-tuong-lang-bo-174585.htm',
      },
    ],
    videoUrl: 'https://youtu.be/JB5yrwTGk_4?si=dqQxmcKLUcfAm0R6',
    mapUrl: 'https://maps.app.goo.gl/xde5QBSqXyEbcsCv9?g_st=ic',
    storyUrl: 'https://myphutho.vn/vi/detailtravelplace/?id=150',
    producer: {
      id: 'producer-tuong-lang-bo',
      name: 'Làng nghề Tương làng Bợ (Thạch Đồng)',
      locality: 'Thanh Thủy',
      localityEn: 'Thanh Thuy',
      address: 'Xã Thạch Đồng, huyện Thanh Thủy, tỉnh Phú Thọ',
      addressEn: 'Thach Dong Commune, Thanh Thuy District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/xde5QBSqXyEbcsCv9?g_st=ic',
    },
  },
  {
    orderNumber: 20,
    id: 'tuong-co-dat-to-holusa',
    name: 'Tương cổ Đất Tổ Holusa',
    nameEn: 'Holusa Ancient Dat To Soy Sauce',
    category: CATEGORY_3,
    price: 120000,
    unit: 'chai 1,5 lít',
    unitEn: '1.5L bottle',
    weight: '1,5 lít',
    weightEn: '1.5 liters',
    locality: 'Lâm Thao',
    ingredients: 'Gạo nếp cái hoa vàng, đỗ tương, muối tinh khiết, nước sạch',
    ingredientsEn: 'Glutinous rice, soybeans, pure sea salt, clean water',
    shelfLife: '12 tháng nơi khô mát, tránh ánh nắng trực tiếp',
    shelfLifeEn: '12 months in a cool, dark place',
    image:
      'https://dulichphutho.gov.vn/content-uploads/2025/02/khat-vong-hoa-lua-637714401535025746.jpg',
    imageAlt:
      'Chai Tương cổ Đất Tổ Holusa 1,5L và Nước cốt tương Holusa 500ml chụp cùng chứng nhận trên dulichphutho.gov.vn',
    imageAltEn:
      'Bottles of Holusa Ancient Dat To Soy Sauce 1.5L and Soy Sauce Essence 500ml on dulichphutho.gov.vn',
    imageCaption:
      'Ảnh chai sản phẩm Tương cổ Đất Tổ Holusa (dulichphutho.gov.vn)',
    imageCaptionEn:
      'Product bottle photo of Holusa Ancient Dat To Soy Sauce (dulichphutho.gov.vn)',
    imageSource: 'https://dulichphutho.gov.vn/',
    secondaryImage:
      'https://baophutho.vn/thumbnail/news/lam-thao-phat-t-w720t0-di2514d117d0135721t7974l3-img-0563.webp',
    secondaryImageAlt:
      'Kệ trưng bày các dòng sản phẩm tương Holusa tại Lâm Thao, Phú Thọ',
    secondaryImageAltEn:
      'Display shelf of Holusa soy sauce lines in Lam Thao, Phú Thọ',
    secondaryImageCaption: 'Khu vực trưng bày sản phẩm Holusa (baophutho.vn)',
    secondaryImageCaptionEn: 'Holusa product display area (baophutho.vn)',
    secondaryImageSource: 'https://baophutho.vn/',
    galleryImages: [
      {
        url: 'https://dulichphutho.gov.vn/content-uploads/2025/02/khat-vong-hoa-lua-637714401535025746.jpg',
        alt: 'Chai Tương cổ Đất Tổ Holusa cùng chứng nhận',
        altEn: 'Holusa Ancient Dat To Soy Sauce bottle',
        caption: 'Tương cổ Đất Tổ Holusa (dulichphutho.gov.vn)',
        captionEn: 'Holusa Ancient Dat To Soy Sauce (dulichphutho.gov.vn)',
      },
      {
        url: 'https://i.baophutho.vn/news/2142/111d0105800t180425l1.webp',
        alt: 'Sản phẩm tương cổ truyền HOLUSA (Báo Phú Thọ)',
        altEn: 'HOLUSA traditional soy sauce product (Bao Phu Tho)',
        caption: 'Sản phẩm HOLUSA (i.baophutho.vn)',
        captionEn: 'HOLUSA product photo (i.baophutho.vn)',
      },
      {
        url: 'https://i.baophutho.vn/news/2142/111d0105800t180425l2.webp',
        alt: 'Chế biến tương truyền thống tại Hoa Lúa',
        altEn: 'Traditional fermentation at Hoa Lua facility',
        caption: 'Sản xuất tương HOLUSA (i.baophutho.vn)',
        captionEn: 'HOLUSA craft production (i.baophutho.vn)',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvR_OHI5S_IE1J3rIUPZeDOVPbfyLxJ1lDDgABNkK2g&s=10',
        alt: 'Nhãn hiệu Nước tương làng cổ HOLUSA',
        altEn: 'HOLUSA Ancient Village Soy Sauce line',
        caption: 'Nước tương làng cổ HOLUSA',
        captionEn: 'HOLUSA Ancient Village Soy Sauce',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Sản phẩm của Công ty TNHH MTV Hoa Lúa (thương hiệu Nước tương làng cổ HOLUSA), gìn giữ “tinh hoa của lúa” và kỹ nghệ làm tương cổ truyền vùng Đất Tổ.',
    shortDescriptionEn:
      'Crafted by Hoa Lua Co., Ltd. under the HOLUSA Ancient Village Soy Sauce brand, preserving traditional Đất Tổ fermentation craft.',
    story:
      'Gần 10 năm trước, anh Thông thành lập Công ty TNHH MTV Hoa Lúa và bắt đầu nghiên cứu phát triển thương hiệu Nước tương làng cổ HOLUSA. Với tâm niệm gìn giữ “tinh hoa của lúa” từ nghề làm tương truyền thống quê hương Lâm Thao, dòng sản phẩm Tương cổ Đất Tổ và Nước cốt tương HOLUSA đã tạo nên bản sắc riêng, được đông đảo khách hàng tin dùng như một gia vị mang câu chuyện văn hóa Đất Tổ.',
    storyEn:
      'Nearly a decade ago, Mr. Thông founded Hoa Lúa Co., Ltd. in Lam Thao to revitalize ancestral village fermentation under the HOLUSA brand. Guided by a mission to honor "the essence of rice," HOLUSA Ancient Dat To Soy Sauce stands out from industrial condiments through its authentic regional craftsmanship.',
    originNote:
      'Công ty TNHH MTV Hoa Lúa, huyện Lâm Thao, tỉnh Phú Thọ.',
    originNoteEn:
      'Hoa Lua One-Member Co., Ltd., Lam Thao District, Phú Thọ Province.',
    culturalNote:
      'Kết hợp câu chuyện nghề tương cổ truyền với thương hiệu hàng hóa hiện đại “Nước tương làng cổ HOLUSA”.',
    culturalNoteEn:
      'Bridges village fermentation heritage with the modern HOLUSA regional culinary brand.',
    articleLinks: [
      {
        label: 'Khát vọng Hoa Lúa (Báo Phú Thọ)',
        labelEn: 'Hoa Lua Aspiration (Bao Phu Tho)',
        url: 'https://baophutho.vn/khat-vong-hoa-lua-180425.htm',
      },
      {
        label: 'Nâng tầm giá trị sản phẩm OCOP (Báo Phú Thọ)',
        labelEn: 'Elevating OCOP Value (Bao Phu Tho)',
        url: 'https://baophutho.vn/nang-tam-gia-tri-san-pham-ocop-182992.htm',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/wRDpHLnVHw26atap9?g_st=ic',
    storyUrl: 'https://baophutho.vn/nang-tam-gia-tri-san-pham-ocop-182992.htm',
    producer: {
      id: 'producer-holusa',
      name: 'Công ty TNHH MTV Hoa Lúa (HOLUSA)',
      locality: 'Lâm Thao',
      localityEn: 'Lam Thao',
      address: 'Huyện Lâm Thao, tỉnh Phú Thọ',
      addressEn: 'Lam Thao District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/wRDpHLnVHw26atap9?g_st=ic',
    },
  },
  {
    orderNumber: 21,
    id: 'nuoc-cot-tuong-holusa',
    name: 'Nước cốt tương Holusa',
    nameEn: 'Holusa Soy Sauce Essence',
    category: CATEGORY_3,
    price: 120000,
    unit: 'chai 500ml',
    unitEn: '500ml bottle',
    weight: '500ml',
    weightEn: '500ml',
    locality: 'Lâm Thao',
    ingredients: 'Nước cốt chắt lọc từ tương gạo nếp – đỗ tương lên men cổ truyền',
    ingredientsEn: 'First-press essence of fermented glutinous rice and soybean sauce',
    shelfLife: '12 tháng nơi thoáng mát, tránh nắng trực tiếp',
    shelfLifeEn: '12 months in a cool place away from direct light',
    image:
      'https://dulichphutho.gov.vn/content-uploads/2025/02/khat-vong-hoa-lua-637714401535025746.jpg',
    imageAlt:
      'Chai Nước cốt tương Holusa 500ml đặt cạnh Tương cổ Đất Tổ Holusa trên dulichphutho.gov.vn',
    imageAltEn:
      'Bottle of Holusa Soy Sauce Essence 500ml alongside Holusa Ancient Soy Sauce on dulichphutho.gov.vn',
    imageCaption:
      'Ảnh chai sản phẩm Nước cốt tương Holusa (dulichphutho.gov.vn)',
    imageCaptionEn:
      'Product bottle photo of Holusa Soy Sauce Essence (dulichphutho.gov.vn)',
    imageSource: 'https://dulichphutho.gov.vn/',
    secondaryImage:
      'https://i.baophutho.vn/news/2142/111d0105800t180425l3.webp',
    secondaryImageAlt: 'Sản phẩm Nước cốt tương HOLUSA tại Công ty Hoa Lúa',
    secondaryImageAltEn: 'HOLUSA Soy Sauce Essence at Hoa Lua facility',
    secondaryImageCaption: 'Sản phẩm Nước cốt tương HOLUSA (i.baophutho.vn)',
    secondaryImageCaptionEn: 'HOLUSA Soy Sauce Essence (i.baophutho.vn)',
    secondaryImageSource: 'https://baophutho.vn/khat-vong-hoa-lua-180425.htm',
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Dòng nước cốt tương truyền thống của Công ty TNHH MTV Hoa Lúa (Lâm Thao), chắt lọc hương vị cổ truyền quê hương Phú Thọ.',
    shortDescriptionEn:
      'Concentrated traditional soy sauce essence crafted by Hoa Lua Co., Ltd. (Lam Thao), capturing ancestral village fermentation depth.',
    story:
      'Là một trong hai dòng sản phẩm chủ lực song hành cùng Tương cổ Đất Tổ của Công ty TNHH MTV Hoa Lúa (anh Thông, Lâm Thao). Nước cốt tương HOLUSA ra đời từ quá trình nghiên cứu gần 10 năm nhằm đưa hương vị tương làng cổ bước ra thị trường hàng hóa hiện đại mà vẫn giữ trọn “tinh hoa của lúa”.',
    storyEn:
      'Created alongside Holusa Ancient Soy Sauce by Mr. Thông at Hoa Lúa Co., Ltd. in Lam Thao, Holusa Soy Sauce Essence distills nearly a decade of craft refinement to bring heritage village seasoning into contemporary kitchens.',
    originNote:
      'Công ty TNHH MTV Hoa Lúa, huyện Lâm Thao, tỉnh Phú Thọ.',
    originNoteEn:
      'Hoa Lua One-Member Co., Ltd., Lam Thao District, Phú Thọ Province.',
    articleLinks: [
      {
        label: 'Khát vọng Hoa Lúa (Báo Phú Thọ)',
        labelEn: 'Hoa Lua Aspiration (Bao Phu Tho)',
        url: 'https://baophutho.vn/khat-vong-hoa-lua-180425.htm',
      },
      {
        label: 'Nâng tầm giá trị sản phẩm OCOP (Báo Phú Thọ)',
        labelEn: 'Elevating OCOP Value (Bao Phu Tho)',
        url: 'https://baophutho.vn/nang-tam-gia-tri-san-pham-ocop-182992.htm',
      },
    ],
    mapUrl: 'https://maps.app.goo.gl/wRDpHLnVHw26atap9?g_st=ic',
    storyUrl: 'https://baophutho.vn/nang-tam-gia-tri-san-pham-ocop-182992.htm',
    producer: {
      id: 'producer-holusa',
      name: 'Công ty TNHH MTV Hoa Lúa (HOLUSA)',
      locality: 'Lâm Thao',
      localityEn: 'Lam Thao',
      address: 'Huyện Lâm Thao, tỉnh Phú Thọ',
      addressEn: 'Lam Thao District, Phú Thọ',
      mapUrl: 'https://maps.app.goo.gl/wRDpHLnVHw26atap9?g_st=ic',
    },
  },
  {
    orderNumber: 22,
    id: 'mat-ong-tam-dao',
    name: 'Mật ong Tam Đảo',
    nameEn: 'Tam Dao Honey',
    category: CATEGORY_3,
    price: 290000,
    unit: 'hũ 500g',
    unitEn: '500g jar',
    weight: '500g',
    weightEn: '500g',
    locality: 'Tam Đảo / Phú Thọ',
    ingredients: '100% mật ong hoa thiên nhiên vùng Tam Đảo nguyên chất',
    ingredientsEn: '100% pure natural Tam Dao blossom honey',
    shelfLife: '24 tháng ở nhiệt độ phòng, tránh ánh nắng trực tiếp',
    shelfLifeEn: '24 months at room temperature away from direct sunlight',
    image:
      'https://cdn1792.cdn4s4.io.vn/media/san-pham/mat-ong-tu-nhien_1/mat-ong-tam-dao-dac-biet-honeco-500g_1.jpg',
    imageAlt:
      'Lọ Mật ong Tam Đảo đặc biệt Honeco 500g chính hãng từ website honeco.com',
    imageAltEn:
      'Official 500g jar of Honeco Tam Dao Special Honey from honeco.com',
    imageCaption: 'Ảnh sản phẩm chính thức Mật ong Tam Đảo Honeco (honeco.com)',
    imageCaptionEn: 'Official product photo of Honeco Tam Dao Honey (honeco.com)',
    imageSource: 'https://honeco.com/',
    secondaryImage:
      'https://honeco.com/templates/fashion03/assets/media/banner/honeco_60_nam_kinh_nghiem_nuoi_ong_gia_truyen.jpg',
    secondaryImageAlt: 'Honeco – 60 năm kinh nghiệm nuôi ong gia truyền Tam Đảo',
    secondaryImageAltEn: 'Honeco 60 years of family beekeeping heritage',
    secondaryImageCaption: '60 năm kinh nghiệm nuôi ong gia truyền Honeco (honeco.com)',
    secondaryImageCaptionEn: 'Honeco 60-year beekeeping heritage (honeco.com)',
    secondaryImageSource: 'https://honeco.com/',
    galleryImages: [
      {
        url: 'https://cdn1792.cdn4s4.io.vn/media/san-pham/mat-ong-tu-nhien_1/mat-ong-tam-dao-dac-biet-honeco-500g_1.jpg',
        alt: 'Lọ Mật ong đặc biệt Tam Đảo 500g Honeco',
        altEn: 'Honeco 500g Tam Dao Special Honey jar',
        caption: 'Mật ong đặc biệt Tam Đảo 500g (honeco.com)',
        captionEn: 'Honeco Tam Dao Special Honey 500g (honeco.com)',
        source: 'https://honeco.com/',
      },
      {
        url: 'https://honeco.com/templates/fashion03/assets/media/banner/honeco_60_nam_kinh_nghiem_nuoi_ong_gia_truyen.jpg',
        alt: 'Truyền thống 60 năm nuôi ong của Honeco',
        altEn: '60 years of Honeco family beekeeping',
        caption: '60 năm kinh nghiệm nuôi ong gia truyền (honeco.com)',
        captionEn: '60-year beekeeping tradition (honeco.com)',
      },
      {
        url: 'https://cdn1792.cdn4s4.io.vn/thumbs/bai-viet/blog/mat-ong-thay-duong_thumb_720.jpg',
        alt: 'Mật ong tự nhiên Honeco Tam Đảo',
        altEn: 'Natural honey by Honeco Tam Dao',
        caption: 'Sản phẩm mật ong tự nhiên Honeco',
        captionEn: 'Honeco natural honey showcase',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Mật ong đặc biệt Tam Đảo 500g của Honeco – thương hiệu gắn với 60 năm kinh nghiệm nuôi ong gia truyền và minh bạch quy trình sản xuất.',
    shortDescriptionEn:
      'Honeco Special Tam Dao Honey (500g), backed by 60 years of family beekeeping heritage and transparent production standards.',
    story:
      'Xuất phát từ trăn trở của Tổng giám đốc Honeco Lê Thị Nga khi nghe nhận xét mật ong Việt Nam chưa có tên trên bản đồ mật ong thế giới, bà quyết tâm công khai minh bạch toàn bộ quy trình sản xuất và giải thích khoa học cho người tiêu dùng về hiện tượng kết tinh tự nhiên của mật ong nguyên chất. Sau những năm tháng kiên trì xây dựng niềm tin, Mật ong Tam Đảo Honeco đã khẳng định uy tín trong nước và đồng hành cùng nhiều người Việt ở nước ngoài.',
    storyEn:
      'Determined to put Vietnamese honey on the world map, Honeco CEO Lê Thị Nga opened every step of production to public transparency and educated consumers on natural honey crystallization. Backed by 60 years of family beekeeping heritage, Honeco Tam Dao Honey has earned lasting trust both domestically and among Vietnamese abroad.',
    originNote:
      'Cơ sở Ong Tam Đảo – Honeco với 60 năm kinh nghiệm nuôi ong gia truyền.',
    originNoteEn:
      'Tam Dao Bee JSC (Honeco) with 60 years of family beekeeping expertise.',
    culturalNote:
      'Câu chuyện bền bỉ xóa bỏ hiểu lầm về mật ong kết tinh tự nhiên và khát vọng đưa mật ong Việt vươn tầm quốc tế.',
    culturalNoteEn:
      'A story of consumer transparency around raw honey crystallization and elevating Vietnamese apiculture globally.',
    articleLinks: [
      {
        label: 'Mật ong Tam Đảo và bí quyết chinh phục thị trường khó tính (Bộ Công Thương)',
        labelEn: 'Tam Dao Honey Reaching Demanding Markets (MOIT)',
        url: 'https://moit.gov.vn/tu-hao-hang-viet-nam/mat-ong-tam-dao-va-bi-quyet-chinh-phuc-cac-thi-truong-kho-tinh.html',
      },
      {
        label: 'Câu chuyện Nữ tướng Honeco',
        labelEn: 'The Leader Behind Honeco',
        url: 'https://honeco.com/nu-tuong-honeco',
      },
    ],
    videoUrl: 'https://youtu.be/QL3iFeQQsp8?si=wR9A7ogpZeJ2edj-',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    storyUrl: 'https://honeco.com/nu-tuong-honeco',
    producer: {
      id: 'producer-honeco',
      name: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
      locality: 'Tam Đảo / Phú Thọ',
      localityEn: 'Tam Dao / Phú Thọ',
      address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
      addressEn: 'Honeco Facility (view on Google Maps)',
      mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
      contactNote:
        'Tổng giám đốc Lê Thị Nga. Quy cách Mật ong đặc biệt Tam Đảo 500g giá 290.000 VNĐ.',
      contactNoteEn:
        'CEO: Ms. Lê Thị Nga. Listed reference: Special Tam Dao Honey 500g jar at 290,000 VND.',
    },
  },
  {
    orderNumber: 23,
    id: 'mat-ong-curcumin',
    name: 'Mật ong Curcumin',
    nameEn: 'Curcumin Honey',
    category: CATEGORY_3,
    price: 490000,
    unit: 'hũ 500g',
    unitEn: '500g jar',
    weight: '500g',
    weightEn: '500g',
    locality: 'Tam Đảo / Phú Thọ',
    ingredients: 'Mật ong hoa rừng Tam Đảo kết hợp tinh chất nghệ Nano Curcumin',
    ingredientsEn: 'Natural forest honey blended with Turmeric Curcumin extract',
    shelfLife: '24 tháng nơi khô ráo, thoáng mát',
    shelfLifeEn: '24 months in a cool, dry pantry',
    image:
      'https://cdn1792.cdn4s4.io.vn/media/san-pham/mat-ong-curcumin/mat-ong-nghe-curcumin-honeco_1.jpg',
    imageAlt:
      'Hộp và lọ Mật ong nghệ Curcumin Honeco chính hãng từ website honeco.com',
    imageAltEn:
      'Official box and jar of Honeco Curcumin Turmeric Honey from honeco.com',
    imageCaption: 'Ảnh sản phẩm chính thức Mật ong Curcumin Honeco (honeco.com)',
    imageCaptionEn: 'Official product photo of Honeco Curcumin Honey (honeco.com)',
    imageSource: 'https://honeco.com/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Dòng mật ong kết hợp tinh chất nghệ Curcumin hũ 500g của Honeco – thương hiệu gắn với 60 năm nuôi ong gia truyền.',
    shortDescriptionEn:
      '500g jar of Honeco honey blended with turmeric Curcumin extract, backed by 60 years of family beekeeping heritage.',
    story:
      'Thấu hiểu nhu cầu chăm sóc tiêu hóa và thói quen dùng mật ong pha nghệ mỗi sáng của nhiều gia đình Việt, đội ngũ Ong Tam Đảo (Honeco) đã nghiên cứu kết hợp mật ong tự nhiên tuyển chọn với tinh chất Curcumin thành một hỗn hợp đồng nhất trong lọ thủy tinh 500g tiện dụng. Sản phẩm kế thừa tâm huyết công khai minh bạch quy trình sản xuất của Tổng giám đốc Lê Thị Nga, giúp người tiêu dùng tiếp cận sản phẩm từ nghề ong gia truyền 60 năm mà không phải tự pha trộn thủ công.',
    storyEn:
      'Inspired by the traditional Vietnamese habit of taking honey with turmeric each morning, Tam Dao Bee JSC (Honeco) combined carefully selected raw honey with golden Curcumin essence into a convenient 500g daily jar. Guided by CEO Lê Thị Nga’s 60-year family beekeeping heritage and open-process standards, the product offers transparent craftsmanship without messy home mixing.',
    originNote:
      'Công ty Cổ phần Ong Tam Đảo (Honeco) – kế thừa 60 năm kinh nghiệm nuôi ong gia truyền.',
    originNoteEn:
      'Tam Dao Bee JSC (Honeco), rooted in 60 years of family beekeeping expertise.',
    culturalNote:
      'Nâng tầm bài phối hợp dân gian mật ong – nghệ thành sản phẩm tiêu chuẩn hóa tiện dụng cho đời sống hiện đại.',
    culturalNoteEn:
      'Refines the classic honey-and-turmeric household tradition into a consistent, travel-ready jar.',
    articleLinks: [
      {
        label: 'Câu chuyện Nữ tướng Honeco',
        labelEn: 'The Leader Behind Honeco',
        url: 'https://honeco.com/nu-tuong-honeco',
      },
    ],
    videoUrl: 'https://youtu.be/QL3iFeQQsp8?si=wR9A7ogpZeJ2edj-',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    storyUrl: 'https://honeco.com/nu-tuong-honeco',
    producer: {
      id: 'producer-honeco',
      name: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
      locality: 'Tam Đảo / Phú Thọ',
      localityEn: 'Tam Dao / Phú Thọ',
      address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
      addressEn: 'Honeco Facility (view on Google Maps)',
      mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    },
  },
  {
    orderNumber: 24,
    id: 'mat-ong-sua-chua',
    name: 'Mật ong sữa chúa',
    nameEn: 'Royal Jelly Honey',
    category: CATEGORY_3,
    price: 195000,
    unit: 'hũ 450g',
    unitEn: '450g jar',
    weight: '450g',
    weightEn: '450g',
    locality: 'Tam Đảo / Phú Thọ',
    ingredients: 'Mật ong tự nhiên Tam Đảo nguyên chất (97%) và sữa ong chúa tươi (3%)',
    ingredientsEn: 'Pure Tam Dao honey (97%) and fresh royal jelly (3%)',
    shelfLife: '24 tháng nơi thoáng mát, tránh ánh nắng trực tiếp',
    shelfLifeEn: '24 months in a cool place away from sunlight',
    image:
      'https://cdn1792.cdn4s4.io.vn/thumbs/san-pham/mat-ong-sua-chua/mat-ong-chua-chua-honeco-450g_thumb_720.jpg',
    imageAlt:
      'Lọ Mật ong sữa chúa Honeco chính hãng từ website honeco.com',
    imageAltEn:
      'Official jar of Honeco Royal Jelly Honey from honeco.com',
    imageCaption: 'Ảnh sản phẩm chính thức Mật ong sữa chúa Honeco (honeco.com)',
    imageCaptionEn: 'Official product photo of Honeco Royal Jelly Honey (honeco.com)',
    imageSource: 'https://honeco.com/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Sản phẩm Mật ong kết hợp sữa ong chúa hũ 450g chính hãng Honeco, vị béo dịu thanh mát thích hợp biếu tặng người thân cao tuổi.',
    shortDescriptionEn:
      'Official 450g Honeco Royal Jelly Honey jar with mild, creamy floral notes ideal for gifting elders.',
    story:
      'Trong nghề nuôi ong gia truyền 60 năm của Ong Tam Đảo (Honeco), sữa ong chúa tươi vốn khó bảo quản riêng lẻ ở điều kiện thường nếu không có mật ong tự nhiên làm dung môi tự nhiên. Bằng cách hòa quyện sữa ong chúa cùng mật ong chín tổ theo tỷ lệ cân đối, sản phẩm Mật ong sữa chúa Honeco 450g giúp lưu giữ hương vị béo dịu đặc trưng và trở thành lựa chọn biếu tặng trang nhã cho người thân cao tuổi.',
    storyEn:
      'Across Honeco’s 60-year beekeeping lineage, delicate fresh royal jelly is traditionally preserved within natural golden honey to maintain stability without artificial preservatives. Honeco Royal Jelly Honey 450g pairs mature honey with balanced royal jelly for a smooth, mildly creamy flavor prized for family gifting.',
    originNote:
      'Công ty Cổ phần Ong Tam Đảo (Honeco).',
    originNoteEn:
      'Tam Dao Bee JSC (Honeco).',
    culturalNote:
      'Thể hiện kỹ thuật thu hoạch và phối trộn các sản vật tinh túy của tổ ong theo kinh nghiệm gia truyền.',
    culturalNoteEn:
      'Showcases multi-generational apiculture skill blending delicate hive harvests.',
    videoUrl: 'https://youtu.be/QL3iFeQQsp8?si=wR9A7ogpZeJ2edj-',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    storyUrl: 'https://honeco.com/nu-tuong-honeco',
    producer: {
      id: 'producer-honeco',
      name: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
      locality: 'Tam Đảo / Phú Thọ',
      localityEn: 'Tam Dao / Phú Thọ',
      address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
      addressEn: 'Honeco Facility (view on Google Maps)',
      mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    },
  },
  {
    orderNumber: 25,
    id: 'mat-ong-hoa-rung',
    name: 'Mật ong hoa rừng',
    nameEn: 'Wildflower Honey',
    category: CATEGORY_3,
    price: 130000,
    unit: 'hũ 450g',
    unitEn: '450g jar',
    weight: '450g',
    weightEn: '450g',
    locality: 'Tam Đảo / Phú Thọ',
    ingredients: '100% mật ong đa hoa rừng thu hoạch theo mùa vụ',
    ingredientsEn: '100% seasonal mountain wildflower honey',
    shelfLife: '24 tháng bảo quản nhiệt độ phòng nơi khô thoáng',
    shelfLifeEn: '24 months at room temperature in a dry space',
    image:
      'https://cdn1792.cdn4s4.io.vn/thumbs/san-pham/mat-ong-hoa-rung/mat-ong-hoa-rung-honeco-450g_1_thumb_720.jpg',
    imageAlt:
      'Lọ Mật ong hoa rừng Honeco chính hãng từ website honeco.com',
    imageAltEn:
      'Official jar of Honeco Wildflower Honey from honeco.com',
    imageCaption: 'Ảnh sản phẩm chính thức Mật ong hoa rừng Honeco (honeco.com)',
    imageCaptionEn: 'Official product photo of Honeco Wildflower Honey (honeco.com)',
    imageSource: 'https://honeco.com/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Mật ong hoa rừng tự nhiên thu hoạch theo mùa hoa của Honeco, hũ thủy tinh 450g giữ trọn hương sắc đa hoa vùng đồi núi.',
    shortDescriptionEn:
      'Seasonal natural wildflower honey harvested by Honeco beekeepers in a 450g glass jar.',
    story:
      'Khác với mật đơn hoa, Mật ong hoa rừng Honeco được đàn ong thu lượm từ nhiều loài hoa rừng nở nối tiếp nhau qua các mùa trên vùng đồi núi. Cũng vì thu hái từ đa dạng nguồn mật tự nhiên nên hương thơm và sắc màu mật có thể chuyển biến tinh tế theo từng vụ và dễ kết tinh tự nhiên khi trời trở lạnh – điều mà CEO Honeco Lê Thị Nga luôn bền bỉ giải thích công khai để khách hàng thêm trân trọng mật ong thật.',
    storyEn:
      'Gathered by honeybees foraging across diverse mountain blossoms over changing seasons, Honeco Wildflower Honey carries a layered botanical bouquet whose hue subtly shifts with each harvest. Its natural tendency to crystallize in cooler weather became a cornerstone of CEO Lê Thị Nga’s public education campaign celebrating authentic, unadulterated honey.',
    originNote:
      'Khai thác và đóng gói tại Công ty Cổ phần Ong Tam Đảo (Honeco).',
    originNoteEn:
      'Harvested and packed by Tam Dao Bee JSC (Honeco).',
    culturalNote:
      'Lưu giữ hương sắc đa hoa tự nhiên theo từng mùa vụ của vùng trung du – miền núi.',
    culturalNoteEn:
      'Captures the seasonal biodiversity of midland and mountain forest blossoms.',
    videoUrl: 'https://youtu.be/QL3iFeQQsp8?si=wR9A7ogpZeJ2edj-',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    storyUrl: 'https://honeco.com/nu-tuong-honeco',
    producer: {
      id: 'producer-honeco',
      name: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
      locality: 'Tam Đảo / Phú Thọ',
      localityEn: 'Tam Dao / Phú Thọ',
      address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
      addressEn: 'Honeco Facility (view on Google Maps)',
      mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    },
  },
  {
    orderNumber: 26,
    id: 'mat-ong-chanh-leo',
    name: 'Mật ong chanh leo',
    nameEn: 'Passion Fruit Honey',
    category: CATEGORY_3,
    price: 360000,
    unit: 'hũ 500g',
    unitEn: '500g jar',
    weight: '500g',
    weightEn: '500g',
    locality: 'Tam Đảo / Phú Thọ',
    ingredients: 'Mật ong hoa thiên nhiên Tam Đảo kết hợp nước cốt chanh leo tự nhiên',
    ingredientsEn: 'Natural Tam Dao blossom honey & fresh passion fruit extract',
    shelfLife: '18 tháng nơi khô mát, tránh ánh nắng trực tiếp',
    shelfLifeEn: '18 months in a cool place away from direct sun',
    image:
      'https://cdn1792.cdn4s4.io.vn/thumbs/san-pham/mat-ong-chanh-leo/mat-ong-chanh-leo-honeco-500-g_thumb_720.jpg',
    imageAlt:
      'Lọ Mật ong chanh leo Honeco chính hãng từ website honeco.com',
    imageAltEn:
      'Official jar of Honeco Passion Fruit Honey from honeco.com',
    imageCaption: 'Ảnh sản phẩm chính thức Mật ong chanh leo Honeco (honeco.com)',
    imageCaptionEn: 'Official product photo of Honeco Passion Fruit Honey (honeco.com)',
    imageSource: 'https://honeco.com/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Mật ong kết hợp chanh leo hũ 500g của Honeco, dễ pha uống hằng ngày cùng nước ấm hoặc đá mát giải nhiệt thanh lành.',
    shortDescriptionEn:
      '500g jar of Honeco passion fruit infused honey ideal for daily warm or iced beverages.',
    story:
      'Trong hành trình đa dạng hóa sản phẩm để người Việt – đặc biệt là giới trẻ – sử dụng mật ong thường xuyên hơn trong sinh hoạt hằng ngày, Honeco đã kết hợp vị ngọt thanh của mật ong tự nhiên cùng hương chua dịu, thơm nức của trái chanh leo trong lọ thủy tinh 500g. Chỉ cần một thìa khuấy cùng nước ấm buổi sáng hoặc nước mát ngày hè, Mật ong chanh leo mang đến thức uống giải nhiệt nhanh gọn thay thế nước ngọt công nghiệp.',
    storyEn:
      'To encourage everyday honey enjoyment beyond seasonal remedies, Honeco paired floral honey with vibrant, tangy passion fruit aroma in a 500g jar. Designed for young families and busy mornings, a single spoonful stirred into warm or chilled water creates a refreshing natural drink without relying on refined syrups.',
    originNote:
      'Công ty Cổ phần Ong Tam Đảo (Honeco).',
    originNoteEn:
      'Tam Dao Bee JSC (Honeco).',
    culturalNote:
      'Sáng tạo đồ uống hiện đại giúp đưa mật ong truyền thống đến gần thói quen sử dụng hằng ngày của các gia đình trẻ.',
    culturalNoteEn:
      'Brings heritage beekeeping into contemporary daily beverage routines.',
    videoUrl: 'https://youtu.be/QL3iFeQQsp8?si=wR9A7ogpZeJ2edj-',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    storyUrl: 'https://honeco.com/nu-tuong-honeco',
    producer: {
      id: 'producer-honeco',
      name: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
      locality: 'Tam Đảo / Phú Thọ',
      localityEn: 'Tam Dao / Phú Thọ',
      address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
      addressEn: 'Honeco Facility (view on Google Maps)',
      mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    },
  },
  {
    orderNumber: 27,
    id: 'thit-chua-thanh-son',
    name: 'Thịt chua Thanh Sơn',
    nameEn: 'Thanh Son Fermented Pork (Thịt chua)',
    category: CATEGORY_3,
    price: 65000,
    priceRange: '60.000đ – 85.000đ / hộp',
    priceRangeEn: '60,000 – 85,000 VND / box',
    unit: 'hộp 250g',
    unitEn: '250g box',
    weight: '250g',
    weightEn: '250g',
    locality: 'Thanh Sơn',
    ingredients: 'Thịt lợn sạch chọn lọc, thính gạo rang, tỏi, ớt, muối, lá ổi tự nhiên',
    ingredientsEn: 'Selected lean & belly pork, roasted rice powder (thính), garlic, chili, salt, guava leaf',
    shelfLife: '45–60 ngày bảo quản lạnh 0–5°C kể từ ngày sản xuất',
    shelfLifeEn: '45–60 days refrigerated at 0–5°C from production date',
    image: 'https://truongfoods.vn/wp-content/uploads/2020/08/xua.jpg',
    imageAlt:
      'Hộp Thịt chua vị xưa Trường Foods Thanh Sơn chính hãng tại truongfoods.vn',
    imageAltEn:
      'Official box of Truong Foods Traditional Thanh Son Fermented Pork from truongfoods.vn',
    imageCaption:
      'Ảnh sản phẩm chính thức Thịt chua Thanh Sơn Trường Foods (truongfoods.vn)',
    imageCaptionEn:
      'Official product photo of Truong Foods Thanh Son Fermented Pork (truongfoods.vn)',
    imageSource: 'https://truongfoods.vn/',
    secondaryImage:
      'https://truongfoods.vn/wp-content/uploads/2023/03/326220513_732086531522321_6633404622247440740_n-1152x1536.jpg',
    secondaryImageAlt: 'Sản phẩm Thịt chua Thanh Sơn – Trường Foods',
    secondaryImageAltEn: 'Thanh Son Fermented Pork showcase at Truong Foods',
    secondaryImageCaption: 'Thịt chua Thanh Sơn – Trường Foods (truongfoods.vn)',
    secondaryImageCaptionEn: 'Thanh Son Fermented Pork – Truong Foods (truongfoods.vn)',
    secondaryImageSource: 'https://truongfoods.vn/',
    galleryImages: [
      {
        url: 'https://truongfoods.vn/wp-content/uploads/2020/08/xua.jpg',
        alt: 'Hộp Thịt chua vị xưa Trường Foods Thanh Sơn',
        altEn: 'Truong Foods Traditional Fermented Pork box',
        caption: 'Thịt chua Thanh Sơn Trường Foods (truongfoods.vn)',
        captionEn: 'Thanh Son Fermented Pork box (truongfoods.vn)',
        source: 'https://truongfoods.vn/',
      },
      {
        url: 'https://truongfoods.vn/wp-content/uploads/2023/03/326220513_732086531522321_6633404622247440740_n-1152x1536.jpg',
        alt: 'Thịt chua Thanh Sơn chế biến chuẩn vị',
        altEn: 'Thanh Son Fermented Pork preparation',
        caption: 'Sản phẩm Thịt chua Trường Foods (truongfoods.vn)',
        captionEn: 'Truong Foods product showcase (truongfoods.vn)',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4rZElh1fCgL8KjFSysjEropckKASHhLdpcDWBvyajA&s=10',
        alt: 'Thịt chua Thanh Sơn ống nứa / hộp thương mại',
        altEn: 'Thanh Son Fermented Pork commercial edition',
        caption: 'Thịt chua Thanh Sơn các dòng đặc biệt',
        captionEn: 'Thanh Son Fermented Pork varieties',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-e8gIhpSnZPmOvrAzXbPO_j2k2ZQkOpf8PVnFyW2FXQLEumkOdRIT4vyw&s=10',
        alt: 'Đặc sản Thịt chua Thanh Sơn Phú Thọ',
        altEn: 'Thanh Son Fermented Pork specialty of Phú Thọ',
        caption: 'Đặc sản Thịt chua Thanh Sơn',
        captionEn: 'Thanh Son Fermented Pork specialty',
      },
    ],
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Món ăn đặc sản truyền thống của người Mường vùng Thanh Sơn, làm từ thịt lợn chọn lọc và thính gạo rang vàng, lên men tự nhiên 3–7 ngày không chất bảo quản.',
    shortDescriptionEn:
      'Traditional Muong specialty from Thanh Son crafted with roasted pork, golden rice-powder thính, and 3–7 days of natural fermentation.',
    story:
      'Bắt nguồn từ nhu cầu bảo quản thực phẩm sau dịp lễ Tết của đồng bào Mường vùng Thanh Sơn, người dân đã sáng tạo cách muối chua thịt trong ống tre, ống nứa để tạo thành món “của để dành” vừa đậm đà vừa độc đáo. Ngày nay, thịt chua Thanh Sơn (gồm các dòng đặc biệt, tỏi ớt, ống nứa, hảo hạng) kết hợp nguyên liệu địa phương và quy trình lên men tự nhiên 3–7 ngày không chất bảo quản, trở thành đặc sản nức tiếng gần xa của vùng Đất Tổ.',
    storyEn:
      'Born from the Muong community’s traditional practice of preserving pork after festive feasts inside bamboo tubes, Thanh Son Fermented Pork (Thịt chua) blends lightly flame-seared pork, spices, and fragrant roasted rice powder (thính), naturally fermented for 3–7 days without preservatives into a savory, delicately tangy Đất Tổ delicacy.',
    originNote:
      'Huyện Thanh Sơn, tỉnh Phú Thọ; kế thừa phương pháp lên men cổ truyền của đồng bào Mường.',
    originNoteEn:
      'Thanh Son District, Phú Thọ Province; rooted in traditional Muong fermentation craft.',
    culturalNote:
      'Di sản ẩm thực đặc sắc của người Mường Thanh Sơn, nổi bật bởi độ tơi, màu vàng ươm của thính gạo và vị chua thanh tự nhiên.',
    culturalNoteEn:
      'Signature Muong culinary craft prized for its loose texture, golden roasted rice powder, and clean natural tang.',
    processSteps: [
      'Sơ chế nguyên liệu: Rửa sạch thịt lợn ba chỉ hoặc thịt mông, nướng sơ qua lửa cho lớp bì săn và dậy mùi thơm, thái mỏng vừa ăn.',
      'Tẩm ướp: Trộn đều thịt với gia vị và thính gạo rang vàng đều, xay mịn thơm nức.',
      'Ủ và lên men: Nén chặt vào ống nứa hoặc hộp lót lá ổi dưới đáy; lên men hoàn toàn tự nhiên trong 3–7 ngày không chất bảo quản.',
    ],
    processStepsEn: [
      'Prepare ingredients: Clean pork belly or ham, sear lightly over flame to crisp the skin and unlock aroma, then slice thinly.',
      'Seasoning: Toss evenly with spices and finely milled golden roasted rice powder (thính).',
      'Natural fermentation: Pack tightly into bamboo tubes or guava-leaf-lined boxes to ferment naturally for 3–7 days with zero preservatives.',
    ],
    articleLinks: [
      {
        label: 'Sản phẩm tiềm năng đạt chứng nhận OCOP 5 sao (Báo Phú Thọ)',
        labelEn: 'High-Potential 5-Star OCOP Specialty (Bao Phu Tho)',
        url: 'https://baophutho.vn/phu-tho-co-mot-san-pham-tiem-nang-dat-chung-nhan-ocop-5-sao-223986.htm',
      },
      {
        label: 'Câu chuyện ra đời Thịt chua Trường Foods',
        labelEn: 'Origin Story of Truong Foods Thịt chua',
        url: 'https://truongfoods.vn/cau-chuyen-ve-su-ra-doi-cua-thit-chua-truong-foods-vi-toi-ot/',
      },
    ],
    videoUrl: 'https://youtu.be/FkbLrF1EXo4?si=8ji7ICb01DUMG4Ci',
    mapUrl:
      'https://www.google.com/maps?ftid=0x313493897fd96c1d:0xf8e392ee119d5267&entry=gps&shh=CAE&lucs=,94297699,94231188,100821559,47071704,94218641,94282134,94286869,100820247,100822504,100838877,121816461&g_ep=CAISEjI2LjQ1LjEuMDExNzM4Mjc5MBgAIP___________wEqaCw5NDI5NzY5OSw5NDIzMTE4OCwxMDA4MjE1NTksNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjksMTAwODIwMjQ3LDEwMDgyMjUwNCwxMDA4Mzg4NzcsMTIxODE2NDYxQgJWTg%3D%3D&skid=05e30311-a8eb-41ca-8af0-fc1789008539&g_st=ic&g_st=ic',
    storyUrl:
      'https://truongfoods.vn/cau-chuyen-ve-su-ra-doi-cua-thit-chua-truong-foods-vi-toi-ot/',
    producer: {
      id: 'producer-thit-chua-thanh-son',
      name: 'Cơ sở Thịt chua Thanh Sơn – Trường Foods',
      locality: 'Thanh Sơn',
      localityEn: 'Thanh Son',
      address: 'Huyện Thanh Sơn, tỉnh Phú Thọ (xem vị trí trên Google Maps)',
      addressEn: 'Thanh Son District, Phú Thọ (view on Google Maps)',
      mapUrl:
        'https://www.google.com/maps?ftid=0x313493897fd96c1d:0xf8e392ee119d5267&g_st=ic',
      contactNote:
        'Giá dòng đặc biệt / Tỏi ớt / Ống nứa / Hảo hạng khoảng 60.000 – 85.000 đồng/hộp.',
      contactNoteEn:
        'Special, Garlic-Chili, Bamboo-Tube, and Premium lines range around 60,000 – 85,000 VND/box.',
    },
  },
  {
    orderNumber: 28,
    id: 'set-qua-con-cui-thit-chua-thit-muoi-nem-chua',
    name: 'Sét quà Con Cui gồm thịt chua, thịt muối và nem chua',
    nameEn: 'Con Cui Gift Set (Fermented Pork, Salted Pork & Nem Chua)',
    category: CATEGORY_3,
    price: 1690000,
    unit: 'bộ hộp quà',
    unitEn: 'luxury gift box set',
    weight: 'Bộ quà tặng đa món (Thịt chua · Thịt muối · Nem chua)',
    weightEn: 'Multi-item gift box (Thịt chua · Cured Pork · Nem Chua)',
    locality: 'Thanh Sơn',
    ingredients: 'Thịt chua Thanh Sơn, thịt muối đặc sản, nem chua truyền thống đóng ống nứa & hộp gỗ quà biếu',
    ingredientsEn: 'Thanh Son Fermented Pork, Cured Salted Pork & Nem Chua in bamboo tubes & gift box',
    shelfLife: '45–60 ngày bảo quản ngăn mát 0–5°C',
    shelfLifeEn: '45–60 days kept chilled at 0–5°C',
    image:
      'https://truongfoods.vn/wp-content/uploads/2023/12/form-post-3.jpg',
    imageAlt:
      'Bộ Sét quà Con Cui Trường Foods gồm các ống nứa và hộp gỗ đựng thịt chua, thịt muối và nem chua trên truongfoods.vn',
    imageAltEn:
      'Official Truong Foods Con Cui Gift Set featuring bamboo tubes and wooden box on truongfoods.vn',
    imageCaption:
      'Ảnh sản phẩm chính thức Sét quà Con Cui Trường Foods (truongfoods.vn)',
    imageCaptionEn:
      'Official product photo of Truong Foods Con Cui Gift Set (truongfoods.vn)',
    imageSource: 'https://truongfoods.vn/',
    isVerifiedProductPhoto: true,
    preferenceTags: ['gia-vi-mat-ong'],
    shortDescription:
      'Bộ sét quà cao cấp đặc sản Thanh Sơn gồm thịt chua, thịt muối và nem chua đóng ống nứa và hộp gỗ quà biếu sang trọng.',
    shortDescriptionEn:
      'Luxury Thanh Son gift set pairing thịt chua, thịt muối, and nem chua in bamboo tubes & ceremonial keepsake box.',
    story:
      'Sét quà Con Cui là phiên bản quà biếu tổng hợp cao cấp của đặc sản ẩm thực vùng Thanh Sơn, quy tụ trọn bộ ba hương vị thịt chế biến truyền thống: thịt chua lên men tự nhiên với thính gạo rang, thịt muối đậm đà và nem chua trong những ống nứa xếp gọn bên hộp gỗ trang nhã. Lấy cảm hứng từ nếp đãi khách quý mỗi dịp lễ Tết, sum họp của đồng bào vùng Đất Tổ, sét quà mang nét mộc mạc núi rừng phù hợp làm quà biếu đối tác hoặc người thân phương xa.',
    storyEn:
      'The Con Cui Gift Set curates three signature cured and fermented delicacies of Thanh Sơn—roasted-rice-powder Thịt chua, savory cured Thịt muối, and traditional Nem chua—presented inside rustic bamboo tubes nestled in a keepsake wooden box. Echoing highland hospitality for Tết gatherings and corporate gifting, it brings authentic Đất Tổ culinary heritage in one ceremonial hamper.',
    originNote:
      'Đặc sản vùng Thanh Sơn, tỉnh Phú Thọ (ảnh sản phẩm chính thức từ truongfoods.vn).',
    originNoteEn:
      'Thanh Son District specialty, Phú Thọ Province (official showcase photo from truongfoods.vn).',
    culturalNote:
      'Gói trọn phong vị ống nứa và nghệ thuật ủ thịt lên men truyền thống của người Mường Thanh Sơn trong hình thức quà tặng trang trọng.',
    culturalNoteEn:
      'Packages traditional Muong bamboo-tube fermented meat heritage into a distinguished gift presentation.',
    articleLinks: [
      {
        label: 'Câu chuyện Thịt chua Thanh Sơn – Trường Foods',
        labelEn: 'Thanh Son Fermented Pork Craft Story – Truong Foods',
        url: 'https://truongfoods.vn/cau-chuyen-ve-su-ra-doi-cua-thit-chua-truong-foods-vi-toi-ot/',
      },
    ],
    videoUrl: 'https://youtu.be/FkbLrF1EXo4?si=8ji7ICb01DUMG4Ci',
    mapUrl:
      'https://www.google.com/maps?ftid=0x313493897fd96c1d:0xf8e392ee119d5267&g_st=ic',
    producer: {
      id: 'producer-thit-chua-thanh-son',
      name: 'Cơ sở Thịt chua Thanh Sơn – Trường Foods',
      locality: 'Thanh Sơn',
      localityEn: 'Thanh Son',
      address: 'Huyện Thanh Sơn, tỉnh Phú Thọ (xem vị trí trên Google Maps)',
      addressEn: 'Thanh Son District, Phú Thọ (view on Google Maps)',
      mapUrl:
        'https://www.google.com/maps?ftid=0x313493897fd96c1d:0xf8e392ee119d5267&g_st=ic',
    },
  },
];

// Dynamically build category counts so they never drift
const countByCategory = (cat: ProductCategory) =>
  RAW_CATALOG.filter((p) => p.category === cat).length;

export const PRODUCT_CATEGORIES: {
  name: ProductCategory;
  labelEn: string;
  shortDesc: string;
  shortDescEn: string;
  image: string;
  count: number;
}[] = [
  {
    name: CATEGORY_1,
    labelEn: CATEGORY_LABEL_EN[CATEGORY_1],
    shortDesc: `Gồm ${countByCategory(CATEGORY_1)} sản phẩm chè búp, trà đinh, trà xanh, matcha và sencha có ảnh xác thực trong danh mục đặc sản Phú Thọ.`,
    shortDescEn: `Includes ${countByCategory(CATEGORY_1)} verified-photo bud teas, green teas, matcha, and sencha teas from Phú Thọ.`,
    image: IMAGE_ASSETS.traPhuTho,
    count: countByCategory(CATEGORY_1),
  },
  {
    name: CATEGORY_2,
    labelEn: CATEGORY_LABEL_EN[CATEGORY_2],
    shortDesc: `Gồm ${countByCategory(CATEGORY_2)} sản phẩm mỳ gạo làng nghề, chuối sấy, bột ngũ cốc, đông trùng hạ thảo và nấm có ảnh xác thực.`,
    shortDescEn: `Includes ${countByCategory(CATEGORY_2)} verified-photo craft rice noodles, dried bananas, cereal powder, cordyceps, and mushrooms.`,
    image: IMAGE_ASSETS.miGaoHungLo1,
    count: countByCategory(CATEGORY_2),
  },
  {
    name: CATEGORY_3,
    labelEn: CATEGORY_LABEL_EN[CATEGORY_3],
    shortDesc: `Gồm ${countByCategory(CATEGORY_3)} sản phẩm tương cổ truyền, nước cốt tương, mật ong các loại, thịt chua và sét quà đặc sản.`,
    shortDescEn: `Includes ${countByCategory(CATEGORY_3)} verified-photo traditional soy sauces, honey varieties, fermented pork, and gift sets.`,
    image: IMAGE_ASSETS.tuongLangBo1,
    count: countByCategory(CATEGORY_3),
  },
];

export const GIFT_PREFERENCES: {
  key: GiftPreferenceKey;
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
}[] = [
  {
    key: 'tra-do-uong',
    label: 'Nhóm 1 – Trà và đồ uống',
    labelEn: 'Group 1 – Tea & Beverages',
    description: `${countByCategory(CATEGORY_1)} dòng chè và trà phù hợp tiếp khách, làm quà biếu.`,
    descriptionEn: `${countByCategory(CATEGORY_1)} tea selections ideal for hospitality and gifting.`,
  },
  {
    key: 'dac-san-kho',
    label: 'Nhóm 2 – Đặc sản khô & nông sản chế biến',
    labelEn: 'Group 2 – Dried Specialties & Processed Produce',
    description: `${countByCategory(CATEGORY_2)} sản phẩm mỳ gạo, chuối sấy, nấm và bột ngũ cốc.`,
    descriptionEn: `${countByCategory(CATEGORY_2)} rice noodle, dried banana, mushroom, and cereal powder items.`,
  },
  {
    key: 'gia-vi-mat-ong',
    label: 'Nhóm 3 – Gia vị, mật ong & thực phẩm địa phương',
    labelEn: 'Group 3 – Spices, Honey & Local Foods',
    description: `${countByCategory(CATEGORY_3)} đặc sản tương truyền thống, mật ong và thịt chua.`,
    descriptionEn: `${countByCategory(CATEGORY_3)} traditional soy sauce, honey, and fermented pork specialties.`,
  },
];

export const SAMPLE_PRODUCTS: Product[] = RAW_CATALOG.map((item) => {
  const defaultProducer: ProducerInfo = {
    id: item.producer?.id ?? `producer-${item.id}`,
    name: item.producer?.name ?? null,
    locality: item.producer?.locality ?? item.locality ?? null,
    localityEn: item.producer?.localityEn ?? null,
    address: item.producer?.address ?? null,
    addressEn: item.producer?.addressEn ?? null,
    mapUrl: item.producer?.mapUrl ?? item.mapUrl ?? null,
    contactNote:
      item.producer?.contactNote ??
      'Thông tin chi tiết cơ sở sản xuất đang được tiếp tục cập nhật. Vui lòng liên hệ để biết thêm.',
    contactNoteEn:
      item.producer?.contactNoteEn ??
      'Detailed producer contact information is updating. Please contact us for more details.',
    visitInfo: item.producer?.visitInfo ?? {
      verified: false,
      acceptsVisitors: null,
      contactMethod: 'Hỗ trợ hẹn lịch tham quan cơ sở sản xuất theo liên hệ trước.',
      contactMethodEn: 'Prior-appointment facility tours available upon contact.',
    },
  };

  return {
    id: item.id,
    orderNumber: item.orderNumber,
    name: item.name,
    nameEn: item.nameEn,
    category: item.category,
    price: item.price ?? null,
    priceRange: item.priceRange ?? null,
    priceRangeEn: item.priceRangeEn ?? null,
    unit: item.unit ?? null,
    unitEn: item.unitEn ?? null,
    weight: item.weight ?? null,
    weightEn: item.weightEn ?? item.weight ?? null,
    locality: item.locality ?? null,
    ingredients: item.ingredients ?? null,
    ingredientsEn: item.ingredientsEn ?? item.ingredients ?? null,
    shelfLife: item.shelfLife ?? null,
    shelfLifeEn: item.shelfLifeEn ?? item.shelfLife ?? null,
    ocopTierSample: item.ocopTierSample ?? null,
    ocopTierSampleEn: item.ocopTierSampleEn ?? null,
    image: item.image,
    imageAlt: item.imageAlt,
    imageAltEn: item.imageAltEn,
    imageCaption: item.imageCaption,
    imageCaptionEn: item.imageCaptionEn,
    imageSource: item.imageSource,
    secondaryImage: item.secondaryImage ?? null,
    secondaryImageAlt: item.secondaryImageAlt ?? null,
    secondaryImageAltEn: item.secondaryImageAltEn ?? null,
    secondaryImageCaption: item.secondaryImageCaption ?? null,
    secondaryImageCaptionEn: item.secondaryImageCaptionEn ?? null,
    secondaryImageSource: item.secondaryImageSource ?? null,
    galleryImages: item.galleryImages ?? undefined,
    isVerifiedProductPhoto: item.isVerifiedProductPhoto,
    shortDescription: item.shortDescription,
    shortDescriptionEn: item.shortDescriptionEn,
    story: item.story ?? null,
    storyEn: item.storyEn ?? null,
    originNote: item.originNote ?? null,
    originNoteEn: item.originNoteEn ?? null,
    culturalNote: item.culturalNote ?? null,
    culturalNoteEn: item.culturalNoteEn ?? null,
    processSteps: item.processSteps ?? [],
    processStepsEn: item.processStepsEn ?? [],
    articleLinks: item.articleLinks ?? [],
    videoUrl: item.videoUrl ?? null,
    mapUrl: item.mapUrl ?? null,
    traceabilityUrl: item.traceabilityUrl ?? null,
    storyUrl: item.storyUrl ?? null,
    preferenceTags: item.preferenceTags,
    producer: defaultProducer,
    stock: 35 + ((item.orderNumber * 7) % 75),
    lowStockThreshold: 10,
  };
});

export interface GiftBoxPriceEvaluation {
  knownFixedTotal: number;
  allFixed: boolean;
  hasRangeItems: boolean;
  hasUnpricedItems: boolean;
  summaryTextVi: string;
  summaryTextEn: string;
}

export function evaluateGiftBoxPrice(boxProducts: Product[]): GiftBoxPriceEvaluation {
  let knownFixedTotal = 0;
  let fixedCount = 0;
  let hasRangeItems = false;
  let hasUnpricedItems = false;

  for (const p of boxProducts) {
    if (typeof p.price === 'number' && Number.isFinite(p.price)) {
      knownFixedTotal += p.price;
      fixedCount += 1;
    } else if (p.priceRange) {
      hasRangeItems = true;
    } else {
      hasUnpricedItems = true;
    }
  }

  const allFixed = boxProducts.length > 0 && fixedCount === boxProducts.length;
  if (allFixed) {
    return {
      knownFixedTotal,
      allFixed: true,
      hasRangeItems: false,
      hasUnpricedItems: false,
      summaryTextVi: formatVnd(knownFixedTotal, 'vi'),
      summaryTextEn: formatVnd(knownFixedTotal, 'en'),
    };
  }

  if (knownFixedTotal > 0) {
    return {
      knownFixedTotal,
      allFixed: false,
      hasRangeItems,
      hasUnpricedItems,
      summaryTextVi: `Từ ${formatVnd(knownFixedTotal, 'vi')} (+ món đang cập nhật / theo dòng)`,
      summaryTextEn: `From ${formatVnd(knownFixedTotal, 'en')} (+ variant/updating items)`,
    };
  }

  return {
    knownFixedTotal: 0,
    allFixed: false,
    hasRangeItems,
    hasUnpricedItems,
    summaryTextVi: 'Theo dòng chọn & báo giá',
    summaryTextEn: 'By variant & quote',
  };
}

// ==========================================================
// Exact 5 Suggested Gift Box Combinations requested by user
// ==========================================================
export const FEATURED_GIFT_BOXES: FeaturedGiftBox[] = [
  {
    id: 'box-tra-dat-to',
    name: 'Box Trà Đất Tổ',
    nameEn: 'Đất Tổ Heritage Tea Box',
    occasion: 'Biếu gia đình',
    description:
      'Kết hợp tinh túy trà Đất Tổ gồm Chè búp tím Thanh Ba, Trà xanh Sencha Maika (OCOP 4 sao) và Tương làng Bợ truyền thống – hài hòa hương vị thưởng trà và ẩm thực gia đình.',
    descriptionEn:
      'Pairs Thanh Ba Purple Bud Tea, 4-Star OCOP Maika Green Sencha Tea, and traditional Lang Bo Soy Sauce—balancing tea culture with authentic family dining.',
    image: IMAGE_ASSETS.giftBoxTraDatTo,
    productIds: [
      'che-bup-tim-thanh-ba',
      'tra-xanh-sencha-maika',
      'tuong-lang-bo',
    ],
    packagingNote: 'Hộp quà thưởng trà & đặc sản Đất Tổ (450.000đ theo giá niêm yết 3 món)',
    packagingNoteEn: 'Đất Tổ tea & heritage condiment box (450,000 VND for all 3 listed items)',
  },
  {
    id: 'box-nong-san-lang-nghe',
    name: 'Box Nông sản làng nghề',
    nameEn: 'Craft Village Harvest Box',
    occasion: 'Biếu gia đình',
    description:
      'Quy tụ ba đặc sản làng nghề Phú Thọ: Mỳ gạo sạch Hùng Lô, Tương cổ Đất Tổ Holusa và Chuối sấy dẻo Hoàng Cương không đường.',
    descriptionEn:
      'Brings together three authentic village crafts: Hung Lo Clean Rice Noodles, Holusa Ancient Soy Sauce, and sugar-free Hoang Cuong Soft-Dried Bananas.',
    image: IMAGE_ASSETS.giftBoxNongSan,
    productIds: [
      'my-gao-sach-sinh-ra-tu-lang-hung-lo',
      'tuong-co-dat-to-holusa',
      'chuoi-say-deo-hoang-cuong',
    ],
    packagingNote: 'Box đặc sản làng nghề dễ bảo quản (245.000đ theo giá niêm yết 3 món)',
    packagingNoteEn: 'Shelf-stable craft village harvest box (245,000 VND for all 3 listed items)',
  },
  {
    id: 'box-vi-que-phu-tho',
    name: 'Box Vị quê Phú Thọ',
    nameEn: 'Phú Thọ Hometown Flavors Box',
    occasion: 'Lễ Tết',
    description:
      'Trọn vị mâm cơm quê hương với Thịt chua Thanh Sơn, Tương làng Bợ ủ chum sành và Mỳ gạo sạch làng cổ Hùng Lô.',
    descriptionEn:
      'Signature countryside table pairing Thanh Son Fermented Pork, clay-jar Lang Bo Soy Sauce, and Hung Lo Village Clean Rice Noodles.',
    image: IMAGE_ASSETS.giftBoxViQue,
    productIds: [
      'thit-chua-thanh-son',
      'tuong-lang-bo',
      'my-gao-sach-sinh-ra-tu-lang-hung-lo',
    ],
    packagingNote: 'Trọn bộ 3 đặc sản: Thịt chua (65.000đ) + Tương làng Bợ (100.000đ) + Mỳ gạo Hùng Lô (40.000đ) — 205.000đ',
    packagingNoteEn: 'Full 3-item set: Fermented Pork (65,000 VND) + Lang Bo Soy Sauce (100,000 VND) + Hung Lo Noodles (40,000 VND) — 205,000 VND',
  },
  {
    id: 'box-ngot-lanh',
    name: 'Box Ngọt lành',
    nameEn: 'Wholesome Sweetness Box',
    occasion: 'Sinh nhật',
    description:
      'Lựa chọn thanh lành cho sức khỏe gồm Mật ong Tam Đảo 500g, Chuối sấy dẻo Hoàng Cương không bổ sung đường và Trà sencha gạo lứt Maika.',
    descriptionEn:
      'A wholesome everyday wellness gift featuring Tam Dao 500g Honey, no-sugar-added Hoang Cuong Soft-Dried Banana, and Maika Brown Rice Sencha Tea.',
    image: IMAGE_ASSETS.giftBoxNgotLanh,
    productIds: [
      'mat-ong-tam-dao',
      'chuoi-say-deo-hoang-cuong',
      'tra-sencha-gao-lut-maika',
    ],
    packagingNote: 'Trọn bộ 3 đặc sản: Mật ong (290.000đ) + Chuối sấy (85.000đ) + Trà sencha gạo lứt (70.000đ) — 445.000đ',
    packagingNoteEn: 'Full 3-item set: Honey (290,000 VND) + Dried Banana (85,000 VND) + Brown Rice Sencha (70,000 VND) — 445,000 VND',
  },
  {
    id: 'box-dac-san-cao-cap',
    name: 'Box Đặc sản cao cấp',
    nameEn: 'Premium Phú Thọ Specialties Box',
    occasion: 'Đối tác',
    description:
      'Set quà biếu trang trọng kết hợp Trà Đinh cao cấp Hoài Trung (OCOP 5 sao cấp quốc gia), Mật ong đặc biệt Tam Đảo 500g và Sét quà Con Cui.',
    descriptionEn:
      'Distinguished partner gift box uniting National 5-Star OCOP Hoai Trung Premium Dinh Tea, Tam Dao Special Honey (500g), and the Con Cui Gift Set.',
    image: IMAGE_ASSETS.giftBoxCaoCap,
    productIds: [
      'tra-dinh-cao-cap-hoai-trung',
      'mat-ong-tam-dao',
      'set-qua-con-cui-thit-chua-thit-muoi-nem-chua',
    ],
    packagingNote: 'Trọn bộ 3 đặc sản: Trà Đinh Hoài Trung (350.000đ) + Mật ong Tam Đảo (290.000đ) + Sét quà Con Cui (1.690.000đ) — 2.330.000đ',
    packagingNoteEn: 'Full 3-item set: Hoai Trung Tea (350,000 VND) + Tam Dao Honey (290,000 VND) + Con Cui Gift Set (1,690,000 VND) — 2,330,000 VND',
  },
];

export const CRAFT_STORIES: CraftStory[] = [
  {
    id: 'story-che-phu-tho',
    title: 'Hành trình nâng tầm cây chè Đất Tổ: Từ búp tím cổ đến OCOP 5 sao',
    titleEn: 'Elevating Phú Thọ Tea Heritage: From Ancient Purple Buds to 5-Star OCOP',
    locality: 'Thanh Ba & Cẩm Khê & Tân Sơn',
    localityEn: 'Thanh Ba, Cam Khe & Tan Son',
    category: CATEGORY_1,
    image: IMAGE_ASSETS.heroTeaHills,
    excerpt:
      'Những người làm chè Phú Thọ bền bỉ bảo tồn giống chè búp tím Thanh Ba, đưa Trà Đinh Hoài Trung đạt OCOP 5 sao quốc gia và xây dựng nhãn hiệu tập thể Chè Đá Hen, Chè Sương sớm Xuân Sơn.',
    excerptEn:
      'Phú Thọ tea makers preserve heirloom Thanh Ba Purple Bud tea, lift Hoai Trung Dinh Tea to National 5-Star OCOP, and nurture collective brands in Da Hen and Xuan Son.',
    content: [
      'Trên các triền đồi trung du Thanh Ba, bà Lê Thị Hồng Phương (Trà UT) đã kiên trì liên kết 17 ha vùng nguyên liệu để giữ giống chè búp tím cổ trước nguy cơ mai một; trong khi bà Bùi Thị Mão (Chè Hoài Trung) dành hơn 20 năm học hỏi công nghệ Nhật Bản, Trung Quốc để tạo nên sản phẩm OCOP 5 sao cấp quốc gia đầu tiên của tỉnh Phú Thọ năm 2023.',
      'Tại Cẩm Khê, Tân Sơn và Thanh Thủy, các hợp tác xã và doanh nghiệp địa phương như HTX Chè Đá Hen (OCOP 4 sao), HTX Xuân Đài với Chè Sương sớm Xuân Sơn (OCOP 3 sao) và Maika Food với Trà xanh Sencha (OCOP 4 sao) đang viết tiếp câu chuyện chế biến sâu và truy xuất nguồn gốc cho cây chè quê hương.',
    ],
    contentEn: [
      'Across Thanh Ba’s midland slopes, Ms. Lê Thị Hồng Phương (Trà UT) linked 17 ha to save rare purple-bud tea genetics, while Ms. Bùi Thị Mão (Hoai Trung Tea) spent over 20 years mastering Japanese and Chinese techniques to earn Phú Thọ’s first National 5-Star OCOP award in 2023.',
      'Meanwhile, Da Hen Tea Cooperative (4-Star OCOP, traceable via HTX8403035), Xuan Son Morning Mist Tea (3-Star OCOP), and Maika Food’s Green Sencha (4-Star OCOP) continue advancing quality and value-added tea craft.',
    ],
    artisanName: 'Trà UT · Chè Hoài Trung · HTX Đá Hen · Maika Food',
    artisanNameEn: 'Trà UT · Hoai Trung Tea · Da Hen Coop · Maika Food',
  },
  {
    id: 'story-my-gao-nong-san',
    title: 'Làng nghề mì gạo Hùng Lô, Cự Thắng & công nghệ chế biến chuối quê hương',
    titleEn: 'Hung Lo & Cu Thang Rice Noodle Crafts & Modern Dried Fruit Processing',
    locality: 'Việt Trì, Thanh Sơn & Thanh Ba',
    localityEn: 'Viet Tri, Thanh Son & Thanh Ba',
    category: CATEGORY_2,
    image: IMAGE_ASSETS.hungLoVillage,
    excerpt:
      'Từ những giàn phơi mì sáng sớm bên đình cổ Hùng Lô, làng nghề Cự Thắng đến quy trình sấy điện khép kín không đường của HTX Chuối an toàn Hoàng Cương và Banaco.',
    excerptEn:
      'From morning noodle-drying yards near ancient Hung Lo Communal House and Cu Thang to Hoang Cuong’s no-sugar electric dryers and Banaco’s OCOP green banana cereal.',
    content: [
      'Nghề làm mì gạo ở Hùng Lô (công nhận làng nghề 2004, thành lập HTX năm 2016 với ~27 hộ) và xã Cự Thắng (hơn 20 năm gắn bó, sản lượng 800 kg – 1 tấn/ngày, đạt OCOP 3 sao) giữ bí quyết ngâm gạo 4 tiếng, xát bột khô mịn và phơi khô ngay trong ngày để giữ sợi mì dai sạch.',
      'Ở nhóm trái cây chế biến, HTX Chuối an toàn Hoàng Cương liên kết 13 ha chuối VietGAP bên bãi bồi sông Hồng để làm chuối sấy dẻo không bổ sung đường, còn Banaco biến chuối tiêu xanh giàu tinh bột kháng thành bột ngũ cốc đạt OCOP 3 sao.',
    ],
    contentEn: [
      'Traditional noodle villages in Hung Lo (~27 cooperative households welcoming domestic & international visitors) and Cu Thang (3-Star OCOP) maintain meticulous rice soaking, fine milling, and sunlit morning drying.',
      'In fruit processing, Hoang Cuong Safe Banana Cooperative turns 13 ha of VietGAP Red River bananas into zero-added-sugar soft-dried snacks, while Banaco crafts 3-Star OCOP green-banana cereal powder.',
    ],
    artisanName: 'HTX Mỳ gạo Hùng Lô · HTX Cự Thắng · HTX Hoàng Cương · Banaco',
    artisanNameEn: 'Hung Lo Coop · Cu Thang Coop · Hoang Cuong Coop · Banaco',
  },
  {
    id: 'story-tuong-mat-ong-thit-chua',
    title: 'Tương chum sành, mật ong Tam Đảo và ẩm thực lên men Thanh Sơn',
    titleEn: 'Clay-Jar Soy Sauces, Tam Dao Honey & Thanh Son Fermented Pork',
    locality: 'Thanh Thủy, Lâm Thao & Thanh Sơn',
    localityEn: 'Thanh Thuy, Lam Thao & Thanh Son',
    category: CATEGORY_3,
    image: IMAGE_ASSETS.tuongLangBo2,
    excerpt:
      'Khám phá hương vị “Nhất kinh kỳ, nhì Bợ Bạt” của tương làng Bợ, khát vọng gìn giữ tinh hoa lúa của HOLUSA, 60 năm nuôi ong Honeco và kỹ nghệ ủ thịt chua người Mường.',
    excerptEn:
      'Explore the famed clay-jar Lang Bo Soy Sauce, HOLUSA’s rice-essence craft, Honeco’s 60-year beekeeping journey, and traditional Muong Thịt chua fermentation.',
    content: [
      'Tương làng Bợ (xã Thạch Đồng, Thanh Thủy) nổi tiếng nhờ gạo nếp ủ mốc 1 tuần, nước đỗ ngâm bằng nước giếng khơi mạch rừng và ủ 1–2 tháng trong chum sành; song hành cùng thương hiệu Nước tương làng cổ HOLUSA của Công ty TNHH MTV Hoa Lúa (Lâm Thao).',
      'Bên cạnh đó, Honeco mang câu chuyện minh bạch về mật ong kết tinh tự nhiên với 60 năm nghề ong gia truyền, còn Thịt chua Thanh Sơn lưu giữ hương vị thịt lợn nướng sơ ướp thính gạo rang nén chặt trong ống nứa hoặc hộp lót lá ổi lên men 3–7 ngày.',
    ],
    contentEn: [
      'Lang Bo Soy Sauce (Thach Dong, Thanh Thuy) ages glutinous rice mold and forest-spring soybean infusions for 1–2 months in earthenware jars, while Hoa Lua’s HOLUSA brand preserves ancient village seasoning craft in Lam Thao.',
      'Complementing them, Honeco champions 60 years of transparent beekeeping, and Thanh Son Thịt chua showcases natural 3–7 day fermentation with roasted rice thính inside bamboo tubes or guava-leaf-lined boxes.',
    ],
    artisanName: 'Làng Bợ · HOLUSA · Honeco · Trường Foods Thanh Sơn',
    artisanNameEn: 'Lang Bo · HOLUSA · Honeco · Truong Foods Thanh Son',
  },
];

export const HERO_BANNER_SLIDES: HeroBannerSlide[] = [
  {
    id: 'slide-tea-hills',
    image: IMAGE_ASSETS.heroTeaHills,
    alt: 'Đồi chè Long Cốc mây vờn sáng sớm tại huyện Tân Sơn, tỉnh Phú Thọ',
    altEn: 'Morning mist drifting over Long Coc tea hills in Tan Son, Phú Thọ',
    caption: 'Vùng chè trung du Phú Thọ',
    captionEn: 'Phú Thọ Midland Tea Hills',
    kicker: 'Đặc sản OCOP Phú Thọ · 28 sản phẩm thuộc 3 nhóm',
    kickerEn: 'Phú Thọ OCOP Specialties · 28 Products in 3 Groups',
    title: 'Gửi trọn hương vị Đất Tổ',
    titleEn: 'Share the authentic taste of Đất Tổ',
    regionLabel: 'Đặc sản OCOP Phú Thọ – Quà từ Đất Tổ',
    regionLabelEn: 'Phú Thọ OCOP Specialties – Gifts from the Ancestral Land',
    subtitle:
      'Khám phá 28 đặc sản Phú Thọ có ảnh xác thực gồm Trà & đồ uống, Đặc sản khô & nông sản chế biến, cùng Gia vị, mật ong & thực phẩm địa phương.',
    subtitleEn:
      'Browse 28 verified-photo Phú Thọ specialties across Tea & Beverages, Dried Specialties & Produce, and Spices, Honey & Local Foods.',
    primaryCtaLabel: 'Khám phá 28 sản phẩm',
    primaryCtaLabelEn: 'Explore 28 Products',
    primaryTarget: 'products',
    secondaryCtaLabel: 'Thiết kế box quà',
    secondaryCtaLabelEn: 'Build a Gift Box',
    secondaryTarget: 'gift-builder',
  },
  {
    id: 'slide-gift-box',
    image: IMAGE_ASSETS.giftBox,
    alt: 'Box quà tặng Phú Thọ Tinh hoa đất Tổ gồm thịt chua, mì gạo Hùng Lô, tương làng Bợ, chè búp tím và mật ong',
    altEn: 'Phú Thọ Essence of Đất Tổ specialty gift box assortment',
    caption: 'Bộ quà tặng Phú Thọ – Tinh hoa đất Tổ',
    captionEn: 'Phú Thọ Gift Box Collection',
    kicker: '5 Gợi ý ghép box quà Đất Tổ chuẩn vị',
    kickerEn: '5 Curated Đất Tổ Gift Box Pairings',
    title: 'Quà tặng Phú Thọ – Tinh hoa đất Tổ',
    titleEn: 'Curated Gift Boxes from Đất Tổ',
    regionLabel: 'Phối ghép linh hoạt cho gia đình, Lễ Tết & đối tác',
    regionLabelEn: 'Tailored for family, festive Tết & corporate gifting',
    subtitle:
      'Chọn nhanh 5 bộ phối ghép có sẵn như Box Trà Đất Tổ (450.000đ), Box Nông sản làng nghề (245.000đ) hoặc tự chọn món theo ngân sách.',
    subtitleEn:
      'Start from 5 ready-to-pick combinations like Heritage Tea Box (450,000 VND) or Craft Village Harvest Box (245,000 VND).',
    primaryCtaLabel: 'Thiết kế box quà ngay',
    primaryCtaLabelEn: 'Open Gift Box Builder',
    primaryTarget: 'gift-builder',
    secondaryCtaLabel: 'Xem đủ 28 sản phẩm',
    secondaryCtaLabelEn: 'View All 28 Products',
    secondaryTarget: 'products',
  },
  {
    id: 'slide-hung-lo-village',
    image: IMAGE_ASSETS.hungLoVillage,
    alt: 'Không gian làng cổ Hùng Lô bên đình cổ và nghề làm mì gạo truyền thống tại Việt Trì, Phú Thọ',
    altEn: 'Ancient Hung Lo craft village near Hung Lo Communal House in Viet Tri, Phú Thọ',
    caption: 'Làng cổ Hùng Lô · TP. Việt Trì',
    captionEn: 'Ancient Hung Lo Village · Viet Tri City',
    kicker: 'Di sản làng nghề · Mì gạo Hùng Lô & Hát Xoan',
    kickerEn: 'Craft Village Heritage · Hung Lo Noodles & Xoan Singing',
    title: 'Về thăm làng nghề trăm năm Đất Tổ',
    titleEn: 'Visit Century-Old Craft Villages of Đất Tổ',
    regionLabel: 'Bản đồ vị trí · Video giới thiệu · Tư liệu báo chí từng làng nghề',
    regionLabelEn: 'Interactive maps · Documentary videos · Press stories per village',
    subtitle:
      'Tìm vị trí Google Maps, xem video phóng sự và đọc câu chuyện nghệ nhân tại 12 làng nghề từ Hùng Lô, Cự Thắng đến Thanh Thủy, Thanh Ba.',
    subtitleEn:
      'Locate village pins on maps, watch documentary clips, and explore stories across 12 Phú Thọ craft hubs.',
    primaryCtaLabel: 'Khám phá bản đồ làng nghề',
    primaryCtaLabelEn: 'Explore Craft Villages & Map',
    primaryTarget: 'experiences',
    secondaryCtaLabel: 'Đọc câu chuyện OCOP',
    secondaryCtaLabelEn: 'Read Craft Stories',
    secondaryTarget: 'stories',
  },
  {
    id: 'slide-lang-bo-soy',
    image: IMAGE_ASSETS.tuongLangBo2,
    alt: 'Sân chum sành phơi nắng ủ Tương làng Bợ tại xã Thạch Đồng, huyện Thanh Thủy, Phú Thọ',
    altEn: 'Earthenware fermentation jars of Lang Bo soy sauce in Thanh Thuy, Phú Thọ',
    caption: 'Làng nghề Tương làng Bợ · Thanh Thủy',
    captionEn: 'Lang Bo Soy Sauce Village · Thanh Thuy',
    kicker: '“Nhất kinh kỳ, nhì Bợ Bạt” · Tương chum sành Thanh Thủy',
    kickerEn: 'Traditional Clay-Jar Fermentation · Thanh Thuy & Lam Thao',
    title: 'Gia vị truyền thống ủ chum sành',
    titleEn: 'Earthenware-Aged Culinary Heritage',
    regionLabel: 'Tương làng Bợ · Nước tương cổ HOLUSA · Mật ong Tam Đảo',
    regionLabelEn: 'Lang Bo Soy Sauce · HOLUSA Essence · Tam Dao Honey',
    subtitle:
      'Từ tương gạo nếp ủ nước giếng khơi mạch rừng làng Bợ đến nước cốt tương Hoa Lúa – lưu giữ hồn cốt mâm cơm vùng sông Đà.',
    subtitleEn:
      'From clay-jar rice koji sauces of Lang Bo to Hoa Lua heritage seasonings along the Da and Red River basins.',
    primaryCtaLabel: 'Khám phá nhóm gia vị & mật ong',
    primaryCtaLabelEn: 'Explore Spices & Honey',
    primaryTarget: 'products',
    secondaryCtaLabel: 'Xem bản đồ làng nghề',
    secondaryCtaLabelEn: 'View Craft Village Map',
    secondaryTarget: 'experiences',
  },
  {
    id: 'slide-thit-chua-thanh-son',
    image: IMAGE_ASSETS.thitChua1,
    alt: 'Đặc sản Thịt chua Thanh Sơn chế biến từ thịt lợn và thính gạo rang truyền thống người Mường Phú Thọ',
    altEn: 'Thanh Son Fermented Pork (Thịt chua) with golden roasted rice powder',
    caption: 'Ẩm thực Mường · Thịt chua Thanh Sơn',
    captionEn: 'Muong Heritage · Thanh Son Fermented Pork',
    kicker: 'Tinh hoa ẩm thực người Mường · Thanh Sơn, Phú Thọ',
    kickerEn: 'Muong Culinary Craft · Thanh Son, Phú Thọ',
    title: 'Thịt chua Thanh Sơn & Sét quà Con Cui',
    titleEn: 'Thanh Son Fermented Pork & Con Cui Sets',
    regionLabel: 'Lên men tự nhiên 3–7 ngày trong ống nứa & hộp lót lá ổi',
    regionLabelEn: 'Naturally fermented 3–7 days in bamboo tubes & guava-leaf boxes',
    subtitle:
      'Hương vị truyền thống từ thịt lợn nướng sơ ướp thính gạo rang vàng, kết hợp cùng thịt muối và nem chua trong sét quà Đất Tổ.',
    subtitleEn:
      'Lightly seared pork tossed in golden roasted rice powder (thính), paired with cured delicacies in festive gift sets.',
    primaryCtaLabel: 'Xem câu chuyện từng sản phẩm',
    primaryCtaLabelEn: 'Discover Product Stories',
    primaryTarget: 'products',
    secondaryCtaLabel: 'Ghép vào box quà',
    secondaryCtaLabelEn: 'Add to Gift Box',
    secondaryTarget: 'gift-builder',
  },
];

export const CRAFT_EXPERIENCES: CraftExperience[] = [
  {
    id: 'exp-lang-mi-hung-lo',
    title: 'Làng nghề Mỳ gạo sạch Hùng Lô & Đình cổ Việt Trì',
    titleEn: 'Hung Lo Clean Rice Noodle Village & Ancient Temple',
    locality: 'Xã Hùng Lô, TP. Việt Trì',
    localityEn: 'Hung Lo Commune, Viet Tri City',
    districtTag: 'Việt Trì',
    districtTagEn: 'Viet Tri',
    durationSample: 'Đón đoàn theo lịch hẹn trước',
    durationSampleEn: 'By prior cooperative appointment',
    groupSizeSample: 'Đoàn khách trong & ngoài nước',
    groupSizeSampleEn: 'Domestic & international visitor groups',
    image: IMAGE_ASSETS.miGaoHungLo1,
    summary:
      'Được công nhận làng nghề truyền thống từ năm 2004 và thành lập HTX Mỳ gạo Hùng Lô tháng 7/2016 với khoảng 27 hộ làm nghề. Cơ sở thường xuyên đón các đoàn khách trong và ngoài nước tới tham quan quy trình ngâm gạo, xát bột, đùn sợi và phơi mì sáng sớm bên không gian Đình cổ Hùng Lô & hát Xoan.',
    summaryEn:
      'Officially recognized in 2004 and organized as Hung Lo Rice Noodle Cooperative in July 2016 (~27 artisan households), this village actively welcomes domestic and international groups to observe morning rice milling, extrusion, and sun-drying near ancient Hung Lo Communal House.',
    highlights: [
      'Tham quan 5 công đoạn làm mì gạo sạch từ sáng sớm tại sân phơi HTX Mỳ gạo Hùng Lô',
      'Trải nghiệm không gian văn hóa Đình cổ Hùng Lô và làn điệu Hát Xoan Phú Thọ',
      'Sản phẩm Mỳ gạo sạch & mì gạo lứt đóng gói có nhãn mác riêng (40.000đ/gói)',
    ],
    highlightsEn: [
      'Observe the 5-step hygienic noodle craft & early morning sun-drying racks',
      'Explore historic Hung Lo Communal House and UNESCO Xoan folk singing heritage',
      'Signature clean white & brown-rice noodles (40,000 VND/pack)',
    ],
    scheduleDisclaimer:
      'Đã xác nhận cơ sở có đón đoàn khách tham quan trải nghiệm; vui lòng liên hệ HTX để chốt khung giờ cụ thể trước khi đi.',
    scheduleDisclaimerEn:
      'Confirmed visitor-friendly craft village; please contact the cooperative beforehand to confirm your exact visit slot.',
    hostProducer: 'Hợp tác xã Mỳ gạo Hùng Lô',
    hostProducerEn: 'Hung Lo Rice Noodle Cooperative',
    visitorVerified: true,
    address: 'Xã Hùng Lô, thành phố Việt Trì, tỉnh Phú Thọ',
    addressEn: 'Hung Lo Commune, Viet Tri City, Phú Thọ Province',
    mapUrl: 'https://maps.app.goo.gl/T9uyMrpPWFS6e2Yx6',
    mapQuery: 'Lang nghe mi gao Hung Lo, Viet Tri, Phu Tho, Vietnam',
    videos: [
      {
        id: 'vid-hung-lo',
        title: 'Phóng sự Làng nghề Mỳ gạo Hùng Lô – Tinh hoa ẩm thực Đất Tổ',
        titleEn: 'Hung Lo Rice Noodle Craft Village Documentary',
        youtubeId: 'zNcawB68FJU',
        url: 'https://youtu.be/zNcawB68FJU?si=5rFdjs6MUSy6R22U',
      },
    ],
    articles: [
      {
        label: 'Làng nghề mì gạo Hùng Lô (Thông tấn xã Việt Nam)',
        labelEn: 'Hung Lo Rice Noodle Craft Village (Vietnam News Agency)',
        url: 'https://vietnam.vnanet.vn/vietnamese/long-form/lang-nghe-mi-gao-hung-lo-401401.html',
      },
      {
        label: 'Phú Thọ: Mỳ gạo Hùng Lô khẳng định thương hiệu OCOP',
        labelEn: 'Hung Lo Noodles Establishing an OCOP Brand',
        url: 'https://doanhnghieptiepthi.vn/phu-tho-my-gao-hung-lo-khang-dinh-thuong-hieu-san-pham-ocop-16122090915001654.htm',
      },
      {
        label: 'Mì gạo Hùng Lô – Mì gạo sinh ra từ làng (Du lịch Phú Thọ)',
        labelEn: 'Born From the Village: Hung Lo Noodles (Phu Tho Tourism)',
        url: 'https://dulichphutho.gov.vn/mi-gao-hung-lo-mi-gao-sinh-ra-tu-lang.html',
      },
    ],
    relatedProductIds: ['my-gao-sach-sinh-ra-tu-lang-hung-lo'],
  },
  {
    id: 'exp-tuong-lang-bo',
    title: 'Làng nghề Tương làng Bợ (Xã Thạch Đồng, Thanh Thủy)',
    titleEn: 'Lang Bo Traditional Soy Sauce Village (Thanh Thuy)',
    locality: 'Xã Thạch Đồng, Huyện Thanh Thủy',
    localityEn: 'Thach Dong Commune, Thanh Thuy District',
    districtTag: 'Thanh Thủy',
    districtTagEn: 'Thanh Thuy',
    durationSample: 'Liên hệ trước khi đến',
    durationSampleEn: 'Contact prior to visiting',
    groupSizeSample: 'Theo hẹn cơ sở',
    groupSizeSampleEn: 'By appointment',
    image: IMAGE_ASSETS.tuongLangBo2,
    summary:
      'Gắn với câu ca “Nhất kinh kỳ, nhì Bợ Bạt”, nghề làm tương truyền thống bên sông Đà ở Thạch Đồng sử dụng gạo nếp đồ xôi ủ mốc 1 tuần, nước đỗ ngâm bằng nước giếng khơi mạch rừng và ủ kỹ 1–2 tháng trong chum sành phơi nắng.',
    summaryEn:
      'Famous through the folk saying "First the Capital, second Bo Bat," artisans in Thach Dong steam glutinous rice for 1-week koji fermentation, infuse soybeans in forest-spring well water, and sun-age the blend in clay jars for 1–2 months.',
    highlights: [
      'Tìm hiểu sân chum sành ủ tương truyền thống và bí quyết chọn nước giếng khơi mạch rừng',
      'Khám phá hương vị tương đậm đỏ dùng kho, om các món cá sông Đà (100.000đ/lít)',
    ],
    highlightsEn: [
      'Explore traditional earthenware fermentation yards & forest-spring soybean infusions',
      'Taste rich red-amber fermented soy sauce prized for Da River fish dishes (100,000 VND/L)',
    ],
    scheduleDisclaimer:
      'Thông tin giờ đón khách cố định hiện chưa xác nhận; vui lòng xem vị trí bản đồ và liên hệ địa phương trước khi ghé thăm.',
    scheduleDisclaimerEn:
      'Fixed public visiting hours are not yet confirmed; please check the map pin and contact local makers beforehand.',
    hostProducer: 'Làng nghề Tương làng Bợ (Thạch Đồng)',
    hostProducerEn: 'Lang Bo Soy Sauce Craft Village',
    visitorVerified: false,
    address: 'Xã Thạch Đồng, huyện Thanh Thủy, tỉnh Phú Thọ',
    addressEn: 'Thach Dong Commune, Thanh Thuy District, Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/xde5QBSqXyEbcsCv9?g_st=ic',
    mapQuery: 'Tuong Lang Bo, Thach Dong, Thanh Thuy, Phu Tho',
    videos: [
      {
        id: 'vid-tuong-lang-bo',
        title: 'Video giới thiệu Làng nghề Tương làng Bợ – Thạch Đồng, Thanh Thủy',
        titleEn: 'Lang Bo Soy Sauce Craft Village Feature Video',
        youtubeId: 'JB5yrwTGk_4',
        url: 'https://youtu.be/JB5yrwTGk_4?si=dqQxmcKLUcfAm0R6',
      },
    ],
    articles: [
      {
        label: 'Tương làng Bợ – Đặc sản nức tiếng vùng quê Thanh Thủy (Du lịch Phú Thọ)',
        labelEn: 'Lang Bo Soy Sauce – Renowned Thanh Thuy Specialty',
        url: 'https://dulichphutho.gov.vn/tuong-lang-bo-dac-san-nuc-tieng-vung-que-thanh-thuy.html',
      },
      {
        label: 'Nức tiếng tương làng Bợ (Báo Phú Thọ)',
        labelEn: 'Famed Lang Bo Soy Sauce (Bao Phu Tho)',
        url: 'https://baophutho.vn/nuc-tieng-tuong-lang-bo-174585.htm',
      },
      {
        label: 'Điểm đến di sản Tương làng Bợ (My Phú Thọ)',
        labelEn: 'Lang Bo Cultural Travel Record (My Phu Tho)',
        url: 'https://myphutho.vn/vi/detailtravelplace/?id=150',
      },
    ],
    relatedProductIds: ['tuong-lang-bo'],
  },
  {
    id: 'exp-vung-che-thanh-ba',
    title: 'Vùng chè Thanh Ba – Chè Búp Tím Trà UT & Trà Đinh Hoài Trung',
    titleEn: 'Thanh Ba Tea Craft – Purple Bud Tea & 5-Star OCOP Hoai Trung',
    locality: 'Huyện Thanh Ba, Phú Thọ',
    localityEn: 'Thanh Ba District, Phú Thọ',
    districtTag: 'Thanh Ba',
    districtTagEn: 'Thanh Ba',
    durationSample: 'Liên hệ trước với doanh nghiệp',
    durationSampleEn: 'Contact producers beforehand',
    groupSizeSample: 'Nhóm 5–25 khách theo lịch hẹn',
    groupSizeSampleEn: '5–25 visitors by appointment',
    image:
      'https://image.vietnamnews.vn/uploadvnnews/Article/2023/10/13/310537_4664413797734963_pack.jpg',
    summary:
      'Cái nôi của hai thương hiệu chè tiêu biểu vùng trung du: Trà UT với vùng nguyên liệu 17 ha bảo tồn giống Chè búp tím cổ, và Công ty TNHH Chè Hoài Trung với Trà Đinh cao cấp – sản phẩm OCOP 5 sao cấp quốc gia đầu tiên của tỉnh Phú Thọ (2023).',
    summaryEn:
      'Home to two flagship midland tea pioneers: Trà UT conserving 17 ha of heirloom Thanh Ba Purple Bud Tea, and Hoai Trung Tea Co.—maker of Phú Thọ’s first National 5-Star OCOP specialty (2023).',
    highlights: [
      'Tìm hiểu hành trình bảo tồn nguồn gen Chè búp tím cổ gắn với lao động nữ nông thôn',
      'Khám phá quy trình hong, vò, sao, sấy công phu đạt OCOP 5 sao cấp quốc gia của Trà Hoài Trung',
    ],
    highlightsEn: [
      'Discover heirloom Purple Bud Tea genetic conservation empowering rural women workers',
      'Learn about VietGAP & artisanal processing behind 5-Star OCOP Hoai Trung Dinh Tea',
    ],
    scheduleDisclaimer:
      'Giờ mở cửa tham quan tại hai cơ sở hiện chưa xác nhận cố định; vui lòng xem hai vị trí bản đồ và liên hệ trước khi đến.',
    scheduleDisclaimerEn:
      'Fixed public visiting hours for both tea enterprises are not yet confirmed; view map pins and contact ahead.',
    hostProducer: 'Công ty Trà UT & Công ty TNHH Chè Hoài Trung',
    hostProducerEn: 'Trà UT Co. & Hoai Trung Tea Co., Ltd.',
    visitorVerified: false,
    address: 'Huyện Thanh Ba, tỉnh Phú Thọ (xem bản đồ Trà UT & Chè Hoài Trung)',
    addressEn: 'Thanh Ba District, Phú Thọ (map links for Trà UT & Hoai Trung Tea)',
    mapUrl: 'https://maps.app.goo.gl/dtngdnVVoSyujRSV7',
    mapQuery: 'Thanh Ba, Phu Tho, Vietnam',
    secondaryMapUrl: 'https://maps.app.goo.gl/L7zk5Z8zYL8J1hTL9',
    secondaryMapLabel: 'Bản đồ Chè Hoài Trung',
    secondaryMapLabelEn: 'Hoai Trung Tea Map',
    videos: [
      {
        id: 'vid-che-bup-tim',
        title: 'Video giới thiệu Chè búp tím Thanh Ba – Di sản cây chè trung du',
        titleEn: 'Thanh Ba Purple Bud Tea Craft Feature',
        youtubeId: 'Fe0j6Ktun3U',
        url: 'https://youtu.be/Fe0j6Ktun3U?si=Wlpj0f-ywlBfxl6V',
      },
    ],
    articles: [
      {
        label: 'Chè búp tím Thanh Ba (Du lịch Phú Thọ)',
        labelEn: 'Thanh Ba Purple Bud Tea (Phu Tho Tourism)',
        url: 'https://dulichphutho.gov.vn/che-bup-tim-thanh-ba.html',
      },
      {
        label: 'Sản phẩm OCOP 5 sao cấp quốc gia đầu tiên của Phú Thọ (Báo Tin Tức)',
        labelEn: 'Phú Thọ’s First National 5-Star OCOP Product (VietnamNews)',
        url: 'https://baotintuc.vn/san-pham-ocop-5-sao-cap-quoc-gia-dau-tien-cua-tinh-phu-tho-post717384.html',
      },
      {
        label: 'Bản tin KH&CN Phú Thọ: Câu chuyện Chè búp tím Thanh Ba (PDF)',
        labelEn: 'Phu Tho S&T Newsletter: Purple Bud Tea Story (PDF)',
        url: 'https://sokhoahoccongnghe.phutho.gov.vn/images/newsletters/2024/05/09/ruot-khcn-1-2024-828.pdf',
      },
    ],
    relatedProductIds: ['che-bup-tim-thanh-ba', 'tra-dinh-cao-cap-hoai-trung'],
  },
  {
    id: 'exp-lang-che-da-hen',
    title: 'Làng nghề Chè xanh Đá Hen (Xã Đồng Lương, Cẩm Khê)',
    titleEn: 'Da Hen Green Tea Craft Village (Dong Luong, Cam Khe)',
    locality: 'Xã Đồng Lương, Huyện Cẩm Khê',
    localityEn: 'Dong Luong Commune, Cam Khe District',
    districtTag: 'Cẩm Khê',
    districtTagEn: 'Cam Khe',
    durationSample: 'Liên hệ trước với HTX',
    durationSampleEn: 'Contact cooperative beforehand',
    groupSizeSample: 'Nhóm 5–25 khách theo lịch hẹn',
    groupSizeSampleEn: '5–25 visitors by appointment',
    image: 'https://tradahen.vn/wp-content/uploads/2026/08/IMG_0880.jpeg',
    summary:
      'Hình thành từ vùng trồng chè năm 2001, được công nhận làng nghề năm 2010 và lập HTX Sản xuất & chế biến chè Đá Hen năm 2017 với khoảng 80 hộ thành viên. Tháng 7/2023 được cấp văn bằng nhãn hiệu tập thể cùng sản phẩm Chè Đá Hen hảo hạng đạt OCOP 4 sao.',
    summaryEn:
      'Rooted in 2001 tea plantings, designated a Craft Village in 2010 and organized into Da Hen Cooperative in 2017 (~80 households). Awarded collective trademark protection in July 2023 alongside 4-Star OCOP certification.',
    highlights: [
      'Quy tụ ~80 hộ chế biến chè xanh, chè nõn tôm và chè hảo hạng (100.000đ/gói)',
      'Tích hợp mã truy xuất nguồn gốc chính thức HTX8403035 trên cổng hợp tác xã',
    ],
    highlightsEn: [
      'Connects ~80 member households producing green, tom non, and premium teas (100,000 VND/pack)',
      'Digital traceability record HTX8403035 verified online',
    ],
    scheduleDisclaimer:
      'Hỗ trợ đặt lịch tham quan trực tiếp theo hẹn trước; vui lòng xem bản đồ và liên hệ HTX Chè Đá Hen.',
    scheduleDisclaimerEn:
      'Prior-appointment workshop visits are available; please check the map link and contact Da Hen Cooperative.',
    hostProducer: 'HTX Sản xuất và chế biến chè Đá Hen',
    hostProducerEn: 'Da Hen Tea Production & Processing Cooperative',
    visitorVerified: false,
    address: 'Xã Đồng Lương, huyện Cẩm Khê, tỉnh Phú Thọ',
    addressEn: 'Dong Luong Commune, Cam Khe District, Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/cS8gPjKtzhoD46ub9',
    mapQuery: 'HTX Che Da Hen, Dong Luong, Cam Khe, Phu Tho',
    traceabilityUrl: 'https://hoptacxa.vn/vn/trace-code/HTX8403035',
    videos: [],
    articles: [
      {
        label: 'Đặc sản chè xanh của HTX Chè Đá Hen (Du lịch Phú Thọ)',
        labelEn: 'Green Tea Specialty of Da Hen Cooperative (Phu Tho Tourism)',
        url: 'https://dulichphutho.gov.vn/dac-san-che-xanh-cua-hop-tac-xa-san-xuat-che-bien-che-da-hen.html',
      },
      {
        label: 'Những giống chè mới đánh thức vùng đồi (Nông nghiệp & Môi trường)',
        labelEn: 'New Tea Varieties Awakening the Hills',
        url: 'https://nongnghiepmoitruong.vn/nhung-giong-che-moi-danh-thuc-nhung-vung-doi-ngu-say-d357220.html',
      },
    ],
    relatedProductIds: ['che-da-hen'],
  },
  {
    id: 'exp-vung-che-tan-son',
    title: 'Vùng đồi chè Long Cốc & Chè Sương sớm Xuân Sơn (Tân Sơn)',
    titleEn: 'Long Coc Tea Hills & Xuan Son Morning Mist Region (Tan Son)',
    locality: 'Xã Long Cốc & Xã Xuân Đài, Huyện Tân Sơn',
    localityEn: 'Long Coc & Xuan Dai Communes, Tan Son District',
    districtTag: 'Tân Sơn',
    districtTagEn: 'Tan Son',
    durationSample: 'Tham quan cảnh quan đồi chè',
    durationSampleEn: 'Scenic tea-hill exploration',
    groupSizeSample: 'Tham quan cảnh quan & HTX theo nhóm',
    groupSizeSampleEn: 'Scenic tours & group cooperative visits',
    image: IMAGE_ASSETS.heroTeaHills,
    summary:
      'Vùng chè cảnh quan đặc sắc của huyện miền núi Tân Sơn, nổi bật với những quả đồi bát úp Long Cốc trong sương sớm (Chè Long Cốc 130.000đ/200g) và vùng chè truyền thống xã Xuân Đài – nơi HTX Xuân Đài đưa sản phẩm Chè Sương sớm Xuân Sơn đạt OCOP 3 sao năm 2023.',
    summaryEn:
      'Tan Son’s signature highland tea belt showcasing misty bowl-shaped hills in Long Coc (130,000 VND/200g) alongside traditional VietGAP gardens in Xuan Dai Commune—home to 3-Star OCOP Xuan Son Morning Mist Tea (2023).',
    highlights: [
      'Cảnh quan đồi chè bát úp Long Cốc gắn với phát triển thương hiệu Chè Long Cốc (130.000đ/200g)',
      'Vùng chè VietGAP xã Xuân Đài của HTX Dịch vụ Nông lâm nghiệp Xuân Đài (300.000đ/200g)',
    ],
    highlightsEn: [
      'Iconic Long Coc bowl-shaped tea hills linked with Long Coc Tea (130,000 VND/200g)',
      'Xuan Dai VietGAP tea cooperative crafting 3-Star OCOP Morning Mist Tea (300,000 VND/200g)',
    ],
    scheduleDisclaimer:
      'Khách có thể tham khảo vị trí khu vực đồi chè Long Cốc trên bản đồ; lịch tham quan cơ sở chế biến cần liên hệ HTX Xuân Đài.',
    scheduleDisclaimerEn:
      'Use the map for Long Coc tea-hill directions; processing facility visits require contacting Xuan Dai Cooperative.',
    hostProducer: 'Cộng đồng trồng chè Long Cốc & HTX Nông lâm nghiệp Xuân Đài',
    hostProducerEn: 'Long Coc Growers & Xuan Dai Cooperative',
    visitorVerified: false,
    address: 'Xã Long Cốc & xã Xuân Đài, huyện Tân Sơn, tỉnh Phú Thọ',
    addressEn: 'Long Coc & Xuan Dai Communes, Tan Son District, Phú Thọ',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Doi+che+Long+Coc+Tan+Son+Phu+Tho',
    mapQuery: 'Doi che Long Coc, Tan Son, Phu Tho, Vietnam',
    videos: [],
    articles: [
      {
        label: 'Xã Long Cốc phát triển thương hiệu chè (Hội Nông dân Phú Thọ)',
        labelEn: 'Long Coc Developing Its Tea Brand (Phu Tho Farmers Portal)',
        url: 'https://hoinongdan.phutho.gov.vn/blog/xa-long-coc-huyen-tan-son-phat-trien-thuong-hieu-che.html',
      },
      {
        label: 'Chắp cánh cho thương hiệu Chè Sương sớm Xuân Sơn (Báo Phú Thọ)',
        labelEn: 'Elevating Xuan Son Morning Mist Tea Brand (Bao Phu Tho)',
        url: 'https://baophutho.vn/chap-canh-cho-thuong-hieu-che-suong-som-xuan-son-255686.htm',
      },
    ],
    relatedProductIds: ['che-long-coc', 'che-suong-som-xuan-son'],
  },
  {
    id: 'exp-cu-thang-thanh-nam',
    title: 'Làng nghề Mì gạo Cự Thắng & Vùng chè Thành Nam (Thanh Sơn)',
    titleEn: 'Cu Thang Rice Noodle Craft & Thanh Nam Tea Zone (Thanh Son)',
    locality: 'Xã Cự Thắng & Huyện Thanh Sơn',
    localityEn: 'Cu Thang Commune, Thanh Son District',
    districtTag: 'Thanh Sơn',
    districtTagEn: 'Thanh Son',
    durationSample: 'Liên hệ trước với HTX',
    durationSampleEn: 'Contact cooperatives prior to visiting',
    groupSizeSample: 'Nhóm 5–25 khách theo lịch hẹn',
    groupSizeSampleEn: '5–25 visitors by appointment',
    image:
      'https://phuthotv.vn/sites/default/files/admin/anh_bai_viet/mi_gao_cu_thang.jpg',
    summary:
      'Hai điểm sáng kinh tế hợp tác xã tại huyện Thanh Sơn: nghề làm mì gạo hơn 20 năm ở Cự Thắng (sản lượng 800 kg – 1 tấn/ngày, đạt OCOP 3 sao) và HTX Chè Thành Nam quy mô ~100 ha vùng nguyên liệu với xưởng chế biến hơn 3.000 m².',
    summaryEn:
      'Two flagship Thanh Son cooperatives: Cu Thang’s 20+ year rice noodle craft (~800 kg–1 ton/day, 3-Star OCOP) and Thanh Nam Tea Cooperative managing ~100 ha of tea hills and a 3,000+ m² workshop.',
    highlights: [
      'Tìm hiểu HTX Dịch vụ nông nghiệp Cự Thắng nâng tầm hạt gạo quê hương (40.000đ/gói)',
      'Tham khảo HTX Chè Thành Nam với chè đinh, tôm nõn, hoa nhài, ô long (300k–1.500k/kg)',
    ],
    highlightsEn: [
      'Cu Thang Agricultural Service Cooperative traditional noodles (40,000 VND/pack)',
      'Thanh Nam Tea Cooperative Dinh, Tom Non, Jasmine & Oolong teas (300k–1.5M VND/kg)',
    ],
    scheduleDisclaimer:
      'Hỗ trợ đặt lịch tham quan theo đoàn hẹn trước; xem đủ 2 vị trí bản đồ và liên hệ cơ sở để xác nhận khung giờ.',
    scheduleDisclaimerEn:
      'Group visits are available by prior appointment; check both map pins and contact the cooperatives to confirm hours.',
    hostProducer: 'HTX Dịch vụ nông nghiệp Cự Thắng & HTX Chè Thành Nam',
    hostProducerEn: 'Cu Thang Cooperative & Thanh Nam Tea Cooperative',
    visitorVerified: false,
    address: 'Xã Cự Thắng, huyện Thanh Sơn, tỉnh Phú Thọ',
    addressEn: 'Cu Thang Commune, Thanh Son District, Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/STcifxP6xZA4mLGZA',
    mapQuery: 'Xa Cu Thang, Thanh Son, Phu Tho, Vietnam',
    secondaryMapUrl: 'https://maps.app.goo.gl/Tm6vdyxeZtmbtTgF8',
    secondaryMapLabel: 'Bản đồ Chè Thành Nam',
    secondaryMapLabelEn: 'Thanh Nam Tea Map',
    videos: [],
    articles: [
      {
        label: 'Cự Thắng vươn lên từ nội lực (Báo Phú Thọ)',
        labelEn: 'Cu Thang Rising Through Internal Strength (Bao Phu Tho)',
        url: 'https://baophutho.vn/cu-thang-vuon-len-tu-noi-luc-233861.htm',
      },
      {
        label: 'HTX Chè Thành Nam mở rộng thị trường cuối năm (Báo Phú Thọ)',
        labelEn: 'Thanh Nam Tea Expanding Markets (Bao Phu Tho)',
        url: 'https://baophutho.vn/tang-cuong-hoat-dong-xuc-tien-thuong-mai-mo-rong-thi-truong-dip-cuoi-nam-263710.htm',
      },
    ],
    relatedProductIds: ['mi-gao-cu-thang', 'che-thanh-nam'],
  },
  {
    id: 'exp-chuoi-hoang-cuong',
    title: 'Làng nghề Chuối an toàn VietGAP Hoàng Cương (Thanh Ba)',
    titleEn: 'Hoang Cuong Safe Banana Craft Cooperative (Thanh Ba)',
    locality: 'Xã Hoàng Cương, Huyện Thanh Ba',
    localityEn: 'Hoang Cuong Commune, Thanh Ba District',
    districtTag: 'Thanh Ba',
    districtTagEn: 'Thanh Ba',
    durationSample: 'Liên hệ trước với HTX',
    durationSampleEn: 'Contact cooperative beforehand',
    groupSizeSample: 'Nhóm 5–20 khách theo hẹn trước',
    groupSizeSampleEn: '5–20 visitors by appointment',
    image:
      'https://phutho.dcs.vn/AllUpload/FCKUploads/Crop_CKEditorImage_720093919.jpg',
    summary:
      'Trên vùng đất bãi bồi phù sa sông Hồng, HTX Chuối an toàn Hoàng Cương (thành lập năm 2021) liên kết vùng trồng 13 ha đạt chuẩn VietGAP, tiêu thụ ~100 tấn/năm và đầu tư lò sấy điện khép kín cho ra Chuối sấy dẻo không bổ sung đường.',
    summaryEn:
      'Cultivated on fertile Red River alluvial soils, Hoang Cuong Safe Banana Cooperative (est. 2021) manages 13 ha of VietGAP banana orchards and closed electric dryers crafting zero-added-sugar soft-dried bananas.',
    highlights: [
      'Quy trình sấy điện khép kín kiểm soát nhiệt độ giữ trọn vị ngọt nguyên bản (85.000đ/kg)',
      'Đóng gói túi màng PE hút chân không và hộp giấy tiện dụng làm quà biếu',
    ],
    highlightsEn: [
      'Closed-loop temperature-controlled drying preserving natural banana sweetness (85,000 VND/kg)',
      'Vacuum-sealed PE pouches and gift boxes ready for travel gifting',
    ],
    scheduleDisclaimer:
      'Chưa xác nhận giờ mở cửa đại trà; vui lòng xem chỉ đường trên bản đồ và liên hệ HTX trước khi đến.',
    scheduleDisclaimerEn:
      'Public walk-in hours are not confirmed; check the map link and contact the cooperative first.',
    hostProducer: 'HTX Chuối an toàn Hoàng Cương',
    hostProducerEn: 'Hoang Cuong Safe Banana Cooperative',
    visitorVerified: false,
    address: 'Xã Hoàng Cương, huyện Thanh Ba, tỉnh Phú Thọ',
    addressEn: 'Hoang Cuong Commune, Thanh Ba District, Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/tNu5SiSRZ1VNMT3S8?g_st=ic',
    mapQuery: 'Xa Hoang Cuong, Thanh Ba, Phu Tho, Vietnam',
    videos: [],
    articles: [
      {
        label: 'Chuối sấy dẻo Hoàng Cương giữ hương vị quê hương (Cổng ĐB Phú Thọ)',
        labelEn: 'Hoang Cuong Soft-Dried Banana Heritage Feature',
        url: 'https://phutho.dcs.vn/ContentDetail/NewsDetailView?NewsId=0f351b19-ac9a-4dac-9c09-ebeba345cfc1',
      },
      {
        label: 'Hoàng Cương tạo đà bứt phá từ xác định đúng trọng tâm (Báo Phú Thọ)',
        labelEn: 'Hoang Cuong Breakthrough (Bao Phu Tho)',
        url: 'https://baophutho.vn/hoang-cuong-tao-da-but-pha-tu-viec-xac-dinh-dung-trong-tam-252425.htm',
      },
    ],
    relatedProductIds: ['chuoi-say-deo-hoang-cuong'],
  },
  {
    id: 'exp-thanh-thuy-maika-anh-minh',
    title: 'Cụm Nông sản Công nghệ cao Thanh Thủy: Maika Food & Đông trùng hạ thảo Anh Minh',
    titleEn: 'Thanh Thuy Agritech Hub: Maika Food & Anh Minh Cordyceps',
    locality: 'Xã Xuân Lộc & Huyện Thanh Thủy',
    localityEn: 'Xuan Loc Commune, Thanh Thuy District',
    districtTag: 'Thanh Thủy',
    districtTagEn: 'Thanh Thuy',
    durationSample: 'Liên hệ trước với cơ sở',
    durationSampleEn: 'Contact enterprises beforehand',
    groupSizeSample: 'Nhóm 5–20 khách theo hẹn trước',
    groupSizeSampleEn: '5–20 visitors by appointment',
    image:
      'https://langngheviet.com.vn/stores/news_dataimages/langnghevietcomvn/122022/20/14/thanh-thuy-phu-tho-dong-trung-ha-thao-san-pham-ocop-3-sao-20-.6381.jpg',
    summary:
      'Quy tụ hai mô hình chế biến nông sản – dược liệu sáng tạo tại huyện Thanh Thủy: Công ty TNHH Maika Food (bà Nguyễn Thị Hương) với Trà xanh Sencha OCOP 4 sao, Matcha & chuối sấy lạnh; cùng Cơ sở Đông trùng hạ thảo Anh Minh (anh Lê Hoàng Hải) đạt OCOP 3 sao.',
    summaryEn:
      'Showcases two modern agritech producers in Thanh Thuy: Maika Food (4-Star OCOP Sencha Tea, Matcha & freeze-dried snacks) and Anh Minh Cordyceps (3-Star OCOP controlled cultivation by Mr. Lê Hoàng Hải).',
    highlights: [
      'Tìm hiểu dây chuyền trà xanh Sencha (50k), Matcha (80k) và chuối sấy lạnh Maikafood (65k)',
      'Tham khảo mô hình nuôi cấy Đông trùng hạ thảo Anh Minh đạt chuẩn OCOP 3 sao (650k)',
    ],
    highlightsEn: [
      'Explore Maika Food’s 4-Star OCOP Sencha (50k), Matcha (80k) & freeze-dried banana (65k)',
      'Learn about Anh Minh’s 3-Star OCOP indoor cordyceps farm (650k)',
    ],
    scheduleDisclaimer:
      'Hỗ trợ đặt lịch tham quan theo hẹn trước; tích hợp sẵn vị trí Google Maps cho cả 2 cơ sở tại Thanh Thủy.',
    scheduleDisclaimerEn:
      'Appointment-based visits are available; Google Maps pins are provided for both Thanh Thuy facilities.',
    hostProducer: 'Công ty TNHH Maika Food & Cơ sở Đông trùng hạ thảo Anh Minh',
    hostProducerEn: 'Maika Food Co., Ltd. & Anh Minh Cordyceps',
    visitorVerified: false,
    address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
    addressEn: 'Xuan Loc Commune, Thanh Thuy District, Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    mapQuery: 'Xuan Loc, Thanh Thuy, Phu Tho, Vietnam',
    secondaryMapUrl: 'https://maps.app.goo.gl/KW2SWTKtJX7xN4AaA?g_st=ic',
    secondaryMapLabel: 'Bản đồ Đông trùng hạ thảo Anh Minh',
    secondaryMapLabelEn: 'Anh Minh Cordyceps Map',
    videos: [
      {
        id: 'vid-anh-minh-dong-trung',
        title: 'Video giới thiệu Đông trùng hạ thảo Anh Minh – Sản phẩm OCOP 3 sao Thanh Thủy',
        titleEn: 'Anh Minh Cordyceps Thanh Thuy 3-Star OCOP Video',
        youtubeId: '3rbFdwIO-Ug',
        url: 'https://youtu.be/3rbFdwIO-Ug?si=ZTWRjIYOA0_Qea40',
      },
    ],
    articles: [
      {
        label: 'Chuyện người phụ nữ xây dựng thương hiệu Trà Matcha Maika',
        labelEn: 'The Woman Behind Maika Matcha & Sencha',
        url: 'https://kinhtedouong.vn/chuyen-nguoi-phu-nu-xay-dung-thuong-hieu-tra-matcha-maika-125459.html',
      },
      {
        label: 'Người phụ nữ sở hữu 2 sản phẩm OCOP 4 sao (Nông thôn mới Phú Thọ)',
        labelEn: 'Entrepreneur With Two 4-Star OCOP Products',
        url: 'https://nongthonmoiphutho.vn/nguoi-phu-nu-so-huu-2-san-pham-ocop-4-sao-939',
      },
      {
        label: 'Thanh Thủy – Đông trùng hạ thảo sản phẩm OCOP 3 sao (Làng nghề Việt)',
        labelEn: 'Thanh Thuy 3-Star OCOP Cordyceps (Lang nghe Viet)',
        url: 'https://langngheviet.com.vn/thanh-thuy-phu-tho-dong-trung-ha-thao-san-pham-ocop-3-sao-13255.html',
      },
      {
        label: 'Cổng giới thiệu Minh Anh Hi-Tech',
        labelEn: 'Minh Anh Hi-Tech Official Portal',
        url: 'https://minhanhhitech.com/',
      },
    ],
    relatedProductIds: [
      'tra-matcha-maika',
      'tra-matcha-sua-maika',
      'tra-xanh-sencha-maika',
      'tra-sencha-gao-lut-maika',
      'chuoi-say-lanh-maikafood',
      'dong-trung-ha-thao-anh-minh',
    ],
  },
  {
    id: 'exp-lang-tuong-holusa',
    title: 'Làng nghề Nước tương cổ HOLUSA – Hoa Lúa (Lâm Thao)',
    titleEn: 'HOLUSA Ancient Soy Sauce Craft – Hoa Lua (Lam Thao)',
    locality: 'Huyện Lâm Thao, Phú Thọ',
    localityEn: 'Lam Thao District, Phú Thọ',
    districtTag: 'Lâm Thao',
    districtTagEn: 'Lam Thao',
    durationSample: 'Liên hệ trước với công ty',
    durationSampleEn: 'Contact company beforehand',
    groupSizeSample: 'Nhóm 5–20 khách theo hẹn trước',
    groupSizeSampleEn: '5–20 visitors by appointment',
    image:
      'https://dulichphutho.gov.vn/content-uploads/2025/02/khat-vong-hoa-lua-637714401535025746.jpg',
    summary:
      'Gần 10 năm nghiên cứu và phát triển bởi anh Thông tại Công ty TNHH MTV Hoa Lúa (Lâm Thao), thương hiệu Nước tương làng cổ HOLUSA tìm cách giữ trọn “tinh hoa của lúa” trong hai dòng sản phẩm Tương cổ Đất Tổ và Nước cốt tương HOLUSA.',
    summaryEn:
      'Founded nearly a decade ago in Lam Thao by Hoa Lua Co., Ltd., the HOLUSA Ancient Village Soy Sauce brand preserves traditional fermentation heritage and "the essence of rice" across both classic soy sauce and concentrated essence bottles.',
    highlights: [
      'Gìn giữ nghề làm tương cổ truyền vùng Lâm Thao với nhãn hiệu Nước tương làng cổ HOLUSA',
      'Đồng giá tham khảo 120.000đ cho Tương cổ Đất Tổ & Nước cốt tương HOLUSA',
    ],
    highlightsEn: [
      'Preserves ancestral Lam Thao fermentation heritage under the HOLUSA brand',
      '120,000 VND retail bottles for both Ancient Dat To Soy Sauce and Soy Sauce Essence',
    ],
    scheduleDisclaimer:
      'Giờ mở cửa tham quan tại cơ sở hiện chưa được xác nhận cố định; vui lòng xem bản đồ và liên hệ trước.',
    scheduleDisclaimerEn:
      'Fixed public tour hours are not confirmed; view the map link and contact Hoa Lua prior to visiting.',
    hostProducer: 'Công ty TNHH MTV Hoa Lúa (HOLUSA)',
    hostProducerEn: 'Hoa Lua Co., Ltd. (HOLUSA)',
    visitorVerified: false,
    address: 'Huyện Lâm Thao, tỉnh Phú Thọ',
    addressEn: 'Lam Thao District, Phú Thọ Province',
    mapUrl: 'https://maps.app.goo.gl/wRDpHLnVHw26atap9?g_st=ic',
    mapQuery: 'Lam Thao, Phu Tho, Vietnam',
    videos: [],
    articles: [
      {
        label: 'Khát vọng Hoa Lúa (Báo Phú Thọ)',
        labelEn: 'Hoa Lua Aspiration (Bao Phu Tho)',
        url: 'https://baophutho.vn/khat-vong-hoa-lua-180425.htm',
      },
      {
        label: 'Nâng tầm giá trị sản phẩm OCOP HOLUSA (Báo Phú Thọ)',
        labelEn: 'Elevating OCOP Value for HOLUSA (Bao Phu Tho)',
        url: 'https://baophutho.vn/nang-tam-gia-tri-san-pham-ocop-182992.htm',
      },
    ],
    relatedProductIds: ['tuong-co-dat-to-holusa', 'nuoc-cot-tuong-holusa'],
  },
  {
    id: 'exp-am-thuc-muong-thit-chua',
    title: 'Làng nghề Ẩm thực Mường – Thịt chua Thanh Sơn (Trường Foods)',
    titleEn: 'Muong Culinary Craft – Thanh Son Fermented Pork (Truong Foods)',
    locality: 'Huyện Thanh Sơn, Phú Thọ',
    localityEn: 'Thanh Son District, Phú Thọ',
    districtTag: 'Thanh Sơn',
    districtTagEn: 'Thanh Son',
    durationSample: 'Liên hệ trước với cơ sở',
    durationSampleEn: 'Contact producer beforehand',
    groupSizeSample: 'Nhóm 5–30 khách theo lịch hẹn',
    groupSizeSampleEn: '5–30 visitors by schedule',
    image: IMAGE_ASSETS.thitChua1,
    summary:
      'Kế thừa bí quyết muối thịt chua trong ống tre, ống nứa của đồng bào Mường Thanh Sơn từ thịt lợn chọn lọc nướng sơ kết hợp thính gạo rang vàng, lên men tự nhiên 3–7 ngày không chất bảo quản cùng lá ổi.',
    summaryEn:
      'Rooted in the Muong community’s traditional practice of fermenting flame-seared pork and golden roasted rice powder (thính) inside bamboo tubes or guava-leaf-lined boxes for 3–7 days with zero preservatives.',
    highlights: [
      'Quy trình 3 bước chuẩn vị: Nướng sơ bì săn thơm, ướp thính gạo rang và ủ tự nhiên 3–7 ngày',
      'Đa dạng dòng hộp Thịt chua (60k–85k/hộp) và Sét quà Con Cui làm quà biếu đặc sản',
    ],
    highlightsEn: [
      '3-step craft: light skin searing, golden rice-powder thính coating, 3–7 day fermentation',
      'Features fermented pork lines (60k–85k VND/box) and ceremonial Con Cui gift sets',
    ],
    scheduleDisclaimer:
      'Lịch tham quan trực tiếp tại nhà máy cần liên hệ trước với Trường Foods Thanh Sơn qua bản đồ hoặc hotline.',
    scheduleDisclaimerEn:
      'Factory visits require contacting Truong Foods Thanh Son ahead via the map listing or phone.',
    hostProducer: 'Cơ sở Thịt chua Thanh Sơn – Trường Foods',
    hostProducerEn: 'Thanh Son Fermented Pork – Truong Foods',
    visitorVerified: false,
    address: 'Huyện Thanh Sơn, tỉnh Phú Thọ',
    addressEn: 'Thanh Son District, Phú Thọ Province',
    mapUrl:
      'https://www.google.com/maps?ftid=0x313493897fd96c1d:0xf8e392ee119d5267&g_st=ic',
    mapQuery: 'Truong Foods, Thanh Son, Phu Tho, Vietnam',
    videos: [
      {
        id: 'vid-thit-chua-thanh-son',
        title: 'Video giới thiệu nghề làm Thịt chua Thanh Sơn – Trường Foods',
        titleEn: 'Thanh Son Fermented Pork Heritage Video',
        youtubeId: 'FkbLrF1EXo4',
        url: 'https://youtu.be/FkbLrF1EXo4?si=8ji7ICb01DUMG4Ci',
      },
    ],
    articles: [
      {
        label: 'Phú Thọ có sản phẩm tiềm năng đạt chứng nhận OCOP 5 sao (Báo Phú Thọ)',
        labelEn: 'High-Potential 5-Star OCOP Specialty (Bao Phu Tho)',
        url: 'https://baophutho.vn/phu-tho-co-mot-san-pham-tiem-nang-dat-chung-nhan-ocop-5-sao-223986.htm',
      },
      {
        label: 'Câu chuyện ra đời Thịt chua Trường Foods',
        labelEn: 'Origin Story of Truong Foods Thịt chua',
        url: 'https://truongfoods.vn/cau-chuyen-ve-su-ra-doi-cua-thit-chua-truong-foods-vi-toi-ot/',
      },
    ],
    relatedProductIds: [
      'thit-chua-thanh-son',
      'set-qua-con-cui-thit-chua-thit-muoi-nem-chua',
    ],
  },
  {
    id: 'exp-ong-tam-dao-honeco',
    title: 'Nghề nuôi ong gia truyền 60 năm – Ong Tam Đảo Honeco',
    titleEn: '60-Year Family Beekeeping Heritage – Tam Dao Honey (Honeco)',
    locality: 'Tam Đảo / Khu vực liên kết Phú Thọ',
    localityEn: 'Tam Dao / Phú Thọ Network',
    districtTag: 'Tam Đảo / Phú Thọ',
    districtTagEn: 'Tam Dao / Phú Thọ',
    durationSample: 'Liên hệ trước với Honeco',
    durationSampleEn: 'Contact Honeco beforehand',
    groupSizeSample: 'Nhóm 5–30 khách theo lịch hẹn',
    groupSizeSampleEn: '5–30 visitors by appointment',
    image:
      'https://honeco.com/templates/fashion03/assets/media/banner/honeco_60_nam_kinh_nghiem_nuoi_ong_gia_truyen.jpg',
    summary:
      'Thương hiệu gắn với 60 năm kinh nghiệm nuôi ong gia truyền và hành trình minh bạch quy trình của Tổng giám đốc Lê Thị Nga – đưa Mật ong đặc biệt Tam Đảo cùng các dòng Curcumin, Sữa chúa, Hoa rừng và Chanh leo chinh phục thị trường trong nước và xuất khẩu.',
    summaryEn:
      'Rooted in 60 years of family apiculture and transparent production championed by CEO Lê Thị Nga—offering Special Tam Dao Honey, Curcumin, Royal Jelly, Wildflower, and Passion Fruit Honey.',
    highlights: [
      'Câu chuyện công khai quy trình sản xuất và giải thích khoa học về kết tinh mật ong tự nhiên',
      '5 dòng mật ong đặc sản Honeco (Mật ong đặc biệt 500g niêm yết 290.000đ)',
    ],
    highlightsEn: [
      'Transparent production and public education on pure honey crystallization',
      '5 signature Honeco honey lines (Special 500g jar listed at 290,000 VND)',
    ],
    scheduleDisclaimer:
      'Hỗ trợ đặt lịch tham quan theo hẹn trước; xem bản đồ chỉ đường và liên hệ Honeco để sắp xếp thời gian đón tiếp.',
    scheduleDisclaimerEn:
      'Prior-appointment visits are available; view the map link and contact Honeco to confirm your schedule.',
    hostProducer: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
    hostProducerEn: 'Tam Dao Bee JSC (Honeco)',
    visitorVerified: false,
    address: 'Hệ thống Ong Tam Đảo – Honeco (xem chỉ đường Google Maps)',
    addressEn: 'Tam Dao Bee JSC – Honeco Facility (view Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    mapQuery: 'Honeco, Ong Tam Dao, Vietnam',
    videos: [
      {
        id: 'vid-honeco',
        title: 'Video giới thiệu Ong Tam Đảo Honeco – 60 năm nghề nuôi ong gia truyền',
        titleEn: 'Honeco Tam Dao Honey 60-Year Heritage Video',
        youtubeId: 'QL3iFeQQsp8',
        url: 'https://youtu.be/QL3iFeQQsp8?si=wR9A7ogpZeJ2edj-',
      },
    ],
    articles: [
      {
        label: 'Mật ong Tam Đảo và bí quyết chinh phục thị trường khó tính (Bộ Công Thương)',
        labelEn: 'Tam Dao Honey Reaching Demanding Markets (MOIT)',
        url: 'https://moit.gov.vn/tu-hao-hang-viet-nam/mat-ong-tam-dao-va-bi-quyet-chinh-phuc-cac-thi-truong-kho-tinh.html',
      },
      {
        label: 'Câu chuyện Nữ tướng Honeco Lê Thị Nga',
        labelEn: 'The Story of Honeco CEO Lê Thị Nga',
        url: 'https://honeco.com/nu-tuong-honeco',
      },
    ],
    relatedProductIds: [
      'mat-ong-tam-dao',
      'mat-ong-curcumin',
      'mat-ong-sua-chua',
      'mat-ong-hoa-rung',
      'mat-ong-chanh-leo',
    ],
  },
  {
    id: 'exp-banaco-phu-tho',
    title: 'Mô hình chế biến sâu Chuối tiêu xanh Banaco (Phú Thọ)',
    titleEn: 'Banaco Green Banana Value-Added Processing (Phú Thọ)',
    locality: 'Xã Bản Nguyên, Lâm Thao',
    localityEn: 'Ban Nguyen, Lam Thao',
    districtTag: 'Lâm Thao',
    districtTagEn: 'Lam Thao',
    durationSample: 'Liên hệ trước qua hotline 0961 183 018',
    durationSampleEn: 'Contact hotline 0961 183 018 beforehand',
    groupSizeSample: 'Nhóm 5–20 khách theo hẹn trước',
    groupSizeSampleEn: '5–20 visitors by appointment',
    image: 'https://banaco.com.vn/upload/botchuoi01/anh-hop-bot-chuoi-mau-vang-1.jpg',
    summary:
      'Thay vì phụ thuộc vào đầu ra chuối tươi ngắn ngày, Công ty CP Công nghệ chế biến Xuất khẩu BANACO (Bản Nguyên, Lâm Thao) phát triển công nghệ chế biến sâu từ chuối tiêu xanh giàu tinh bột kháng thành Bột ngũ cốc đạt OCOP 3 sao (120.000đ/250g) và Chuối sấy Banaco (120.000đ/200g).',
    summaryEn:
      'Going beyond fresh-fruit seasonality, BANACO Processing & Export Technology JSC (Ban Nguyen, Lam Thao) crafts 3-Star OCOP Green Banana Mixed Cereal Powder (120,000 VND/250g) and Dried Banana (120,000 VND/200g).',
    highlights: [
      'Sản phẩm Bột ngũ cốc hỗn hợp chuối tiêu xanh đạt chứng nhận OCOP 3 sao tỉnh Phú Thọ',
      'Chuối sấy Banaco đóng hộp 200g không đường tinh luyện (120.000đ)',
    ],
    highlightsEn: [
      'Provincial 3-Star OCOP certified Green Banana Mixed Cereal Powder (120,000 VND)',
      'Zero-refined-sugar Banaco Dried Banana 200g box (120,000 VND)',
    ],
    scheduleDisclaimer:
      'Khu 4 (Vĩnh Lại), xã Bản Nguyên, huyện Lâm Thao, Phú Thọ. Vui lòng liên hệ hotline 0961 183 018 trước khi ghé thăm.',
    scheduleDisclaimerEn:
      'Zone 4 (Vinh Lai), Ban Nguyen Commune, Lam Thao District, Phú Thọ. Please call 0961 183 018 before visiting.',
    hostProducer: 'Công ty CP Công nghệ chế biến Xuất khẩu BANACO',
    hostProducerEn: 'BANACO Processing & Export Technology JSC',
    visitorVerified: false,
    address: 'Khu 4 (Vĩnh Lại), xã Bản Nguyên, huyện Lâm Thao, tỉnh Phú Thọ',
    addressEn: 'Zone 4 (Vinh Lai), Ban Nguyen Commune, Lam Thao District, Phú Thọ',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ban+Nguyen+Lam+Thao+Phu+Tho',
    mapQuery: 'Ban Nguyen, Lam Thao, Phu Tho, Vietnam',
    videos: [
      {
        id: 'vid-banaco',
        title: 'Video giới thiệu Bột ngũ cốc chuối tiêu xanh & nông sản Banaco Phú Thọ',
        titleEn: 'Banaco Green Banana Cereal Processing Feature',
        youtubeId: 'bZ5rIDgNOWE',
        url: 'https://youtu.be/bZ5rIDgNOWE?si=Ag6EIEm9PDXfWksC',
      },
    ],
    articles: [
      {
        label: 'Trang thông tin chính thức Banaco Phú Thọ',
        labelEn: 'Banaco Official Portal',
        url: 'https://banaco.com.vn/',
      },
    ],
    relatedProductIds: [
      'bot-ngu-coc-hon-hop-chuoi-tieu-xanh-banaco',
      'chuoi-say-banaco',
    ],
  },
];

export const PRODUCER_PROFILES_SAMPLE = [
  {
    id: 'coop-phu-tho-1',
    name: 'Hộ sản xuất & Hợp tác xã Phú Thọ (Mẫu minh họa)',
    nameEn: 'Phú Thọ Producer & Cooperative (Sample Profile)',
    representative: 'Đại diện hộ OCOP Phú Thọ (Mẫu)',
    representativeEn: 'Phú Thọ OCOP Cooperative Representative (Sample)',
    locality: 'Phú Thọ',
    localityEn: 'Phú Thọ',
    role: 'Quản lý danh mục 28 sản phẩm & đơn mẫu',
    roleEn: '28-product catalog & sample order management',
  },
];

export const DASHBOARD_REVENUE_SERIES: Record<
  DashboardTimeframe,
  MonthlyRevenuePoint[]
> = {
  '7d': [
    { label: 'T2', labelEn: 'Mon', revenue: 4200000, orders: 12 },
    { label: 'T3', labelEn: 'Tue', revenue: 3900000, orders: 10 },
    { label: 'T4', labelEn: 'Wed', revenue: 5100000, orders: 14 },
    { label: 'T5', labelEn: 'Thu', revenue: 4600000, orders: 12 },
    { label: 'T6', labelEn: 'Fri', revenue: 6400000, orders: 16 },
    { label: 'T7', labelEn: 'Sat', revenue: 8100000, orders: 20 },
    { label: 'CN', labelEn: 'Sun', revenue: 7300000, orders: 17 },
  ],
  '30d': [
    { label: 'Tuần 1', labelEn: 'Week 1', revenue: 26400000, orders: 68 },
    { label: 'Tuần 2', labelEn: 'Week 2', revenue: 29800000, orders: 74 },
    { label: 'Tuần 3', labelEn: 'Week 3', revenue: 24900000, orders: 63 },
    { label: 'Tuần 4', labelEn: 'Week 4', revenue: 35600000, orders: 91 },
  ],
  quarter: [
    { label: 'Tháng 4', labelEn: 'Apr', revenue: 94200000, orders: 242 },
    { label: 'Tháng 5', labelEn: 'May', revenue: 102800000, orders: 265 },
    { label: 'Tháng 6', labelEn: 'Jun', revenue: 116700000, orders: 296 },
  ],
  year: [
    { label: 'T1', labelEn: 'Jan', revenue: 128000000, orders: 318 },
    { label: 'T2', labelEn: 'Feb', revenue: 88500000, orders: 224 },
    { label: 'T3', labelEn: 'Mar', revenue: 82400000, orders: 208 },
    { label: 'T4', labelEn: 'Apr', revenue: 94200000, orders: 242 },
    { label: 'T5', labelEn: 'May', revenue: 102800000, orders: 265 },
    { label: 'T6', labelEn: 'Jun', revenue: 116700000, orders: 296 },
  ],
};

export const SEASONAL_TREND_SERIES: Record<
  TrendGranularity,
  {
    title: string;
    titleEn: string;
    periodNote: string;
    periodNoteEn: string;
    points: MonthlyRevenuePoint[];
  }
> = {
  day: {
    title: 'Xu hướng doanh thu theo ngày (Minh họa)',
    titleEn: 'Daily Revenue Trend (Sample)',
    periodNote: '7 ngày gần nhất trong dữ liệu mẫu',
    periodNoteEn: 'Last 7 days in sample dataset',
    points: DASHBOARD_REVENUE_SERIES['7d'],
  },
  month: {
    title: 'Xu hướng doanh thu theo tháng (Minh họa)',
    titleEn: 'Monthly Revenue Trend (Sample)',
    periodNote: '6 tháng đầu năm 2026 trong dữ liệu mẫu',
    periodNoteEn: 'First 6 months of 2026 in sample dataset',
    points: DASHBOARD_REVENUE_SERIES['year'],
  },
  season: {
    title: 'Xu hướng theo mùa vụ & dịp lễ (Minh họa)',
    titleEn: 'Seasonal & Holiday Trend (Sample)',
    periodNote: 'So sánh chu kỳ mua sắm mẫu theo dịp lễ hội',
    periodNoteEn: 'Sample shopping cycles across festive seasons',
    points: [
      { label: 'Tết Nguyên Đán', labelEn: 'Lunar New Year', revenue: 162000000, orders: 380 },
      { label: 'Giỗ Tổ 10/3', labelEn: 'Hung Kings 10/3', revenue: 141000000, orders: 342 },
      { label: 'Mùa Hè', labelEn: 'Summer', revenue: 96000000, orders: 245 },
      { label: 'Trung Thu', labelEn: 'Mid-Autumn', revenue: 124000000, orders: 304 },
    ],
  },
};

export const PRODUCT_BI_METRICS: ProductBiMetric[] = RAW_CATALOG.map((p, idx) => ({
  productId: p.id,
  views: 240 + ((idx * 53) % 420),
  searches: 65 + ((idx * 29) % 180),
  addToCart: 28 + ((idx * 17) % 85),
  purchases: 12 + ((idx * 11) % 48),
  unitsSold: 18 + ((idx * 13) % 64),
  avgRating: 0,
  reviewCount: 0,
}));

export const FEEDBACK_THEMES_SAMPLE: FeedbackThemeSample[] = [
  {
    id: 'fb-1',
    theme: 'Khách quan tâm nhóm trà OCOP 4–5 sao như Trà Đinh Hoài Trung và Chè Đá Hen',
    themeEn: 'Strong buyer interest in 4–5 star OCOP teas such as Hoai Trung and Da Hen',
    category: CATEGORY_1,
    mentionsCount: 28,
    sentiment: 'Tích cực',
    sampleQuote:
      'Có mức giá rõ ràng và chứng nhận OCOP giúp khách dễ chốt nhanh Box Trà Đất Tổ 450.000đ.',
    sampleQuoteEn:
      'Clear pricing and OCOP ratings help buyers confirm the 450,000 VND Heritage Tea Box quickly.',
  },
  {
    id: 'fb-2',
    theme: 'Nhu cầu ghép chung mỳ gạo Hùng Lô, chuối sấy Hoàng Cương và tương cổ',
    themeEn: 'High demand pairing Hung Lo noodles, Hoang Cuong dried bananas & ancient soy sauce',
    category: CATEGORY_2,
    mentionsCount: 24,
    sentiment: 'Tích cực',
    sampleQuote:
      'Box Nông sản làng nghề giá 245.000đ rất gọn nhẹ, dễ bảo quản khi gửi tặng người thân.',
    sampleQuoteEn:
      'The 245,000 VND Craft Village Harvest Box is light, shelf-stable, and ideal for sending home.',
  },
  {
    id: 'fb-3',
    theme: 'Khách doanh nghiệp chuộng Box Ngọt lành và Box Đặc sản cao cấp làm quà biếu',
    themeEn: 'Corporate buyers favor Wholesome Sweetness Box and Premium Specialties Box for gifting',
    category: CATEGORY_3,
    mentionsCount: 21,
    sentiment: 'Tích cực',
    sampleQuote:
      'Mức giá đầy đủ trên từng sản phẩm giúp tính ngay tổng Box Ngọt lành (445.000đ) và Box Đặc sản cao cấp (2.330.000đ).',
    sampleQuoteEn:
      'Complete per-item pricing automatically calculates totals for Wholesome Sweetness Box (445,000 VND) and Premium Box (2,330,000 VND).',
  },
];

export const COMBO_PERFORMANCE_SAMPLE: ComboPerformanceSample[] = [
  {
    id: 'cb-1',
    name: 'Box Trà Đất Tổ',
    nameEn: 'Đất Tổ Heritage Tea Box',
    typeLabel: 'Combo / Box quà',
    price: 450000,
    conversionRatePct: 12.6,
    ordersCount: 58,
    note: 'Chè búp tím Thanh Ba (300k) + Trà xanh Sencha Maika (50k) + Tương làng Bợ (100k).',
    noteEn: 'Thanh Ba Tea (300k) + Green Sencha Maika (50k) + Lang Bo Soy Sauce (100k).',
  },
  {
    id: 'cb-2',
    name: 'Box Nông sản làng nghề',
    nameEn: 'Craft Village Harvest Box',
    typeLabel: 'Combo / Box quà',
    price: 245000,
    conversionRatePct: 11.2,
    ordersCount: 49,
    note: 'Mỳ gạo Hùng Lô (40k) + Tương cổ Holusa (120k) + Chuối sấy dẻo Hoàng Cương (85k).',
    noteEn: 'Hung Lo Noodles (40k) + Holusa Soy Sauce (120k) + Hoang Cuong Banana (85k).',
  },
  {
    id: 'cb-3',
    name: 'Box Ngọt lành',
    nameEn: 'Wholesome Sweetness Box',
    typeLabel: 'Combo / Box quà',
    price: 445000,
    conversionRatePct: 10.4,
    ordersCount: 41,
    note: 'Mật ong Tam Đảo 500g (290k) + Chuối sấy dẻo Hoàng Cương (85k) + Trà sencha gạo lứt Maika (70k).',
    noteEn: 'Tam Dao Honey (290k) + Hoang Cuong Banana (85k) + Brown Rice Sencha (70k).',
  },
];

export const INITIAL_STOCK_HISTORY: StockMovementRecord[] = [
  {
    id: 'sm-1',
    date: '14/06/2026',
    productId: 'che-bup-tim-thanh-ba',
    productName: 'Chè búp tím Thanh Ba',
    productNameEn: 'Thanh Ba Purple Bud Tea',
    changeType: 'Nhập kho mẫu',
    delta: 0,
    note: 'Đã cập nhật đầy đủ giá 300.000đ, quy cách hộp 150g và trạng thái sẵn hàng.',
    noteEn: 'Updated retail price 300,000 VND, 150g packaging, and stock availability.',
  },
  {
    id: 'sm-2',
    date: '15/06/2026',
    productId: 'my-gao-sach-sinh-ra-tu-lang-hung-lo',
    productName: 'Mỳ gạo sạch sinh ra từ làng Hùng Lô',
    productNameEn: 'Hung Lo Village Clean Rice Noodles',
    changeType: 'Nhập kho mẫu',
    delta: 0,
    note: 'Đã cập nhật giá 40.000đ/kg & xác nhận đón khách tham quan theo lịch hẹn.',
    noteEn: 'Updated retail price 40,000 VND/kg & confirmed group tour booking info.',
  },
];

export const AI_RECOMMENDATIONS_SAMPLE: AiBusinessRecommendation[] = [
  {
    id: 'rec-1',
    dataSource: 'Kiểm tra hoàn thiện đơn giá & dữ liệu danh mục',
    dataSourceEn: 'Catalog Pricing & Data Completeness Check',
    period: 'Hiện tại',
    periodEn: 'Current',
    finding:
      'Toàn bộ 28/28 sản phẩm trong 3 nhóm đều đã được cập nhật đầy đủ đơn giá bán lẻ, quy cách, thành phần và nguồn ảnh.',
    findingEn:
      'All 28 of 28 specialties across the 3 product groups now feature complete retail prices, weights, ingredients, and verified photos.',
    suggestedAction:
      'Khách hàng có thể đặt trực tiếp từng sản phẩm hoặc thêm trọn bộ 5 box quà Đất Tổ (205.000đ – 2.330.000đ) vào giỏ hàng.',
    suggestedActionEn:
      'Shoppers can order individual specialties directly or add any of the 5 Đất Tổ gift boxes (205,000 – 2,330,000 VND) to cart.',
    confidenceLabel: 'Danh mục hoàn thiện 100%',
    confidenceLabelEn: '100% Complete Catalog',
    targetSection: 'inventory',
    targetLabel: 'Kiểm tra danh mục',
    targetLabelEn: 'Check inventory',
    relatedProductId: 'set-qua-con-cui-thit-chua-thit-muoi-nem-chua',
  },
  {
    id: 'rec-2',
    dataSource: 'Hiệu quả 5 Box quà gợi ý',
    dataSourceEn: '5 Curated Gift Box Performance',
    period: 'Hiện tại',
    periodEn: 'Current',
    finding:
      'Cả 5 box quà gợi ý đều đã hiển thị tổng giá tự động: Vị quê (205k), Nông sản làng nghề (245k), Ngọt lành (445k), Trà Đất Tổ (450k) và Cao cấp (2.330k).',
    findingEn:
      'All 5 curated boxes now show exact totals: Hometown Flavors (205k), Craft Harvest (245k), Wholesome Sweetness (445k), Heritage Tea (450k), and Premium (2.33M VND).',
    suggestedAction:
      'Đẩy mạnh giới thiệu Box Trà Đất Tổ kèm câu chuyện bảo tồn Chè búp tím Thanh Ba và Trà xanh Sencha OCOP 4 sao.',
    suggestedActionEn:
      'Feature the Heritage Tea Box alongside conservation stories for Thanh Ba Purple Bud Tea and 4-Star OCOP Green Sencha.',
    confidenceLabel: 'Đồng bộ báo giá box',
    confidenceLabelEn: 'Synced Box Pricing',
    targetSection: 'combos',
    targetLabel: 'Xem combo / box quà',
    targetLabelEn: 'View combos & gift boxes',
    relatedProductId: 'che-bup-tim-thanh-ba',
  },
];

export const INITIAL_SAMPLE_ORDERS: SampleOrder[] = [
  {
    id: 'PT-BOX-1001',
    date: '14/06/2026',
    customerName: 'Chị Nguyễn Lan Anh (Mẫu)',
    customerNameEn: 'Ms. Nguyen Lan Anh (Sample)',
    itemsSummary: 'Box Trà Đất Tổ (Chè búp tím Thanh Ba + Sencha Maika + Tương làng Bợ)',
    itemsSummaryEn: 'Đất Tổ Heritage Tea Box (Thanh Ba Tea + Sencha Maika + Lang Bo Soy Sauce)',
    productIds: ['che-bup-tim-thanh-ba', 'tra-xanh-sencha-maika', 'tuong-lang-bo'],
    amount: 450000,
    status: 'Chờ xác nhận',
    timeframeTag: '7d',
  },
  {
    id: 'PT-BOX-1002',
    date: '12/06/2026',
    customerName: 'Anh Trần Hoàng Nam (Mẫu)',
    customerNameEn: 'Mr. Tran Hoang Nam (Sample)',
    itemsSummary: 'Box Nông sản làng nghề (Mỳ gạo Hùng Lô + Tương cổ Holusa + Chuối sấy Hoàng Cương)',
    itemsSummaryEn: 'Craft Village Harvest Box (Hung Lo Noodles + Holusa Sauce + Hoang Cuong Banana)',
    productIds: [
      'my-gao-sach-sinh-ra-tu-lang-hung-lo',
      'tuong-co-dat-to-holusa',
      'chuoi-say-deo-hoang-cuong',
    ],
    amount: 245000,
    status: 'Đang xử lý',
    timeframeTag: '30d',
  },
];

export function formatVnd(
  amount: number | null | undefined,
  language: Language = 'vi',
): string {
  if (amount === null || amount === undefined || !Number.isFinite(amount)) {
    return language === 'en' ? 'Updating' : 'Đang cập nhật';
  }
  if (language === 'en') {
    return `${new Intl.NumberFormat('en-US').format(amount)} VND`;
  }
  return `${new Intl.NumberFormat('vi-VN').format(amount)}đ`;
}
