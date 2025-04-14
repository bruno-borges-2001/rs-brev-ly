import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', ...props }, ref) => {

    const variantStyles = {
      'primary': 'w-full px-5 h-12 rounded-lg bg-blue-base t-md text-white hover:bg-blue-dark',
      'secondary': 'border border-transparent px-2 h-8 rounded bg-gray-200 t-sm text-gray-500 hover:border-blue-base',
      'icon': 'border border-transparent px-2 h-8 w-8 rounded bg-gray-200 t-sm text-gray-500 hover:border-blue-base',
    }

    return (
      <button
        ref={ref}
        className={cn(
          "cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default Button