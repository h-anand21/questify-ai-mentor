
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserOccupation = 'Student' | 'Professor/Teacher' | 'Other';
type UserEducationLevel = 'Class I-V' | 'Class VI-VIII' | 'Class IX-XII' | 'College' | 'Other';
type CollegeDegree = 'BSC' | 'BCA' | 'B.Tech' | 'CA' | 'BBA' | 'Accountancy' | string;

type User = {
  email: string;
  fullName?: string;
  phone?: string;
  occupation?: UserOccupation;
  educationLevel?: UserEducationLevel;
  collegeDegree?: CollegeDegree;
  verified?: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, fullUserData?: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  updateUserProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, fullUserData?: Partial<User>) => {
    const newUser = { 
      email, 
      ...fullUserData,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
