import * as React from "react";
import { X, User, Mail, Phone, MessageSquare, Send, Check, AlertCircle } from "lucide-react";
import { MillionButton } from "./million-button";
import { apiService } from "../../utils/api";
import { cn } from "./utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyAddress?: string;
  propertyId?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ 
  isOpen, 
  onClose, 
  propertyAddress,
  propertyId 
}) => {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    interest: "",
    timeline: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateStep1 = () => {
    return formData.firstName.trim() && 
           formData.lastName.trim() && 
           formData.email.trim() && 
           formData.phone.trim();
  };

  const handleSubmit = async () => {
    if (!validateStep1()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const leadData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interest: formData.interest || 'buying',
        timeline: formData.timeline || '1-3months',
        message: formData.message.trim() || `Interested in property${propertyAddress ? `: ${propertyAddress}` : ''}.`,
        propertyId: propertyId,
      };

      const response = await apiService.createLead(leadData);
      
      if (response.error) {
        throw new Error(response.error);
      }

      console.log('Lead created successfully:', response.data);
      setStep(3); // Success step
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit contact form');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setLoading(false);
    setError(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      interest: "",
      timeline: ""
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-surface-elev rounded-xl shadow-luxury-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-line">
          <div>
            <h2 className="text-h4 font-brand text-text">Contact Agent</h2>
            {propertyAddress && (
              <p className="text-body text-text-muted mt-1">{propertyAddress}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-text-muted hover:text-text rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pt-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= stepNumber 
                    ? "bg-accent text-on-accent" 
                    : "bg-surface text-text-muted"
                )}>
                  {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={cn(
                    "w-12 h-1 mx-2 rounded transition-colors",
                    step > stepNumber ? "bg-accent" : "bg-surface"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-6 pt-4">
            <div className="flex items-center space-x-2 text-error bg-error/10 px-4 py-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-body">{error}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-h6 text-text mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-body font-medium text-text mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-body font-medium text-text mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-text mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-text mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="(305) 555-0123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <MillionButton 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!validateStep1()}
              >
                Continue
              </MillionButton>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-h6 text-text mb-4">Tell Us More</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-body font-medium text-text mb-2">
                      What are you interested in?
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => handleInputChange("interest", e.target.value)}
                      className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="renting">Renting a Property</option>
                      <option value="investment">Investment Opportunities</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-text mb-2">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Select a timeline</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-3months">1-3 Months</option>
                      <option value="3-6months">3-6 Months</option>
                      <option value="6-12months">6-12 Months</option>
                      <option value="over1year">Over 1 Year</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-text mb-2">
                      Additional Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                        placeholder="Tell us about your specific needs or any questions you have..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <MillionButton 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </MillionButton>
                <MillionButton 
                  variant="primary" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={loading}
                  icon={loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                  iconPosition="trailing"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </MillionButton>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              
              <div>
                <h3 className="text-h4 font-brand text-text mb-2">Message Sent!</h3>
                <p className="text-body text-text-muted">
                  Thank you for your interest. One of our luxury real estate specialists 
                  will contact you within 24 hours.
                </p>
              </div>
              
              <div className="space-y-3">
                <MillionButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={handleClose}
                >
                  Close
                </MillionButton>
                <MillionButton 
                  variant="ghost" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    resetForm();
                    setStep(1);
                  }}
                >
                  Send Another Message
                </MillionButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ContactModal };