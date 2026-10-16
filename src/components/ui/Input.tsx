import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="flex flex-col gap-2 text-right">
        <label className="text-[13px] font-bold text-[#1F2937]">{label}</label>
        <div className="relative flex items-center">
          <input
            ref={ref}
            type={inputType}
            className={`w-full bg-white border rounded-lg py-3 pr-11 text-[13px] text-gray-800 placeholder:text-[#9CA3AF] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-right ${
              isPassword ? 'pl-11' : 'pl-4'
            } ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
            } ${className}`}
            {...props}
          />

          <div className="absolute right-4 text-[#9CA3AF] pointer-events-none">
            {icon}
          </div>

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 text-[#9CA3AF] hover:text-gray-700 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-[12px] mt-0.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';