import React, { useState } from 'react';
import Header from '@/components/Header';
import QuestionInput from '@/components/QuestionInput';
import VoiceInput from '@/components/VoiceInput';
import ImageInput from '@/components/ImageInput';
import AnswerDisplay from '@/components/AnswerDisplay';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = async (question: string) => {
    setIsLoading(true);
    setAnswer('');
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setTimeout(() => {
        setAnswer(data.response || "I couldn't generate a response. Please try a different question.");
        setIsLoading(false);
      }, 500); // Small delay for better UX
    } catch (error) {
      console.error('Error:', error);
      setAnswer('Error: Could not connect to the AI service. Please check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#343541] text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6 max-w-3xl mx-auto w-full">
            <Header />
            <ErrorBoundary>
              <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />
            </ErrorBoundary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ErrorBoundary>
                <VoiceInput />
              </ErrorBoundary>
              <ErrorBoundary>
                <ImageInput />
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <AnswerDisplay answer={answer} isLoading={isLoading} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
