// src/components/PendingUserCard.tsx
import { useState } from 'react'
import type { Representative, UserWithRep } from '@/types/admin'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PendingUserCardProps {
  user: UserWithRep
  representatives: Array<Representative>
  onAction: (
    userId: string,
    action: 'approve' | 'reject',
    representativeId?: string,
  ) => Promise<void>
  isLoading: boolean
}

export function PendingUserCard({
  user,
  representatives,
  onAction,
  isLoading,
}: PendingUserCardProps) {
  const [selectedRepId, setSelectedRepId] = useState<string>('')

  const handleApprove = async () => {
    if (!selectedRepId) {
      alert('Please select a representative before approving')
      return
    }
    await onAction(user._id, 'approve', selectedRepId)
  }

  const handleReject = async () => {
    await onAction(user._id, 'reject')
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">{user.company}</p>
          <p className="text-sm text-gray-600">{user.phone}</p>
          <p className="text-xs text-gray-500 mt-2">
            Registered: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Representative *
            </label>
            <Select value={selectedRepId} onValueChange={setSelectedRepId}>
              <SelectTrigger>
                <SelectValue placeholder="Select representative" />
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
          <div className="flex gap-2">
            <Button
              onClick={handleApprove}
              disabled={isLoading || !selectedRepId}
              className="flex-1"
            >
              {isLoading ? 'Processing...' : 'Approve'}
            </Button>
            <Button
              onClick={handleReject}
              disabled={isLoading}
              variant="destructive"
              className="flex-1"
            >
              {isLoading ? 'Processing...' : 'Reject'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
