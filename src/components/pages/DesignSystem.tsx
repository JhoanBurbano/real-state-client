import * as React from "react";
import { Copy, Check, Palette, Type, Component, Grid, Sparkles } from "lucide-react";
import { MillionButton } from "../ui/million-button";
import { Badge } from "../ui/badge";
import { PropertyCard } from "../ui/property-card";
import { Navbar } from "../ui/navbar";
import { Footer } from "../ui/footer";
import { toast } from "sonner@2.0.3";

const DesignSystem: React.FC = () => {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, tokenName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToken(tokenName);
      toast.success(`Copied ${tokenName} to clipboard`);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const ColorToken: React.FC<{ name: string; value: string; cssVar: string; description?: string }> = ({ 
    name, value, cssVar, description 
  }) => (
    <div className="bg-surface-elev rounded-xl p-4 border border-line/30 hover:border-accent/20 transition-all duration-200">
      <div 
        className="w-full h-16 rounded-lg mb-3 border border-line/20"
        style={{ backgroundColor: value }}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-h6 font-medium text-text">{name}</h4>
          <button
            onClick={() => copyToClipboard(cssVar, name)}
            className="p-1 rounded hover:bg-surface transition-colors"
            aria-label={`Copy ${name} CSS variable`}
          >
            {copiedToken === name ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4 text-text-muted" />
            )}
          </button>
        </div>
        <div className="space-y-1">
          <code className="text-xs text-text-muted bg-surface px-2 py-1 rounded">{value}</code>
          <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded block">{cssVar}</code>
        </div>
        {description && (
          <p className="text-xs text-text-muted">{description}</p>
        )}
      </div>
    </div>
  );

  const TypographyExample: React.FC<{ className: string; label: string; cssVar?: string }> = ({ 
    className, label, cssVar 
  }) => (
    <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-h6 font-medium text-text">{label}</h4>
        {cssVar && (
          <button
            onClick={() => copyToClipboard(cssVar, label)}
            className="p-1 rounded hover:bg-surface transition-colors"
            aria-label={`Copy ${label} CSS class`}
          >
            {copiedToken === label ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4 text-text-muted" />
            )}
          </button>
        )}
      </div>
      <div className={className}>
        The quick brown fox jumps over the lazy dog
      </div>
      {cssVar && (
        <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded mt-3 inline-block">{cssVar}</code>
      )}
    </div>
  );

  const ComponentShowcase: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
      <h4 className="text-h6 font-medium text-text mb-4">{title}</h4>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const SpacingToken: React.FC<{ name: string; value: string }> = ({ name, value }) => (
    <div className="flex items-center space-x-4 p-3 bg-surface rounded-lg">
      <div 
        className="bg-accent rounded"
        style={{ width: value, height: '16px' }}
      />
      <div className="flex-1">
        <code className="text-sm font-medium text-text">{name}</code>
        <div className="text-xs text-text-muted">{value}</div>
      </div>
      <button
        onClick={() => copyToClipboard(`var(${name})`, name)}
        className="p-1 rounded hover:bg-surface-elev transition-colors"
      >
        {copiedToken === name ? (
          <Check className="w-4 h-4 text-success" />
        ) : (
          <Copy className="w-4 h-4 text-text-muted" />
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">MILLION Design System</span>
            </div>
            <h1 className="text-h1 font-brand text-text mb-6">
              Luxury Real Estate
              <br />
              Design System
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              A comprehensive collection of design tokens, components, and patterns 
              for creating premium real estate experiences.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Table of Contents */}
        <nav className="mb-16">
          <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
            <h2 className="text-h4 font-brand text-text mb-6 flex items-center">
              <Grid className="w-6 h-6 mr-3 text-accent" />
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Palette, title: "Colors", href: "#colors" },
                { icon: Type, title: "Typography", href: "#typography" },
                { icon: Component, title: "Components", href: "#components" },
                { icon: Grid, title: "Layout", href: "#layout" }
              ].map(({ icon: Icon, title, href }) => (
                <a
                  key={title}
                  href={href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface transition-colors"
                >
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="text-body font-medium text-text">{title}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <h2 className="text-h2 font-brand text-text mb-8 flex items-center">
            <Palette className="w-8 h-8 mr-4 text-accent" />
            Color Palette
          </h2>
          
          {/* Brand Colors */}
          <div className="mb-12">
            <h3 className="text-h4 font-brand text-text mb-6">Brand Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ColorToken 
                name="Primary" 
                value="#A78047" 
                cssVar="var(--accent)"
                description="Primary brand color for CTAs and accents"
              />
              <ColorToken 
                name="Background" 
                value="#FFFFFF" 
                cssVar="var(--bg)"
                description="Main background color"
              />
              <ColorToken 
                name="Surface" 
                value="#F7F7F8" 
                cssVar="var(--surface)"
                description="Card and component backgrounds"
              />
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mb-12">
            <h3 className="text-h4 font-brand text-text mb-6">Semantic Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ColorToken 
                name="Success" 
                value="#249F6A" 
                cssVar="var(--success)"
                description="Success states and positive actions"
              />
              <ColorToken 
                name="Warning" 
                value="#B77816" 
                cssVar="var(--warning)"
                description="Warning states and attention"
              />
              <ColorToken 
                name="Error" 
                value="#C94040" 
                cssVar="var(--error)"
                description="Error states and destructive actions"
              />
              <ColorToken 
                name="Info" 
                value="#2E6DD9" 
                cssVar="var(--info)"
                description="Information and neutral states"
              />
            </div>
          </div>

          {/* Text Colors */}
          <div className="mb-12">
            <h3 className="text-h4 font-brand text-text mb-6">Text Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ColorToken 
                name="Primary Text" 
                value="#1A1A1A" 
                cssVar="var(--text)"
                description="Main text color for headings and body"
              />
              <ColorToken 
                name="Muted Text" 
                value="#5B616E" 
                cssVar="var(--text-muted)"
                description="Secondary text and descriptions"
              />
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <h2 className="text-h2 font-brand text-text mb-8 flex items-center">
            <Type className="w-8 h-8 mr-4 text-accent" />
            Typography
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Font Families */}
            <div className="space-y-6">
              <h3 className="text-h4 font-brand text-text mb-6">Font Families</h3>
              <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
                <h4 className="text-h6 font-medium text-text mb-4">Brand Font</h4>
                <div className="font-brand text-h3 text-text mb-2">Playfair Display</div>
                <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">var(--font-brand)</code>
                <p className="text-sm text-text-muted mt-2">Used for headings and luxury typography</p>
              </div>
              
              <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
                <h4 className="text-h6 font-medium text-text mb-4">Base Font</h4>
                <div className="font-base text-h4 text-text mb-2">Inter</div>
                <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">var(--font-base)</code>
                <p className="text-sm text-text-muted mt-2">Used for body text and interface elements</p>
              </div>
            </div>
            
            {/* Typography Scale */}
            <div className="space-y-6">
              <h3 className="text-h4 font-brand text-text mb-6">Typography Scale</h3>
              <TypographyExample className="text-h1" label="Heading 1" cssVar=".text-h1" />
              <TypographyExample className="text-h2" label="Heading 2" cssVar=".text-h2" />
              <TypographyExample className="text-h3" label="Heading 3" cssVar=".text-h3" />
              <TypographyExample className="text-h4" label="Heading 4" cssVar=".text-h4" />
              <TypographyExample className="text-h5" label="Heading 5" cssVar=".text-h5" />
              <TypographyExample className="text-h6" label="Heading 6" cssVar=".text-h6" />
              <TypographyExample className="text-body" label="Body Text" cssVar=".text-body" />
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="mb-16">
          <h2 className="text-h2 font-brand text-text mb-8 flex items-center">
            <Component className="w-8 h-8 mr-4 text-accent" />
            Components
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Buttons */}
            <ComponentShowcase title="Buttons">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <MillionButton variant="primary" size="lg">Primary Button</MillionButton>
                  <MillionButton variant="outline" size="lg">Outline Button</MillionButton>
                  <MillionButton variant="ghost" size="lg">Ghost Button</MillionButton>
                </div>
                <div className="flex flex-wrap gap-3">
                  <MillionButton variant="primary" size="md">Medium</MillionButton>
                  <MillionButton variant="outline" size="md">Medium</MillionButton>
                  <MillionButton variant="ghost" size="md">Medium</MillionButton>
                </div>
                <div className="flex flex-wrap gap-3">
                  <MillionButton variant="primary" size="sm">Small</MillionButton>
                  <MillionButton variant="outline" size="sm">Small</MillionButton>
                  <MillionButton variant="ghost" size="sm">Small</MillionButton>
                </div>
              </div>
            </ComponentShowcase>

            {/* Badges */}
            <ComponentShowcase title="Badges">
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Hot</Badge>
                <Badge variant="outline">New</Badge>
              </div>
              <div className="text-xs text-text-muted">
                Used for property status, tags, and labels
              </div>
            </ComponentShowcase>

            {/* Property Card Preview */}
            <div className="lg:col-span-2">
              <ComponentShowcase title="Property Card">
                <div className="max-w-sm">
                  <PropertyCard
                    image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    price="$4,750,000"
                    location="1500 Ocean Drive, Miami Beach"
                    beds={3}
                    baths={3}
                    sqft={2200}
                    badge="Hot"
                    onViewDetails={() => toast.info('View Details clicked')}
                    onFavorite={() => toast.info('Favorite toggled')}
                  />
                </div>
              </ComponentShowcase>
            </div>
          </div>
        </section>

        {/* Layout Section */}
        <section id="layout" className="mb-16">
          <h2 className="text-h2 font-brand text-text mb-8 flex items-center">
            <Grid className="w-8 h-8 mr-4 text-accent" />
            Layout & Spacing
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spacing Scale */}
            <div>
              <h3 className="text-h4 font-brand text-text mb-6">Spacing Scale</h3>
              <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
                <div className="space-y-3">
                  {[
                    { name: '--space-1', value: '4px' },
                    { name: '--space-2', value: '8px' },
                    { name: '--space-3', value: '12px' },
                    { name: '--space-4', value: '16px' },
                    { name: '--space-6', value: '24px' },
                    { name: '--space-8', value: '32px' },
                    { name: '--space-12', value: '48px' },
                    { name: '--space-16', value: '64px' },
                  ].map((token) => (
                    <SpacingToken key={token.name} name={token.name} value={token.value} />
                  ))}
                </div>
              </div>
            </div>

            {/* Shadows */}
            <div>
              <h3 className="text-h4 font-brand text-text mb-6">Luxury Shadows</h3>
              <div className="space-y-4">
                {[
                  { name: 'Luxury Small', class: 'shadow-luxury-sm', desc: 'Subtle elevation' },
                  { name: 'Luxury Medium', class: 'shadow-luxury-md', desc: 'Standard cards' },
                  { name: 'Luxury Large', class: 'shadow-luxury-lg', desc: 'Prominent elements' },
                  { name: 'Luxury XL', class: 'shadow-luxury-xl', desc: 'Maximum impact' },
                ].map((shadow) => (
                  <div
                    key={shadow.name}
                    className={`bg-surface-elev rounded-xl p-4 border border-line/30 ${shadow.class}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-h6 font-medium text-text">{shadow.name}</h4>
                        <p className="text-sm text-text-muted">{shadow.desc}</p>
                      </div>
                      <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{shadow.class}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className="text-h2 font-brand text-text mb-8">Usage Guidelines</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-h5 font-medium text-text mb-3">Color Usage</h3>
              <p className="text-body text-text-muted">
                Use the accent color sparingly for primary actions and key interactive elements. 
                Maintain sufficient contrast ratios for accessibility.
              </p>
            </div>
            
            <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Type className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-h5 font-medium text-text mb-3">Typography</h3>
              <p className="text-body text-text-muted">
                Use Playfair Display for headings and luxury messaging. Inter provides 
                excellent readability for body text and interface elements.
              </p>
            </div>
            
            <div className="bg-surface-elev rounded-xl p-6 border border-line/30">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Component className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-h5 font-medium text-text mb-3">Components</h3>
              <p className="text-body text-text-muted">
                Components are designed with luxury real estate in mind. Use consistent 
                spacing and maintain the premium aesthetic across all interactions.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DesignSystem;