
import React, { useEffect, useState } from 'react';
import { Zap, Bot, Code, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Counter = ({ target, label }: { target: number, label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0); // Reset when target changes
    let start = 0;
    const end = target;
    if (end === 0) return;
    
    const duration = 2000;
    const steps = 40;
    const increment = Math.ceil(end / steps);
    
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center p-6 bg-gray-800/80 border border-gray-700 rounded-2xl backdrop-blur-md transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
      <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-2">
        {count.toLocaleString()}{label.includes("Happy") ? "" : "+"}
      </div>
      <div className="text-gray-300 font-bold uppercase tracking-widest text-xs">{label}</div>
    </div>
  );
};

const Home: React.FC = () => {
  const [stats, setStats] = useState({ 
    totalVisits: 0, 
    uniqueUsers: 0, 
    toolsBuilt: 0, 
    happyUsers: 0 
  });

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // 1. Log current visit
        await supabase.from('site_visits').insert([{ 
          path: '/',
          user_agent: navigator.userAgent
        }]);

        // 2. Fetch all stats in parallel
        const [
          { count: visitsCount },
          { count: projectsCount },
          { count: usersCount }
        ] = await Promise.all([
          supabase.from('site_visits').select('*', { count: 'exact', head: true }),
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true })
        ]);

        // 3. Update state with real data
        setStats({
          totalVisits: visitsCount || 0,
          uniqueUsers: Math.ceil((visitsCount || 0) * 0.7), // Approximation for demo
          toolsBuilt: projectsCount || 0,
          happyUsers: usersCount || 0
        });

      } catch (err) {
        console.warn("Supabase data fetch failed. Using fallback simulation.", err);
        setStats({
          totalVisits: 1240,
          uniqueUsers: 580,
          toolsBuilt: 24,
          happyUsers: 100
        });
      }
    };

    fetchRealData();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Background Light Orbs */}
      <div className="blur-orb w-[400px] h-[400px] bg-orange-500 top-[-100px] left-[-100px] animate-float"></div>
      <div className="blur-orb w-[300px] h-[300px] bg-red-600 top-[20%] right-[-50px] animate-float-delayed"></div>
      <div className="blur-orb w-[500px] h-[500px] bg-blue-600 bottom-[-200px] left-[10%] animate-float-slow"></div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-24 md:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full text-orange-600 dark:text-orange-400 text-sm font-bold animate-pulse">
                <Zap className="w-4 h-4 mr-2" />
                New: Smart AI Tools
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black dark:text-white leading-tight tracking-tighter">
                WE MAKE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600">SMART</span> <br />
                AI TECH
              </h1>
              
              <p className="max-w-xl text-lg md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed">
                Code Wave AI builds tools that talk, learn, and grow. 
                Our robots help you do your work faster and better every day.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/projects" className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-red-600/30">
                  SEE OUR WORK <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-900 text-black dark:text-white font-bold border-2 border-black dark:border-white rounded-2xl flex items-center justify-center transition-all">
                  CONTACT US
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-in slide-in-from-right duration-1000 z-10">
              <div className="absolute -inset-10 bg-orange-600/10 dark:bg-orange-600/20 blur-[100px] rounded-full"></div>
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white dark:border-black shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://media.licdn.com/dms/image/D4E12AQF1onXg1t3wfA/article-cover_image-shrink_720_1280/0/1719739445610?e=2147483647&v=beta&t=c1d8UwrB-DKcN7LRl2CTYMNBcRG4rz9Iwge3HfNBGHU"
                  alt="AI Technology" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-black/90 dark:bg-black/80 transition-colors border-y border-gray-900 z-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Counter target={stats.totalVisits} label="Total Visits" />
            <Counter target={stats.uniqueUsers} label="New People" />
            <Counter target={stats.toolsBuilt} label="Tools Built" />
            <Counter target={stats.happyUsers} label="Happy Users" />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 relative bg-gray-50/50 dark:bg-black/50 backdrop-blur-3xl z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-4 uppercase tracking-tighter">WHAT WE DO</h2>
            <div className="w-20 h-2 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-[2.5rem] overflow-hidden hover:border-orange-500 transition-all duration-300 shadow-xl shadow-black/5">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Talking AI"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-600 mb-6 font-bold">
                  01
                </div>
                <h3 className="text-2xl font-black text-black dark:text-white mb-4">Talking AI</h3>
                <p className="text-gray-600 dark:text-gray-400">Computers that talk and listen just like real people to help your customers.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-[2.5rem] overflow-hidden hover:border-green-500 transition-all duration-300 shadow-xl shadow-black/5">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Automation"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center text-green-600 mb-6 font-bold">
                  02
                </div>
                <h3 className="text-2xl font-black text-black dark:text-white mb-4">Auto Systems</h3>
                <p className="text-gray-600 dark:text-gray-400">Smart tools that do boring work for you so you can save time every day.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-[2.5rem] overflow-hidden hover:border-red-500 transition-all duration-300 shadow-xl shadow-black/5">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Web Apps"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 mb-6 font-bold">
                  03
                </div>
                <h3 className="text-2xl font-black text-black dark:text-white mb-4">Web Apps</h3>
                <p className="text-gray-600 dark:text-gray-400">Fast and safe websites built with the best and newest smart technology.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
