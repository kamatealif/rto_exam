'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const PracticeTests = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/questions/random?limit=15');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        console.log('Questions from API:', data);
        
        if (data && data.length > 0) {
          setQuestions(data);
          // Start the timer when questions are loaded
          setTimeLeft(30);
          setTimerActive(true);
        } else {
          setError('No questions available');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      // Time's up - move to next question without awarding points
      handleTimeUp();
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);
  
  // Handle when time is up
  const handleTimeUp = () => {
    if (showFeedback) return; // Don't do anything if already showing feedback
    
    const current = questions[currentIndex];
    
    // Save the answer as timed out
    setUserAnswers([
      ...userAnswers,
      {
        selected: 'Time expired',
        correct: current.correctAnswer,
        isCorrect: false,
        question: current.question,
        options: current.options,
        timedOut: true
      },
    ]);
    
    // Show feedback briefly
    setShowFeedback(true);
    setTimerActive(false);
    
    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentIndex === questions.length - 1) {
        setShowResults(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(30);
        setTimerActive(true);
      }
    }, 1500);
  };

  // Handle when user selects an answer
  const handleAnswer = (answer) => {
    if (!questions.length || showFeedback) return;
    
    // Stop the timer when an answer is selected
    setTimerActive(false);
    
    const current = questions[currentIndex];
    const isCorrect = answer === current.correctAnswer;
    
    // Update score if answer is correct (only if answered within time limit)
    if (isCorrect && timeLeft > 0) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Show feedback first
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    // Save the user's answer
    setUserAnswers([
      ...userAnswers,
      {
        selected: answer,
        correct: current.correctAnswer,
        isCorrect,
        question: current.question,
        options: current.options,
        timeRemaining: timeLeft
      },
    ]);
    
    // Move to next question or show results after a delay
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentIndex === questions.length - 1) {
        setShowResults(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        // Reset timer for next question
        setTimeLeft(30);
        setTimerActive(true);
      }
    }, 1500); // 1.5 second delay to show feedback
  };

  // Reset the test
  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-xl font-medium mb-2">Loading questions...</div>
          <div className="text-gray-500">Please wait while we prepare your test</div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-red-500 text-center">
              <div className="text-xl font-medium mb-2">Error</div>
              <div>{error}</div>
              <Button className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // No questions available
  if (!questions.length) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-xl font-medium mb-2">No Questions Available</div>
              <div className="text-gray-500">Please try again later</div>
              <Button className="mt-4" onClick={() => window.location.reload()}>Refresh</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show results after completing the test
  if (showResults) {
    const attempted = userAnswers.length;
    const correct = userAnswers.filter(a => a.isCorrect).length;
    const incorrect = attempted - correct;
    const percentage = Math.round((correct / attempted) * 100);
    
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
                <div className="text-gray-500">Your Score</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-medium">{attempted}</div>
                  <div className="text-gray-500">Attempted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{correct}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{incorrect}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Incorrect</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Question Review:</h3>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {userAnswers.map((ans, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${ans.isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'} border`}> 
                    <div className="font-medium mb-2">Q{idx + 1}: {ans.question}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Your answer: <span className={`${ans.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} font-medium`}>{ans.selected}</span></div>
                      {ans.timedOut ? (
                        <span className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">Time expired</span>
                      ) : (
                        <span className="text-xs bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">{30 - ans.timeRemaining}s</span>
                      )}
                    </div>
                    {!ans.isCorrect && <div className="text-sm mt-2">Correct answer: <span className="text-emerald-600 dark:text-emerald-400 font-medium">{ans.correct}</span></div>}
                  </div>
                ))}
              </div>
            </div>
            
            <Button className="w-full" onClick={handleRestart}>Retake Test</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display current question
  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Practice Test</CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-medium">Score: {score}</span>
              <div>{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 mt-4">
            <div className="flex-1 relative">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${timeLeft <= 10 ? 'bg-rose-500' : 'bg-blue-500'} transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className={`flex items-center justify-center w-12 h-8 rounded-full font-medium text-sm ${timeLeft <= 10 ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'}`}>
              {timeLeft}s
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Question */}
            <div className="text-lg font-medium">{current.question}</div>
            

            
            {/* Options */}
            <div className="space-y-3">
              {current.options && current.options.length > 0 ? (
                current.options.map((option, idx) => {
                  // Determine button styling based on feedback state
                  let buttonClass = "w-full text-left justify-start py-3 transition-colors";
                  
                  if (showFeedback) {
                    const isSelected = option === selectedAnswer;
                    const isCorrect = option === current.correctAnswer;
                    
                    if (isSelected && isCorrect) {
                      // Selected and correct - emerald theme
                      buttonClass += " bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30";
                    } else if (isSelected && !isCorrect) {
                      // Selected but wrong - rose theme
                      buttonClass += " bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30";
                    } else if (!isSelected && isCorrect) {
                      // Not selected but is correct answer - emerald theme
                      buttonClass += " bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300";
                    } else {
                      // Other options - subtle style
                      buttonClass += " opacity-70";
                    }
                  } else {
                    // Default state
                    buttonClass += " hover:bg-accent hover:text-accent-foreground";
                  }
                  
                  return (
                    <Button
                      key={idx}
                      variant="outline"
                      className={`${buttonClass} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                      onClick={() => !showFeedback && handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      <span className="mr-2 font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                    </Button>
                  );
                })
              ) : (
                <div className="text-rose-500 p-4 border border-rose-200 rounded-lg bg-rose-50 text-center">
                  No options available for this question
                </div>
              )}
            </div>
            
            {showFeedback && (
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === current.correctAnswer 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300' 
                  : 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300'
              }`}>
                <div className="font-medium">
                  {selectedAnswer === current.correctAnswer 
                    ? '✅ Correct! ' 
                    : '❌ Incorrect. '}
                </div>
                {current.explanation && (
                  <div className="mt-1">{current.explanation}</div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeTests;
