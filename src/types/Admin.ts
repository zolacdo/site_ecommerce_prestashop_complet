export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'assistant' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  lastLogin: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalSpent: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  status: 'draft' | 'published' | 'archived';
  enrollments: number;
  rating: number;
  createdAt: string;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  createdAt: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  specialties: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
  totalEarnings: number;
  joinedAt: string;
  status: 'active' | 'inactive';
}

export interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  totalOrders: number;
  newUsersThisMonth: number;
  revenueThisMonth: number;
  activeInstructors: number;
  completionRate: number;
}