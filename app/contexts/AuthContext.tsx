'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DismissModal from '@/ui/Modals/DismissModal';
import { decodeJWT } from '../utils/decodeJWT';

type PayloadProps = {
  username: string;
  _id: string;
}

// --- Interfaces ---
export interface User {
  username: string;
  payload: PayloadProps;
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

interface Account {
  _id: string;
  name: string;
  [key: string]: string;
}

interface AuthContextValues {
  user: User | null;
  setUser: (user: User | null, token?: string) => void;
  clearUser: () => void;
  currentAccount: Account | null;
  setCurrentAccount: (account: Account | null) => void;
}

// --- Context Initialization ---
const AuthContext = createContext<AuthContextValues>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
  currentAccount: null,
  setCurrentAccount: () => {},
});

// --- Utility: Extract user data from JWT ---


const getUserFromToken = (): User | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  if (!token) return null;

  return decodeJWT<User>(token);
};


// --- Utility: Load currentAccount from localStorage ---
const getStoredAccount = (): Account | null => {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('currentAccount');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to parse stored account:', err);
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Lazy initialization so user and account are ready on first render
  const [_user, _setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      return getUserFromToken();
    }
    return null;
  });

  const [currentAccount, _setCurrentAccount] = useState<Account | null>(() => {
    if (typeof window !== 'undefined') {
      return getStoredAccount();
    }
    return null;
  });

  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setUser = (user: User | null, token?: string) => {
    _setUser(user);
    if (typeof window !== 'undefined') {
      if (user && token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  };

  const clearUser = () => {
    _setUser(null);
    _setCurrentAccount(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('currentAccount');
    }
  };

  const setCurrentAccount = (account: Account | null) => {
    _setCurrentAccount(account);
    if (typeof window !== 'undefined') {
      if (account) {
        localStorage.setItem('currentAccount', JSON.stringify(account));
      } else {
        localStorage.removeItem('currentAccount');
      }
    }
  };

  // Session expiration check
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload && payload.exp < currentTime) {
          setIsSessionExpired(true);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error('Token parse error:', error);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const contextValue: AuthContextValues = {
    user: _user,
    setUser,
    clearUser,
    currentAccount,
    setCurrentAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}

      {isSessionExpired && (
        <DismissModal
          title="Good Bye!"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            clearUser();
            router.push(`/sign-in?redirectUrl=${pathname}`);
          }}
          buttonTitle="Ok"
        >
          <h3>Session Expired</h3>
        </DismissModal>
      )}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
