import { MapPin, Phone, Mail } from 'lucide-react';
import { Language, PageView } from '../types/ocop';

interface FooterProps {
  language: Language;
  onNavigate: (page: PageView) => void;
}

export function Footer({ language, onNavigate }: FooterProps) {
  const isEn = language === 'en';

  return (
    <footer className="bg-[#1a3d1f] text-white mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3">
            <div className="font-display text-2xl font-extrabold tracking-tight text-white">
              OCOP Phú Thọ
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-xs">
              {isEn
                ? 'A platform showcasing Phú Thọ local specialties, heritage craft stories, and curated gift box combinations.'
                : 'Nền tảng khám phá đặc sản địa phương, tìm hiểu câu chuyện làng nghề và thiết kế box quà Đất Tổ theo ngân sách & dịp tặng.'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4">
              {isEn ? 'Explore Platform' : 'Khám phá nền tảng'}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#e6b64a] transition-colors cursor-pointer"
                >
                  {isEn ? 'Specialty Catalog' : 'Danh mục đặc sản'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gift-builder')}
                  className="hover:text-[#e6b64a] transition-colors cursor-pointer"
                >
                  {isEn ? 'Gift Box Builder' : 'Trình thiết kế box quà'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('stories')}
                  className="hover:text-[#e6b64a] transition-colors cursor-pointer"
                >
                  {isEn ? 'Stories from Đất Tổ' : 'Câu chuyện từ Đất Tổ'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-[#e6b64a] transition-colors cursor-pointer"
                >
                  {isEn ? 'Craft Village Experiences' : 'Trải nghiệm làng nghề'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4">
              {isEn ? 'Contact Information' : 'Thông tin liên hệ'}
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e6b64a] shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Việt Trì City, Phú Thọ Province'
                    : 'TP. Việt Trì, tỉnh Phú Thọ'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e6b64a] shrink-0" />
                <a
                  href="tel:0388195865"
                  className="tabular-nums hover:text-[#e6b64a] transition-colors"
                >
                  0388195865
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e6b64a] shrink-0" />
                <a
                  href="mailto:nlbd2405@gmail.com"
                  className="hover:text-[#e6b64a] transition-colors break-all"
                >
                  nlbd2405@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4">
              {isEn ? 'Policies & Channels' : 'Chính sách & Kết nối'}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                {isEn
                  ? 'Gift box & specialty consultation support'
                  : 'Hỗ trợ tư vấn đặc sản & phối ghép box quà'}
              </li>
              <li>
                {isEn
                  ? 'Transparent producer & traceability links'
                  : 'Minh bạch thông tin cơ sở, bản đồ & truy xuất'}
              </li>
              <li>
                {isEn
                  ? 'Craft village visit booking assistance'
                  : 'Hỗ trợ kết nối tham quan làng nghề địa phương'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
