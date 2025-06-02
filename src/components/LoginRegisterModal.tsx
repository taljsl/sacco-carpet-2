// src/components/LoginRegisterModal.tsx
import { useState } from 'react'
import saccologo from '../assets/saccologo.svg'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

export default function LoginRegisterModal() {
  const [open, setOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    timezone: ''
  })

  const { login, register } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
    // Clear errors when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleTimezoneChange = (value: string) => {
    setFormData({
      ...formData,
      timezone: value
    })
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        setOpen(false) // Close modal on successful login
      } else {
        await register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.phone,
          formData.company,
          formData.timezone
        )
        setSuccess('Registration successful! Your account is pending approval. You\'ll receive an email once it\'s been reviewed.')
        // Clear form
        setFormData({ 
          firstName: '', 
          lastName: '', 
          email: '', 
          password: '', 
          phone: '', 
          company: '', 
          timezone: '' 
        })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setSuccess('')
    setFormData({ 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '', 
      phone: '', 
      company: '', 
      timezone: '' 
    })
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
          
          <div className='flex justify-center text-xl pt-3'>
            <h2>
              <p>{isLogin ? 'Welcome Back!' : 'Create Account'}</p>
            </h2>
          </div>

          {/* Login/Register form */}
          <CardContent className="bg-white pt-3 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!isLogin}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={!isLogin}
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
                      required={!isLogin}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      required={!isLogin}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={formData.timezone} onValueChange={handleTimezoneChange} required={!isLogin}>
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
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

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
                  {isLogin ? 'Register' : 'Back to Login'}
                </Button>
                <Button 
                  type="submit"
                  className="w-1/2"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}