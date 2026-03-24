import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FileText, Clock, ExternalLink, Trash2, Plus } from 'lucide-react';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resumes/default-user');
        setResumes(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  if (loading) return <div className="p-20 text-center text-zinc-500">Loading your history...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Resumes</h1>
          <p className="text-zinc-500">View and manage your previous optimizations.</p>
        </div>
        <Link 
          to="/input" 
          className="bg-primary-500 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20"
        >
          <Plus className="w-4 h-4" />
          New Optimization
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="glass-card p-20 text-center border-dashed">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
          <p className="text-zinc-500 mb-8 text-sm">You haven't optimized any resumes yet. Start by creating one!</p>
          <Link to="/input" className="text-primary-400 font-medium hover:underline">Get started now</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume._id} className="glass-card p-6 flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase border border-green-500/20">
                    ATS: {resume.atsScore}%
                  </span>
                </div>
              </div>
              
              <h3 className="font-semibold text-white mb-2 line-clamp-1">Resume Optimization</h3>
              <p className="text-xs text-zinc-400 line-clamp-3 mb-6 flex-1">
                {resume.jobDescription}
              </p>
              
              <div className="flex gap-2">
                <Link 
                  to={`/results/${resume._id}`}
                  className="flex-1 bg-white/5 py-2 rounded-lg text-xs font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/5"
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button className="p-2 bg-red-500/5 text-red-500 rounded-lg hover:bg-red-500/10 transition-all border border-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
