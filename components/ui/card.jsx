import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`px-6 pt-6 pb-2 border-b border-gray-100 dark:border-gray-800 rounded-t-xl ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h2 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`px-6 pb-6 pt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
