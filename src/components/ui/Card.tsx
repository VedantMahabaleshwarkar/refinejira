'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-200';

    const variants = {
      default:
        'bg-white dark:bg-slate-900 shadow-sm',
      elevated:
        'bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl',
      bordered:
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

