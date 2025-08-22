import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-on-accent shadow-luxury-sm hover:bg-accent/90 hover:shadow-luxury-md",
        subtle: "bg-surface text-text shadow-luxury-sm hover:bg-surface/80 hover:shadow-luxury-md",
        outline: "border border-line bg-transparent text-text hover:bg-surface hover:shadow-luxury-sm",
        ghost: "text-text hover:bg-surface/50 hover:text-accent"
      },
      size: {
        md: "h-10 px-6 py-2 text-base",
        lg: "h-12 px-8 py-3 text-lg"
      },
      icon: {
        none: "",
        leading: "",
        trailing: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      icon: "none"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "leading" | "trailing";
}

const MillionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, iconPosition = "leading", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === "leading" && icon}
        {children}
        {icon && iconPosition === "trailing" && icon}
      </Comp>
    );
  }
);
MillionButton.displayName = "MillionButton";

export { MillionButton, buttonVariants };