import {ArrowUpRight} from 'lucide-react';
import {ReactNode} from 'react';

interface AnimatedButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  showArrow?: boolean;
  icon?: ReactNode;
  ariaLabel?: string;
}

export function AnimatedButton({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  showArrow = true,
  icon,
  ariaLabel,
}: AnimatedButtonProps) {
  const variantClasses = {
    primary:
      'bg-[#FF521B] text-white hover:bg-[#E54210] border border-transparent shadow-[0_4px_16px_rgba(255,82,27,0.2)]',
    dark: 'bg-[#111111] text-white hover:bg-[#262624] border border-transparent',
    outline:
      'bg-white/80 text-[#111111] hover:bg-white border border-black/12 hover:border-black/25',
  }[variant];

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-sm gap-2.5',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-3',
  }[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className={`group inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClasses} ${sizeClasses} ${className}`}
    >
      <span className="text-roll-trigger">
        <span className="text-roll-inner">
          <span>{label}</span>
          <span aria-hidden="true" className="text-roll-clone">
            {label}
          </span>
        </span>
      </span>
      {icon ? (
        <span className="inline-flex shrink-0">{icon}</span>
      ) : showArrow ? (
        <span
          aria-hidden="true"
          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 ${
            variant === 'outline' ? 'bg-black/6 text-[#111111]' : 'bg-white/18 text-white'
          }`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      ) : null}
    </button>
  );
}
