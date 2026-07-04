"use client";

import { useState, useEffect } from "react";

export default function ContentLibrary() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    try {
      const res = await fetch("http://localhost:8000/library");
      const data = await res.json();
      setVideos(Object.values(data).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateVideo = async (id: string, updates: any) => {
    try {
      await fetch(`http://localhost:8000/library/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      fetchLibrary();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      await fetch(`http://localhost:8000/library/${id}`, {
        method: "DELETE",
      });
      fetchLibrary();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading library...</div>;

  return (
    <div className="p-8 bg-[#0B0F19] min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Content Library
        </h1>
        <div className="text-sm text-gray-400">Manage, track, and recycle assets</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col">
            <video 
              src={`/videos/${v.filename}`} 
              controls 
              className="w-full h-48 object-cover bg-black"
            />
            
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="text-xs text-blue-400 uppercase font-bold tracking-wider">{v.status}</div>
                <div className="text-xs text-gray-500">{new Date(v.created_at).toLocaleDateString()}</div>
              </div>

              <div className="text-sm">
                <span className="text-gray-400">Visual:</span> {v.visual_style} <br/>
                <span className="text-gray-400">Beats:</span> {v.audio_beats} <br/>
                <span className="text-gray-400">Atmos:</span> {v.audio_atmos} <br/>
                <span className="text-gray-400">Music:</span> {v.audio_music}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2 border-t border-white/10 pt-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Views</label>
                  <input 
                    type="number" 
                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    value={v.views || 0}
                    onChange={(e) => updateVideo(v.id, { views: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Score (0-10)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    value={v.engagement_score || 0}
                    onChange={(e) => updateVideo(v.id, { engagement_score: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="mt-2 flex gap-2">
                <select 
                  className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  value={v.status}
                  onChange={(e) => updateVideo(v.id, { status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <button 
                  onClick={() => deleteVideo(v.id)}
                  className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {videos.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500">
            No videos generated yet. Go to the Studio to create some content!
          </div>
        )}
      </div>
    </div>
  );
}
