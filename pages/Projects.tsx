
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MessageSquare, ExternalLink, Filter, Loader2 } from 'lucide-react';
import DualImageFrame from '../components/DualImageFrame';
import { Project } from '../types';
import { supabase } from '../lib/supabase';

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline break-all">
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);

        // Fetch comment counts for all projects
        if (data && data.length > 0) {
          const ids = data.map((p: Project) => p.id);
          const { data: counts } = await supabase
            .from('project_comments')
            .select('project_id')
            .in('project_id', ids);
          if (counts) {
            const map: Record<string, number> = {};
            counts.forEach((row: any) => {
              map[row.project_id] = (map[row.project_id] || 0) + 1;
            });
            setCommentCounts(map);
          }
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="py-8 sm:py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-3xl 2xs:text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">OUR PROJECTS</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl">
            See the smart tools we built to help people and businesses grow.
          </p>
        </div>
        <div className="flex items-center">
          <button className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition-all min-h-[44px]">
            <Filter className="w-4 h-4" /> <span>Sort</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 font-bold uppercase tracking-widest">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white dark:bg-black border border-gray-200 dark:border-gray-900 rounded-2xl sm:rounded-[2rem] overflow-hidden hover:border-orange-500 transition-all duration-500 flex flex-col">
              <div className="p-2 sm:p-3">
                <DualImageFrame 
                  image1={project.media?.[0] || 'https://via.placeholder.com/800x450'} 
                  image2={project.media?.[1] || 'https://via.placeholder.com/800x450'} 
                  alt={project.title} 
                />
              </div>
              
              <div className="p-4 sm:p-6 md:p-8 flex-grow space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black dark:text-white uppercase tracking-tighter line-clamp-2">{project.title}</h3>
                  <div className="flex items-center text-orange-600 font-bold bg-orange-600/10 px-2 py-1 rounded-lg text-sm">
                    <Star className="w-4 h-4 mr-1 fill-current" /> {project.rating || 0}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {renderTextWithLinks(project.description)}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-900">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1.5 text-gray-400 hover:text-red-600 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-bold">{project.likes_count || 0}</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-gray-400 hover:text-orange-500 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm font-bold">{commentCounts[project.id] || 0}</span>
                    </button>
                  </div>
                  
                  <Link to={`/projects/${project.id}`} className="p-2 bg-gray-100 dark:bg-gray-900 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
