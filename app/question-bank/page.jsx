'use client'
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const QuestionBank = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const questions = [
    {
      id: 1,
      category: "Traffic Signs",
      question: "What does a red traffic light indicate?",
      difficulty: "Easy",
      lastAttempted: "2 days ago"
    },
    {
      id: 2,
      category: "Road Rules",
      question: "What is the speed limit in a residential area?",
      difficulty: "Medium",
      lastAttempted: "1 week ago"
    },
    {
      id: 3,
      category: "Vehicle Controls",
      question: "When should you use high beam headlights?",
      difficulty: "Medium",
      lastAttempted: "3 days ago"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Question Bank</h1>
        <p className="text-gray-600 dark:text-gray-400">Browse through our comprehensive collection of RTO exam questions.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
                    {question.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                    {question.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {question.question}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last attempted: {question.lastAttempted}
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                Practice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
