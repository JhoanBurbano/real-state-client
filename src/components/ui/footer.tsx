import * as React from "react";
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, ExternalLink, Shield, Home } from "lucide-react";
import { MillionButton } from "./million-button";
import { apiService } from "../../utils/api";
import { announceToScreenReader } from "../../utils/accessibility";
import { cn } from "./utils";

interface FooterProps {
  className?: string;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    const [newsletterEmail, setNewsletterEmail] = React.useState("");
    const [newsletterStatus, setNewsletterStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [newsletterMessage, setNewsletterMessage] = React.useState("");

    const socialLinks = [
      { icon: Instagram, href: "https://instagram.com/millionrealestate", label: "Follow us on Instagram" },
      { icon: Facebook, href: "https://facebook.com/millionrealestate", label: "Follow us on Facebook" },
      { icon: Twitter, href: "https://twitter.com/millionrealestate", label: "Follow us on Twitter" },
      { icon: Linkedin, href: "https://linkedin.com/company/million-real-estate", label: "Connect on LinkedIn" }
    ];

    const quickLinks = [
      { label: "Buy Properties", href: "/buy", description: "Browse luxury properties for sale" },
      { label: "Sell Properties", href: "/sell", description: "List your luxury property" },
      { label: "About Us", href: "/about", description: "Learn about our team and expertise" },
      { label: "Contact", href: "/contact", description: "Get in touch with our experts" },
      { label: "Privacy Policy", href: "/privacy", description: "Read our privacy policy" },
      { label: "Terms of Service", href: "/terms", description: "View our terms of service" }
    ];

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!newsletterEmail.trim()) {
        setNewsletterMessage("Please enter a valid email address");
        setNewsletterStatus('error');
        return;
      }

      setNewsletterStatus('loading');
      
      try {
        const response = await apiService.subscribeNewsletter(newsletterEmail.trim());
        
        if (response.error) {
          throw new Error(response.error);
        }

        setNewsletterStatus('success');
        setNewsletterMessage("Thank you for subscribing! You'll receive our luxury property updates.");
        setNewsletterEmail("");
        announceToScreenReader("Successfully subscribed to newsletter", 'polite');
      } catch (error) {
        setNewsletterStatus('error');
        setNewsletterMessage(error instanceof Error ? error.message : "Failed to subscribe. Please try again.");
        announceToScreenReader("Newsletter subscription failed", 'polite');
      }
    };

    // Reset message after 5 seconds
    React.useEffect(() => {
      if (newsletterStatus !== 'idle') {
        const timer = setTimeout(() => {
          setNewsletterStatus('idle');
          setNewsletterMessage("");
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [newsletterStatus]);

    return (
      <footer
        ref={ref}
        className={cn("bg-surface border-t border-line", className)}
        role="contentinfo"
        aria-label="Site footer with contact information and links"
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand & Contact */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-h3 font-brand text-accent mb-4">MILLION</h2>
                <p className="text-body text-text-muted max-w-md leading-relaxed">
                  South Florida's premier luxury boutique real estate firm, 
                  specializing in exclusive waterfront properties and luxury estates 
                  in Miami Beach, Bal Harbour, and Key Biscayne.
                </p>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-3" role="group" aria-label="Contact information">
                <div className="flex items-center space-x-3 text-body text-text-muted">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="tel:+13055550123" 
                    className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                    aria-label="Call us at (305) 555-0123"
                  >
                    (305) 555-0123
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-body text-text-muted">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="mailto:luxury@million.com" 
                    className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                    aria-label="Email us at luxury@million.com"
                  >
                    luxury@million.com
                  </a>
                </div>
                <div className="flex items-start space-x-3 text-body text-text-muted">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                  <address className="not-italic">
                    1 Collins Avenue<br />
                    Miami Beach, FL 33139
                  </address>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-h6 text-text mb-4">Follow Us</h3>
                <div className="flex space-x-4" role="group" aria-label="Social media links">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="p-2 bg-surface-elev hover:bg-accent hover:text-on-accent rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                        <ExternalLink className="sr-only" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-h6 text-text mb-4">Quick Links</h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3" role="list">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-body text-text-muted hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                        aria-describedby={`${link.label.replace(/\s+/g, '-').toLowerCase()}-desc`}
                      >
                        {link.label}
                      </a>
                      <span 
                        id={`${link.label.replace(/\s+/g, '-').toLowerCase()}-desc`} 
                        className="sr-only"
                      >
                        {link.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-h6 text-text mb-4">Luxury Property Updates</h3>
              <p className="text-body text-text-muted mb-4">
                Get exclusive access to new luxury listings and market insights.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter subscription
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-surface-elev border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    aria-describedby="newsletter-status"
                    required
                  />
                </div>
                
                <MillionButton 
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={newsletterStatus === 'loading'}
                  aria-describedby="newsletter-status"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </MillionButton>
                
                {newsletterMessage && (
                  <div 
                    id="newsletter-status"
                    className={cn(
                      "text-sm p-3 rounded-lg",
                      newsletterStatus === 'success' 
                        ? "bg-success/10 text-success" 
                        : "bg-error/10 text-error"
                    )}
                    role={newsletterStatus === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                  >
                    {newsletterMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Legal Compliance Section */}
          <div className="border-t border-line mt-12 pt-8 space-y-6">
            {/* Equal Housing and Licensing */}
            <div className="bg-surface-elev rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-3 text-body text-text-muted">
                  <div>
                    <h4 className="text-h6 text-text mb-2 flex items-center">
                      <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                      Equal Housing Opportunity
                    </h4>
                    <p className="leading-relaxed">
                      <strong>Equal Housing Opportunity.</strong> All real estate advertised herein is subject to the 
                      Federal Fair Housing Act, which makes it illegal to advertise any preference, limitation, or 
                      discrimination based on race, color, religion, sex, handicap, familial status, or national origin, 
                      or intention to make any such preference, limitation, or discrimination.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-h6 text-text mb-2">Professional Licensing</h4>
                    <p className="leading-relaxed">
                      <strong>MILLION Real Estate is a licensed real estate brokerage in the state of Florida.</strong><br />
                      Florida Real Estate License #BK3456789<br />
                      Licensed Broker: Sofia Rodriguez, License #SL1234567<br />
                      Member of Miami Association of Realtors (MAR) and Multiple Listing Service (MLS)
                    </p>
                  </div>

                  <div>
                    <h4 className="text-h6 text-text mb-2">Professional Designations</h4>
                    <p className="leading-relaxed">
                      Certified Luxury Home Marketing Specialist (CLHMS)<br />
                      Institute for Luxury Home Marketing Member<br />
                      National Association of Realtors (NAR) Member
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright and Additional Legal */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-4 border-t border-line text-body text-text-muted">
              <div className="space-y-2">
                <p>© 2025 MILLION Real Estate. All rights reserved.</p>
                <p className="text-sm">
                  All information deemed reliable but not guaranteed. All properties subject to prior sale or withdrawal.
                </p>
              </div>
              
              <div className="text-sm space-y-1 lg:text-right">
                <p>Licensed Real Estate Broker | MLS Participant</p>
                <p>
                  <a 
                    href="/privacy" 
                    className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                  >
                    Privacy Policy
                  </a>
                  {" | "}
                  <a 
                    href="/terms" 
                    className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                  >
                    Terms of Use
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);
Footer.displayName = "Footer";

export { Footer };