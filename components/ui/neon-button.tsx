import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "relative group border text-foreground mx-auto text-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-brand-accent/5 hover:bg-brand-accent/0 border-brand-mid/40",
        solid:
          "bg-brand-accent hover:bg-brand-mid text-brand-bg border-transparent hover:border-brand-accent/50 transition-all duration-200",
        ghost:
          "border-transparent bg-transparent hover:border-brand-mid hover:bg-brand-surface",
      },
      size: {
        default: "px-7 py-1.5",
        sm: "px-4 py-0.5",
        lg: "px-10 py-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Whether to render the neon top/bottom line glows. Defaults to true. */
  neon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, neon = true, size, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {/* Top neon glow line — appears on hover */}
        <span
          className={cn(
            "absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out",
            "inset-x-0 inset-y-0 w-3/4 mx-auto",
            "bg-gradient-to-r from-transparent via-brand-accent to-transparent",
            "hidden",
            neon && "block"
          )}
        />

        {children}

        {/* Bottom neon glow line — always subtly visible, brightens on hover */}
        <span
          className={cn(
            "absolute group-hover:opacity-30 transition-all duration-500 ease-in-out",
            "inset-x-0 h-px -bottom-px w-3/4 mx-auto",
            "bg-gradient-to-r from-transparent via-brand-accent to-transparent",
            "hidden",
            neon && "block"
          )}
        />
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
