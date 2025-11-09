import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';

const Home = () => {
  const { isAuthenticated } = useAuth();

  console.log('Home page - isAuthenticated:', isAuthenticated);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Welcome to <span className="text-blue-600">UniVerse Connect</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Connect with university students globally. Find hackathons, workshops, and team up with talented peers near you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 px-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          
          {/* Debug info - remove this later */}
          <div className="text-xs sm:text-sm text-gray-500 mt-2">
            {isAuthenticated ? '(Logged in - showing Dashboard button)' : '(Not logged in - showing Get Started button)'}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl sm:text-4xl mb-4">🗺️</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Location-Based Events</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Discover hackathons, workshops, and meetups near you with intelligent distance-based filtering.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl sm:text-4xl mb-4">🤖</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">AI Team Matching</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Let AI analyze skills and recommend the perfect teammates for your next project.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl mb-4">🌍</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Global Network</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Connect with students from universities worldwide and build your professional network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
