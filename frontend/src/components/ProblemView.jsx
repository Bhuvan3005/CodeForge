import React, { useState } from 'react';
import { Target, ChevronRight, BookOpen, Code2, BarChart3, Zap, Info } from 'lucide-react';

const ProblemView = () => {
  const [activeTab, setActiveTab] = useState('problem');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      {/* Left Column: Problem Description */}
      <div className="space-y-6">
        <div className="glass-card p-8">
          <div className="flex items-center gap-2 text-indigo-400 mb-4">
            <Target size={20} />
            <span className="text-sm font-mono tracking-widest uppercase">Target Objective</span>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Optimized Subarray Sum</h2>
          <div className="flex gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">Medium</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/5 text-xs">Sliding Window</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/5 text-xs">Arrays</span>
          </div>

          <div className="space-y-4 text-slate-300">
            <p>Given an array of integers `nums` and an integer `k`, find the maximum sum of any contiguous subarray of size `k`.</p>
            
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 font-mono text-sm">
              <span className="text-slate-500 block mb-2">// EXAMPLE 01</span>
              <div><span className="text-indigo-400">Input:</span> nums = [2, 1, 5, 1, 3, 2], k = 3</div>
              <div><span className="text-indigo-400">Output:</span> 9</div>
              <div><span className="text-slate-500 mt-2 block italic">Explanation: Subarray [5, 1, 3] has the maximum sum of 9.</span></div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info size={18} className="text-indigo-400" />
            Constraints
          </h3>
          <ul className="space-y-2 text-sm text-slate-400 font-mono">
            <li>• 1 ≤ nums.length ≤ 10⁵</li>
            <li>• 0 ≤ nums[i] ≤ 10⁴</li>
            <li>• 1 ≤ k ≤ nums.length</li>
          </ul>
        </div>
      </div>

      {/* Right Column: Analysis & Insights */}
      <div className="space-y-6">
        <div className="glass-card p-2 flex gap-2">
          <TabButton 
            active={activeTab === 'problem'} 
            onClick={() => setActiveTab('problem')}
            icon={<Code2 size={16} />} 
            label="Solution Workspace" 
          />
          <TabButton 
            active={activeTab === 'analysis'} 
            onClick={() => setActiveTab('analysis')}
            icon={<BarChart3 size={16} />} 
            label="Deep Analysis" 
          />
          <TabButton 
            active={activeTab === 'lesson'} 
            onClick={() => setActiveTab('lesson')}
            icon={<BookOpen size={16} />} 
            label="Micro Lesson" 
          />
        </div>

        <div className="glass-card p-8 min-h-[400px]">
          {activeTab === 'problem' && (
            <div className="font-mono text-sm space-y-2">
              <span className="text-slate-500 italic block mb-4">// System ready. Waiting for implementation...</span>
              <div className="text-indigo-300">function <span className="text-purple-400">findMaxSum</span>(nums, k) {'{'}</div>
              <div className="pl-4 border-l-2 border-indigo-500/30">
                <span className="text-slate-500">// Your logic here</span>
              </div>
              <div className="text-indigo-300">{'}'}</div>
              
              <button className="mt-8 btn-primary w-full flex items-center justify-center gap-2">
                <Zap size={18} />
                Analyze Performance
              </button>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="text-indigo-400 font-mono text-xs uppercase tracking-widest mb-2">Complexity Matrix</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <div className="text-slate-500 text-xs mb-1">Time Complexity</div>
                    <div className="text-xl font-bold">O(N)</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <div className="text-slate-500 text-xs mb-1">Space Complexity</div>
                    <div className="text-xl font-bold">O(1)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
      active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default ProblemView;
