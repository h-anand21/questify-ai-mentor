
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  level: string;
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
  {
    id: 3,
    text: "Solve: 2x + 3 = 11",
    options: ["x = 4", "x = 5", "x = 3", "x = 6"],
    correctAnswer: 0,
    level: 'Class-8',
    subject: 'Mathematics'
  },
  {
    id: 4,
    text: "What is the value of π (pi) to two decimal places?",
    options: ["3.14", "3.15", "3.16", "3.13"],
    correctAnswer: 0,
    level: 'Class-6',
    subject: 'Mathematics'
  }
];

const classLevels = [
  'Class-1', 'Class-2', 'Class-3', 'Class-4', 'Class-5',
  'Class-6', 'Class-7', 'Class-8', 'Class-9', 'Class-10',
  'Class-11', 'Class-12', 'Bachelor'
];

const PracticeQuestions = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('Class-10');
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
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-black">Daily Practice Questions</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {classLevels.map((level) => (
            <Button
              key={level}
              onClick={() => setSelectedLevel(level)}
              variant={selectedLevel === level ? 'default' : 'outline'}
              className="text-sm"
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      {!currentQuestion ? (
        <Button onClick={startPractice} className="w-full">Start Practice</Button>
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
