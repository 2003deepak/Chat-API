import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Header = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Bot className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">ChatBot AI</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
