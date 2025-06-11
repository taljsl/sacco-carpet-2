// src/components/LoginRegisterModal.tsx
import { useEffect, useState } from 'react'
import saccologo from '../assets/saccologo.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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

// Common US timezones - you can expand this list
const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
]

// Password validation function
const validatePassword = (
  password: string,
): { isValid: boolean; errors: Array<string> } => {
  const errors: Array<string> = []

  if (password.length < 8) {
    errors.push('At least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('At least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('At least one lowercase letter')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('At least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

interface LoginRegisterModalProps {
  externalOpen?: boolean
  onExternalOpenChange?: (open: boolean) => void
}

export default function LoginRegisterModal({
  externalOpen = false,
  onExternalOpenChange,
}: LoginRegisterModalProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [passwordValidation, setPasswordValidation] = useState<{
    isValid: boolean
    errors: Array<string>
  }>({ isValid: true, errors: [] })

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    timezone: '',
  })

  const { login, register, forgotPassword } = useAuth()
  const open = externalOpen || internalOpen
  const setOpen = (newOpen: boolean) => {
    if (onExternalOpenChange) {
      onExternalOpenChange(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }

  // Helper variables for cleaner conditionals
  const isRegistering = !isLogin && !isForgotPassword
  const showPasswordField = !isForgotPassword
  const showRememberMe = isLogin && !isForgotPassword

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setIsLogin(true)
      setIsForgotPassword(false)
      setError('')
      setSuccess('')
      setPasswordValidation({ isValid: true, errors: [] })
      const rememberedEmail = localStorage.getItem('rememberedEmail')
      setFormData({
        firstName: '',
        lastName: '',
        email: rememberedEmail || '',
        password: '',
        phone: '',
        company: '',
        timezone: '',
      })
      setRememberMe(!!rememberedEmail)
    }
  }, [open])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    setFormData({
      ...formData,
      [id]: value,
    })

    // Validate password in real-time for registration
    if (id === 'password' && isRegistering) {
      setPasswordValidation(validatePassword(value))
    }

    // Clear errors when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleTimezoneChange = (value: string) => {
    setFormData({
      ...formData,
      timezone: value,
    })
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked)
    if (!checked) {
      localStorage.removeItem('rememberedEmail')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate password for registration
    if (isRegistering) {
      const validation = validatePassword(formData.password)
      if (!validation.isValid) {
        setError(`Password must contain: ${validation.errors.join(', ')}`)
        setLoading(false)
        return
      }
    }

    try {
      if (isForgotPassword) {
        await forgotPassword(formData.email)
        setSuccess('Password reset link has been sent to your email address.')
        // Switch back to login after successful forgot password
        setTimeout(() => {
          setIsForgotPassword(false)
          setSuccess('')
        }, 3000)
      } else if (isLogin) {
        await login(formData.email, formData.password)

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }

        setOpen(false) // Close modal on successful login
      } else {
        await register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.phone,
          formData.company,
          formData.timezone,
        )
        setSuccess(
          "Registration successful! Your account is pending approval. You'll receive an email once it's been reviewed.",
        )
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          company: '',
          timezone: '',
        })
        setPasswordValidation({ isValid: true, errors: [] })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    if (isForgotPassword) {
      setIsForgotPassword(false)
    } else {
      setIsLogin(!isLogin)
    }
    setError('')
    setSuccess('')
    setPasswordValidation({ isValid: true, errors: [] })
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    setFormData({
      firstName: '',
      lastName: '',
      email: rememberedEmail || '',
      password: '',
      phone: '',
      company: '',
      timezone: '',
    })
  }

  const showForgotPassword = () => {
    setIsForgotPassword(true)
    setIsLogin(true) // Reset to login state
    setError('')
    setSuccess('')
    setPasswordValidation({ isValid: true, errors: [] })
  }

  const getTitle = () => {
    if (isForgotPassword) return 'Reset Password'
    if (isLogin) return 'Welcome Back!'
    return 'Create Account'
  }

  const getSubmitButtonText = () => {
    if (loading) return 'Please wait...'
    if (isForgotPassword) return 'Send Reset Link'
    if (isLogin) return 'Login'
    return 'Register'
  }

  const getSecondaryButtonText = () => {
    if (isForgotPassword) return 'Back to Login'
    if (isLogin) return 'Register'
    return 'Back to Login'
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex mr-4 px-4 py-2 text-uppercase text-gray-600 hover:text-gray-800 transition-colors font-medium tracking-wide"
          style={{ height: '40px' }}
        >
          LOGIN
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-md max-h-[90vh] overflow-y-auto">
        <Card className="w-full">
          {/* Header with logo */}
          <div className="bg-gray-100 p-12 text-center">
            <img
              src={saccologo}
              alt="Sacco Logo"
              className="mx-auto h-16 mb-2"
            />
            <h2 className="text-md font-medium text-gray-700 uppercase">
              Architects and Designers Only
            </h2>
          </div>

          <div className="flex justify-center text-xl pt-3">
            <h2>
              <p>{getTitle()}</p>
            </h2>
          </div>

          {/* Login/Register/Forgot Password form */}
          <CardContent className="bg-white pt-3 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Registration fields */}
              {isRegistering && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={isRegistering}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={isRegistering}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required={isRegistering}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      required={isRegistering}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={formData.timezone}
                      onValueChange={handleTimezoneChange}
                      required={isRegistering}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your timezone" />
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
                </>
              )}

              {/* Email field - always shown */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password field - only for login and register */}
              {showPasswordField && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={
                      isRegistering &&
                      formData.password &&
                      !passwordValidation.isValid
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {/* Password requirements for registration */}
                  {isRegistering && (
                    <div className="text-xs space-y-1">
                      <p className="text-gray-600">Password must contain:</p>
                      <ul className="space-y-1">
                        <li
                          className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}
                        >
                          <span className="mr-2">
                            {formData.password.length >= 8 ? '✓' : '○'}
                          </span>
                          At least 8 characters
                        </li>
                        <li
                          className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
                        >
                          <span className="mr-2">
                            {/[A-Z]/.test(formData.password) ? '✓' : '○'}
                          </span>
                          One uppercase letter
                        </li>
                        <li
                          className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
                        >
                          <span className="mr-2">
                            {/[a-z]/.test(formData.password) ? '✓' : '○'}
                          </span>
                          One lowercase letter
                        </li>
                        <li
                          className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
                        >
                          <span className="mr-2">
                            {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
                              ? '✓'
                              : '○'}
                          </span>
                          One special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Remember me checkbox - only for login */}
              {showRememberMe && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={handleRememberMeChange}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember Me
                  </Label>
                </div>
              )}

              {/* Forgot password link - only for login */}
              {showRememberMe && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                    onClick={showForgotPassword}
                  >
                    Forgot?
                  </button>
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-600 text-sm text-center p-2 bg-green-50 rounded">
                  {success}
                </div>
              )}

              <div className="flex justify-between pt-4 space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/2"
                  onClick={switchMode}
                  disabled={loading}
                >
                  {getSecondaryButtonText()}
                </Button>
                <Button type="submit" className="w-1/2" disabled={loading}>
                  {getSubmitButtonText()}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
