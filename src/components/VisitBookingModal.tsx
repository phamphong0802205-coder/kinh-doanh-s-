import { useState } from 'react';
import { Calendar, CheckCircle2, Info, Phone, Users, X } from 'lucide-react';
import { getProductName } from '../data/mockOcopData';
import { UI_TEXT } from '../i18n/translations';
import { Language, Product } from '../types/ocop';

interface VisitBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  products: Product[];
  defaultProducerId?: string;
}

export function VisitBookingModal({
  isOpen,
  onClose,
  language,
  products,
  defaultProducerId,
}: VisitBookingModalProps) {
  const t = UI_TEXT[language].visitModal;
  const isEn = language === 'en';
  const updating = UI_TEXT[language].productDetail.updatingLabel;

  const facilityOptions = products.map((p) => {
    const productName = getProductName(p, language);
    return {
      producerId: p.producer.id,
      label: p.producer.name
        ? `${p.producer.name} (${p.locality ?? 'Phú Thọ'})`
        : isEn
          ? `Producer: ${productName} (${updating})`
          : `Cơ sở sản xuất: ${productName} (${updating})`,
      producer: p.producer,
    };
  });

  const [selectedProducerId, setSelectedProducerId] = useState(
    defaultProducerId || facilityOptions[0]?.producerId || '',
  );
  const [visitDate, setVisitDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [visitorName, setVisitorName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeOption =
    facilityOptions.find((opt) => opt.producerId === selectedProducerId) ??
    facilityOptions[0];
  const activeProducer = activeOption?.producer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `VISIT-PT-${Math.floor(1000 + Math.random() * 8999)}`;
    setConfirmedRef(refCode);
  };

  const handleClose = () => {
    setConfirmedRef(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2a22]/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <div className="w-full max-w-lg bg-[#fcfdfc] border border-[#e6eee9] rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-[#e6eee9] flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-extrabold text-[#1e2a22]">
            {t.title}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label={t.closeBtn}
            className="w-8 h-8 inline-flex items-center justify-center rounded-md text-[#5f6d66] hover:bg-[#f3fbf6] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {confirmedRef ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-[#228654]">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <h3 className="font-display text-lg font-bold">
                  {t.successTitle}
                </h3>
              </div>

              <div className="bg-white border border-[#e6eee9] rounded-md p-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-[#5f6d66]">
                    {isEn ? 'Booking code' : 'Mã đặt lịch'}
                  </span>
                  <span className="font-mono font-bold text-[#228654]">
                    {confirmedRef}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[#5f6d66]">{t.facilityLabel}</span>
                  <span className="font-semibold text-right text-[#1e2a22]">
                    {activeOption?.label ?? updating}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[#5f6d66]">{t.dateLabel}</span>
                  <span className="font-mono tabular-nums text-[#1e2a22]">
                    {visitDate}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[#5f6d66]">{t.guestsLabel}</span>
                  <span className="font-mono tabular-nums text-[#1e2a22]">
                    {guestsCount}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[#5f6d66]">{t.nameLabel}</span>
                  <span className="font-semibold text-right text-[#1e2a22]">
                    {visitorName}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[#5f6d66]">{t.contactLabel}</span>
                  <span className="font-mono font-semibold tabular-nums text-[#228654]">
                    {contactInfo}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5f6d66] leading-relaxed">
                {t.successDesc}
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                  {t.facilityLabel}
                </label>
                <select
                  value={selectedProducerId}
                  onChange={(e) => setSelectedProducerId(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                >
                  {facilityOptions.map((opt) => (
                    <option key={opt.producerId} value={opt.producerId}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {activeProducer && !activeProducer.visitInfo.verified && (
                  <p className="mt-1.5 text-xs font-medium text-[#b7791f]">
                    {UI_TEXT[language].productDetail.visitUnconfirmedText}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#228654]" />
                      {t.dateLabel}
                    </span>
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#228654]" />
                      {t.guestsLabel}
                    </span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={guestsCount}
                    onChange={(e) =>
                      setGuestsCount(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder={isEn ? 'Nguyen Minh' : 'Nguyễn Minh'}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e2a22] mb-1">
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#228654]" />
                    {t.contactLabel}
                  </span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder={isEn ? 'e.g. 0388 195 865' : 'Ví dụ: 0388 195 865'}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                />
              </div>

              <div className="bg-[#f3fbf6] border border-[#e6eee9] rounded-md p-3 flex items-start gap-2 text-xs text-[#38473e]">
                <Info className="w-4 h-4 text-[#228654] shrink-0 mt-0.5" />
                <span>{t.disclaimer}</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#228654] hover:bg-[#08734d] text-white text-sm font-bold rounded-md transition-colors cursor-pointer"
              >
                {t.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
