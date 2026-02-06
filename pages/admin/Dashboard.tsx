
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye, Layout, MessageSquare, TrendingUp, Plus, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabase';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const StatCard = ({ title, value, icon: Icon, trend, color, loading }: any) => (
  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden group">
    <div className={`absolute -right-4 -top-4 w-24 h-24 ${color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${color.replace('bg-', 'bg-') + '/10'} ${color.replace('bg-', 'text-')}`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-green-500 flex items-center">
        <TrendingUp className="w-3 h-3 mr-1" /> {trend}
      </span>
    </div>
    <div className="text-xl sm:text-2xl font-black text-black dark:text-white">
      {loading ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-gray-300" /> : value}
    </div>
    <div className="text-xs sm:text-sm font-medium text-gray-500">{title}</div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ visits: 0, users: 0, projects: 0, messages: 0 });
  const [chartData, setChartData] = useState<{ name: string; visits: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartReady, setChartReady] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      // Use SECURITY DEFINER RPCs to bypass RLS
      const { data: statsData } = await supabase.rpc('get_admin_stats');
      if (statsData && !statsData.error) {
        setStats({
          visits: statsData.total_visits || 0,
          users: statsData.total_users || 0,
          projects: statsData.total_projects || 0,
          messages: statsData.total_messages || 0
        });
      }

      // Fetch chart data via RPC
      const { data: chartRows } = await supabase.rpc('get_visit_chart_data');
      if (chartRows && Array.isArray(chartRows)) {
        setChartData(
          chartRows.map((row: any) => ({
            name: dayNames[new Date(row.date + 'T00:00:00').getDay()],
            visits: row.visits
          }))
        );
      }

      setLoading(false);
    };

    fetchStats();
  }, []);

  // Delay chart rendering to ensure container has dimensions
  useEffect(() => {
    const timer = setTimeout(() => setChartReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white uppercase tracking-tighter">Admin Panel</h1>
          <p className="text-gray-500 font-medium text-sm sm:text-base">Real-time platform performance</p>
        </div>
        <Link to="/admin/projects" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-600 hover:bg-red-600 text-white text-sm font-black rounded-xl flex items-center justify-center transition-all shadow-lg shadow-orange-600/20 min-h-[44px] w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" /> NEW PROJECT
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard title="Total Visits" value={stats.visits.toLocaleString()} icon={Eye} trend="+12%" color="bg-blue-500" loading={loading} />
        <StatCard title="Registered Users" value={stats.users.toLocaleString()} icon={Users} trend="+5%" color="bg-purple-500" loading={loading} />
        <StatCard title="Live Projects" value={stats.projects.toLocaleString()} icon={Layout} trend="+2%" color="bg-orange-500" loading={loading} />
        <StatCard title="New Messages" value={stats.messages.toLocaleString()} icon={MessageSquare} trend="0%" color="bg-red-500" loading={loading} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-900 p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-xl space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black text-black dark:text-white uppercase tracking-tighter">Visitor Traffic</h3>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-gray-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">Last 7 Days</div>
          </div>
          <div ref={chartContainerRef} className="h-[200px] sm:h-[300px] w-full min-h-[200px] sm:min-h-[300px]">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '16px', color: '#fff' }}
                    itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="visits" stroke="#f97316" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-900 p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-xl space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl font-black text-black dark:text-white uppercase tracking-tighter">Shortcuts</h3>
          <div className="space-y-3 sm:space-y-4">
            <Link to="/admin/projects" className="flex items-center p-4 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl hover:border-orange-500 transition-all group">
              <div className="p-3 bg-orange-600/10 text-orange-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Layout className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-black dark:text-white uppercase">Projects</p>
                <p className="text-[10px] text-gray-500 font-bold">Manage showcase</p>
              </div>
            </Link>
            <Link to="/admin/team" className="flex items-center p-4 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl hover:border-blue-500 transition-all group">
              <div className="p-3 bg-blue-600/10 text-blue-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-black dark:text-white uppercase">Team</p>
                <p className="text-[10px] text-gray-500 font-bold">Manage team members</p>
              </div>
            </Link>
            <Link to="/admin/settings" className="flex items-center p-4 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl hover:border-purple-500 transition-all group">
              <div className="p-3 bg-purple-600/10 text-purple-500 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-black dark:text-white uppercase">Profile</p>
                <p className="text-[10px] text-gray-500 font-bold">Edit your info</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
