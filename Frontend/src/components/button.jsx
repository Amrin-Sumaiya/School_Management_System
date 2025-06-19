import React from 'react';

// ✅ Safe Button component
export const Button = ({ onClick, type = "button", children, className }) => {
  return (
    <button
     onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

