import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onNavigate?: (href: string) => void;
  children: React.ReactNode;
}

/**
 * Reusable accessible Button / Link-Button component following the Tertvalis Light-Theme Brand System.
 * Primary Blue: #050FD8, Secondary Blue: #076CF2, Accent Mint: #05F2AD, Main Text: #0D0D0D.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  onNavigate,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer select-none active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-gradient-to-r from-[#050FD8] to-[#076CF2] text-white hover:from-[#040CB0] hover:to-[#050FD8] shadow-xs border border-[#050FD8]/20',
    secondary:
      'bg-[#050FD8]/8 text-[#050FD8] hover:bg-[#050FD8] hover:text-white border border-[#050FD8]/20',
    outline:
      'bg-white text-[#0D0D0D] border border-slate-300 hover:border-[#050FD8] hover:text-[#050FD8] shadow-2xs',
    ghost:
      'bg-transparent text-slate-700 hover:text-[#050FD8] hover:bg-slate-100/80 border border-transparent',
  };

  const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-3.5 py-2 text-xs min-h-[38px]',
    md: 'px-5 py-2.5 text-sm min-h-[42px]',
    lg: 'px-6 py-3.5 text-sm sm:text-base min-h-[48px]',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onNavigate && href.startsWith('#')) {
            e.preventDefault();
            onNavigate(href);
          }
        }}
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};
