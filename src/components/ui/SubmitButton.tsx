import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
}

/**
 * Shared primary submit button for all auth forms.
 * Encapsulates the brand-secondary colour, disabled state, and loading text pattern
 * that was duplicated across Login, Signup, and ForgotPassword.
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  label,
  loadingLabel,
}) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-brand-secondary hover:bg-[#73582E] text-white font-bold py-3 rounded-lg transition-colors shadow-sm mt-2 text-[14px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {isSubmitting ? loadingLabel : label}
  </button>
);
