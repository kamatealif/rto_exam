import * as React from "react";

export const Progress = React.forwardRef(({ className = "", value = 0, max = 100, ...props }, ref) => {
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`} ref={ref} {...props}>
      <div
        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), max)}%` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";
