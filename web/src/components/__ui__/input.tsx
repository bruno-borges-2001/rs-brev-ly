import React, { forwardRef } from "react"
import { cn } from "../../lib/utils"

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
  prefix?: string
  variant?: 'default' | 'error'
  append?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, variant = 'default', prefix, append, ...props }, ref) => {

  const variantStyles = {
    'default': {
      label: '',
      input: '',
    },
    'error': {
      label: 'text-red-danger',
      input: 'border-red-danger',
    },
  }

  return (
    <div className="flex flex-col gap-2 group">
      {label && (
        <label
          className={cn("t-xs uppercase text-gray-500 group-focus-within:text-blue-base", variantStyles[variant].label)}
        >
          {label}
        </label>
      )}
      <div
        className={cn("w-full h-12 px-4 flex items-center t-md rounded-lg text-gray-400 border border-gray-300 group-focus-within:border-blue-base ", variantStyles[variant].input, className)}
      >
        {!!props.value && prefix}
        <input ref={ref} className="w-full h-full outline-none" {...props} />
      </div>
      {append}
    </div>
  )
})

export default Input