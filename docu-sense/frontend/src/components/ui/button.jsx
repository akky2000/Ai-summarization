import React from "react";
import clsx from "clsx"; // Optional: Install clsx for clean class merging

export function Button({ children, variant = "default", className = "", ...props }) {
  const base = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
