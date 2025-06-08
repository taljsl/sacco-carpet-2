// src/services/adminService.ts
import type { Representative, UserWithRep } from '@/types/admin'
import api from '@/services/axios'

export const adminService = {
  // Representatives
  async getRepresentatives(): Promise<Array<Representative>> {
    const response = await api.get('/admin/representatives')
    return response.data.representatives
  },

  async seedRepresentatives(): Promise<Array<Representative>> {
    const response = await api.post('/admin/seed-representatives')
    return response.data.representatives
  },

  // Users
  async getAllUsers(): Promise<Array<UserWithRep>> {
    const response = await api.get('/admin/users')
    return response.data.users
  },

  async getPendingUsers(): Promise<{
    users: Array<UserWithRep>
    representatives: Array<Representative>
  }> {
    const response = await api.get('/admin/pending-users')
    return {
      users: response.data.users,
      representatives: response.data.representatives,
    }
  },

  async verifyUser(
    userId: string,
    action: 'approve' | 'reject',
    representativeId?: string,
  ): Promise<UserWithRep> {
    const response = await api.post('/admin/verify-user', {
      userId,
      action,
      representativeId,
    })
    return response.data.user
  },

  async assignRepresentative(
    userId: string,
    representativeId: string,
  ): Promise<UserWithRep> {
    const response = await api.post('/admin/assign-representative', {
      userId,
      representativeId,
    })
    return response.data.user
  },
}
