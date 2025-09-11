import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager';
  permissions: string[];
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  newUsersToday: number;
  ordersToday: number;
  revenueToday: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'formation' | 'module' | 'theme';
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  difficulty?: string;
  duration?: string;
  version?: string;
  compatibility?: string[];
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminOrder {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'student' | 'instructor' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalSpent: number;
}

interface AdminContextType {
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  stats: AdminStats;
  users: AdminUserData[];
  products: AdminProduct[];
  orders: AdminOrder[];
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  isAdminLoading: boolean;
  // CRUD operations
  addProduct: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<AdminProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addUser: (user: Omit<AdminUserData, 'id' | 'createdAt'>) => Promise<void>;
  updateUser: (id: string, user: Partial<AdminUserData>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateOrder: (id: string, order: Partial<AdminOrder>) => Promise<void>;
  loadData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsersToday: 0,
    ordersToday: 0,
    revenueToday: 0
  });
  const [users, setUsers] = useState<AdminUserData[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Vérifier si l'utilisateur est admin
        const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
        if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          setCurrentAdmin({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            role: adminData.role,
            permissions: adminData.permissions || [],
            createdAt: adminData.createdAt?.toDate() || new Date(),
            lastLogin: new Date(),
            isActive: adminData.isActive !== false
          });
          await loadData();
        }
      } else {
        setCurrentAdmin(null);
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsAdminLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Vérifier si l'utilisateur est admin
      const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
      if (!adminDoc.exists()) {
        await signOut(auth);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur de connexion admin:', error);
      return false;
    } finally {
      setIsAdminLoading(false);
    }
  };

  const logoutAdmin = () => {
    signOut(auth);
  };

  const loadData = async () => {
    try {
      // Charger les utilisateurs
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        lastLogin: doc.data().lastLogin?.toDate(),
      })) as AdminUserData[];
      setUsers(usersData);

      // Charger les produits
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const productsData = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as AdminProduct[];
      setProducts(productsData);

      // Charger les commandes
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const ordersData = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as AdminOrder[];
      setOrders(ordersData);

      // Calculer les statistiques
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const newUsersToday = usersData.filter(user => 
        user.createdAt >= today
      ).length;

      const ordersToday = ordersData.filter(order => 
        order.createdAt >= today
      ).length;

      const revenueToday = ordersData
        .filter(order => order.createdAt >= today && order.status === 'completed')
        .reduce((sum, order) => sum + order.total, 0);

      const totalRevenue = ordersData
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.total, 0);

      setStats({
        totalUsers: usersData.length,
        totalProducts: productsData.length,
        totalOrders: ordersData.length,
        totalRevenue,
        newUsersToday,
        ordersToday,
        revenueToday
      });

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  // CRUD Operations
  const addProduct = async (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, product: Partial<AdminProduct>) => {
    try {
      await updateDoc(doc(db, 'products', id), {
        ...product,
        updatedAt: Timestamp.now()
      });
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      throw error;
    }
  };

  const addUser = async (user: Omit<AdminUserData, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'users'), {
        ...user,
        createdAt: Timestamp.now()
      });
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      throw error;
    }
  };

  const updateUser = async (id: string, user: Partial<AdminUserData>) => {
    try {
      await updateDoc(doc(db, 'users', id), user);
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  };

  const updateOrder = async (id: string, order: Partial<AdminOrder>) => {
    try {
      await updateDoc(doc(db, 'orders', id), {
        ...order,
        updatedAt: Timestamp.now()
      });
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande:', error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{
      currentAdmin,
      isAuthenticated: !!currentAdmin,
      stats,
      users,
      products,
      orders,
      loginAdmin,
      logoutAdmin,
      isAdminLoading: isAdminLoading || isInitializing,
      addProduct,
      updateProduct,
      deleteProduct,
      addUser,
      updateUser,
      deleteUser,
      updateOrder,
      loadData
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