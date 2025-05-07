import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Function to get random items from an array
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 15;

    // Read questions from JSON file
    const filePath = path.join(process.cwd(), 'data', 'questions.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);
    
    // Get all questions from the JSON file
    const allQuestions = data.questions || [];
    
    if (allQuestions.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    
    // Get random questions based on the limit
    const randomQuestions = getRandomItems(allQuestions, limit);
    
    // Format questions for the frontend with shuffled options
    const formattedQuestions = randomQuestions.map(q => {
      // Get the original options and correct answer
      const originalOptions = q.options;
      const correctAnswer = q.correct_answer;
      
      // Shuffle the options
      const shuffledOptions = shuffleArray(originalOptions);
      
      return {
        id: q.id,
        question: q.question_text,
        options: shuffledOptions,
        correctAnswer: correctAnswer,  // Keep track of the correct answer
        explanation: q.explanation || '',
        imageUrl: q.image_url || '',
        category: q.category_id || '',
        difficulty: q.difficulty || 'medium'
      };
    });

    return NextResponse.json(formattedQuestions);
  } catch (error) {
    console.error('Error fetching random questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions', details: error.message },
      { status: 500 }
    );
  }
}
