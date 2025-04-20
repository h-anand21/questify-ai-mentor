
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  level: 'Class-10' | 'Class-12' | 'Bachelor';
  subject: string;
};

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "If a² + b² = 25 and ab = 12, find the value of (a + b)²",
    options: ["25", "49", "1", "7"],
    correctAnswer: 1,
    level: 'Class-10',
    subject: 'Mathematics'
  },
  {
    id: 2,
    text: "What is the derivative of x² with respect to x?",
    options: ["x", "2x", "2", "x²"],
    correctAnswer: 1,
    level: 'Class-12',
    subject: 'Mathematics'
  },
];

const PracticeQuestions = () => {
  const [selectedLevel, setSelectedLevel] = useState<Question['level']>('Class-10');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const filteredQuestions = sampleQuestions.filter(q => q.level === selectedLevel);

  const startPractice = () => {
    const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null && currentQuestion) {
      setShowResult(true);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black mb-4">Practice Questions</h2>
        <div className="flex gap-4 mb-4">
          <Button
            onClick={() => setSelectedLevel('Class-10')}
            variant={selectedLevel === 'Class-10' ? 'default' : 'outline'}
          >
            Class 10
          </Button>
          <Button
            onClick={() => setSelectedLevel('Class-12')}
            variant={selectedLevel === 'Class-12' ? 'default' : 'outline'}
          >
            Class 12
          </Button>
          <Button
            onClick={() => setSelectedLevel('Bachelor')}
            variant={selectedLevel === 'Bachelor' ? 'default' : 'outline'}
          >
            Bachelor
          </Button>
        </div>
      </div>

      {!currentQuestion ? (
        <Button onClick={startPractice}>Start Practice</Button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg text-black font-medium">{currentQuestion.text}</p>
          </div>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  selectedAnswer === index 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'bg-gray-50 hover:bg-gray-100'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={showResult}
              >
                <span className="text-black">{option}</span>
              </button>
            ))}
          </div>

          {!showResult && (
            <Button 
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className="w-full mt-4"
            >
              Submit Answer
            </Button>
          )}

          {showResult && (
            <div className={`p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer 
                ? 'Correct!' 
                : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
              <Button onClick={startPractice} className="mt-4 w-full">
                Next Question
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeQuestions;
