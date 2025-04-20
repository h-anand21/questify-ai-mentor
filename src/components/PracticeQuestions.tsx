
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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
  },
  {
    id: 5,
    text: "Count the number of sides in a pentagon.",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    level: 'Class-3',
    subject: 'Mathematics'
  },
  {
    id: 6,
    text: "What is 5 + 3?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    level: 'Class-1',
    subject: 'Mathematics'
  },
  {
    id: 7,
    text: "Which number comes after 10?",
    options: ["9", "11", "12", "8"],
    correctAnswer: 1,
    level: 'Class-2',
    subject: 'Mathematics'
  },
  {
    id: 8,
    text: "What is 15 divided by 3?",
    options: ["3", "5", "6", "4"],
    correctAnswer: 1,
    level: 'Class-4',
    subject: 'Mathematics'
  },
  {
    id: 9,
    text: "What is the area of a square with side length 5 units?",
    options: ["10 square units", "15 square units", "20 square units", "25 square units"],
    correctAnswer: 3,
    level: 'Class-5',
    subject: 'Mathematics'
  },
  {
    id: 10,
    text: "In calculus, what is the integral of sin(x)?",
    options: ["cos(x)", "-cos(x)", "tan(x)", "sec(x)"],
    correctAnswer: 1,
    level: 'Bachelor',
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
    if (filteredQuestions.length === 0) {
      return; // No questions available for this level
    }
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
    <Card className="shadow-lg border-0 bg-white rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-black">Daily Practice Questions</h2>
        </div>
        
        <div className="mt-4">
          <p className="text-black mb-3 font-medium">Select your class level:</p>
          <div className="flex flex-wrap gap-2">
            {classLevels.map((level) => (
              <Button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setCurrentQuestion(null);
                  setShowResult(false);
                }}
                variant={selectedLevel === level ? 'default' : 'outline'}
                className={`text-sm rounded-full px-4 ${
                  selectedLevel === level 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'text-black hover:bg-blue-50'
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {!currentQuestion ? (
          <div className="text-center py-10">
            {filteredQuestions.length > 0 ? (
              <>
                <p className="text-black mb-6">Ready to practice {selectedLevel} questions?</p>
                <Button 
                  onClick={startPractice} 
                  className="w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-700 rounded-lg py-6 text-lg"
                >
                  Start Practice
                </Button>
              </>
            ) : (
              <p className="text-black">No questions available for {selectedLevel} yet. Please select another level.</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-5 bg-blue-50 rounded-xl">
              <p className="text-lg text-black font-medium">{currentQuestion.text}</p>
            </div>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  className={`w-full p-4 text-left rounded-xl transition-colors ${
                    showResult && index === currentQuestion.correctAnswer
                      ? 'bg-green-100 border border-green-300 text-green-800'
                      : showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer
                      ? 'bg-red-100 border border-red-300 text-red-800'
                      : selectedAnswer === index
                      ? 'bg-blue-100 border border-blue-300 text-black'
                      : 'bg-gray-50 hover:bg-gray-100 text-black'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                  disabled={showResult}
                >
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {!showResult && (
              <Button 
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-5 text-base"
              >
                Submit Answer
              </Button>
            )}

            {showResult && (
              <div className={`p-4 rounded-xl ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer 
                  ? 'Correct! Well done!' 
                  : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
                <Button 
                  onClick={startPractice} 
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                >
                  Next Question
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeQuestions;
