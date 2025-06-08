// src/utils/authContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, logout as logoutUtil } from './auth'
import type { ReactNode } from 'react'
import api from '@/services/axios'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  timezone: string
  verificationStatus: 'pending' | 'approved' | 'rejected'
  isEmailVerified: boolean
  isAdmin: boolean
  createdAt: string
  assignedRepresentative? : {
    _id: string
    name: string
    phone: string
    email: string
  }
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    company: string,
    timezone: string,
  ) => Promise<void>
  logout: () => void
  loading: boolean
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  updateProfile: (profile: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    company?: string
    timezone?: string
  }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      if (token) {
        try {
          // Verify token by getting user profile
          const response = await api.get('/users/profile')
          setUser(response.data)
          setIsAuthenticated(true)
        } catch (error) {
          // Token is invalid, remove it
          logoutUtil()
          setIsAuthenticated(false)
          setUser(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password })
      const { token, user: userData } = response.data

      localStorage.setItem('token', token)
      setUser(userData)
      setIsAuthenticated(true)
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Login failed. Please check your credentials.'
      throw new Error(message)
    }
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    company: string,
    timezone: string,
  ) => {
    try {
      const response = await api.post('/users/register', {
        firstName,
        lastName,
        email,
        password,
        phone,
        company,
        timezone,
      })
      // Registration successful but requires approval - don't log in automatically
      return response.data
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      throw new Error(message)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      const response = await api.post('/users/forgot-password', { email })
      return response.data
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Failed to send password reset email. Please try again.'
      throw new Error(message)
    }
  }

  const resetPassword = async (token: string, password: string) => {
    try {
      const response = await api.post('/users/reset-password', { token, password })
      return response.data
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Failed to reset password. Please try again.'
      throw new Error(message)
    }
  }

  const logout = () => {
    logoutUtil()
    setIsAuthenticated(false)
    setUser(null)
  }

  const updateProfile = async (profile: {
    firstName?: string
    lastName?: string
    phone?: string
    timezone?: string
  }) => {
    try {
      const response = await api.put('/users/profile', profile)
      setUser(response.data.user)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Profile update failed.'
      throw new Error(message)
    }
  }

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading,
    forgotPassword,
    resetPassword,
    updateProfile,
    
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}