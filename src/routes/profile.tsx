import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Building,
  Calendar,
  Clock,
  Edit,
  Mail,
  Phone,
  Save,
  User,
  X,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/utils/authContext'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  timezone: string
  verificationStatus: 'pending' | 'approved' | 'rejected'
  isEmailVerified: boolean
  createdAt: string
  verifiedAt?: string
  verifiedBy?: string
}

function RouteComponent() {
  const { user, updateProfile } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    timezone: '',
  })

  useEffect(() => {
    if (user) {
      setProfile(user)
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        timezone: user.timezone || '', // Add this
      })
    }
  }, [user])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTimezone = (timezone: string) => {
    const timezoneMap: { [key: string]: string } = {
      'America/New_York': 'Eastern Time (ET)',
      'America/Chicago': 'Central Time (CT)',
      'America/Denver': 'Mountain Time (MT)',
      'America/Los_Angeles': 'Pacific Time (PT)',
      'America/Phoenix': 'Mountain Time - Arizona (MST)',
      'America/Anchorage': 'Alaska Time (AKT)',
      'Pacific/Honolulu': 'Hawaii Time (HT)',
    }
    return timezoneMap[timezone] || timezone
  }

  const getStatusBadge = (status: string) => {
    const badgeProps = {
      pending: {
        variant: 'secondary' as const,
        color: 'bg-yellow-100 text-yellow-800',
      },
      approved: {
        variant: 'default' as const,
        color: 'bg-green-100 text-green-800',
      },
      rejected: {
        variant: 'destructive' as const,
        color: 'bg-red-100 text-red-800',
      },
    }

    const props = badgeProps[status as keyof typeof badgeProps]

    return (
      <Badge variant={props.variant} className={props.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEditData({
      ...editData,
      [e.target.id]: e.target.value,
    })
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleEdit = () => {
    setIsEditing(true)
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError('')
    setSuccess('')
    // Reset to original values
    if (profile) {
      setEditData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        timezone: profile.timezone, // Add this
      })
    }
  }

  const handleSave = async () => {
    if (
      !editData.firstName ||
      !editData.lastName ||
      !editData.phone ||
      !editData.timezone
    ) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateProfile({
        firstName: editData.firstName,
        lastName: editData.lastName,
        phone: editData.phone,
        timezone: editData.timezone,
      })
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Loading Profile
            </h3>
            <p className="text-gray-500">
              Please wait while we load your profile information...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">
            Manage your account information and settings
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">
                Personal Information
              </CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={editData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={editData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={editData.timezone}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select Timezone</option>
                      <option value="America/New_York">
                        Eastern Time (ET)
                      </option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">
                        Pacific Time (PT)
                      </option>
                      <option value="America/Phoenix">
                        Mountain Time - Arizona (MST)
                      </option>
                      <option value="America/Anchorage">
                        Alaska Time (AKT)
                      </option>
                      <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {profile.firstName} {profile.lastName}
                      </p>
                      <p className="text-sm text-gray-500">Full Name</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{profile.phone}</p>
                      <p className="text-sm text-gray-500">Phone Number</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{profile.email}</p>
                  <p className="text-sm text-gray-500">Email Address</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{profile.company}</p>
                  <p className="text-sm text-gray-500">Company</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">
                    {formatTimezone(profile.timezone)}
                  </p>
                  <p className="text-sm text-gray-500">Timezone</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{formatDate(profile.createdAt)}</p>
                  <p className="text-sm text-gray-500">Member Since</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Verification Status</span>
                  {getStatusBadge(profile.verificationStatus)}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-medium">Email Verified</span>
                  <Badge
                    variant={profile.isEmailVerified ? 'default' : 'secondary'}
                  >
                    {profile.isEmailVerified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </div>

                {profile.verifiedAt && profile.verifiedBy && (
                  <>
                    <Separator />
                    <div className="text-sm text-gray-600">
                      <p>
                        Verified on {formatDate(profile.verifiedAt)} by{' '}
                        {profile.verifiedBy}
                      </p>
                    </div>
                  </>
                )}

                {profile.verificationStatus === 'pending' && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      Your account is pending approval. You'll receive an email
                      notification once an administrator has reviewed your
                      registration.
                    </p>
                  </div>
                )}

                {profile.verificationStatus === 'rejected' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      Your account registration has been rejected. Please
                      contact support for more information.
                    </p>
                  </div>
                )}

                {profile.verificationStatus === 'approved' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      Your account has been approved and is fully active.
                      Welcome!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
