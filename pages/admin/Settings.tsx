
import React, { useState, useRef } from 'react';
import { Camera, Facebook, Linkedin, Github, Globe, Save, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

const AdminSettings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingAvatar(true);
    try {
      const ext = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      await updateProfile({ avatar_url: avatarUrl });
    } catch (err) {
      console.error('Avatar upload failed:', err);
      alert('Failed to upload avatar. Make sure the "avatars" storage bucket exists in Supabase.');
    } finally {
      setUploadingAvatar(false);
    }
  };
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    bio: user?.bio || 'Founder & Lead Developer at CodeWaveAI. I build intelligent AI-powered tools, voice automation systems, and modern web applications that help businesses scale and people work smarter. Passionate about turning complex problems into simple, elegant solutions.',
    facebook: user?.social_links?.facebook || '',
    linkedin: user?.social_links?.linkedin || '',
    github: user?.social_links?.github || ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: formData.fullName,
      bio: formData.bio,
      social_links: {
        facebook: formData.facebook,
        linkedin: formData.linkedin,
        github: formData.github
      }
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-3 sm:p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Profile Settings</h1>
        <p className="text-gray-500 text-sm sm:text-base">Update your public presence and brand information</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 sm:space-y-12">
        {/* Profile Header Card */}
        <div className="bg-gray-900 border border-gray-800 p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] flex flex-col md:flex-row items-center gap-5 sm:gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 bg-blue-600/5 blur-3xl rounded-full"></div>
          
          <div className="relative group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-black border-4 border-gray-800 shadow-2xl overflow-hidden">
              {user?.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : user?.full_name[0]}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute bottom-0 right-0 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full border-4 border-gray-900 shadow-lg group-hover:scale-110 transition-all disabled:opacity-50"
            >
              {uploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex-grow space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <input 
                className="bg-transparent text-2xl font-black text-white focus:outline-none focus:ring-b-2 focus:ring-blue-500 w-full"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <p className="text-blue-500 font-bold text-sm tracking-widest uppercase">Lead Developer & Admin</p>
            </div>
            <p className="text-gray-400 text-sm max-w-lg">
              Manage your personal bio and social links that appear on public-facing pages.
            </p>
          </div>
        </div>

        {/* Form Sections */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center"><Globe className="w-5 h-5 mr-2 text-blue-500" /> General Info</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">About Me / Bio</label>
                  <textarea 
                    rows={5}
                    className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Brief founder story..."
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center">🔗 Social Presence</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Facebook URL</label>
                  <div className="relative group">
                    <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-600" />
                    <input 
                      className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="facebook.com/..."
                      value={formData.facebook}
                      onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">LinkedIn URL</label>
                  <div className="relative group">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-700" />
                    <input 
                      className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="linkedin.com/in/..."
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">GitHub URL</label>
                  <div className="relative group">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white" />
                    <input 
                      className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="github.com/..."
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-gray-800 pt-8">
          <button 
            type="submit"
            className={`px-10 py-4 font-black rounded-2xl flex items-center transition-all duration-300 shadow-xl ${
              isSaved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
            }`}
          >
            {isSaved ? (
              <><Check className="w-5 h-5 mr-2" /> PROFILE UPDATED</>
            ) : (
              <><Save className="w-5 h-5 mr-2" /> SAVE ALL CHANGES</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
