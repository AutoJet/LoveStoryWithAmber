import React, { useState, useRef } from 'react';
import { X, Lock, Unlock, Upload, Trash2, Plus, Save, Image as ImageIcon, Settings } from 'lucide-react';
import { TimelineEvent } from '../types';
import { ADMIN_PASSWORD } from '../constants';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: TimelineEvent[];
  onUpdateEvents: (events: TimelineEvent[]) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, events, onUpdateEvents }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TimelineEvent>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Try "6!!!!9"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setEditingId(null);
  };

  const startEdit = (event?: TimelineEvent) => {
    if (event) {
      setEditingId(event.id);
      setFormData({ ...event });
    } else {
      // New Event
      setEditingId('new');
      setFormData({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        title: '',
        description: '',
        imageUrl: ''
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEvent = () => {
    if (!formData.title || !formData.date) return;

    let newEvents = [...events];
    
    if (editingId === 'new') {
      newEvents.push(formData as TimelineEvent);
    } else {
      newEvents = newEvents.map(ev => ev.id === editingId ? { ...ev, ...formData } as TimelineEvent : ev);
    }

    onUpdateEvents(newEvents);
    cancelEdit();
  };

  const deleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      onUpdateEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-900/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-rose-50">
          <h2 className="text-xl font-serif font-bold text-rose-800 flex items-center gap-2">
            {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            Admin Panel
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-rose-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto py-10">
              <div className="text-center mb-4">
                <p className="text-gray-600">Please enter the secret password to unlock.</p>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button 
                type="submit"
                className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors font-semibold shadow-lg shadow-rose-200"
              >
                Unlock Memories
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              
              {/* List View */}
              {editingId === null && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500">Manage your timeline events here.</p>
                    <button 
                      onClick={() => startEdit()}
                      className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" /> Add Event
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {events.map(event => (
                      <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-rose-100">
                        <img 
                          src={event.imageUrl || 'https://via.placeholder.com/150'} 
                          alt="" 
                          className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">{event.title}</h4>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(event)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteEvent(event.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Edit Form */}
              {editingId !== null && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Title</label>
                    <input 
                      type="text" 
                      value={formData.title || ''}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
                      placeholder="Event Title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Date</label>
                      <input 
                        type="date" 
                        value={formData.date || ''}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Description</label>
                    <textarea 
                      value={formData.description || ''}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none h-24 resize-none"
                      placeholder="What happened on this day?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Image</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-rose-400 hover:bg-rose-50 transition-colors group"
                    >
                      {formData.imageUrl ? (
                        <div className="relative w-full h-40">
                           <img src={formData.imageUrl} className="w-full h-full object-cover rounded-md" alt="Preview" />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                              <p className="text-white font-medium flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Change Image</p>
                           </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-sm">Click to upload photo</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                    <button 
                      onClick={cancelEdit}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveEvent}
                      className="flex-1 px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {isAuthenticated && (
           <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
              <button onClick={handleLogout} className="text-xs text-rose-500 hover:underline">Log Out</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminModal;