import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, FileImage, MessageCircle } from 'lucide-react';
import ImageInput from '@/components/ImageInput';
import QuestionInput from '@/components/QuestionInput';
import AnswerDisplay from '@/components/AnswerDisplay';
import { getGroqChatCompletion } from '@/utils/groqApi';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'images'>('chat');

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleQuestionSubmit = async (question: string) => {
    setIsLoading(true);
    setAnswer('');
    
    try {
      const response = await getGroqChatCompletion(question);
      setAnswer(response);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error: Could not connect to the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#343541] text-white">
      <div className="flex h-screen">
        <div className="w-64 bg-[#202123] p-4">
          <div className="flex items-center justify-center mb-8 mt-4">
            <h1 className="text-xl font-bold">AI Dashboard</h1>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
                activeTab === 'chat' ? 'bg-[#343541]' : 'hover:bg-[#2A2B32]'
              }`}
            >
              <MessageCircle size={18} />
              <span>Chat</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
                activeTab === 'images' ? 'bg-[#343541]' : 'hover:bg-[#2A2B32]'
              }`}
            >
              <FileImage size={18} />
              <span>Images</span>
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-3 mb-3 bg-[#3E3F4B] rounded-md">
              <p className="text-sm text-gray-300">Logged in as:</p>
              <p className="font-medium truncate">{user.email}</p>
            </div>
            
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full border-gray-700 text-white hover:bg-[#444654]"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="flex flex-col min-h-[calc(100vh-4rem)]">
              {activeTab === 'chat' ? (
                <>
                  <div className="flex-1 flex flex-col">
                    <AnswerDisplay answer={answer} isLoading={isLoading} />
                  </div>
                  <div className="sticky bottom-0 pb-4 bg-[#343541]">
                    <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />
                  </div>
                </>
              ) : (
                <ImageInput />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
