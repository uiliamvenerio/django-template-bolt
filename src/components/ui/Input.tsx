import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseInputClasses = 'block bg-white border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-error-500 text-error-900' : 'border-gray-300';
  const leftIconClass = leftIcon ? 'pl-10' : 'pl-3';
  const rightIconClass = rightIcon ? 'pr-10' : 'pr-3';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`
            ${baseInputClasses}
            ${leftIconClass}
            ${rightIconClass}
            ${errorClass}
            ${widthClass}
            ${className}
            py-2
          `}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      )}
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;