'use client'

import { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Star,
  Award,
  Edit,
  Save,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { useAuthContext } from '@/context/AuthContext'

export function AgentProfile() {
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'John Doe',
    email: user?.email || 'john.doe@millionrealestate.com',
    phone: user?.phoneE164 || '+1 (555) 123-4567',
    title: user?.title || 'Senior Real Estate Agent',
    bio:
      user?.bio ||
      'Experienced real estate professional with over 10 years in the luxury market. Specializing in waterfront properties and high-end residential sales.',
    experience: user?.experience || '10+ years',
    propertiesSold: user?.propertiesSold || 45,
    rating: user?.rating || 4.8,
    location: user?.location || 'Miami, FL',
    specialties: user?.specialties || [
      'Waterfront Properties',
      'Luxury Homes',
      'Investment Properties',
    ],
    languages: user?.languages || ['English', 'Spanish'],
    certifications: user?.certifications || [
      'Licensed Real Estate Agent',
      'Certified Luxury Home Specialist',
    ],
  })

  const handleSave = async () => {
    try {
      // TODO: Implement API call to update profile when backend endpoint is available
      console.log('Saving profile:', profileData)
      // await millionAPI.updateOwnerProfile(user?.id, profileData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      fullName: user?.fullName || 'John Doe',
      email: user?.email || 'john.doe@millionrealestate.com',
      phone: user?.phoneE164 || '+1 (555) 123-4567',
      title: user?.title || 'Senior Real Estate Agent',
      bio:
        user?.bio ||
        'Experienced real estate professional with over 10 years in the luxury market. Specializing in waterfront properties and high-end residential sales.',
      experience: user?.experience || '10+ years',
      propertiesSold: user?.propertiesSold || 45,
      rating: user?.rating || 4.8,
      location: user?.location || 'Miami, FL',
      specialties: user?.specialties || [
        'Waterfront Properties',
        'Luxury Homes',
        'Investment Properties',
      ],
      languages: user?.languages || ['English', 'Spanish'],
      certifications: user?.certifications || [
        'Licensed Real Estate Agent',
        'Certified Luxury Home Specialist',
      ],
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Agent Profile</h1>
          <p className="text-text-muted">
            Manage your professional profile and personal information.
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-6 text-center">
            <div className="w-32 h-32 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-16 w-16 text-white" />
            </div>

            {isEditing ? (
              <Input
                value={profileData.fullName}
                onChange={e =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className="text-xl font-bold text-center mb-2"
              />
            ) : (
              <h2 className="text-xl font-bold text-text mb-2">
                {profileData.fullName}
              </h2>
            )}

            {isEditing ? (
              <Input
                value={profileData.title}
                onChange={e =>
                  setProfileData({ ...profileData, title: e.target.value })
                }
                className="text-text-muted text-center mb-4"
              />
            ) : (
              <p className="text-text-muted mb-4">{profileData.title}</p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {profileData.propertiesSold}
                </div>
                <div className="text-sm text-text-muted">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {profileData.rating}
                </div>
                <div className="text-sm text-text-muted">Rating</div>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.floor(profileData.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text">{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text">{profileData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text">
                  {profileData.location}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text mb-4">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={e =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="w-full p-3 border border-line rounded-lg resize-none"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-text-muted leading-relaxed">
                {profileData.bio}
              </p>
            )}
          </Card>

          {/* Experience & Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text mb-4">
              Experience & Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Years of Experience
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.experience}
                    onChange={e =>
                      setProfileData({
                        ...profileData,
                        experience: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-text">{profileData.experience}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Properties Sold
                </label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={profileData.propertiesSold}
                    onChange={e =>
                      setProfileData({
                        ...profileData,
                        propertiesSold: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                ) : (
                  <p className="text-text">{profileData.propertiesSold}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Specialties */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text mb-4">
              Specialties
            </h3>
            {isEditing ? (
              <Input
                value={profileData.specialties.join(', ')}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    specialties: e.target.value
                      .split(', ')
                      .filter(s => s.trim()),
                  })
                }
                placeholder="Enter specialties separated by commas"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Languages & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">
                Languages
              </h3>
              {isEditing ? (
                <Input
                  value={profileData.languages.join(', ')}
                  onChange={e =>
                    setProfileData({
                      ...profileData,
                      languages: e.target.value
                        .split(', ')
                        .filter(s => s.trim()),
                    })
                  }
                  placeholder="Enter languages separated by commas"
                />
              ) : (
                <div className="space-y-2">
                  {profileData.languages.map((language, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-text">{language}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">
                Certifications
              </h3>
              {isEditing ? (
                <Input
                  value={profileData.certifications.join(', ')}
                  onChange={e =>
                    setProfileData({
                      ...profileData,
                      certifications: e.target.value
                        .split(', ')
                        .filter(s => s.trim()),
                    })
                  }
                  placeholder="Enter certifications separated by commas"
                />
              ) : (
                <div className="space-y-2">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-accent" />
                      <span className="text-text">{cert}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
