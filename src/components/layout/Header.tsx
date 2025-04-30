import React, { useState } from 'react';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 z-10 lg:left-64">
      <div className="px-4 h-full flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          
          {/* Search bar */}
          <div className="hidden sm:flex items-center ml-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
            />
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-error-500 rounded-full"></span>
          </button>
          
          {/* User profile */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                alt="User profile"
                className="h-8 w-8 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">{user?.name || 'John Doe'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Admin'}</p>
              </div>
              <ChevronDown size={16} className="text-gray-500 hidden md:block" />
            </button>
            
            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <div className="border-t border-gray-100 my-1"></div>
                <a href="#" className="block px-4 py-2 text-sm text-error-600 hover:bg-gray-100">Sign out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;