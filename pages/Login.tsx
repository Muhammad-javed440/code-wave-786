
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'We could not log you in. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 bg-orange-600/5 blur-3xl rounded-full"></div>
        
        <div className="text-center space-y-2 relative">
          <h2 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">Hello Again!</h2>
          <p className="text-gray-500 font-bold">Log in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-1">
            <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-2xl py-4 pl-12 pr-4 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all font-bold"
                placeholder="Your email"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Password</label>
              <button type="button" className="text-xs font-bold text-red-600 hover:text-red-500">Forgot it?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-2xl py-4 pl-12 pr-12 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all font-bold"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center space-x-2 uppercase tracking-widest"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>LOG IN</span>}
          </button>
        </form>

        <div className="text-center text-sm pt-6">
          <span className="text-gray-500 font-medium">New here?</span>{' '}
          <Link to="/signup" className="text-orange-600 font-black hover:underline uppercase text-xs tracking-widest">Join Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
