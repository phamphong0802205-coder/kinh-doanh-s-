import { CheckCircle2, Info, X } from 'lucide-react';
import { Language } from '../types/ocop';

export interface ToastState {
  id: number;
  message: string;
  variant: 'success' | 'info';
}

interface ToastBannerProps {
  toast: ToastState | null;
  language?: Language;
  onDismiss: () => void;
}

export function ToastBanner({
  toast,
  language = 'vi',
  onDismiss,
}: ToastBannerProps) {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 z-50 max-w-sm bg-[#1a3d1f] text-[#fcfdfc] px-4 py-3 rounded-md shadow-lg border border-[#e6b64a]/45 flex items-start gap-3"
    >
      {toast.variant === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-[#e6b64a] shrink-0 mt-0.5" />
      ) : (
        <Info className="w-4 h-4 text-[#e6b64a] shrink-0 mt-0.5" />
      )}
      <p className="text-xs sm:text-sm leading-snug flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={language === 'en' ? 'Dismiss notification' : 'Đóng thông báo'}
        className="text-white/75 hover:text-white cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
