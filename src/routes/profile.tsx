// src/routes/profile.tsx
import { useEffect, useState } from 'react'
import { Navigate, createFileRoute } from '@tanstack/react-router'
import {
  Building2,
  CheckCircle,
  Clock,
  Edit,
  Mail,
  Phone,
  Save,
  User,
  UserCheck,
  X,
  XCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/utils/authContext'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
]

function Profile() {
  const { isAuthenticated, user, updateProfile, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    timezone: '',
  })

  // Update form data when user data becomes available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        timezone: user.timezone || '',
      })
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending Approval
          </Badge>
        )
      case 'approved':
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case 'rejected':
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleTimezoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      timezone: value,
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateProfile(formData)
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset to current user data
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      timezone: user.timezone || '',
    })
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  const handleEdit = () => {
    // Ensure we have the latest user data when starting to edit
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      timezone: user.timezone || '',
    })
    setIsEditing(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your account information and view your representative details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              {!isEditing && (
                <Button onClick={handleEdit} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm mb-4 p-2 bg-green-50 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <Input
                    value={user.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </div>

              <div>
                <Label>Company</Label>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <Input
                    value={user.company || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Company cannot be changed
                </p>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={handleTimezoneChange}
                  disabled={!isEditing}
                >
                  <SelectTrigger className={!isEditing ? 'bg-gray-50' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {updateLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={updateLoading}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Account Status & Representative Card */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Verification Status:
                </span>
                {getStatusBadge(user.verificationStatus)}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Email Verified:</span>
                <Badge variant={user.isEmailVerified ? 'default' : 'secondary'}>
                  {user.isEmailVerified ? 'Yes' : 'No'}
                </Badge>
              </div>

              {user.isAdmin && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Account Type:</span>
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    Administrator
                  </Badge>
                </div>
              )}

              <div className="pt-2 border-t">
                <span className="text-xs text-gray-500">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Representative Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Your Representative
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.assignedRepresentative ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-blue-900 mb-2">
                      {user.assignedRepresentative.name}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Mail className="h-4 w-4" />
                        <a
                          href={`mailto:${user.assignedRepresentative.email}`}
                          className="hover:underline"
                        >
                          {user.assignedRepresentative.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-blue-700">
                        <Phone className="h-4 w-4" />
                        <a
                          href={`tel:${user.assignedRepresentative.phone}`}
                          className="hover:underline"
                        >
                          {user.assignedRepresentative.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <p className="font-medium mb-1">💡 Your Personal Contact</p>
                    <p>
                      {user.assignedRepresentative.name} is your dedicated
                      representative. When you use the "Talk to Us" feature on
                      our website, your messages will be sent directly to them
                      for personalized assistance.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-2">
                    No representative assigned yet
                  </p>
                  <p className="text-sm text-gray-400">
                    {user.verificationStatus === 'pending'
                      ? 'A representative will be assigned once your account is approved.'
                      : 'Please contact our admin team to have a representative assigned to your account.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
