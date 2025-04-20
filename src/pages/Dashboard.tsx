import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, FileImage, MessageCircle, Headphones, BookOpen } from 'lucide-react';
import ImageInput from '@/components/ImageInput';
import QuestionInput from '@/components/QuestionInput';
import AnswerDisplay from '@/components/AnswerDisplay';
import AudioFeature from '@/components/AudioFeature';
import { getGroqChatCompletion } from '@/utils/groqApi';
import PracticeQuestions from '@/components/PracticeQuestions';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'images' | 'audio' | 'practice'>('practice');

  useEffect(() => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <div className="flex h-screen">
        <div className="w-64 bg-blue-800/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center mb-8 mt-4">
            <h1 className="text-2xl font-bold">Math Learning AI</h1>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
                activeTab === 'chat' ? 'bg-blue-600' : 'hover:bg-blue-700/50'
              }`}
            >
              <MessageCircle size={18} />
              <span>Chat</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
                activeTab === 'images' ? 'bg-blue-600' : 'hover:bg-blue-700/50'
              }`}
            >
              <FileImage size={18} />
              <span>Images</span>
            </button>

            <button 
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
                activeTab === 'audio' ? 'bg-blue-600' : 'hover:bg-blue-700/50'
              }`}
            >
              <Headphones size={18} />
              <span>Audio</span>
            </button>

            <button 
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
                activeTab === 'practice' ? 'bg-blue-600' : 'hover:bg-blue-700/50'
              }`}
            >
              <BookOpen size={18} />
              <span>Practice</span>
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-3 mb-3 bg-blue-700/50 backdrop-blur-sm rounded-md">
              <p className="text-sm text-gray-300">Logged in as:</p>
              <p className="font-medium truncate">{user.email}</p>
            </div>
            
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full border-gray-600 bg-blue-700/30 text-white hover:bg-blue-700/50"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8 max-w-3xl relative">
            {activeTab === 'chat' ? (
              <div className="flex flex-col min-h-[calc(100vh-4rem)]">
                <div className="flex-1 flex flex-col">
                  <AnswerDisplay answer={answer} isLoading={isLoading} />
                </div>
                <div className="sticky bottom-0 pb-4 bg-gradient-to-t from-blue-500 to-transparent pt-8">
                  <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />
                </div>
              </div>
            ) : activeTab === 'images' ? (
              <ImageInput />
            ) : activeTab === 'audio' ? (
              <AudioFeature />
            ) : (
              <PracticeQuestions />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
