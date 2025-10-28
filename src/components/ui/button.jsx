import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium transition 
        bg-cyan-600 hover:bg-cyan-700 text-white ${className}`}
    >
      {children}
    </button>
  );
}
