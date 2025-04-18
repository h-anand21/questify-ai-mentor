
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, MicrophoneIcon, ImageIcon } from './icons';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { toast } from "sonner";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isRecording, transcript, startRecording, stopRecording } = useVoiceInput();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update question with transcript when voice recognition completes
  useEffect(() => {
    if (transcript && !isRecording) {
      setQuestion(current => {
        const newQuestion = current.trim() ? `${current.trim()} ${transcript}` : transcript;
        return newQuestion;
      });
    }
  }, [transcript, isRecording]);

  // Auto-focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          // For now, just add the image name to the question
          toast.success(`Image "${file.name}" added to your question`);
          setQuestion(current => 
            current.trim() ? `${current.trim()} [Image: ${file.name}] ` : `[Image: ${file.name}] `
          );
          // Auto-focus the textarea after image upload
          if (textareaRef.current) {
            textareaRef.current.focus();
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please upload an image file');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full bg-[#343541] px-4 py-2 shadow-lg border-t border-gray-700">
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto flex items-end space-x-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleVoiceInput}
          className={`text-gray-400 hover:text-gray-200 transition-all duration-200 h-10 w-10 ${
            isRecording ? 'animate-pulse bg-red-500/10 text-red-500 ring-2 ring-red-500/50' : ''
          }`}
          disabled={isLoading}
        >
          <MicrophoneIcon className="w-5 h-5" />
        </Button>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
          disabled={isLoading}
        />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-gray-200 transition-all duration-200 hover:scale-105 h-10 w-10"
          disabled={isLoading}
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            className="min-h-[40px] max-h-[200px] p-3 pr-12 rounded-lg bg-[#40414f] border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-white placeholder-gray-400 resize-none transition-all duration-200 w-full overflow-auto"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
          />
          
          <Button
            type="submit"
            variant="default"
            size="icon"
            className={`absolute right-2 bottom-1.5 bg-teal-500 text-white hover:bg-teal-600 transition-all duration-200 h-8 w-8 ${
              question.trim() && !isLoading ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
            }`}
            disabled={isLoading || !question.trim()}
          >
            <SendIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
      
      {isRecording && (
        <div className="text-center text-xs text-teal-400 mt-1 animate-pulse">
          Listening... (click microphone icon to stop)
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
