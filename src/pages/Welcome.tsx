
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex flex-col items-center justify-center relative px-4">
      <div className="absolute inset-0 bg-blue-400/10 backdrop-blur-sm"></div>
      
      <div className="z-10 text-center">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/629690ef-8967-449a-8d4d-454d885d4330.png" 
            alt="Math assistant robot" 
            className="w-64 h-64 object-contain"
          />
        </div>
        
        <div className="text-black text-center mb-16">
          <h1 className="text-2xl font-bold mb-2">Daily Practice Questions</h1>
          <p className="text-xl">Practice questions based on your academic level</p>
        </div>
        
        <Button 
          onClick={() => navigate('/login')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-16 py-6 rounded-full text-xl font-semibold"
        >
          Let's start
        </Button>
      </div>
      
      <div className="absolute left-0 bottom-0 w-full h-1/3 bg-gradient-to-t from-blue-400/50 to-transparent z-0"></div>
    </div>
  );
};

export default Welcome;
