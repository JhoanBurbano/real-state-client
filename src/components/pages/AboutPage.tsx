'use client'

import { Award, Globe, Shield, Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const stats = [
  { label: 'Properties Sold', value: '500+', icon: Award },
  { label: 'Happy Clients', value: '1000+', icon: Heart },
  { label: 'Years Experience', value: '25+', icon: Star },
  { label: 'Global Locations', value: '50+', icon: Globe },
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 25+ years in luxury real estate',
    image: 'https://picsum.photos/400/400?random=1',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Sales',
    bio: 'Expert negotiator specializing in high-end properties',
    image: 'https://picsum.photos/400/400?random=2',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Lead Designer',
    bio: 'Creative visionary transforming properties into dream homes',
    image: 'https://picsum.photos/400/400?random=3',
  },
  {
    name: 'David Thompson',
    role: 'Investment Advisor',
    bio: 'Strategic advisor for premium real estate investments',
    image: 'https://picsum.photos/400/400?random=4',
  },
]

export function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text mb-4">
              About MILLION
            </h1>
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              We are the premier luxury real estate company, dedicated to
              connecting discerning clients with the world's most exceptional
              properties.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-text mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              To provide unparalleled service in luxury real estate, creating
              exceptional experiences for our clients while maintaining the
              highest standards of integrity and professionalism.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              We believe that every property tells a story, and we're here to
              help you find the perfect chapter for your life.
            </p>
          </div>
          <div>
            <h2 className="font-playfair text-3xl font-bold text-text mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              To be the most trusted and respected name in luxury real estate,
              known for our commitment to excellence, innovation, and client
              satisfaction.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              We envision a future where luxury living is accessible to those
              who appreciate the finest things in life.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-text mb-2">
                  {stat.value}
                </div>
                <div className="text-text-muted">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold text-text text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-surface-elev rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Integrity
              </h3>
              <p className="text-text-muted">
                We conduct business with the highest ethical standards, building
                trust through transparency and honesty.
              </p>
            </div>
            <div className="text-center p-6 bg-surface-elev rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Star className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">
                Excellence
              </h3>
              <p className="text-text-muted">
                We strive for perfection in every detail, delivering exceptional
                service that exceeds expectations.
              </p>
            </div>
            <div className="text-center p-6 bg-surface-elev rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Passion</h3>
              <p className="text-text-muted">
                We're passionate about real estate and committed to helping our
                clients achieve their dreams.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold text-text text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <div key={member.name} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                <p className="text-text-muted text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-12">
          <h2 className="font-playfair text-3xl font-bold text-text mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
            Let our expert team guide you through the process of finding and
            acquiring your perfect luxury property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold">
              Browse Properties
            </Button>
            <Button variant="outline" size="lg" className="font-semibold">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
