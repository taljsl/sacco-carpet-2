// src/types/admin.ts
export interface Representative {
  _id: string;
  name: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithRep {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  timezone: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  isEmailVerified: boolean;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  assignedRepresentative?: {
    _id: string;
    name: string;
    phone: string;
    email: string;
  };
}