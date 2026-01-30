
import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Linkedin, Facebook, ArrowUp } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 pt-20 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter">CODE WAVE <span className="text-orange-600">AI</span></span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md font-medium">
              The best place for smart AI tools. We build the future 
              to help you work better and faster.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl text-gray-400 hover:text-orange-600 hover:border-orange-600 transition-all shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl text-gray-400 hover:text-orange-600 hover:border-orange-600 transition-all shadow-sm"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl text-gray-400 hover:text-orange-600 hover:border-orange-600 transition-all shadow-sm"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-black mb-6 uppercase tracking-widest text-sm">LINKS</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">Home</Link></li>
              <li><Link to="/projects" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">Our Work</Link></li>
              <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-black mb-6 uppercase tracking-widest text-sm">ADMIN</h4>
            <ul className="space-y-4">
              <li><Link to="/login" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">Log In</Link></li>
              <li><Link to="/admin" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">Admin Page</Link></li>
              <li><Link to="/admin/projects" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">Add New Work</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} Code Wave AI Technology. Premium Innovations.
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-gray-400 hover:text-orange-600 transition-colors"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Go to Top</span>
            <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
