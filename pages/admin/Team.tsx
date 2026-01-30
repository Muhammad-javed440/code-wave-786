
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit3, User, X, Loader2, Save, AlertCircle, CheckCircle, Upload, Linkedin, Twitter, Github, GripVertical } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TeamMember } from '../../types';

const AdminTeam: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [displayOrder, setDisplayOrder] = useState(0);

  const imageInputRef = useRef<HTMLInputElement>(null);

  // Fetch members on mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (err: any) {
      console.error('Error fetching team members:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setRole('');
    setDescription('');
    setEmail('');
    setLinkedin('');
    setTwitter('');
    setGithub('');
    setImageFile(null);
    setImagePreview('');
    setDisplayOrder(members.length);
    setIsEditing(null);
    setError(null);
  };

  useEffect(() => {
    if (!isAdding) {
      resetForm();
    } else if (!isEditing) {
      setDisplayOrder(members.length);
    }
  }, [isAdding, members.length]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview('');
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `team/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      console.error('Upload error:', err);
      throw err;
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!role.trim()) {
      setError('Role/Position is required');
      return false;
    }
    if (!description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!isEditing && !imageFile && !imagePreview) {
      setError('Please upload a profile picture');
      return false;
    }
    return true;
  };

  // Save member
  const handleSaveMember = async () => {
    setError(null);
    if (!validateForm()) return;

    try {
      setSaving(true);

      // Upload image if new file
      let imageUrl = imagePreview && !imagePreview.startsWith('blob:') ? imagePreview : null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const memberData = {
        name: name.trim(),
        role: role.trim(),
        description: description.trim(),
        email: email.trim() || null,
        image_url: imageUrl,
        social_links: {
          linkedin: linkedin.trim() || null,
          twitter: twitter.trim() || null,
          github: github.trim() || null,
        },
        display_order: displayOrder,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', isEditing);

        if (error) throw error;
        setSuccess('Team member updated successfully!');
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([{ ...memberData, created_at: new Date().toISOString() }]);

        if (error) throw error;
        setSuccess('Team member added successfully!');
      }

      await fetchMembers();
      setIsAdding(false);
      resetForm();

    } catch (err: any) {
      console.error('Error saving team member:', err);
      setError(err.message || 'Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  // Delete member
  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Team member removed successfully!');
      await fetchMembers();
    } catch (err: any) {
      console.error('Error deleting team member:', err);
      setError(err.message || 'Failed to delete team member');
    }
  };

  // Edit member
  const handleEditMember = (member: TeamMember) => {
    setIsEditing(member.id);
    setName(member.name);
    setRole(member.role);
    setDescription(member.description);
    setEmail(member.email || '');
    setLinkedin(member.social_links?.linkedin || '');
    setTwitter(member.social_links?.twitter || '');
    setGithub(member.social_links?.github || '');
    setImagePreview(member.image_url || '');
    setDisplayOrder(member.display_order);
    setIsAdding(true);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">TEAM MANAGER</h1>
          <p className="text-gray-500 font-medium">Manage your team members displayed on About page</p>
        </div>
        <button
          onClick={() => {
            if (isAdding) resetForm();
            setIsAdding(!isAdding);
          }}
          className={`px-6 py-3 ${isAdding ? 'bg-red-600' : 'bg-orange-600'} hover:opacity-90 text-white text-sm font-black rounded-xl flex items-center justify-center transition-all shadow-xl shadow-orange-600/20`}
        >
          {isAdding ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {isAdding ? 'CANCEL' : 'ADD MEMBER'}
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
              <Edit3 className="w-4 h-4 mr-2" /> Editing Team Member
            </div>
          )}

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Profile Picture Upload */}
              <div className="space-y-4">
                <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Profile Picture *</label>
                <div className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all relative overflow-hidden flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 group">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="p-3 bg-red-600 text-white rounded-xl shadow-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="w-10 h-10 text-gray-400 mb-2 group-hover:text-orange-500 transition-colors" />
                      <p className="text-xs font-black text-gray-400 uppercase tracking-tight">Click to upload</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase">JPG, PNG (1:1 ratio)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Full Name *</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-bold"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Role / Position *</label>
                    <input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-bold"
                      placeholder="CEO & Founder"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Job Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="Brief description about this team member's role and expertise..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-orange-600 uppercase tracking-widest ml-1">Display Order</label>
                    <input
                      type="number"
                      min="0"
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                      className="w-full bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-900 rounded-2xl p-4 text-black dark:text-white focus:border-orange-500 outline-none transition-all font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 bg-gray-50 dark:bg-gray-950 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Social Links (Optional)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm text-black dark:text-white focus:border-blue-500 outline-none transition-all"
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="relative">
                  <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500" />
                  <input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm text-black dark:text-white focus:border-sky-500 outline-none transition-all"
                    placeholder="Twitter URL"
                  />
                </div>
                <div className="relative">
                  <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm text-black dark:text-white focus:border-gray-500 outline-none transition-all"
                    placeholder="GitHub URL"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-8 border-t border-gray-100 dark:border-gray-900">
              <button
                type="button"
                onClick={handleSaveMember}
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
                    {isEditing ? 'UPDATE MEMBER' : 'ADD MEMBER'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members Grid */}
      <div className="bg-white dark:bg-black border-2 border-gray-100 dark:border-gray-950 rounded-[3rem] overflow-hidden shadow-xl p-6 md:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Team...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20">
            <User className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">No team members yet. Add your first member!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="group bg-gray-50 dark:bg-gray-950 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-4 left-4 flex items-center gap-1 text-gray-400">
                  <GripVertical className="w-4 h-4" />
                  <span className="text-[10px] font-bold">#{index + 1}</span>
                </div>

                <div className="flex flex-col items-center text-center pt-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl mb-4">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-orange-500/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-orange-600" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-black text-black dark:text-white text-lg uppercase tracking-tight">{member.name}</h3>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3">{member.role}</span>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{member.description}</p>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 mb-4">
                    {member.social_links?.linkedin && (
                      <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social_links?.twitter && (
                      <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-500/10 text-sky-500 rounded-lg hover:bg-sky-500 hover:text-white transition-all">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.social_links?.github && (
                      <a href={member.social_links.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-500/10 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-all">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800 w-full justify-center">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeam;
