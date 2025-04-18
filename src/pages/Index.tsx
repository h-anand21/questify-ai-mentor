
import React, { useState } from 'react';
import Header from '@/components/Header';
import QuestionInput from '@/components/QuestionInput';
import AnswerDisplay from '@/components/AnswerDisplay';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { getGroqChatCompletion } from '@/utils/groqApi';
import { toast } from 'sonner';

const Index = () => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = async (question: string) => {
    setIsLoading(true);
    setAnswer('');
    
    try {
      const response = await getGroqChatCompletion(question);
      setAnswer(response);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error: Could not connect to the AI service. Please try again.');
      setAnswer('Error: Could not connect to the AI service. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#343541] text-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
          <div className="flex-1 flex flex-col">
            <ErrorBoundary>
              <AnswerDisplay answer={answer} isLoading={isLoading} />
            </ErrorBoundary>
          </div>
          <div className="sticky bottom-0 pb-4 bg-[#343541]">
            <ErrorBoundary>
              <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
