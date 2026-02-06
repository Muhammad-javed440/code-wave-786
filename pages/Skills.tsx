
import React, { useState, useEffect } from 'react';
import { Code2, Palette, Database, Globe, Cpu, Zap, Loader2, Award, TrendingUp } from 'lucide-react';
import { Skill } from '../types';
import { supabase } from '../lib/supabase';

// Icon mapping for skill categories
const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend': <Globe className="w-6 h-6" />,
  'Backend': <Database className="w-6 h-6" />,
  'AI/ML': <Cpu className="w-6 h-6" />,
  'Design': <Palette className="w-6 h-6" />,
  'DevOps': <Zap className="w-6 h-6" />,
  'Other': <Code2 className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  'Frontend': 'from-blue-500 to-cyan-500',
  'Backend': 'from-green-500 to-emerald-500',
  'AI/ML': 'from-purple-500 to-pink-500',
  'Design': 'from-orange-500 to-red-500',
  'DevOps': 'from-yellow-500 to-orange-500',
  'Other': 'from-gray-500 to-slate-500',
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('proficiency', { ascending: false });

        if (error) throw error;
        setSkills(data || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(skills.map(s => s.category)));

  // Filter skills by category
  const filteredSkills = selectedCategory
    ? skills.filter(s => s.category === selectedCategory)
    : skills;

  // Group skills by category for display
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="py-8 sm:py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-16 space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-600/10 border border-orange-500/20 rounded-full text-orange-600 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Our Expertise
        </div>
        <h1 className="text-3xl 2xs:text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">
          SKILLS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">TECHNOLOGIES</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          The tools and technologies we master to build innovative solutions for your business needs.
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all min-h-[44px] ${
              selectedCategory === null
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            All Skills
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 min-h-[44px] ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {categoryIcons[cat] || <Code2 className="w-4 h-4" />}
              <span className="hidden 2xs:inline">{cat}</span>
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Skills...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-800">
          <Code2 className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest">Skills coming soon...</p>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${categoryColors[category] || categoryColors['Other']} text-white shadow-lg`}>
                  {categoryIcons[category] || <Code2 className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter">{category}</h2>
                  <p className="text-gray-500 text-sm font-medium">{categorySkills.length} skills</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {categorySkills.map(skill => (
                  <div
                    key={skill.id}
                    className="group bg-white dark:bg-black border-2 border-gray-100 dark:border-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-600/5"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {skill.icon ? (
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center text-2xl">
                            {skill.icon}
                          </div>
                        ) : (
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${categoryColors[skill.category] || categoryColors['Other']} flex items-center justify-center text-white`}>
                            {categoryIcons[skill.category] || <Code2 className="w-5 h-5" />}
                          </div>
                        )}
                        <div>
                          <h3 className="font-black text-black dark:text-white uppercase tracking-tight">{skill.name}</h3>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{skill.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600 font-black text-lg">
                        <TrendingUp className="w-4 h-4" />
                        {skill.proficiency}%
                      </div>
                    </div>

                    {skill.description && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {skill.description}
                      </p>
                    )}

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="h-3 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${categoryColors[skill.category] || categoryColors['Other']} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      {/* Skill Level Label */}
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {skill.proficiency >= 90 ? 'Expert' : skill.proficiency >= 70 ? 'Advanced' : skill.proficiency >= 50 ? 'Intermediate' : 'Beginner'}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {skill.proficiency}% Proficiency
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Section */}
      {skills.length > 0 && (
        <div className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center text-white">
            <div className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2">{skills.length}</div>
            <div className="text-[10px] sm:text-sm font-bold uppercase tracking-wider opacity-80">Total Skills</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center text-white">
            <div className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2">{categories.length}</div>
            <div className="text-[10px] sm:text-sm font-bold uppercase tracking-wider opacity-80">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center text-white">
            <div className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2">{skills.filter(s => s.proficiency >= 80).length}</div>
            <div className="text-[10px] sm:text-sm font-bold uppercase tracking-wider opacity-80">Expert Level</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center text-white">
            <div className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2">
              {Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length || 0)}%
            </div>
            <div className="text-[10px] sm:text-sm font-bold uppercase tracking-wider opacity-80">Avg Proficiency</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
