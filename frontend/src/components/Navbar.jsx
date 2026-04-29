import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-nykaa-primary text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Users size={28} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-nykaa-textDark">
                Student<span className="text-nykaa-primary">Hub</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'text-nykaa-primary bg-pink-50' 
                  : 'text-gray-600 hover:text-nykaa-primary hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/add"
              className="flex items-center gap-2 bg-nykaa-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-nykaa-primaryDark transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <UserPlus size={18} />
              <span>Add Student</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
