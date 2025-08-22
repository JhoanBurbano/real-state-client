'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Properties', href: '/properties' },
  { name: 'Agents', href: '/agents' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
]

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'YouTube', href: '#', icon: Youtube },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // TODO: Implement newsletter subscription
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-surface border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-on-accent font-bold text-lg">M</span>
              </div>
              <span className="font-playfair text-xl font-bold text-text">
                MILLION
              </span>
            </div>
            <p className="text-text-muted text-sm leading-6 mb-6 max-w-md">
              Discover exclusive luxury real estate properties in the most
              prestigious locations worldwide. Experience unparalleled service
              and exceptional properties that define luxury living.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text">
                Subscribe to our newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
              {isSubscribed && (
                <p className="text-success text-sm">
                  Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">
              Contact & Social
            </h3>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <Mail className="h-4 w-4" />
                <span>info@million.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-text mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-text-muted hover:text-accent transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-line">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-muted text-sm">
              © 2024 MILLION Luxury Real Estate. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-text-muted">
              <Link
                href="/privacy"
                className="hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-accent transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-accent transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
