import React from 'react';

export const Input = ({ name, value, onChange, placeholder }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded border-gray-600 px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
    />
  );
};
