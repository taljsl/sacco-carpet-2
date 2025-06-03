import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getToken } from '@/utils/auth'
import { useAuth } from '@/utils/authContext'

export const Route = createFileRoute('/shop')({
  beforeLoad: () => {
    const token = getToken()
    if (!token) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [isAuthenticated, navigate])
  
  return <div>Congratulations! If you can see this message you logged in!</div>
}
