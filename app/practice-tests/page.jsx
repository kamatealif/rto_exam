'use client'
import { Clock, Users, TrendingUp, Play } from 'lucide-react';

const PracticeTests = () => {
  const tests = [
    {
      id: 1,
      title: "Traffic Rules & Regulations",
      questions: 25,
      timeLimit: "30 minutes",
      attempts: 1243,
      avgScore: "76%"
    },
    {
      id: 2,
      title: "Road Signs & Signals",
      questions: 20,
      timeLimit: "25 minutes",
      attempts: 956,
      avgScore: "82%"
    },
    {
      id: 3,
      title: "Vehicle Safety & Controls",
      questions: 30,
      timeLimit: "35 minutes",
      attempts: 789,
      avgScore: "71%"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Practice Tests</h1>
        <p className="text-gray-600 dark:text-gray-400">Take timed tests to prepare for your RTO exam.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {test.title}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{test.timeLimit}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{test.attempts.toLocaleString()} attempts</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>Average score: {test.avgScore}</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors group-hover:scale-105 duration-300">
                <Play className="w-5 h-5 mr-2" />
                Start Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeTests;
