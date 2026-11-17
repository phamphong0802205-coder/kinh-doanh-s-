import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Loader2, MessageSquare, Send, X } from 'lucide-react';
import { IMAGE_ASSETS } from '../data/mockOcopData';
import { UI_TEXT } from '../i18n/translations';
import { ChatMessage, Language } from '../types/ocop';

function ZaloLogoBadge({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
    >
      <rect width="48" height="48" rx="12" fill="#0068FF" />
      <path
        d="M24 9C15.16 9 8 15.16 8 22.75c0 4.28 2.3 8.1 5.88 10.62L12.1 39l6.33-2.9c1.76.5 3.63.77 5.57.77 8.84 0 16-6.16 16-13.75S32.84 9 24 9z"
        fill="#FFFFFF"
      />
      <text
        x="24"
        y="26.5"
        textAnchor="middle"
        fill="#0068FF"
        fontSize="11.5"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Zalo
      </text>
    </svg>
  );
}

interface AiAssistantWidgetProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  prefilledPrompt: string | null;
  onClearPrefilledPrompt: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  contextProductId?: string;
}

export function AiAssistantWidget({
  isOpen,
  onToggle,
  prefilledPrompt,
  onClearPrefilledPrompt,
  language,
  onChangeLanguage,
  contextProductId,
}: AiAssistantWidgetProps) {
  const t = UI_TEXT[language].aiWidget;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: UI_TEXT[language].aiWidget.welcome,
      timestamp: 'OCOP Phú Thọ',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showZaloQrInPanel, setShowZaloQrInPanel] = useState(false);
  const [zaloPopoverOpen, setZaloPopoverOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep welcome message synced when user changes language before sending messages
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-msg') {
        return [
          {
            id: 'welcome-msg',
            role: 'assistant',
            text: UI_TEXT[language].aiWidget.welcome,
            timestamp: 'OCOP Phú Thọ',
          },
        ];
      }
      return prev;
    });
  }, [language]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

      const locale = language === 'en' ? 'en-US' : 'vi-VN';

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        text: trimmed,
        timestamp: new Date().toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            language,
            contextProductId,
            history: nextMessages.slice(-6).map((m) => ({
              role: m.role,
              text: m.text,
            })),
          }),
        });

        const data = await response.json();
        const replyText =
          typeof data?.reply === 'string' && data.reply.trim()
            ? data.reply
            : UI_TEXT[language].productDetail.visitUnconfirmedText;

        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString(locale, {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-err-${Date.now()}`,
            role: 'assistant',
            text: UI_TEXT[language].productDetail.visitUnconfirmedText,
            timestamp: 'OCOP Phú Thọ',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      if (prefilledPrompt) {
        setInput(prefilledPrompt);
        onClearPrefilledPrompt();
      }
    }, [prefilledPrompt, onClearPrefilledPrompt]);

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [messages, isOpen]);

    return (
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
        {isOpen && (
          <section
            aria-label={t.title}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[400px] h-[510px] max-h-[78vh] bg-[#fcfdfc] border border-[#e6eee9] rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 bg-[#228654] text-white flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display text-sm font-extrabold leading-tight truncate">
                  {t.title}
                </h3>
                <p className="text-[11px] text-white/85 mt-0.5 truncate">
                  {t.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="inline-flex items-center bg-[#08734d] rounded p-0.5 border border-white/20">
                  {(['vi', 'en'] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => onChangeLanguage(code)}
                      aria-label={code === 'vi' ? 'Tiếng Việt' : 'English'}
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                        language === code
                          ? 'bg-[#e6b64a] text-[#1e2a22]'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {code === 'vi' ? (
                        <svg viewBox="0 0 30 20" aria-hidden="true" className="w-3.5 h-2.5 rounded-[1px]">
                          <rect width="30" height="20" fill="#DA251D" />
                          <polygon
                            points="15,4 16.47,8.53 21.24,8.53 17.38,11.33 18.85,15.86 15,13.06 11.15,15.86 12.62,11.33 8.76,8.53 13.53,8.53"
                            fill="#FFFF00"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 30 20" aria-hidden="true" className="w-3.5 h-2.5 rounded-[1px]">
                          <rect width="30" height="20" fill="#FFFFFF" />
                          <rect y="0" width="30" height="3" fill="#B22234" />
                          <rect y="6" width="30" height="3" fill="#B22234" />
                          <rect y="12" width="30" height="3" fill="#B22234" />
                          <rect y="17" width="30" height="3" fill="#B22234" />
                          <rect width="13" height="11" fill="#3C3B6E" />
                        </svg>
                      )}
                      <span>{code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onToggle(false)}
                  aria-label={t.toggleClose}
                  className="w-8 h-8 inline-flex items-center justify-center rounded-md text-white/85 hover:bg-white/15 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-4 py-2 bg-[#eef7ff] border-b border-[#cfe5ff] flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#1e2a22] truncate">
                {t.zaloTitle}
              </span>
              <button
                type="button"
                onClick={() => setShowZaloQrInPanel((prev) => !prev)}
                aria-label={t.zaloAction}
                title={t.zaloAction}
                className="inline-flex items-center gap-1.5 p-1 rounded-md hover:bg-[#dcebff] transition-colors cursor-pointer shrink-0"
              >
                <ZaloLogoBadge className="w-7 h-7" />
              </button>
            </div>

            {showZaloQrInPanel ? (
              <div className="flex-1 overflow-y-auto p-4 bg-[#f5f9ff] flex flex-col items-center justify-between gap-3">
                <div className="w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowZaloQrInPanel(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#228654] hover:text-[#08734d] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.backToAi}</span>
                  </button>
                  <ZaloLogoBadge className="w-6 h-6" />
                </div>

                <div className="flex flex-col items-center text-center gap-2.5 my-auto">
                  <div className="w-[230px] rounded-xl overflow-hidden shadow-md border border-[#d9e7ff] bg-white">
                    <img
                      src={IMAGE_ASSETS.zaloQrStaff}
                      alt={t.zaloScanTitle}
                      className="w-full h-auto block object-contain"
                    />
                  </div>
                  <div className="space-y-1 max-w-[270px]">
                    <p className="text-xs font-bold text-[#1e2a22]">
                      {t.zaloScanTitle}
                    </p>
                    <p className="text-[11px] text-[#5f6d66] leading-relaxed">
                      {t.zaloScanHint}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fcfdfc]"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] px-3.5 py-2.5 rounded-lg text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-[#228654] text-white'
                            : 'bg-white text-[#1e2a22] border border-[#e6eee9]'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[11px] text-[#5f6d66] mt-1 px-1">
                        {msg.role === 'user' ? t.userLabel : t.assistantLabel} · {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-[#5f6d66] bg-white border border-[#e6eee9] px-3.5 py-2.5 rounded-lg w-fit">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#228654]" />
                      <span>{t.loading}</span>
                    </div>
                  )}
                </div>

                {/* Quick suggestions */}
                <div className="px-3 py-2 bg-[#f7fbf8] border-t border-[#e6eee9] flex gap-1.5 overflow-x-auto">
                  {t.quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white text-[#228654] border border-[#e6eee9] hover:border-[#228654] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="p-3 bg-white border-t border-[#e6eee9] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 px-3 py-2 text-sm bg-[#fcfdfc] border border-[#e6eee9] rounded-md focus:outline-none focus:border-[#228654]"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    aria-label={language === 'en' ? 'Send' : 'Gửi'}
                    className="w-10 h-10 inline-flex items-center justify-center bg-[#228654] hover:bg-[#08734d] disabled:opacity-45 text-white rounded-md transition-colors shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </section>
        )}

      {!isOpen && zaloPopoverOpen && (
        <div
          role="dialog"
          aria-label={t.zaloScanTitle}
          className="mb-3 w-[280px] sm:w-[300px] bg-white border border-[#cfe5ff] rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="px-4 py-2.5 bg-[#0068FF] text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <ZaloLogoBadge className="w-6 h-6 shrink-0" />
              <span className="text-xs font-bold truncate">
                {t.zaloScanTitle}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setZaloPopoverOpen(false)}
              aria-label={t.toggleClose}
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-white/85 hover:bg-white/15 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 bg-[#f5f9ff] flex flex-col items-center text-center gap-2.5">
            <div className="w-full max-w-[230px] rounded-xl overflow-hidden shadow-sm border border-[#d9e7ff] bg-white">
              <img
                src={IMAGE_ASSETS.zaloQrStaff}
                alt={t.zaloScanTitle}
                className="w-full h-auto block object-contain"
              />
            </div>
            <p className="text-[11px] text-[#5f6d66] leading-relaxed">
              {t.zaloScanHint}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 max-w-[calc(100vw-2rem)]">
        <button
          type="button"
          onClick={() => {
            if (isOpen) {
              setShowZaloQrInPanel((prev) => !prev);
            } else {
              setZaloPopoverOpen((prev) => !prev);
            }
          }}
          aria-label={t.zaloAction}
          title={t.zaloAction}
          className="p-1.5 bg-white hover:bg-[#eef7ff] rounded-lg shadow-lg border border-[#cfe5ff] transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <ZaloLogoBadge className="w-8 h-8" />
        </button>

        <button
          type="button"
          onClick={() => {
            setZaloPopoverOpen(false);
            setShowZaloQrInPanel(false);
            onToggle(!isOpen);
          }}
          aria-expanded={isOpen}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#228654] hover:bg-[#08734d] text-white text-xs sm:text-sm font-bold rounded-md shadow-lg border border-[#e6b64a]/50 transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
        >
          <MessageSquare className="w-4 h-4 text-[#e6b64a] shrink-0" />
          <span>{isOpen ? t.toggleClose : t.toggleOpen}</span>
        </button>
      </div>
    </div>
  );
}
