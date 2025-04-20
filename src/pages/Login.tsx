
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, User } from 'lucide-react';

// Sample user database for validation
const VALID_USERS = [
  { email: 'user@example.com', password: 'password123' },
  { email: 'admin@example.com', password: 'admin123' },
  { email: 'test@example.com', password: 'test123' }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    // Check if the user exists and password matches
    const user = VALID_USERS.find(user => user.email === email && user.password === password);
    
    if (user) {
      login(email);
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password. Please check your credentials and try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back!</h1>
          <p className="text-black">Sign in to access your practice questions</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <User className="text-gray-500" size={20} />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/30 text-black placeholder:text-gray-600 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/30 text-black placeholder:text-gray-600 pr-10 h-12"
                required
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-600" size={20} />
                ) : (
                  <Eye className="text-gray-600" size={20} />
                )}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-700 hover:bg-blue-800 h-12 text-lg"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-black mb-4">Don't have an account?</p>
          <Link to="/register">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
            >
              Create Account
            </Button>
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-black/70">
          <p>For testing, you can use:</p>
          <p>Email: user@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
