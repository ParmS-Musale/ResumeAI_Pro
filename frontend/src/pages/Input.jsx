import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Send, Loader2 } from 'lucide-react';

const Input = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/optimize', {
        userId: 'default-user', // Mock user ID
        resumeText,
        jobDescription,
      });

      navigate(`/results/${response.data.resumeId}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to optimize resume. Please check your API keys and connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Optimize your Resume</h1>
        <p className="text-zinc-400">Paste your current resume and the target job description below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Input */}
          <div className="glass-card p-6 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 mb-4 text-primary-400">
               <FileText className="w-5 h-5" />
               <h2 className="font-semibold text-white">Your Resume</h2>
            </div>
            <textarea
              className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Job Description Input */}
          <div className="glass-card p-6 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 mb-4 text-primary-400">
               <Upload className="w-5 h-5" />
               <h2 className="font-semibold text-white">Job Description</h2>
            </div>
            <textarea
              className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || !resumeText || !jobDescription}
            className="group relative inline-flex items-center gap-2 px-12 py-4 bg-primary-500 rounded-full font-bold text-white hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                Analyze & Optimize
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
