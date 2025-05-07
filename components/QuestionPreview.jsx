"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const QuestionPreview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions/random?limit=15');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;

    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowAnswer(false);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowAnswer(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions]);

  const handleAnswerSelect = (answer) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading questions...</div>;
  }


  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div className="text-center p-4">No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = (timeLeft / 30) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
            <div className="text-lg font-semibold">{timeLeft}s</div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg font-medium">{currentQuestion.question}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                let buttonVariant = "outline";
                
                if (showAnswer) {
                  if (isCorrect) {
                    buttonVariant = "default";
                  } else if (isSelected) {
                    buttonVariant = "destructive";
                  }
                } else if (isSelected) {
                  buttonVariant = "secondary";
                }

                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className={`w-full text-left justify-start ${
                      showAnswer && isCorrect ? 'bg-green-500 hover:bg-green-600' : ''
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showAnswer && !isSelected}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {showAnswer && (
              <div className={`p-4 rounded-md ${
                isAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isAnswerCorrect ? 'Correct! ' : 'Incorrect. '}
                {currentQuestion.explanation}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button 
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                Previous
              </Button>
              <Button 
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPreview;