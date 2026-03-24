import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0ea5e9] to-[#0284c7] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-400 ring-1 ring-inset ring-primary-500/20">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-zinc-400">
                <span>Just shipped v1.0</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Land your dream job with <span className="text-primary-500">AI-Optimized</span> Resumes.
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Automatically optimize your resume for any job description. Increase your ATS score, beat the bots, and get more interviews in minutes.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to="/input"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all flex items-center gap-2"
            >
              Start Optimizing
              <Zap className="w-4 h-4" />
            </Link>
            <a href="#features" className="text-sm font-semibold leading-6 text-white flex items-center gap-2">
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Feature Cards / Preview */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="glass shadow-2xl rounded-2xl p-6 ring-1 ring-white/10 w-full md:w-[600px]">
               <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-xs text-zinc-500">ATS Optimizer View</div>
               </div>
               <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  <div className="h-24 bg-white/5 rounded w-full flex items-center justify-center border border-dashed border-white/10">
                     <p className="text-sm text-zinc-500 italic">"Analyzing your experience..."</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="h-20 bg-primary-500/10 rounded border border-primary-500/20 p-4">
                        <p className="text-xs text-primary-400 mb-1">ATS Score</p>
                        <p className="text-2xl font-bold text-white">92%</p>
                     </div>
                     <div className="h-20 bg-green-500/10 rounded border border-green-500/20 p-4">
                        <p className="text-xs text-green-400 mb-1">Keywords</p>
                        <p className="text-2xl font-bold text-white">+14</p>
                     </div>
                  </div>
                  <div className="h-32 bg-white/5 rounded w-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
