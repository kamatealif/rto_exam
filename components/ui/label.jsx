'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva,  VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(function Label({ className, ...props }, ref) {
  return (
    <label
      data-slot="label"
      ref={ref}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  );
});
Label.displayName = "Label";

export { Label };
