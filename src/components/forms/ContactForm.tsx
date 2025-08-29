'use client'

import { useState } from 'react'
import { X, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Property } from '@/types/property'

interface ContactFormProps {
  property: Property
  onClose: () => void
}

interface FormData {
  // Step 1: Basic Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Step 2: Property Interest
  interestType: 'viewing' | 'information' | 'offer' | 'other'
  preferredDate: string
  preferredTime: string
  urgency: 'low' | 'medium' | 'high'

  // Step 3: Additional Details
  message: string
  howDidYouHear: string
  budget: string
  timeline: string
}

const interestTypes = [
  { value: 'viewing', label: 'Schedule a Viewing', icon: '👀' },
  { value: 'information', label: 'Request More Information', icon: '📋' },
  { value: 'offer', label: 'Make an Offer', icon: '💰' },
  { value: 'other', label: 'Other Inquiry', icon: '❓' },
]

const urgencyLevels = [
  {
    value: 'low',
    label: 'Just Browsing',
    description: 'No immediate timeline',
  },
  {
    value: 'medium',
    label: 'Interested',
    description: 'Looking to move in 3-6 months',
  },
  {
    value: 'high',
    label: 'Ready to Act',
    description: 'Looking to move within 1-3 months',
  },
]

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
]

export function ContactForm({ property, onClose }: ContactFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interestType: 'viewing',
    preferredDate: '',
    preferredTime: '',
    urgency: 'medium',
    message: '',
    howDidYouHear: '',
    budget: '',
    timeline: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Auto-close after 5 seconds
    setTimeout(() => {
      onClose()
    }, 5000)
  }

  const getStepProgress = () => {
    return (currentStep / 3) * 100
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-surface rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text mb-2">Thank You!</h2>
          <p className="text-text-muted mb-4">
            Your inquiry has been submitted successfully. Our team will contact
            you within 24 hours.
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-line">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-playfair text-2xl font-bold text-text">
              Contact Us About This Property
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-text-muted hover:text-text"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Property Info */}
          <div className="flex items-center space-x-4 p-4 bg-surface-elev rounded-lg">
            <img
              src={property.coverUrl}
              alt={property.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-text">{property.name}</h3>
              <p className="text-text-muted text-sm">{property.address}</p>
              <p className="text-accent font-semibold">
                {property.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-text-muted">
              {Math.round(getStepProgress())}%
            </span>
          </div>
          <div className="w-full bg-line rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">
                  Tell us about yourself
                </h3>
                <p className="text-text-muted mb-6">
                  Let's start with your basic information so we can get in touch
                  with you.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    First Name *
                  </label>
                  <Input
                    required
                    value={formData.firstName}
                    onChange={e =>
                      handleInputChange('firstName', e.target.value)
                    }
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Last Name *
                  </label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={e =>
                      handleInputChange('lastName', e.target.value)
                    }
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property Interest */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">
                  What are you looking for?
                </h3>
                <p className="text-text-muted mb-6">
                  Help us understand your interest in this property and how we
                  can best assist you.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-3">
                  What would you like to do? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {interestTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        handleInputChange('interestType', type.value)
                      }
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.interestType === type.value
                          ? 'border-accent bg-accent/5'
                          : 'border-line hover:border-accent/30'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-medium text-text">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.interestType === 'viewing' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      value={formData.preferredDate}
                      onChange={e =>
                        handleInputChange('preferredDate', e.target.value)
                      }
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={e =>
                        handleInputChange('preferredTime', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-line rounded-lg bg-surface text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text mb-3">
                  How urgent is your timeline? *
                </label>
                <div className="space-y-3">
                  {urgencyLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => handleInputChange('urgency', level.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        formData.urgency === level.value
                          ? 'border-accent bg-accent/5'
                          : 'border-line hover:border-accent/30'
                      }`}
                    >
                      <div className="font-medium text-text">{level.label}</div>
                      <div className="text-sm text-text-muted">
                        {level.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Additional Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">
                  Additional Information
                </h3>
                <p className="text-text-muted mb-6">
                  Help us provide you with the best possible service by sharing
                  a bit more about your needs.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => handleInputChange('message', e.target.value)}
                  placeholder="Tell us more about what you're looking for..."
                  className="w-full px-3 py-2 border border-line rounded-lg bg-surface text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    value={formData.howDidYouHear}
                    onChange={e =>
                      handleInputChange('howDidYouHear', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-line rounded-lg bg-surface text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">Select an option</option>
                    <option value="website">Website</option>
                    <option value="social-media">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => handleInputChange('budget', e.target.value)}
                    className="w-full px-3 py-2 border border-line rounded-lg bg-surface text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-500k">Under $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-2m">$1M - $2M</option>
                    <option value="2m-5m">$2M - $5M</option>
                    <option value="5m-plus">$5M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Timeline to Move
                </label>
                <select
                  value={formData.timeline}
                  onChange={e => handleInputChange('timeline', e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-lg bg-surface text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="1-year-plus">1+ years</option>
                </select>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-line">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
