
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  // Simple redirect page
  useEffect(() => {
    // If this runs on client-side with JS enabled,
    // this will provide a smoother user experience
    if (!isAuthenticated) {
      window.location.href = '/welcome';
    } else {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  // This is for when JS is disabled or for initial render
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default Index;
