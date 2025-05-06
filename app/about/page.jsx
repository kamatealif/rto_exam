'use client'
import { Shield, Award, Users, BookOpen } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "50,000+", label: "Active Users" },
    { icon: <BookOpen className="w-6 h-6" />, value: "1,000+", label: "Practice Questions" },
    { icon: <Award className="w-6 h-6" />, value: "95%", label: "Pass Rate" },
    { icon: <Shield className="w-6 h-6" />, value: "24/7", label: "Support" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About RTO Prep
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          We're dedicated to helping aspiring drivers pass their RTO exam with confidence through comprehensive practice materials and modern learning tools.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl text-center group hover:shadow-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          At RTO Prep, we believe that everyone deserves access to quality learning materials for their RTO exam. Our platform is designed to make exam preparation accessible, efficient, and effective for all aspiring drivers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What We Offer
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>• Comprehensive question bank covering all exam topics</li>
              <li>• Realistic practice tests with timer</li>
              <li>• Detailed explanations for each answer</li>
              <li>• Progress tracking and performance analytics</li>
            </ul>
          </div>
          <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Why Choose Us
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>• Updated content aligned with latest RTO guidelines</li>
              <li>• User-friendly interface for seamless learning</li>
              <li>• Proven track record of student success</li>
              <li>• Dedicated support team to assist you</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
