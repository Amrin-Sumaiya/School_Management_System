import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`bg-black rounded-xl border shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4 ">
    {children}
  </div>
);
