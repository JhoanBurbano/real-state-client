import * as React from "react";
import { Award, Users, Home, TrendingUp } from "lucide-react";
import { Navbar } from "../ui/navbar";
import { Footer } from "../ui/footer";
import { MillionButton } from "../ui/million-button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const About: React.FC = () => {
  const stats = [
    { icon: Home, label: "Properties Sold", value: "500+" },
    { icon: TrendingUp, label: "Years Experience", value: "15+" },
    { icon: Users, label: "Happy Clients", value: "1000+" },
    { icon: Award, label: "Awards Won", value: "25+" }
  ];

  const team = [
    {
      name: "Sofia Rodriguez",
      title: "Founder & Principal Broker",
      bio: "Leading luxury real estate in South Florida for over 15 years with unmatched market expertise.",
      image: "/api/placeholder/300/400"
    },
    {
      name: "Marcus Chen",
      title: "Senior Partner",
      bio: "Specializing in waterfront properties and new construction developments across Miami-Dade.",
      image: "/api/placeholder/300/400"
    },
    {
      name: "Isabella Martinez",
      title: "Luxury Specialist",
      bio: "Expert in high-end condominiums and penthouse sales in Bal Harbour and Fisher Island.",
      image: "/api/placeholder/300/400"
    }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-h1 font-brand text-text mb-6">
                  Redefining Luxury
                  <span className="text-accent block">Real Estate</span>
                </h1>
                <p className="text-xl text-text-muted leading-relaxed">
                  MILLION represents the pinnacle of luxury real estate in South Florida. 
                  We specialize in exclusive waterfront properties, luxury condominiums, 
                  and prestigious estates that define sophisticated living.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <MillionButton variant="primary" size="lg">
                  View Our Portfolio
                </MillionButton>
                <MillionButton variant="outline" size="lg">
                  Meet Our Team
                </MillionButton>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="/api/placeholder/600/700"
                alt="Luxury Miami Beach Property"
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-luxury-lg"
              />
              <div className="absolute -bottom-8 -left-8 bg-accent text-on-accent p-6 rounded-lg shadow-luxury-md">
                <div className="text-h2 font-brand">15+</div>
                <div className="text-body">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-on-accent rounded-lg mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-h2 font-brand text-text mb-2">{stat.value}</div>
                  <div className="text-body text-text-muted">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-brand text-text mb-6">Our Story</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-h3 font-brand text-text">Founded on Excellence</h3>
                <p className="text-body text-text-muted leading-relaxed">
                  Founded in 2009, MILLION emerged from a vision to elevate the luxury real estate 
                  experience in South Florida. Our boutique approach ensures personalized service 
                  while leveraging cutting-edge technology and market intelligence.
                </p>
                <p className="text-body text-text-muted leading-relaxed">
                  We understand that luxury is not just about price—it's about lifestyle, location, 
                  and the unique story each property tells. Our curated portfolio represents the 
                  finest waterfront estates, penthouses, and architectural masterpieces.
                </p>
              </div>
              <div>
                <ImageWithFallback
                  src="/api/placeholder/500/400"
                  alt="MILLION Real Estate Office"
                  className="w-full h-80 object-cover rounded-lg shadow-luxury-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <ImageWithFallback
                  src="/api/placeholder/500/400"
                  alt="Luxury Property Consultation"
                  className="w-full h-80 object-cover rounded-lg shadow-luxury-md"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h3 className="text-h3 font-brand text-text">Unmatched Expertise</h3>
                <p className="text-body text-text-muted leading-relaxed">
                  Our team brings decades of combined experience in luxury markets across Miami Beach, 
                  Bal Harbour, Fisher Island, Key Biscayne, and Coconut Grove. We maintain exclusive 
                  relationships with developers, architects, and industry leaders.
                </p>
                <p className="text-body text-text-muted leading-relaxed">
                  From private off-market opportunities to record-breaking sales, MILLION has 
                  consistently delivered exceptional results for discerning clients seeking 
                  the finest properties in South Florida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-brand text-text mb-6">Meet Our Team</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Our experienced team of luxury real estate professionals is dedicated to 
              providing unparalleled service and expertise in South Florida's most 
              prestigious markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover rounded-lg shadow-luxury-md group-hover:shadow-luxury-lg transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-h4 font-brand text-text mb-2">{member.name}</h3>
                <p className="text-body text-accent font-medium mb-4">{member.title}</p>
                <p className="text-body text-text-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-brand text-text mb-6">Our Values</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-on-accent rounded-lg flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-h4 font-brand text-text mb-4">Excellence</h3>
              <p className="text-body text-text-muted">
                We maintain the highest standards in every aspect of our service, 
                from initial consultation to closing and beyond.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-on-accent rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-h4 font-brand text-text mb-4">Integrity</h3>
              <p className="text-body text-text-muted">
                Trust and transparency form the foundation of every client relationship. 
                Your interests always come first.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-on-accent rounded-lg flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-h4 font-brand text-text mb-4">Innovation</h3>
              <p className="text-body text-text-muted">
                We leverage the latest technology and market intelligence to deliver 
                superior results in today's dynamic market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-on-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 font-brand mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let our team of luxury real estate experts guide you to the perfect South Florida property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MillionButton variant="subtle" size="lg">
              Browse Properties
            </MillionButton>
            <MillionButton variant="outline" size="lg" className="border-on-accent text-on-accent hover:bg-on-accent hover:text-accent">
              Contact Us Today
            </MillionButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;