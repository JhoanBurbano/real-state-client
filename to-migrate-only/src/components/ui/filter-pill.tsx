import * as React from "react";
import { X } from "lucide-react";
import { cn } from "./utils";

interface FilterPillProps {
  children: React.ReactNode;
  selected?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  onClick?: () => void;
  className?: string;
}

const FilterPill = React.forwardRef<HTMLButtonElement, FilterPillProps>(
  ({ children, selected = false, dismissible = false, onDismiss, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-pill text-body font-medium transition-all duration-200",
          "border border-line bg-surface hover:bg-surface-elev hover:shadow-luxury-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1",
          selected && "bg-accent text-on-accent border-accent hover:bg-accent/90",
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
        {dismissible && (
          <X 
            className="w-4 h-4 ml-1 hover:text-error cursor-pointer transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
          />
        )}
      </button>
    );
  }
);
FilterPill.displayName = "FilterPill";

export { FilterPill };