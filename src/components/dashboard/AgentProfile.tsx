'use client'

import { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Edit,
  Save,
  X,
  Building,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { useAuthContext } from '@/context/AuthContext'
import { useOwnerProfile } from '@/hooks/useOwnerProfile'
import type { UpdateOwnerRequest } from '@/types'

export function AgentProfile() {
  const { owner } = useAuthContext()
  const { profile, isLoading, error, updateProfile } = useOwnerProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<UpdateOwnerRequest>({
    fullName: '',
    phoneE164: '',
    bio: '',
    specialties: [],
    languages: [],
    certifications: [],
    socialMedia: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
    },
  })

  // Update profileData when profile changes
  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.fullName,
        phoneE164: profile.phoneE164,
        bio: profile.bio,
        specialties: profile.specialties,
        languages: profile.languages,
        certifications: profile.certifications,
        socialMedia: profile.socialMedia,
      })
    }
  }, [profile])

  const handleSave = async () => {
    try {
      const updatedProfile = await updateProfile(profileData)
      if (updatedProfile) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const handleCancel = () => {
    // Reset to original data from profile
    if (profile) {
      setProfileData({
        fullName: profile.fullName,
        phoneE164: profile.phoneE164,
        bio: profile.bio,
        specialties: profile.specialties,
        languages: profile.languages,
        certifications: profile.certifications,
        socialMedia: profile.socialMedia,
      })
    }
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">Agent Profile</h1>
            <p className="text-text-muted">Loading profile...</p>
          </div>
        </div>
        <div className="animate-pulse">
          <Card className="p-6">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">Agent Profile</h1>
            <p className="text-text-muted">Error loading profile</p>
          </div>
        </div>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </Card>
      </div>
    )
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

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text mb-2">
                  {isEditing ? (
                    <Input
                      value={profileData.fullName || ''}
                      onChange={e =>
                        setProfileData({
                          ...profileData,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Full Name"
                    />
                  ) : (
                    profile?.fullName || owner?.fullName || 'John Doe'
                  )}
                </h2>
                <p className="text-text-muted">
                  {profile?.role || owner?.role || 'Real Estate Agent'}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-text-muted">
                  {profile?.email || owner?.email || 'email@example.com'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-text-muted">
                  {isEditing ? (
                    <Input
                      value={profileData.phoneE164 || ''}
                      onChange={e =>
                        setProfileData({
                          ...profileData,
                          phoneE164: e.target.value,
                        })
                      }
                      placeholder="Phone Number"
                    />
                  ) : (
                    profile?.phoneE164 ||
                    owner?.phoneE164 ||
                    '+1 (555) 123-4567'
                  )}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-text mb-2">Bio</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio || ''}
                  onChange={e =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  className="w-full p-3 border border-line rounded-lg resize-none"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-text-muted">
                  {profile?.bio || 'No bio available'}
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Stats Card */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Properties</span>
                <span className="font-semibold text-text">
                  {profile?.propertiesCount || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Total Value</span>
                <span className="font-semibold text-text">
                  ${(profile?.totalValue || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Experience</span>
                <span className="font-semibold text-text">
                  {profile?.experience || 0} years
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-text">
                    {profile?.averageRating?.toFixed(1) || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Specialties */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Specialties</h3>
        {isEditing ? (
          <div className="space-y-2">
            {profileData.specialties?.map((specialty, index) => (
              <Input
                key={index}
                value={specialty}
                onChange={e => {
                  const newSpecialties = [...(profileData.specialties || [])]
                  newSpecialties[index] = e.target.value
                  setProfileData({
                    ...profileData,
                    specialties: newSpecialties,
                  })
                }}
                placeholder="Specialty"
              />
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setProfileData({
                  ...profileData,
                  specialties: [...(profileData.specialties || []), ''],
                })
              }
            >
              Add Specialty
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile?.specialties?.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {specialty}
              </span>
            )) || (
              <span className="text-text-muted">No specialties listed</span>
            )}
          </div>
        )}
      </Card>

      {/* Languages */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Languages</h3>
        {isEditing ? (
          <div className="space-y-2">
            {profileData.languages?.map((language, index) => (
              <Input
                key={index}
                value={language}
                onChange={e => {
                  const newLanguages = [...(profileData.languages || [])]
                  newLanguages[index] = e.target.value
                  setProfileData({ ...profileData, languages: newLanguages })
                }}
                placeholder="Language"
              />
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setProfileData({
                  ...profileData,
                  languages: [...(profileData.languages || []), ''],
                })
              }
            >
              Add Language
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile?.languages?.map((language, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {language}
              </span>
            )) || <span className="text-text-muted">No languages listed</span>}
          </div>
        )}
      </Card>

      {/* Certifications */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Certifications</h3>
        {isEditing ? (
          <div className="space-y-2">
            {profileData.certifications?.map((cert, index) => (
              <Input
                key={index}
                value={cert}
                onChange={e => {
                  const newCerts = [...(profileData.certifications || [])]
                  newCerts[index] = e.target.value
                  setProfileData({ ...profileData, certifications: newCerts })
                }}
                placeholder="Certification"
              />
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setProfileData({
                  ...profileData,
                  certifications: [...(profileData.certifications || []), ''],
                })
              }
            >
              Add Certification
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile?.certifications?.map((cert, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center space-x-1"
              >
                <Award className="h-3 w-3" />
                <span>{cert}</span>
              </span>
            )) || (
              <span className="text-text-muted">No certifications listed</span>
            )}
          </div>
        )}
      </Card>

      {/* Social Media */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Linkedin className="h-5 w-5 text-blue-600" />
            {isEditing ? (
              <Input
                value={profileData.socialMedia?.linkedin || ''}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    socialMedia: {
                      ...profileData.socialMedia,
                      linkedin: e.target.value,
                    },
                  })
                }
                placeholder="LinkedIn URL"
              />
            ) : (
              <span className="text-text-muted">
                {profile?.socialMedia?.linkedin || 'Not provided'}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Twitter className="h-5 w-5 text-blue-400" />
            {isEditing ? (
              <Input
                value={profileData.socialMedia?.twitter || ''}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    socialMedia: {
                      ...profileData.socialMedia,
                      twitter: e.target.value,
                    },
                  })
                }
                placeholder="Twitter URL"
              />
            ) : (
              <span className="text-text-muted">
                {profile?.socialMedia?.twitter || 'Not provided'}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Instagram className="h-5 w-5 text-pink-600" />
            {isEditing ? (
              <Input
                value={profileData.socialMedia?.instagram || ''}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    socialMedia: {
                      ...profileData.socialMedia,
                      instagram: e.target.value,
                    },
                  })
                }
                placeholder="Instagram URL"
              />
            ) : (
              <span className="text-text-muted">
                {profile?.socialMedia?.instagram || 'Not provided'}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Facebook className="h-5 w-5 text-blue-800" />
            {isEditing ? (
              <Input
                value={profileData.socialMedia?.facebook || ''}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    socialMedia: {
                      ...profileData.socialMedia,
                      facebook: e.target.value,
                    },
                  })
                }
                placeholder="Facebook URL"
              />
            ) : (
              <span className="text-text-muted">
                {profile?.socialMedia?.facebook || 'Not provided'}
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
