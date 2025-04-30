import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, FolderKanban, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/projects', icon: <FolderKanban size={20} /> },
    { name: 'Profile', path: '/profile', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];
  
  // Handle logout
  const handleLogout = () => {
    logout();
  };
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-4 h-16 flex items-center border-b border-gray-200">
            <span className="text-2xl font-bold text-primary-600">ProjectHub</span>
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-200
                      ${isActive
                        ? 'text-primary-600 bg-primary-50 border-r-4 border-primary-500'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;