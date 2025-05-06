'use client'
import { useState } from 'react';
import { Menu, X, User, BookOpen, Clock, Info } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Question Bank', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Practice Tests', icon: <Clock className="w-5 h-5" /> },
    { label: 'About', icon: <Info className="w-5 h-5" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-extrabold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 ease-out cursor-pointer">
              RTO Prep
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`/${item.label.toLowerCase().replace(' ', '-')}`}
                className="flex items-center px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-medium transition-all duration-200 ease-out group"
              >
                <span className="mr-2 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                {item.label}
              </a>
            ))}
            <button className="ml-4 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center font-medium shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 ease-out hover:scale-105 active:scale-95">
              <User className="w-5 h-5 mr-2" />
              Login
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`/${item.label.toLowerCase().replace(' ', '-')}`}
                className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors group"
              >
                <span className="mr-3 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                {item.label}
              </a>
            ))}
            <button className="w-full mt-3 px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-medium shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-95">
              <User className="w-5 h-5 mr-2" />
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
