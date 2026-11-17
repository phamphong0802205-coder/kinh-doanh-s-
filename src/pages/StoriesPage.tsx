import { ArrowRight, Info } from 'lucide-react';
import { CRAFT_STORIES, getCategoryLabel } from '../data/mockOcopData';
import { Language, PageView } from '../types/ocop';
import { SafeImage } from '../components/SafeImage';

interface StoriesPageProps {
  language: Language;
  onNavigate: (page: PageView) => void;
}

export function StoriesPage({ language, onNavigate }: StoriesPageProps) {
  const isEn = language === 'en';

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-bold text-[#228654]">
          {isEn
            ? 'Local Identity · Documented Producer Stories'
            : 'Bản sắc địa phương · Câu chuyện cơ sở & làng nghề'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e2a22] text-balance">
          {isEn ? 'Stories from Đất Tổ' : 'Câu chuyện từ Đất Tổ'}
        </h1>
        <p className="text-sm sm:text-base text-[#5f6d66] leading-relaxed">
          {isEn
            ? 'Every Phú Thọ OCOP specialty is deeply tied to its midland terrain, local raw ingredients, and the patient craftsmanship of traditional villages.'
            : 'Mỗi sản phẩm OCOP Phú Thọ gắn liền với vùng đất trung du, nguồn nguyên liệu địa phương và sự kiên nhẫn của các hộ làm nghề truyền thống.'}
        </p>

        <div className="bg-[#f7fbf8] border border-[#e6eee9] rounded-lg p-4 flex items-start gap-3 text-xs sm:text-sm text-[#38473e]">
          <Info className="w-4 h-4 text-[#228654] shrink-0 mt-0.5" />
          <span>
            {isEn
              ? 'Stories below summarize documented producer backgrounds and provincial publications; open any product detail page to view original reference articles, videos, and Google Maps links.'
              : 'Các câu chuyện dưới đây tổng hợp từ tư liệu địa phương và thông tin cơ sở sản xuất; bạn có thể mở từng trang chi tiết sản phẩm để xem bài viết, video và bản đồ tham khảo.'}
          </span>
        </div>
      </div>

      <div className="space-y-10">
        {CRAFT_STORIES.map((story, idx) => {
          const storyTitle = isEn ? story.titleEn : story.title;
          const storyExcerpt = isEn ? story.excerptEn : story.excerpt;
          const storyContent = isEn ? story.contentEn : story.content;
          const storyArtisan = isEn ? story.artisanNameEn : story.artisanName;
          const storyLocality = isEn ? story.localityEn : story.locality;

          return (
            <article
              key={story.id}
              className="bg-white border border-[#e6eee9] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div
                className={`lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-[#f7fbf8] overflow-hidden ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <SafeImage
                  src={story.image}
                  alt={storyTitle}
                  fallbackLabel={storyTitle}
                />
              </div>

              <div
                className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5 ${
                  idx % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#5f6d66]">
                    <span className="font-bold text-[#228654]">
                      {getCategoryLabel(story.category, language)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{storyLocality}, Phú Thọ</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1e2a22] leading-snug">
                    {storyTitle}
                  </h2>

                  <p className="text-sm sm:text-base font-semibold text-[#228654] leading-relaxed">
                    {storyExcerpt}
                  </p>

                  <div className="space-y-3 text-sm sm:text-base text-[#38473e] leading-relaxed">
                    {storyContent.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f2f6f3] flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#5f6d66]">{storyArtisan}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('products')}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#228654] hover:underline cursor-pointer"
                  >
                    <span>
                      {isEn
                        ? 'Explore related specialties'
                        : 'Khám phá đặc sản liên quan'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
