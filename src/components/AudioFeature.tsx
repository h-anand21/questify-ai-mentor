
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Headphones, Play } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { toast } from 'sonner';

const AudioFeature = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioText, setAudioText] = useState('');
  const { isRecording, transcript, startRecording, stopRecording } = useVoiceInput();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Speech synthesis setup
  const speakText = (text: string) => {
    if (!text) {
      toast.error('Please enter or record some text first');
      return;
    }

    // For better browser compatibility
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Clean up any previous instance
      window.speechSynthesis.cancel();

      setIsPlaying(true);
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsPlaying(false);
        toast.error('Error playing audio. Please try again.');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error('Speech synthesis is not supported in this browser');
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      stopRecording();
      if (transcript) {
        setAudioText(transcript);
        toast.success('Recording saved!');
      }
    } else {
      startRecording();
      toast.info('Recording started. Speak now...');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Headphones className="text-teal-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Audio Features</h2>
      </div>
      
      <div className="mb-6">
        <textarea
          value={audioText}
          onChange={(e) => setAudioText(e.target.value)}
          placeholder="Type or record text to be spoken..."
          className="w-full h-32 p-3 bg-white/20 text-white placeholder:text-gray-300 rounded-md border border-blue-300/30 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleVoiceRecord}
          className={`flex items-center gap-2 ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          <span>{isRecording ? 'Stop Recording' : 'Record Voice'}</span>
        </Button>
        
        <Button
          onClick={() => isPlaying ? stopAudio() : speakText(audioText)}
          disabled={!audioText && !isPlaying}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
        >
          {isPlaying ? <MicOff size={18} /> : <Play size={18} />}
          <span>{isPlaying ? 'Stop Audio' : 'Play Text'}</span>
        </Button>
      </div>
      
      {isRecording && (
        <div className="mt-4 text-teal-300 text-sm animate-pulse">
          Listening... (click Stop Recording when finished)
        </div>
      )}
    </div>
  );
};

export default AudioFeature;
