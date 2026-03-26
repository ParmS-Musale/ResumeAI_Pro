import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, FileCode, CheckCircle2, AlertCircle, ChevronLeft, Zap, ExternalLink } from 'lucide-react';
import ResumePrint from '../components/ResumePrint';

const Results = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/resume/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleExportLatex = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/latex/${id}`);
      const blob = new Blob([response.data], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.tex');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Failed to export LaTeX');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Zap className="w-12 h-12 text-primary-500 animate-pulse" />
        <p className="text-zinc-400 animate-pulse">Generating your optimized resume...</p>
      </div>
    </div>
  );

  const { resume, versions } = data;
  const optimized = resume.optimizedContent;

  return (
    <>
      {/* Print-only: Clean single-page LaTeX-style resume */}
      <div className="hidden print:block">
        <ResumePrint resume={optimized} />
      </div>

      {/* Screen-only: Dashboard with analytics */}
      <div className="print:hidden max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link to="/input" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Editor
          </Link>
          <div className="flex gap-4">
            <button 
              onClick={handleExportLatex}
              className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all flex items-center gap-2 border border-white/10"
            >
              <FileCode className="w-4 h-4 text-blue-400" />
              Export .TEX (Overleaf)
            </button>
            <button 
              onClick={handlePrint}
              className="bg-primary-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-600 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: ATS Analytics */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">ATS Match Analysis</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-white">{resume.atsScore}%</span>
                <span className="text-green-400 text-sm font-medium mb-2 flex items-center">
                  +15% increase
                </span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-6">
                <div className="bg-primary-500 h-full" style={{ width: `${resume.atsScore}%` }}></div>
              </div>

              <h4 className="text-sm font-medium text-white mb-3">Key Improvements</h4>
              <ul className="space-y-3">
                {(resume.scoreData?.suggestions || ['Action verbs enhanced', 'Metric-driven bullets', 'Keyword density optimized']).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {(resume.scoreData?.missingKeywords?.length > 0) && (
              <div className="glass-card p-6 bg-red-500/5 border-red-500/10">
                <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resume.scoreData.missingKeywords.map(kw => (
                    <span key={kw} className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content: Comparison View */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card overflow-hidden">
              <div className="flex border-b border-white/5">
                <button className="flex-1 py-4 text-sm font-medium border-b-2 border-primary-500 bg-primary-500/5">Optimized View</button>
                <button className="flex-1 py-4 text-sm font-medium text-zinc-500 hover:text-white transition-colors">Original View</button>
              </div>
              
              <div className="p-8 max-h-[800px] overflow-y-auto">
                 <div className="space-y-8 text-zinc-300">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Summary</h2>
                      <p className="text-sm leading-relaxed">{optimized.summary}</p>
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-1 uppercase">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {optimized.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-1 uppercase">Professional Experience</h2>
                      <div className="space-y-6">
                        {optimized.experience.map((exp, i) => (
                          <div key={i} className="relative pl-4 border-l border-white/10">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-white">{exp.role}</h3>
                                <p className="text-sm text-primary-400">{exp.company}</p>
                              </div>
                              <span className="text-xs text-zinc-500">{exp.duration}</span>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-2">
                              {exp.bulletPoints.map((point, j) => (
                                <li key={j} className="text-sm leading-snug">{point}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
