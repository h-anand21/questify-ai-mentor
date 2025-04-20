
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!password) {
      toast.error('Please enter your password');
      return;
    }
    
    login(email);
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">LOGIN</h1>
          <p className="text-white text-xl">Sign in to your account</p>
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
                placeholder="User name/E-mail:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/30 border-gray-300 text-white placeholder:text-gray-200 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password***"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/30 border-gray-300 text-white placeholder:text-gray-200 pr-10 h-12"
                required
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-200" size={20} />
                ) : (
                  <Eye className="text-gray-200" size={20} />
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

          <div className="text-center mt-4">
            <button 
              type="button" 
              className="text-gray-200 hover:text-white text-sm"
            >
              I forgot my password click here to reset
            </button>
          </div>
        </form>

        <div className="mt-12 text-center">
          <Link to="/register">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
            >
              Register New account
            </Button>
          </Link>
        </div>

        <div className="absolute top-1/4 right-0 mx-12 hidden lg:block">
          <div className="text-white text-xl font-bold max-w-xs">
            <p>Very good works are waiting for you Login Now!!!</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8">
        <img 
          src="/lovable-uploads/629690ef-8967-449a-8d4d-454d885d4330.png" 
          alt="Robot assistant" 
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
