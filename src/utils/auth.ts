import api from '@/services/axios'

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await api.post('/login', { email, password })
    const { token } = response.data
    localStorage.setItem('token', token)
    return token
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.')
  }
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}