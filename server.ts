import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type SupportedLang = 'vi' | 'en';

interface GroundedVisitInfo {
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

interface GroundedProductRecord {
  orderNumber: number;
  id: string;
  name: string;
  nameEn: string;
  category: string;
  priceVnd: number | null;
  priceRange: string | null;
  priceRangeEn: string | null;
  unit: string | null;
  unitEn: string | null;
  weight: string | null;
  locality: string | null;
  ocopVerified: boolean;
  ocopTier: string | null;
  ocopTierEn: string | null;
  producerName: string | null;
  address: string | null;
  mapUrl: string | null;
  videoUrl: string | null;
  traceabilityUrl: string | null;
  visitInfo: GroundedVisitInfo;
}

interface GroundedGiftBox {
  id: string;
  name: string;
  nameEn: string;
  occasion: string;
  productIds: string[];
  summaryVi: string;
  summaryEn: string;
}

const GROUP_1 = 'Nhóm 1 – Trà và đồ uống';
const GROUP_2 = 'Nhóm 2 – Đặc sản khô, đồ ăn vặt và nông sản chế biến';
const GROUP_3 = 'Nhóm 3 – Gia vị, mật ong và thực phẩm địa phương';

const DEFAULT_VISIT_UNCONFIRMED: GroundedVisitInfo = {
  verified: false,
  acceptsVisitors: null,
  contactMethod: 'Thông tin tham quan hiện chưa được xác nhận. Vui lòng liên hệ cơ sở trước khi đến.',
  contactMethodEn: 'Visit information is not yet confirmed. Please contact the producer before visiting.',
};

const HUNG_LO_VISIT_VERIFIED: GroundedVisitInfo = {
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
  mapGuide: 'Xã Hùng Lô, TP. Việt Trì (có liên kết Google Maps trực tiếp).',
  mapGuideEn: 'Hung Lo Commune, Viet Tri City (direct Google Maps link available).',
  contactMethod: 'Liên hệ trực tiếp Hợp tác xã Mỳ gạo Hùng Lô hoặc đặt lịch mẫu trên nền tảng để xác nhận thời gian đón đoàn.',
  contactMethodEn: 'Contact Hung Lo Rice Noodle Cooperative directly or submit a prototype booking request to confirm visiting hours.',
};

const GROUNDED_PRODUCTS: GroundedProductRecord[] = [
  // Group 1 (1 - 10)
  {
    orderNumber: 1,
    id: 'che-bup-tim-thanh-ba',
    name: 'Chè búp tím Thanh Ba',
    nameEn: 'Thanh Ba Purple Bud Tea',
    category: GROUP_1,
    priceVnd: 300000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp 150g',
    unitEn: '150g box',
    weight: '150g',
    locality: 'Thanh Ba',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty TNHH Đầu tư và Phát triển Trà UT',
    address: 'Huyện Thanh Ba, tỉnh Phú Thọ (xem chỉ đường trên Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/dtngdnVVoSyujRSV7',
    videoUrl: 'https://youtu.be/Fe0j6Ktun3U?si=Wlpj0f-ywlBfxl6V',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 2,
    id: 'tra-dinh-cao-cap-hoai-trung',
    name: 'Trà Đinh cao cấp Hoài Trung',
    nameEn: 'Hoai Trung Premium Dinh Tea',
    category: GROUP_1,
    priceVnd: 350000,
    priceRange: '150.000đ – 600.000đ',
    priceRangeEn: '150,000 – 600,000 VND',
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g',
    locality: 'Thanh Ba',
    ocopVerified: true,
    ocopTier: 'OCOP 5 sao cấp quốc gia (2023)',
    ocopTierEn: 'National 5-Star OCOP (2023)',
    producerName: 'Công ty TNHH Chè Hoài Trung',
    address: 'Tỉnh Phú Thọ (xem chỉ đường trên Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/L7zk5Z8zYL8J1hTL9',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 3,
    id: 'che-long-coc',
    name: 'Chè Long Cốc',
    nameEn: 'Long Coc Tea',
    category: GROUP_1,
    priceVnd: 130000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'gói 200g',
    unitEn: '200g pouch',
    weight: '200g',
    locality: 'Tân Sơn',
    ocopVerified: true,
    ocopTier: 'OCOP 4 sao (Chè Bát Tiên Long Cốc)',
    ocopTierEn: '4-Star OCOP (Long Coc Bat Tien Tea)',
    producerName: 'HTX Sản xuất Chè an toàn Long Cốc',
    address: 'Xã Long Cốc, huyện Tân Sơn, tỉnh Phú Thọ',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Doi+che+Long+Coc+Tan+Son+Phu+Tho',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 4,
    id: 'che-da-hen',
    name: 'Chè Đá Hen',
    nameEn: 'Da Hen Tea',
    category: GROUP_1,
    priceVnd: 100000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'gói 200g',
    unitEn: '200g pouch',
    weight: '200g',
    locality: 'Cẩm Khê',
    ocopVerified: true,
    ocopTier: 'OCOP 4 sao (Chè Đá Hen hảo hạng · 2023)',
    ocopTierEn: '4-Star OCOP (Premium Da Hen Tea · 2023)',
    producerName: 'HTX Sản xuất và chế biến chè Đá Hen',
    address: 'Xã Đồng Lương, huyện Cẩm Khê, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/cS8gPjKtzhoD46ub9',
    videoUrl: null,
    traceabilityUrl: 'https://hoptacxa.vn/vn/trace-code/HTX8403035',
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 5,
    id: 'che-thanh-nam',
    name: 'Chè Thành Nam',
    nameEn: 'Thanh Nam Tea',
    category: GROUP_1,
    priceVnd: 380000,
    priceRange: '300.000đ – 1.500.000đ/kg',
    priceRangeEn: '300,000 – 1,500,000 VND/kg',
    unit: 'túi 500g',
    unitEn: '500g pack',
    weight: '500g',
    locality: 'Thanh Sơn',
    ocopVerified: true,
    ocopTier: 'OCOP 3–4 sao (HTX Chè Thành Nam)',
    ocopTierEn: '3–4 Star OCOP (Thanh Nam Cooperative)',
    producerName: 'HTX Chè Thành Nam',
    address: 'Huyện Thanh Sơn, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/Tm6vdyxeZtmbtTgF8',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 6,
    id: 'che-suong-som-xuan-son',
    name: 'Chè Sương sớm Xuân Sơn',
    nameEn: 'Xuan Son Morning Mist Tea',
    category: GROUP_1,
    priceVnd: 300000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g',
    locality: 'Tân Sơn',
    ocopVerified: true,
    ocopTier: 'OCOP 3 sao (2023)',
    ocopTierEn: '3-Star OCOP (2023)',
    producerName: 'HTX Dịch vụ Nông lâm nghiệp Xuân Đài',
    address: 'Xã Xuân Đài, huyện Tân Sơn, tỉnh Phú Thọ',
    mapUrl: null,
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 7,
    id: 'tra-matcha-maika',
    name: 'Trà Matcha Maika',
    nameEn: 'Maika Matcha Tea',
    category: GROUP_1,
    priceVnd: 80000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'túi 100g',
    unitEn: '100g pouch',
    weight: '100g',
    locality: 'Thanh Thủy',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty TNHH Maika Food',
    address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 8,
    id: 'tra-matcha-sua-maika',
    name: 'Trà Matcha sữa Maika',
    nameEn: 'Maika Milk Matcha Tea',
    category: GROUP_1,
    priceVnd: 68000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp 170g (10 gói)',
    unitEn: '170g box (10 sachets)',
    weight: '170g',
    locality: 'Thanh Thủy',
    ocopVerified: true,
    ocopTier: 'OCOP 4 sao cấp tỉnh (Maika Food)',
    ocopTierEn: 'Provincial 4-Star OCOP (Maika Food)',
    producerName: 'Công ty TNHH Maika Food',
    address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 9,
    id: 'tra-xanh-sencha-maika',
    name: 'Trà xanh Sencha Maika',
    nameEn: 'Maika Green Sencha Tea',
    category: GROUP_1,
    priceVnd: 50000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp túi lọc 40g',
    unitEn: '40g tea-bag box',
    weight: '40g',
    locality: 'Thanh Thủy',
    ocopVerified: true,
    ocopTier: 'OCOP 4 sao cấp tỉnh (2022)',
    ocopTierEn: 'Provincial 4-Star OCOP (2022)',
    producerName: 'Công ty TNHH Maika Food',
    address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 10,
    id: 'tra-sencha-gao-lut-maika',
    name: 'Trà sencha gạo lứt Maika',
    nameEn: 'Maika Brown Rice Sencha Tea',
    category: GROUP_1,
    priceVnd: 70000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g',
    locality: 'Thanh Thủy',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty TNHH Maika Food',
    address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/XrkoDa8u9yKUZJeu5',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },

  // Group 2 (11 - 18)
  {
    orderNumber: 11,
    id: 'my-gao-sach-sinh-ra-tu-lang-hung-lo',
    name: 'Mỳ gạo sạch sinh ra từ làng Hùng Lô',
    nameEn: 'Hung Lo Village Clean Rice Noodles',
    category: GROUP_2,
    priceVnd: 40000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'gói 1kg',
    unitEn: '1kg pack',
    weight: '1kg',
    locality: 'Việt Trì',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Hợp tác xã Mỳ gạo Hùng Lô',
    address: 'Xã Hùng Lô, thành phố Việt Trì, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/T9uyMrpPWFS6e2Yx6',
    videoUrl: 'https://youtu.be/zNcawB68FJU?si=5rFdjs6MUSy6R22U',
    traceabilityUrl: null,
    visitInfo: HUNG_LO_VISIT_VERIFIED,
  },
  {
    orderNumber: 12,
    id: 'mi-gao-cu-thang',
    name: 'Mì gạo Cự Thắng',
    nameEn: 'Cu Thang Rice Noodles',
    category: GROUP_2,
    priceVnd: 40000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'gói 1kg',
    unitEn: '1kg pack',
    weight: '1kg',
    locality: 'Thanh Sơn',
    ocopVerified: true,
    ocopTier: 'OCOP 3 sao',
    ocopTierEn: '3-Star OCOP',
    producerName: 'HTX Dịch vụ nông nghiệp xã Cự Thắng',
    address: 'Xã Cự Thắng, huyện Thanh Sơn, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/STcifxP6xZA4mLGZA',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 13,
    id: 'chuoi-say-banaco',
    name: 'Chuối sấy Banaco',
    nameEn: 'Banaco Dried Banana',
    category: GROUP_2,
    priceVnd: 120000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp 200g',
    unitEn: '200g box',
    weight: '200g',
    locality: 'Lâm Thao / Phú Thọ',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty CP Công nghệ chế biến Xuất khẩu BANACO',
    address: 'Khu 4 (Vĩnh Lại), xã Bản Nguyên, huyện Lâm Thao, tỉnh Phú Thọ',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ban+Nguyen+Lam+Thao+Phu+Tho',
    videoUrl: 'https://youtu.be/bZ5rIDgNOWE?si=Ag6EIEm9PDXfWksC',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 14,
    id: 'chuoi-say-lanh-maikafood',
    name: 'Chuối sấy lạnh Maikafood',
    nameEn: 'Maikafood Freeze-Dried Banana',
    category: GROUP_2,
    priceVnd: 65000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'gói 100g',
    unitEn: '100g pouch',
    weight: '100g',
    locality: 'Thanh Thủy',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty TNHH Maika Food',
    address: 'Xã Xuân Lộc, huyện Thanh Thủy, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/Md3fXHPQtatDzmc86?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 15,
    id: 'chuoi-say-deo-hoang-cuong',
    name: 'Chuối sấy dẻo Hoàng Cương',
    nameEn: 'Hoang Cuong Soft-Dried Banana',
    category: GROUP_2,
    priceVnd: 85000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'túi/hộp 1kg',
    unitEn: '1kg pack',
    weight: '1kg',
    locality: 'Thanh Ba',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'HTX Chuối an toàn Hoàng Cương',
    address: 'Xã Hoàng Cương, huyện Thanh Ba, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/tNu5SiSRZ1VNMT3S8?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 16,
    id: 'bot-ngu-coc-hon-hop-chuoi-tieu-xanh-banaco',
    name: 'Bột ngũ cốc hỗn hợp chuối tiêu xanh Banaco',
    nameEn: 'Banaco Green Banana Mixed Cereal Powder',
    category: GROUP_2,
    priceVnd: 120000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp 250g',
    unitEn: '250g box',
    weight: '250g',
    locality: 'Lâm Thao / Phú Thọ',
    ocopVerified: true,
    ocopTier: 'OCOP 3 sao cấp tỉnh Phú Thọ',
    ocopTierEn: 'Phú Thọ Provincial 3-Star OCOP',
    producerName: 'Công ty CP Công nghệ chế biến Xuất khẩu BANACO',
    address: 'Khu 4 (Vĩnh Lại), xã Bản Nguyên, huyện Lâm Thao, tỉnh Phú Thọ',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ban+Nguyen+Lam+Thao+Phu+Tho',
    videoUrl: 'https://youtu.be/bZ5rIDgNOWE?si=Ag6EIEm9PDXfWksC',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 17,
    id: 'dong-trung-ha-thao-anh-minh',
    name: 'Đông trùng hạ thảo Anh Minh',
    nameEn: 'Anh Minh Cordyceps',
    category: GROUP_2,
    priceVnd: 650000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hũ/hộp 20g',
    unitEn: '20g jar',
    weight: '20g',
    locality: 'Thanh Thủy',
    ocopVerified: true,
    ocopTier: 'OCOP 3 sao',
    ocopTierEn: '3-Star OCOP',
    producerName: 'Cơ sở Đông trùng hạ thảo Anh Minh',
    address: 'Huyện Thanh Thủy, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/KW2SWTKtJX7xN4AaA?g_st=ic',
    videoUrl: 'https://youtu.be/3rbFdwIO-Ug?si=ZTWRjIYOA0_Qea40',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 18,
    id: 'nam-so-vang-tamogi',
    name: 'Nấm sò vàng Tamogi',
    nameEn: 'Tamogi Golden Oyster Mushroom',
    category: GROUP_2,
    priceVnd: 95000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hộp 500g',
    unitEn: '500g box',
    weight: '500g',
    locality: 'Phú Thọ',
    ocopVerified: true,
    ocopTier: 'OCOP 3 sao tỉnh Phú Thọ',
    ocopTierEn: 'Phú Thọ 3-Star OCOP',
    producerName: 'Công ty Cổ phần VietRAP Đầu tư Thương mại',
    address: 'Số 21/18/10 đường Võ Nguyên Giáp, tiểu khu Liên Sơn, xã Lương Sơn, tỉnh Phú Thọ',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=VietRAP+Phu+Tho',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },

  // Group 3 (19 - 28)
  {
    orderNumber: 19,
    id: 'tuong-lang-bo',
    name: 'Tương làng Bợ',
    nameEn: 'Lang Bo Traditional Soy Sauce',
    category: GROUP_3,
    priceVnd: 100000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'chai 1 lít',
    unitEn: '1-liter bottle',
    weight: '1 lít',
    locality: 'Thanh Thủy',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Làng nghề Tương làng Bợ (Thạch Đồng)',
    address: 'Xã Thạch Đồng, huyện Thanh Thủy, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/xde5QBSqXyEbcsCv9?g_st=ic',
    videoUrl: 'https://youtu.be/JB5yrwTGk_4?si=dqQxmcKLUcfAm0R6',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 20,
    id: 'tuong-co-dat-to-holusa',
    name: 'Tương cổ Đất Tổ Holusa',
    nameEn: 'Holusa Ancient Dat To Soy Sauce',
    category: GROUP_3,
    priceVnd: 120000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'chai 1,5 lít',
    unitEn: '1.5L bottle',
    weight: '1,5 lít',
    locality: 'Lâm Thao',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty TNHH MTV Hoa Lúa (HOLUSA)',
    address: 'Huyện Lâm Thao, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/wRDpHLnVHw26atap9?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 21,
    id: 'nuoc-cot-tuong-holusa',
    name: 'Nước cốt tương Holusa',
    nameEn: 'Holusa Soy Sauce Essence',
    category: GROUP_3,
    priceVnd: 120000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'chai 500ml',
    unitEn: '500ml bottle',
    weight: '500ml',
    locality: 'Lâm Thao',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty TNHH MTV Hoa Lúa (HOLUSA)',
    address: 'Huyện Lâm Thao, tỉnh Phú Thọ',
    mapUrl: 'https://maps.app.goo.gl/wRDpHLnVHw26atap9?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 22,
    id: 'mat-ong-tam-dao',
    name: 'Mật ong Tam Đảo',
    nameEn: 'Tam Dao Honey',
    category: GROUP_3,
    priceVnd: 290000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hũ 500g',
    unitEn: '500g jar',
    weight: '500g',
    locality: 'Tam Đảo / Phú Thọ',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
    address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    videoUrl: 'https://youtu.be/QL3iFeQQsp8?si=wR9A7ogpZeJ2edj-',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 23,
    id: 'mat-ong-curcumin',
    name: 'Mật ong Curcumin',
    nameEn: 'Curcumin Honey',
    category: GROUP_3,
    priceVnd: 490000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hũ 500g',
    unitEn: '500g jar',
    weight: '500g',
    locality: 'Tam Đảo / Phú Thọ',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
    address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 24,
    id: 'mat-ong-sua-chua',
    name: 'Mật ong sữa chúa',
    nameEn: 'Royal Jelly Honey',
    category: GROUP_3,
    priceVnd: 195000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hũ 450g',
    unitEn: '450g jar',
    weight: '450g',
    locality: 'Tam Đảo / Phú Thọ',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
    address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 25,
    id: 'mat-ong-hoa-rung',
    name: 'Mật ong hoa rừng',
    nameEn: 'Wildflower Honey',
    category: GROUP_3,
    priceVnd: 130000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hũ 450g',
    unitEn: '450g jar',
    weight: '450g',
    locality: 'Tam Đảo / Phú Thọ',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
    address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 26,
    id: 'mat-ong-chanh-leo',
    name: 'Mật ong chanh leo',
    nameEn: 'Passion Fruit Honey',
    category: GROUP_3,
    priceVnd: 360000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'hũ 500g',
    unitEn: '500g jar',
    weight: '500g',
    locality: 'Tam Đảo / Phú Thọ',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Công ty Cổ phần Ong Tam Đảo (Honeco)',
    address: 'Hệ thống Honeco (xem chỉ đường trên Google Maps)',
    mapUrl: 'https://maps.app.goo.gl/ZZYCgyETutrxEFea9?g_st=ic',
    videoUrl: null,
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 27,
    id: 'thit-chua-thanh-son',
    name: 'Thịt chua Thanh Sơn',
    nameEn: 'Thanh Son Fermented Pork (Thịt chua)',
    category: GROUP_3,
    priceVnd: 65000,
    priceRange: '60.000đ – 85.000đ / hộp',
    priceRangeEn: '60,000 – 85,000 VND / box',
    unit: 'hộp 250g',
    unitEn: '250g box',
    weight: '250g',
    locality: 'Thanh Sơn',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Cơ sở Thịt chua Thanh Sơn – Trường Foods',
    address: 'Huyện Thanh Sơn, tỉnh Phú Thọ (xem vị trí trên Google Maps)',
    mapUrl:
      'https://www.google.com/maps?ftid=0x313493897fd96c1d:0xf8e392ee119d5267&g_st=ic',
    videoUrl: 'https://youtu.be/FkbLrF1EXo4?si=8ji7ICb01DUMG4Ci',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
  {
    orderNumber: 28,
    id: 'set-qua-con-cui-thit-chua-thit-muoi-nem-chua',
    name: 'Sét quà Con Cui gồm thịt chua, thịt muối và nem chua',
    nameEn: 'Con Cui Gift Set (Fermented Pork, Salted Pork & Nem Chua)',
    category: GROUP_3,
    priceVnd: 1690000,
    priceRange: null,
    priceRangeEn: null,
    unit: 'bộ hộp quà',
    unitEn: 'luxury gift box set',
    weight: 'Bộ quà tặng đa món (Thịt chua · Thịt muối · Nem chua)',
    locality: 'Thanh Sơn',
    ocopVerified: false,
    ocopTier: null,
    ocopTierEn: null,
    producerName: 'Cơ sở Thịt chua Thanh Sơn – Trường Foods',
    address: 'Huyện Thanh Sơn, tỉnh Phú Thọ (xem vị trí trên Google Maps)',
    mapUrl:
      'https://www.google.com/maps?ftid=0x313493897fd96c1d:0xf8e392ee119d5267&g_st=ic',
    videoUrl: 'https://youtu.be/FkbLrF1EXo4?si=8ji7ICb01DUMG4Ci',
    traceabilityUrl: null,
    visitInfo: DEFAULT_VISIT_UNCONFIRMED,
  },
];

const CURATED_GIFT_BOXES: GroundedGiftBox[] = [
  {
    id: 'box-tra-dat-to',
    name: 'Box Trà Đất Tổ',
    nameEn: 'Đất Tổ Heritage Tea Box',
    occasion: 'Biếu gia đình',
    productIds: ['che-bup-tim-thanh-ba', 'tra-xanh-sencha-maika', 'tuong-lang-bo'],
    summaryVi:
      'Gồm Chè búp tím Thanh Ba (300.000đ) + Trà xanh Sencha Maika (50.000đ, OCOP 4 sao) + Tương làng Bợ (100.000đ) = 450.000đ.',
    summaryEn:
      'Includes Thanh Ba Purple Bud Tea (300,000 VND) + Maika Green Sencha Tea (50,000 VND, 4-Star OCOP) + Lang Bo Soy Sauce (100,000 VND) = 450,000 VND.',
  },
  {
    id: 'box-nong-san-lang-nghe',
    name: 'Box Nông sản làng nghề',
    nameEn: 'Craft Village Harvest Box',
    occasion: 'Biếu gia đình',
    productIds: [
      'my-gao-sach-sinh-ra-tu-lang-hung-lo',
      'tuong-co-dat-to-holusa',
      'chuoi-say-deo-hoang-cuong',
    ],
    summaryVi:
      'Gồm Mỳ gạo sạch Hùng Lô (40.000đ) + Tương cổ Đất Tổ Holusa (120.000đ) + Chuối sấy dẻo Hoàng Cương (85.000đ) = 245.000đ.',
    summaryEn:
      'Includes Hung Lo Clean Rice Noodles (40,000 VND) + Holusa Ancient Soy Sauce (120,000 VND) + Hoang Cuong Soft-Dried Banana (85,000 VND) = 245,000 VND.',
  },
  {
    id: 'box-vi-que-phu-tho',
    name: 'Box Vị quê Phú Thọ',
    nameEn: 'Phú Thọ Hometown Flavors Box',
    occasion: 'Lễ Tết',
    productIds: [
      'thit-chua-thanh-son',
      'tuong-lang-bo',
      'my-gao-sach-sinh-ra-tu-lang-hung-lo',
    ],
    summaryVi:
      'Gồm Thịt chua Thanh Sơn (65.000đ) + Tương làng Bợ (100.000đ) + Mỳ gạo sạch Hùng Lô (40.000đ) = 205.000đ.',
    summaryEn:
      'Includes Thanh Son Fermented Pork (65,000 VND) + Lang Bo Soy Sauce (100,000 VND) + Hung Lo Clean Rice Noodles (40,000 VND) = 205,000 VND.',
  },
  {
    id: 'box-ngot-lanh',
    name: 'Box Ngọt lành',
    nameEn: 'Wholesome Sweetness Box',
    occasion: 'Sinh nhật',
    productIds: [
      'mat-ong-tam-dao',
      'chuoi-say-deo-hoang-cuong',
      'tra-sencha-gao-lut-maika',
    ],
    summaryVi:
      'Gồm Mật ong Tam Đảo 500g (290.000đ) + Chuối sấy dẻo Hoàng Cương (85.000đ) + Trà sencha gạo lứt Maika (70.000đ) = 445.000đ.',
    summaryEn:
      'Includes Tam Dao Honey 500g (290,000 VND) + Hoang Cuong Soft-Dried Banana (85,000 VND) + Maika Brown Rice Sencha Tea (70,000 VND) = 445,000 VND.',
  },
  {
    id: 'box-dac-san-cao-cap',
    name: 'Box Đặc sản cao cấp',
    nameEn: 'Premium Phú Thọ Specialties Box',
    occasion: 'Đối tác',
    productIds: [
      'tra-dinh-cao-cap-hoai-trung',
      'mat-ong-tam-dao',
      'set-qua-con-cui-thit-chua-thit-muoi-nem-chua',
    ],
    summaryVi:
      'Gồm Trà Đinh cao cấp Hoài Trung 200g (350.000đ, OCOP 5 sao) + Mật ong Tam Đảo 500g (290.000đ) + Sét quà Con Cui (1.690.000đ) = 2.330.000đ.',
    summaryEn:
      'Includes National 5-Star OCOP Hoai Trung Premium Dinh Tea 200g (350,000 VND) + Tam Dao Honey 500g (290,000 VND) + Con Cui Gift Set (1,690,000 VND) = 2,330,000 VND.',
  },
];

const GROUNDED_KNOWLEDGE = {
  catalogTitle: 'Đặc sản OCOP Phú Thọ – Quà từ Đất Tổ',
  totalProducts: 28,
  omittedWithoutVerifiedPhoto: [
    'Mì gạo Quân Lịch',
    'Sữa chua sấy thăng hoa Cheveri',
  ],
  groups: [GROUP_1, GROUP_2, GROUP_3],
  curatedGiftBoxes: CURATED_GIFT_BOXES,
  statusNote:
    'Danh mục gồm trọn bộ 28 sản phẩm có hình ảnh xác thực và đầy đủ giá bán lẻ niêm yết, quy cách, địa phương và thông tin cơ sở sản xuất (Nhóm 1: 10 món, Nhóm 2: 8 món, Nhóm 3: 10 món). Riêng HTX Mỳ gạo Hùng Lô có thông tin đón đoàn tham quan theo lịch hẹn.',
  products: GROUNDED_PRODUCTS,
};

function formatPriceLabel(p: GroundedProductRecord, lang: SupportedLang): string {
  if (typeof p.priceVnd === 'number') {
    const formatted = `${new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN').format(p.priceVnd)}${lang === 'en' ? ' VND' : 'đ'}`;
    if (p.unit) {
      return `${formatted} / ${lang === 'en' ? p.unitEn ?? p.unit : p.unit}`;
    }
    return formatted;
  }
  if (p.priceRange) {
    return lang === 'en' ? p.priceRangeEn ?? p.priceRange : p.priceRange;
  }
  return lang === 'en' ? 'Updating' : 'Đang cập nhật';
}

function findMentionedProduct(
  query: string,
  contextProductId?: string,
): GroundedProductRecord | undefined {
  const q = query.toLowerCase();
  const explicitMatch = GROUNDED_PRODUCTS.find((p) => {
    const nameLower = p.name.toLowerCase();
    if (q.includes(p.id) || q.includes(nameLower)) return true;
    const keywords = nameLower
      .split(/\s+/)
      .filter(
        (w) =>
          w.length >= 3 &&
          !['chè', 'trà', 'mật', 'ong', 'sấy', 'gạo', 'của', 'làng'].includes(w),
      );
    return keywords.some((kw) => q.includes(kw));
  });

  if (explicitMatch) return explicitMatch;
  if (contextProductId) {
    return GROUNDED_PRODUCTS.find((p) => p.id === contextProductId);
  }
  return undefined;
}

function buildGroundedFallbackReply(
  query: string,
  lang: SupportedLang,
  contextProductId?: string,
): string {
  const q = query.toLowerCase();
  const matchedProduct = findMentionedProduct(query, contextProductId);

  const isVisitQuestion =
    q.includes('thăm') ||
    q.includes('tham quan') ||
    q.includes('đến') ||
    q.includes('mở cửa') ||
    q.includes('visit') ||
    q.includes('tour');

  if (isVisitQuestion) {
    if (matchedProduct) {
      if (matchedProduct.visitInfo.verified && matchedProduct.visitInfo.acceptsVisitors) {
        if (lang === 'en') {
          return `${matchedProduct.nameEn} (${matchedProduct.producerName}): Welcomes domestic & international visitor groups by prior appointment. Address: ${matchedProduct.address}. Activities: ${(matchedProduct.visitInfo.activitiesEn ?? []).join('; ')}.${matchedProduct.mapUrl ? ` Map: ${matchedProduct.mapUrl}` : ''}`;
        }
        return `${matchedProduct.name} (${matchedProduct.producerName}): Có đón các đoàn khách trong và ngoài nước tới tham quan theo lịch đặt trước với HTX. Địa chỉ: ${matchedProduct.address}. Hoạt động: ${(matchedProduct.visitInfo.activities ?? []).join('; ')}.${matchedProduct.mapUrl ? ` Bản đồ: ${matchedProduct.mapUrl}` : ''}`;
      }
      if (lang === 'en') {
        return `For "${matchedProduct.nameEn}": Visit information is not yet confirmed. Please contact the producer${matchedProduct.producerName ? ` (${matchedProduct.producerName})` : ''} before visiting.${matchedProduct.mapUrl ? ` Reference map: ${matchedProduct.mapUrl}` : ''}`;
      }
      return `Đối với "${matchedProduct.name}": Thông tin tham quan hiện chưa được xác nhận. Vui lòng liên hệ cơ sở${matchedProduct.producerName ? ` (${matchedProduct.producerName})` : ''} trước khi đến.${matchedProduct.mapUrl ? ` Chỉ đường tham khảo: ${matchedProduct.mapUrl}` : ''}`;
    }
    if (lang === 'en') {
      return 'Among the 28 products, Hung Lo Rice Noodle Cooperative (Mỳ gạo sạch Hùng Lô) is confirmed to welcome domestic and international tour groups by prior appointment. For other facilities, visit details are not yet confirmed—please contact them before visiting.';
    }
    return 'Trong 28 sản phẩm, Hợp tác xã Mỳ gạo Hùng Lô có ghi nhận đón các đoàn khách trong và ngoài nước tới tham quan theo lịch hẹn trước. Các cơ sở còn lại chưa xác nhận lịch mở cửa tham quan; vui lòng liên hệ cơ sở trước khi đến.';
  }

  if (
    q.includes('chứng nhận') ||
    q.includes('ocop') ||
    q.includes('sao') ||
    q.includes('truy xuất') ||
    q.includes('qr') ||
    q.includes('certif')
  ) {
    if (matchedProduct && matchedProduct.ocopTier) {
      if (lang === 'en') {
        return `${matchedProduct.nameEn}: Documented certification is ${matchedProduct.ocopTierEn ?? matchedProduct.ocopTier}.${matchedProduct.traceabilityUrl ? ` Traceability record: ${matchedProduct.traceabilityUrl}` : ''}`;
      }
      return `${matchedProduct.name}: Thông tin chứng nhận ghi nhận ${matchedProduct.ocopTier}.${matchedProduct.traceabilityUrl ? ` Hồ sơ truy xuất: ${matchedProduct.traceabilityUrl}` : ''}`;
    }
    if (lang === 'en') {
      return 'Documented OCOP tiers in the 28-item catalog include Hoai Trung Dinh Tea (National 5-Star OCOP), Long Coc Tea (4-Star OCOP), Da Hen Tea (4-Star OCOP, trace code HTX8403035), Maika Green Sencha & Milk Matcha (4-Star OCOP), Thanh Nam Tea (3–4 Star OCOP), Xuan Son Morning Mist Tea, Cu Thang Rice Noodles, Banaco Green Banana Cereal, Cordyceps Anh Minh, and Tamogi Oyster Mushroom (3-Star OCOP). Remaining items are traditional local specialties.';
    }
    return 'Các sản phẩm đã ghi nhận hạng OCOP gồm: Trà Đinh Hoài Trung (OCOP 5 sao cấp quốc gia), Chè Long Cốc (OCOP 4 sao), Chè Đá Hen (OCOP 4 sao, mã truy xuất HTX8403035), Trà xanh Sencha & Matcha sữa Maika (OCOP 4 sao), Chè Thành Nam (OCOP 3–4 sao), Chè Sương sớm Xuân Sơn, Mì gạo Cự Thắng, Bột ngũ cốc Banaco, Đông trùng hạ thảo Anh Minh và Nấm sò vàng Tamogi (OCOP 3 sao). Các sản phẩm còn lại là đặc sản truyền thống địa phương.';
  }

  if (q.includes('nhóm') || q.includes('group') || q.includes('danh mục') || q.includes('categor')) {
    if (lang === 'en') {
      return 'The catalog currently features 28 verified-photo products across 3 groups: Group 1 – Tea & Beverages (10 items), Group 2 – Dried Specialties, Snacks & Processed Produce (8 items), and Group 3 – Spices, Honey & Local Foods (10 items).';
    }
    return 'Danh mục hiện có 28 sản phẩm đã xác thực hình ảnh, chia thành 3 nhóm: Nhóm 1 – Trà và đồ uống (10 sản phẩm); Nhóm 2 – Đặc sản khô, đồ ăn vặt và nông sản chế biến (8 sản phẩm); Nhóm 3 – Gia vị, mật ong và thực phẩm địa phương (10 sản phẩm).';
  }

  if (q.includes('box') || q.includes('quà') || q.includes('gift') || q.includes('gợi ý')) {
    if (lang === 'en') {
      return `There are 5 suggested gift boxes ready to add to cart or customize:\n• Đất Tổ Heritage Tea Box (450,000 VND)\n• Craft Village Harvest Box (245,000 VND)\n• Phú Thọ Hometown Flavors Box (205,000 VND)\n• Wholesome Sweetness Box (445,000 VND)\n• Premium Phú Thọ Specialties Box (2,330,000 VND).`;
    }
    return `Hệ thống có sẵn 5 gợi ý ghép thành box quà chuẩn giá niêm yết:\n• Box Trà Đất Tổ (450.000đ)\n• Box Nông sản làng nghề (245.000đ)\n• Box Vị quê Phú Thọ (205.000đ)\n• Box Ngọt lành (445.000đ)\n• Box Đặc sản cao cấp (2.330.000đ).`;
  }

  if (matchedProduct) {
    const priceStr = formatPriceLabel(matchedProduct, lang);
    if (lang === 'en') {
      return `${matchedProduct.nameEn} (#${matchedProduct.orderNumber}): Price: ${priceStr}. Locality: ${matchedProduct.locality ?? 'Phú Thọ'}. Producer: ${matchedProduct.producerName ?? 'Local cooperative'}.${matchedProduct.ocopTierEn ? ` Certification: ${matchedProduct.ocopTierEn}.` : ''}${matchedProduct.mapUrl ? ` Map: ${matchedProduct.mapUrl}` : ''}`;
    }
    return `${matchedProduct.name} (STT #${matchedProduct.orderNumber}): Giá tham khảo: ${priceStr}. Địa phương: ${matchedProduct.locality ?? 'Phú Thọ'}. Cơ sở: ${matchedProduct.producerName ?? 'Hộ sản xuất địa phương'}.${matchedProduct.ocopTier ? ` Chứng nhận: ${matchedProduct.ocopTier}.` : ''}${matchedProduct.mapUrl ? ` Bản đồ: ${matchedProduct.mapUrl}` : ''}`;
  }

  if (lang === 'en') {
    return 'I am the OCOP Phú Thọ digital guide. All 28 verified-photo products across 3 groups now display complete retail prices, weights, and 5 curated gift boxes (205,000 – 2,330,000 VND). Ask me about any product, price, or craft village location.';
  }
  return 'Tôi là hướng dẫn viên văn hóa số của OCOP Phú Thọ. Trọn bộ 28 sản phẩm thuộc 3 nhóm (10/8/10) và 5 gợi ý ghép box quà (205.000đ – 2.330.000đ) đều đã có đủ đơn giá, quy cách và địa chỉ cơ sở. Bạn có thể hỏi tôi về giá, chứng nhận OCOP hoặc đường đi làng nghề.';
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/assistant', async (req, res) => {
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const history = Array.isArray(req.body?.history) ? req.body.history.slice(-6) : [];
    const language: SupportedLang = req.body?.language === 'en' ? 'en' : 'vi';
    const contextProductId =
      typeof req.body?.contextProductId === 'string'
        ? req.body.contextProductId
        : undefined;

    if (!message) {
      return res.status(400).json({ error: 'Vui lòng nhập câu hỏi.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        reply: buildGroundedFallbackReply(message, language, contextProductId),
        source: 'grounded-local',
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const langLabel = language === 'en' ? 'English' : 'Vietnamese (Tiếng Việt)';

      const unconfirmedPhrase =
        language === 'en'
          ? '"Visit information is not yet confirmed. Please contact the producer before visiting."'
          : '"Thông tin tham quan hiện chưa được xác nhận. Vui lòng liên hệ cơ sở trước khi đến."';

      const systemInstruction = `You are the bilingual "Digital Cultural Guide" (Hướng dẫn viên văn hóa số) for "Đặc sản OCOP Phú Thọ – Quà từ Đất Tổ".
RESPONSE LANGUAGE: You MUST reply ONLY in ${langLabel}.

STRICT ANTI-HALLUCINATION RULES:
1. Answer ONLY using the JSON knowledge base provided below (28 products in 3 groups + 5 curated gift boxes). NEVER invent or guess missing OCOP star certifications or visit hours.
2. Quote the exact prices, weights, and price ranges in the JSON (all 28 products now have reference pricing; Trà Đinh Hoài Trung: 350.000đ / hộp 200g (dải 150.000đ – 600.000đ); Chè Thành Nam: 380.000đ / túi 500g (dải 300.000đ – 1.500.000đ/kg); Thịt chua Thanh Sơn: 65.000đ / hộp 250g (dải 60.000đ – 85.000đ / hộp)). For items with \`ocopTier: null\`, clearly state they are traditional local specialties without fabricating star ratings.
3. Keep proper place names intact (Phú Thọ, Đất Tổ, Hùng Lô, Thanh Ba, Long Cốc, Thanh Sơn, Cẩm Khê, Lâm Thao, Thanh Thủy, Tân Sơn).
4. PRODUCER VISIT QUESTIONS:
   - For \`my-gao-sach-sinh-ra-tu-lang-hung-lo\`: \`visitInfo.verified === true\` and \`acceptsVisitors === true\`. Explain clearly that Hung Lo Rice Noodle Cooperative welcomes domestic & international tour groups by prior appointment, and share its verified address, activities, and mapUrl without inventing fixed public opening hours.
   - For all other products where \`visitInfo.verified === false\`: state clearly: ${unconfirmedPhrase} and do NOT invent opening hours or tour schedules.
5. For gift boxes, recommend from the 5 curated combos in \`curatedGiftBoxes\` (Box Trà Đất Tổ, Box Nông sản làng nghề, Box Vị quê Phú Thọ, Box Ngọt lành, Box Đặc sản cao cấp) with accurate pricing notes.
6. Keep replies concise and helpful (max 4-5 short lines).
${contextProductId ? `7. CONTEXT: The user is currently viewing product id "${contextProductId}".` : ''}

PROVIDED KNOWLEDGE BASE:
${JSON.stringify(GROUNDED_KNOWLEDGE)}`;

      const historyText = history
        .map((m: { role?: string; text?: string }) =>
          `${m.role === 'user' ? 'User' : 'Guide'}: ${m.text ?? ''}`,
        )
        .join('\n');

      const prompt = historyText
        ? `Recent conversation:\n${historyText}\n\nCurrent question: ${message}`
        : message;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const text = response.text?.trim();
      if (!text) {
        return res.json({
          reply: buildGroundedFallbackReply(message, language, contextProductId),
          source: 'grounded-local',
        });
      }

      return res.json({ reply: text, source: 'gemini' });
    } catch {
      return res.json({
        reply: buildGroundedFallbackReply(message, language, contextProductId),
        source: 'grounded-local',
      });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OCOP Phu Tho server running at http://localhost:${PORT}`);
  });
}

startServer();
