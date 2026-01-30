
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code2, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Work', path: '/projects' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-orange-600 rounded-lg group-hover:bg-red-600 transition-colors">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-black dark:text-white">
              CODE WAVE <span className="text-orange-600">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-orange-600 ${
                    isActive(link.path) ? 'text-orange-600' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2"></div>
            
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1 rounded-full border border-gray-200 dark:border-gray-800 hover:border-orange-500 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm font-bold text-white">
                    {user.full_name[0]}
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      <p className="text-sm font-bold truncate text-black dark:text-white">{user.full_name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.role}</p>
                    </div>
                    {user.role === UserRole.ADMIN && (
                      <Link
                        to="/admin"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-white"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Admin Page
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 bg-orange-600 hover:bg-red-600 text-white text-sm font-black rounded-xl transition-all shadow-lg shadow-orange-600/20"
              >
                JOIN US
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black dark:text-gray-400 hover:text-orange-600 dark:hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-900 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-xl text-base font-bold uppercase tracking-widest ${
                  isActive(link.path) ? 'bg-orange-50 dark:bg-gray-900 text-orange-600' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-4 bg-orange-600 text-white rounded-xl font-black"
              >
                JOIN US NOW
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-center py-4 bg-red-600/10 text-red-600 rounded-xl font-black"
              >
                LOG OUT
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
