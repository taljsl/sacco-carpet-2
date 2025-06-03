// src/routes/reset-password.tsx
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import saccologo from '../assets/saccologo.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/utils/authContext'

// Define the search params type
type ResetPasswordSearch = {
  token?: string
}

export const Route = createFileRoute('/reset-password')({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => ({
    token: search.token as string,
  }),
  component: ResetPassword,
})

function ResetPassword() {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const { token } = useSearch({ from: '/reset-password' })

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  // Check if token is valid (not undefined, null, or empty string)
  const isTokenValid = typeof token === 'string' && token.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isTokenValid) {
      setError('Invalid or missing reset token.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await resetPassword(token, password)
      setSuccess('Password has been reset successfully!')

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate({ to: '/' })
      }, 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Invalid Link
              </h2>
              <p className="text-gray-600 mb-4">
                This password reset link is invalid or has expired.
              </p>
              <Button onClick={() => navigate({ to: '/' })}>
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        {/* Header with logo */}
        <div className="bg-gray-100 p-8 text-center">
          <img src={saccologo} alt="Sacco Logo" className="mx-auto h-12 mb-2" />
          <h2 className="text-lg font-medium text-gray-700">
            Reset Your Password
          </h2>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-sm text-gray-500">
                Password must be at least 6 characters long.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
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
                <br />
                <small>Redirecting to homepage...</small>
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <Button
                type="submit"
                disabled={loading || !password || !confirmPassword}
                className="w-full"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/' })}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
