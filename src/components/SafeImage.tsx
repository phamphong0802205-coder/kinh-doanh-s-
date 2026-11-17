import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  emptyStateLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
  emptyStateLabel,
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    const label = emptyStateLabel || fallbackLabel || alt;
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#f3f7f4] border border-dashed border-[#c7d6cc] text-[#5f6d66] p-4 text-center"
      >
        <ImageOff className="w-6 h-6 text-[#5f6d66]/70 shrink-0" strokeWidth={1.6} />
        <span className="text-xs font-semibold text-[#38473e] max-w-[24ch] leading-snug">
          {label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading={loading}
    />
  );
}
