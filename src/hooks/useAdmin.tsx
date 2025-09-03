import { useState, useContext, createContext, ReactNode } from 'react';
import { AdminUser, AdminStats } from '../types/Admin';

interface AdminContextType {
  currentAdmin: AdminUser | null;
  stats: AdminStats;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  isAdminLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const stats: AdminStats = {
    totalUsers: 15247,
    totalProducts: 156,
    totalOrders: 3421,
    totalRevenue: 487650,
    newUsersToday: 23,
    ordersToday: 12,
    revenueToday: 2340
  };

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsAdminLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin users
      const adminUsers: AdminUser[] = [
        {
          id: 'admin-1',
          email: 'admin@prestashop-academy.fr',
          firstName: 'Alexandre',
          lastName: 'Martin',
          role: 'admin',
          permissions: ['all'],
          createdAt: new Date('2020-01-01'),
          lastLogin: new Date(),
          isActive: true
        },
        {
          id: 'admin-2',
          email: 'manager@prestashop-academy.fr',
          firstName: 'Sophie',
          lastName: 'Dubois',
          role: 'admin',
          permissions: ['users', 'products', 'orders'],
          createdAt: new Date('2021-03-15'),
          lastLogin: new Date(),
          isActive: true
        }
      ];

      const admin = adminUsers.find(a => a.email === email);
      if (admin && (password === 'admin123' || password === 'manager123')) {
        setCurrentAdmin(admin);
        return true;
      }
      return false;
    } finally {
      setIsAdminLoading(false);
    }
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
  };

  return (
    <AdminContext.Provider value={{
      currentAdmin,
      stats,
      loginAdmin,
      logoutAdmin,
      isAdminLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}