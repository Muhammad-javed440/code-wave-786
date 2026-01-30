
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Loader2, Save, Code2, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Skill } from '../../types';

const CATEGORIES = ['Frontend', 'Backend', 'AI/ML', 'Design', 'DevOps', 'Other'];

const AdminSkills: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [proficiency, setProficiency] = useState(50);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  // Fetch skills on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('proficiency', { ascending: false });

      if (error) throw error;
      setSkills(data || []);
    } catch (err: any) {
      console.error('Error fetching skills:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setSkillName('');
    setCategory('Frontend');
    setProficiency(50);
    setDescription('');
    setIcon('');
    setIsEditing(null);
    setError(null);
  };

  useEffect(() => {
    if (!isAdding) {
      resetForm();
    }
  }, [isAdding]);

  // Validate form
  const validateForm = (): boolean => {
    if (!skillName.trim()) {
      setError('Skill name is required');
      return false;
    }
    if (proficiency < 0 || proficiency > 100) {
      setError('Proficiency must be between 0 and 100');
      return false;
    }
    return true;
  };

  // Save skill
  const handleSaveSkill = async () => {
    setError(null);
    if (!validateForm()) return;

    try {
      setSaving(true);

      const skillData = {
        name: skillName.trim(),
        category,
        proficiency,
        description: description.trim() || null,
        icon: icon.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('skills')
          .update(skillData)
          .eq('id', isEditing);

        if (error) throw error;
        setSuccess('Skill updated successfully!');
      } else {
        const { error } = await supabase
          .from('skills')
          .insert([{ ...skillData, created_at: new Date().toISOString() }]);

        if (error) throw error;
        setSuccess('Skill added successfully!');
      }

      await fetchSkills();
      setIsAdding(false);
      resetForm();

    } catch (err: any) {
      console.error('Error saving skill:', err);
      setError(err.message || 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  // Delete skill
  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Skill deleted successfully!');
      await fetchSkills();
    } catch (err: any) {
      console.error('Error deleting skill:', err);
      setError(err.message || 'Failed to delete skill');
    }
  };

  // Edit skill
  const handleEditSkill = (skill: Skill) => {
    setIsEditing(skill.id);
    setSkillName(skill.name);
    setCategory(skill.category);
    setProficiency(skill.proficiency);
    setDescription(skill.description || '');
    setIcon(skill.icon || '');
    setIsAdding(true);
  };

  // Get proficiency color
  const getProficiencyColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">SKILLS MANAGER</h1>
          <p className="text-gray-500 font-medium">Showcase your technical expertise</p>
        </div>
        <button
          onClick={() => {
            if (isAdding) resetForm();
            setIsAdding(!isAdding);
          }}
          className={`px-6 py-3 ${isAdding ? 'bg-red-600' : 'bg-orange-600'} hover:opacity-90 text-white text-sm font-black rounded-xl flex items-center justify-center transition-all shadow-xl shadow-orange-600/20`}
        >
          {isAdding ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {isAdding ? 'CANCEL' : 'ADD NEW SKILL'}
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-red-600">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-2xl text-green-600">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{success}</span>
          <button onClick={() => setSuccess(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white dark:bg-black border-2 border-orange-500/20 dark:border-orange-500/10 p-6 md:p-10 rounded-[3rem] shadow-2xl animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 bg-orange-600/5 blur-[100px] rounded-full -z-10"></div>

          {isEditing && (
            <div className="mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl inline-flex items-center text-blue-600 text-sm font-bold">
              <Edit3 className="w-4 h-4 mr-2" /> Editing Skill
            </div>
          )}

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Skill Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Skill Name *</label>
                <input
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-bold"
                  placeholder="e.g. React, Python, Figma..."
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-bold"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Proficiency */}
              <div className="space-y-2">
                <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">
                  Proficiency Level: <span className="text-black dark:text-white">{proficiency}%</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={proficiency}
                    onChange={(e) => setProficiency(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>

              {/* Icon (Emoji) */}
              <div className="space-y-2">
                <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Icon (Emoji - Optional)</label>
                <div className="flex gap-4">
                  <input
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="flex-1 bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-bold text-2xl"
                    placeholder="e.g. ⚛️ 🐍 🎨"
                    maxLength={4}
                  />
                  {icon && (
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-3xl">
                      {icon}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-medium"
                placeholder="Brief description of your experience with this skill..."
              />
            </div>

            <div className="flex justify-end pt-8 border-t border-gray-100 dark:border-gray-900">
              <button
                type="button"
                onClick={handleSaveSkill}
                disabled={saving}
                className="px-12 py-5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black rounded-[2rem] flex items-center shadow-2xl shadow-red-600/20 transform hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    SAVING...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3" />
                    {isEditing ? 'UPDATE SKILL' : 'ADD SKILL'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills List */}
      <div className="bg-white dark:bg-black border-2 border-gray-100 dark:border-gray-950 rounded-[3rem] overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Skills...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">No skills yet. Add your first skill!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-900">
            {Object.entries(groupedSkills).map(([cat, catSkills]) => (
              <div key={cat} className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-500/10 rounded-xl">
                    <Code2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-black text-black dark:text-white uppercase tracking-tighter">{cat}</h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-md">
                    {catSkills.length} skills
                  </span>
                </div>

                <div className="grid gap-4">
                  {catSkills.map(skill => (
                    <div
                      key={skill.id}
                      className="group flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 flex items-center justify-center text-xl flex-shrink-0">
                        {skill.icon || <Code2 className="w-5 h-5 text-gray-400" />}
                      </div>

                      {/* Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-black dark:text-white uppercase tracking-tight">{skill.name}</span>
                        </div>
                        {skill.description && (
                          <p className="text-xs text-gray-500 truncate">{skill.description}</p>
                        )}
                      </div>

                      {/* Proficiency Bar */}
                      <div className="w-32 flex-shrink-0 hidden sm:block">
                        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProficiencyColor(skill.proficiency)} rounded-full transition-all`}
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 mt-1 block text-right">{skill.proficiency}%</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEditSkill(skill)}
                          className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {skills.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-orange-600 mb-1">{skills.length}</div>
            <div className="text-xs font-bold text-gray-500 uppercase">Total Skills</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-green-600 mb-1">{skills.filter(s => s.proficiency >= 80).length}</div>
            <div className="text-xs font-bold text-gray-500 uppercase">Expert Level</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-blue-600 mb-1">{Object.keys(groupedSkills).length}</div>
            <div className="text-xs font-bold text-gray-500 uppercase">Categories</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-purple-600 mb-1">
              {Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length)}%
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase">Avg Level</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;
