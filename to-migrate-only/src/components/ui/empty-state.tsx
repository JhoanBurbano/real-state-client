import * as React from "react";
import { Home, Search, Filter, RefreshCw } from "lucide-react";
import { MillionButton } from "./million-button";
import { cn } from "./utils";

interface EmptyStateProps {
  type?: "search" | "favorites" | "error" | "404";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = "search",
  title,
  description,
  actionLabel,
  onAction,
  className
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case "search":
        return {
          icon: Search,
          title: title || "No Properties Found",
          description: description || "We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.",
          actionLabel: actionLabel || "Clear Filters",
          iconBg: "bg-info/10 text-info"
        };
      case "favorites":
        return {
          icon: Home,
          title: title || "No Favorites Yet",
          description: description || "You haven't added any properties to your favorites. Start browsing to find your dream home.",
          actionLabel: actionLabel || "Browse Properties",
          iconBg: "bg-accent/10 text-accent"
        };
      case "error":
        return {
          icon: RefreshCw,
          title: title || "Something Went Wrong",
          description: description || "We're experiencing technical difficulties. Please try again in a moment.",
          actionLabel: actionLabel || "Try Again",
          iconBg: "bg-error/10 text-error"
        };
      case "404":
        return {
          icon: Home,
          title: title || "Page Not Found",
          description: description || "The page you're looking for doesn't exist. It may have been moved or deleted.",
          actionLabel: actionLabel || "Go Home",
          iconBg: "bg-warning/10 text-warning"
        };
      default:
        return {
          icon: Search,
          title: title || "No Results",
          description: description || "No results found.",
          actionLabel: actionLabel || "Try Again",
          iconBg: "bg-text-muted/10 text-text-muted"
        };
    }
  };

  const content = getEmptyStateContent();
  const IconComponent = content.icon;

  return (
    <div className={cn("text-center py-16 px-4", className)}>
      <div className={cn(
        "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8",
        content.iconBg
      )}>
        <IconComponent className="w-12 h-12" />
      </div>
      
      <h2 className="text-h3 font-brand text-text mb-4">{content.title}</h2>
      
      <p className="text-body text-text-muted mb-8 max-w-md mx-auto leading-relaxed">
        {content.description}
      </p>
      
      {onAction && (
        <MillionButton 
          variant="primary" 
          size="lg" 
          onClick={onAction}
        >
          {content.actionLabel}
        </MillionButton>
      )}
      
      {/* Additional suggestions for search empty state */}
      {type === "search" && (
        <div className="mt-12 max-w-lg mx-auto">
          <h3 className="text-h6 text-text mb-4">Try these suggestions:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body text-text-muted">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Expand your price range</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Remove location filters</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Adjust bedroom/bathroom count</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Browse all luxury properties</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { EmptyState };