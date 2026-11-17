import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { UI_TEXT } from '../i18n/translations';
import { Language, PageView } from '../types/ocop';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
}

function VietnamFlagIcon({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      aria-hidden="true"
      className={`${className} rounded-[2px] shrink-0 ring-1 ring-black/10`}
    >
      <rect width="30" height="20" fill="#DA251D" />
      <polygon
        points="15,4 16.47,8.53 21.24,8.53 17.38,11.33 18.85,15.86 15,13.06 11.15,15.86 12.62,11.33 8.76,8.53 13.53,8.53"
        fill="#FFFF00"
      />
    </svg>
  );
}

function UsFlagIcon({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      aria-hidden="true"
      className={`${className} rounded-[2px] shrink-0 ring-1 ring-black/10`}
    >
      <rect width="30" height="20" fill="#FFFFFF" />
      <g fill="#B22234">
        <rect y="0" width="30" height="1.54" />
        <rect y="3.08" width="30" height="1.54" />
        <rect y="6.15" width="30" height="1.54" />
        <rect y="9.23" width="30" height="1.54" />
        <rect y="12.31" width="30" height="1.54" />
        <rect y="15.38" width="30" height="1.54" />
        <rect y="18.46" width="30" height="1.54" />
      </g>
      <rect width="13" height="10.77" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        <circle cx="2.5" cy="2.2" r="0.65" />
        <circle cx="5.5" cy="2.2" r="0.65" />
        <circle cx="8.5" cy="2.2" r="0.65" />
        <circle cx="11" cy="2.2" r="0.65" />
        <circle cx="4" cy="4.2" r="0.65" />
        <circle cx="7" cy="4.2" r="0.65" />
        <circle cx="9.8" cy="4.2" r="0.65" />
        <circle cx="2.5" cy="6.3" r="0.65" />
        <circle cx="5.5" cy="6.3" r="0.65" />
        <circle cx="8.5" cy="6.3" r="0.65" />
        <circle cx="11" cy="6.3" r="0.65" />
        <circle cx="4" cy="8.4" r="0.65" />
        <circle cx="7" cy="8.4" r="0.65" />
        <circle cx="9.8" cy="8.4" r="0.65" />
      </g>
    </svg>
  );
}

const MARQUEE_TEXT_VI =
  'Kết nối sản phẩm đặc trưng • Tôn vinh giá trị bản địa • Lan tỏa thương hiệu OCOP • Thúc đẩy chuyển đổi số • Mở rộng thị trường tiêu thụ';
const MARQUEE_TEXT_EN =
  'Connecting Signature Specialties • Honoring Local Heritage • Spreading the OCOP Brand • Advancing Digital Transformation • Expanding Market Reach';

const LANG_OPTIONS: { code: Language; label: string; nameVi: string; nameEn: string }[] = [
  { code: 'vi', label: 'VI', nameVi: 'Tiếng Việt', nameEn: 'Vietnamese' },
  { code: 'en', label: 'EN', nameVi: 'Tiếng Anh', nameEn: 'English' },
];

export function Navbar({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  language,
  onChangeLanguage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TEXT[language];
  const isEn = language === 'en';
  const marqueeText = isEn ? MARQUEE_TEXT_EN : MARQUEE_TEXT_VI;

  const navItems: { page: PageView; label: string }[] = [
    { page: 'home', label: t.nav.home },
    { page: 'products', label: t.nav.products },
    { page: 'gift-builder', label: t.nav.giftBuilder },
    { page: 'stories', label: t.nav.stories },
    { page: 'experiences', label: t.nav.experiences },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#e6eee9]">
      {/* Global Top Marquee Ticker across ALL pages */}
      <div
        className="marquee-container w-full bg-[#1a3d1f] text-[#fcfdfc] border-b border-[#e6b64a]/35 overflow-hidden py-1.5 select-none"
        aria-label={isEn ? 'OCOP Phú Thọ Highlights' : 'Thông điệp OCOP Phú Thọ'}
      >
        <div className="animate-ocop-marquee text-[11px] sm:text-xs font-semibold tracking-wide">
          <span className="inline-flex items-center gap-3 px-6 whitespace-nowrap">
            <span className="text-[#e6b64a]" aria-hidden="true">✦</span>
            <span>{marqueeText}</span>
          </span>
          <span className="inline-flex items-center gap-3 px-6 whitespace-nowrap" aria-hidden="true">
            <span className="text-[#e6b64a]">✦</span>
            <span>{marqueeText}</span>
          </span>
          <span className="inline-flex items-center gap-3 px-6 whitespace-nowrap" aria-hidden="true">
            <span className="text-[#e6b64a]">✦</span>
            <span>{marqueeText}</span>
          </span>
          <span className="inline-flex items-center gap-3 px-6 whitespace-nowrap" aria-hidden="true">
            <span className="text-[#e6b64a]">✦</span>
            <span>{marqueeText}</span>
          </span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-xl font-extrabold tracking-tight text-[#228654] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#228654] rounded"
        >
          {t.brand}
        </button>

        {/* Zone 2: 5 Concise Single-Line Text Links */}
        <nav
          aria-label={isEn ? 'Main navigation' : 'Điều hướng chính'}
          className="hidden xl:flex items-center gap-6 text-sm font-semibold text-[#5f6d66]"
        >
          {navItems.map((item) => {
            const isActive =
              currentPage === item.page ||
              (item.page === 'products' && currentPage === 'product-detail');
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#228654] rounded ${
                  isActive
                    ? 'text-[#228654]'
                    : 'hover:text-[#228654]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#228654]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher (VN & US Flags) + Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div
            role="group"
            aria-label={isEn ? 'Select language' : 'Chọn ngôn ngữ'}
            className="inline-flex items-center gap-1 p-0.5 bg-[#f7fbf8] border border-[#e6eee9] rounded-md shrink-0"
          >
            {LANG_OPTIONS.map((opt) => {
              const active = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => onChangeLanguage(opt.code)}
                  aria-pressed={active}
                  aria-label={isEn ? opt.nameEn : opt.nameVi}
                  title={isEn ? opt.nameEn : opt.nameVi}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#228654] text-white shadow-xs'
                      : 'text-[#5f6d66] hover:text-[#1e2a22] hover:bg-white'
                  }`}
                >
                  {opt.code === 'vi' ? (
                    <VietnamFlagIcon className="w-4 h-[11px]" />
                  ) : (
                    <UsFlagIcon className="w-4 h-[11px]" />
                  )}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('gift-builder')}
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-bold text-white bg-[#228654] hover:bg-[#08734d] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.findGift}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={isEn ? `Cart (${cartCount})` : `Giỏ hàng (${cartCount})`}
            className="relative inline-flex items-center justify-center gap-1.5 min-w-[40px] h-10 px-2.5 text-sm font-semibold text-[#1e2a22] hover:bg-[#f3fbf6] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#228654]" strokeWidth={1.9} />
            <span className="tabular-nums text-xs font-bold text-[#228654]">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen
                ? isEn
                  ? 'Close menu'
                  : 'Đóng menu'
                : isEn
                  ? 'Open menu'
                  : 'Mở menu'
            }
            aria-expanded={mobileMenuOpen}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 text-[#1e2a22] hover:bg-[#f3fbf6] rounded-md transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#e6eee9] bg-white px-4 py-4 space-y-2">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#f3fbf6] text-[#228654]'
                      : 'text-[#1e2a22] hover:bg-[#f7fbf8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-[#e6eee9] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('gift-builder')}
              className="w-full py-2.5 px-4 text-sm font-bold text-white bg-[#228654] rounded-md text-center cursor-pointer"
            >
              {t.nav.findGift}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
