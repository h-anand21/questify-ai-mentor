
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export const useVoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState('');

  // Initialize speech recognition
  const startRecording = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in this browser.');
      return null;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    
    newRecognition.continuous = false;
    newRecognition.interimResults = true;
    newRecognition.lang = 'en-US';

    newRecognition.onstart = () => {
      setIsRecording(true);
      setTranscript('');
      toast.info('Listening...');
    };

    newRecognition.onresult = (event) => {
      const current = event.resultIndex;
      const newTranscript = event.results[current][0].transcript;
      setTranscript(newTranscript);
    };

    newRecognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast.error(`Error: ${event.error}`);
      stopRecording();
    };

    newRecognition.onend = () => {
      setIsRecording(false);
    };

    setRecognition(newRecognition);
    newRecognition.start();

    return newRecognition;
  }, []);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  }, [recognition]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return { isRecording, transcript, startRecording, stopRecording };
};
