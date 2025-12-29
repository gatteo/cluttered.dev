import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

    const variants = {
      primary: 'bg-accent-purple text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-accent-purple/90 hover:shadow-[0_2px_4px_0_rgba(168,85,247,0.3),inset_0_1px_0_0_rgba(255,255,255,0.15)] active:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2)]',
      secondary: 'bg-surface-elevated text-text-primary border border-white/10 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] hover:bg-surface-hover hover:border-white/15 active:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.1)]',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5',
      danger: 'bg-accent-red/10 text-accent-red border border-accent-red/20 hover:bg-accent-red/20',
    }

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      default: 'h-9 px-4 text-sm',
      lg: 'h-10 px-5 text-sm',
      icon: 'h-9 w-9',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Loading...
          </>
        ) : children}
      </button>
    )
  }
)
Button.displayName = 'Button'
