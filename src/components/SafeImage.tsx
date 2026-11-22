import {useState} from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackLabel,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'Studio visual'}
        className={`flex items-center justify-center bg-gradient-to-br from-[#ECECE9] via-[#E5E5E0] to-[#DADAD4] p-6 text-center ${className}`}
      >
        <div className="max-w-xs space-y-2">
          <div className="mx-auto h-8 w-8 rounded-full border border-black/15 flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-[#FF521B]" />
          </div>
          <p className="text-xs font-medium tracking-tight text-[#575754]">
            {fallbackLabel || alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
