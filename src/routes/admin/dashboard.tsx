// src/routes/admin/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import {  CheckCircle,Clock, UserCheck, Users, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import type {  Representative, UserWithRep } from '@/types/admin'
import { AdminGuard } from '@/components/AdminGuard'
import { PendingUserCard } from '@/components/PendingUserCard'
import { adminService } from '@/services/adminService'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute('/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [pendingUsers, setPendingUsers] = useState<Array<UserWithRep>>([])
  const [allUsers, setAllUsers] = useState<Array<UserWithRep>>([])
  const [representatives, setRepresentatives] = useState<Array<Representative>>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [pendingData, usersData] = await Promise.all([
        adminService.getPendingUsers(),
        adminService.getAllUsers(),
      ])
      
      setPendingUsers(pendingData.users)
      setRepresentatives(pendingData.representatives)
      setAllUsers(usersData)
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (
    userId: string,
    action: 'approve' | 'reject',
    representativeId?: string
  ) => {
    try {
      setActionLoading(userId)
      await adminService.verifyUser(userId, action, representativeId)
      await loadData() // Reload data
    } catch (error) {
      console.error('Error processing user action:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleAssignRepresentative = async (userId: string, representativeId: string) => {
    try {
      setActionLoading(userId)
      await adminService.assignRepresentative(userId, representativeId)
      await loadData() // Reload data
    } catch (error) {
      console.error('Error assigning representative:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const seedReps = async () => {
    try {
      await adminService.seedRepresentatives()
      await loadData()
    } catch (error) {
      console.error('Error seeding representatives:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading admin dashboard...</p>
        </div>
      </AdminGuard>
    )
  }

  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and representatives</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Users</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{allUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {allUsers.filter(u => u.verificationStatus === 'approved').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Representatives</p>
                  <p className="text-2xl font-bold text-gray-900">{representatives.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Representatives Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Representatives</CardTitle>
              {representatives.length === 0 && (
                <Button onClick={seedReps} variant="outline">
                  Seed Representatives
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {representatives.length === 0 ? (
              <p className="text-gray-500">No representatives found. Click "Seed Representatives" to create initial data.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {representatives.map((rep) => (
                  <div key={rep._id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg">{rep.name}</h3>
                    <p className="text-sm text-gray-600">{rep.email}</p>
                    <p className="text-sm text-gray-600">{rep.phone}</p>
                    <Badge variant={rep.isActive ? "default" : "secondary"} className="mt-2">
                      {rep.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Users Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending User Approvals ({pendingUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingUsers.length === 0 ? (
              <p className="text-gray-500">No pending users.</p>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <PendingUserCard
                    key={user._id}
                    user={user}
                    representatives={representatives}
                    onAction={handleUserAction}
                    isLoading={actionLoading === user._id}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Users Section */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({allUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allUsers.map((user) => (
                <div key={user._id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-lg">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.company}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center">
                      {getStatusBadge(user.verificationStatus)}
                      {user.assignedRepresentative && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Representative:</p>
                          <p className="text-sm font-medium">{user.assignedRepresentative.name}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {user.verificationStatus === 'approved' && (
                        <div className="space-y-2">
                          <Select
                            value={user.assignedRepresentative?._id || ''}
                            onValueChange={(value) => handleAssignRepresentative(user._id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Change rep" />
                            </SelectTrigger>
                            <SelectContent>
                              {representatives.map((rep) => (
                                <SelectItem key={rep._id} value={rep._id}>
                                  {rep.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  )
}