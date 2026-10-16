import React from 'react';

interface ServerErrorProps {
  message: string | null;
}

/**
 * Shared server-side error display banner for auth forms.
 * Eliminates the repeated error div across Login and Signup pages.
 */
export const ServerError: React.FC<ServerErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-2.5 text-[13px] text-right font-medium"
    >
      {message}
    </div>
  );
};
