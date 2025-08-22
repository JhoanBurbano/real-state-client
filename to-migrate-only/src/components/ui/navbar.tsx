import * as React from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { MillionButton } from "./million-button";
import { cn } from "./utils";

interface NavbarProps {
  className?: string;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, ...props }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems = [
      { label: "Buy", href: "/buy" },
      { label: "Sell", href: "/sell" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ];

    return (
      <nav
        ref={ref}
        className={cn(
          "sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-line",
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-h4 font-brand text-accent">MILLION</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-body text-text hover:text-accent transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+1234567890" className="text-text-muted hover:text-accent transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:luxury@million.com" className="text-text-muted hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <MillionButton variant="primary" size="md">
                Get Price List
              </MillionButton>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-text hover:text-accent transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-line bg-surface-elev">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 text-body text-text hover:text-accent hover:bg-surface rounded-md transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="px-3 py-4 space-y-3">
                  <div className="flex items-center space-x-4">
                    <a href="tel:+1234567890" className="flex items-center space-x-2 text-text-muted hover:text-accent transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="text-body">Call Us</span>
                    </a>
                    <a href="mailto:luxury@million.com" className="flex items-center space-x-2 text-text-muted hover:text-accent transition-colors">
                      <Mail className="w-4 h-4" />
                      <span className="text-body">Email</span>
                    </a>
                  </div>
                  <MillionButton variant="primary" size="md" className="w-full">
                    Get Price List
                  </MillionButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";

export { Navbar };