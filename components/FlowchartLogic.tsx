
import React from 'react';

export interface FlowchartData {
  title: string;
  purpose: string;
  steps: string[];
  explanation: string;
  scenario: string;
}

export const FlowchartItem: React.FC<FlowchartData> = ({ title, purpose, steps, explanation, scenario }) => (
  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-12 hover:border-indigo-300 transition-colors">
    <div className="bg-slate-900 p-6 md:px-10">
      <h3 className="text-2xl font-black text-white">{title}</h3>
      <p className="text-indigo-300 text-sm mt-1 font-medium">{purpose}</p>
    </div>
    
    <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Flowchart Steps</h4>
          <div className="space-y-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                  {idx + 1}
                </div>
                <div className={`flex-1 p-3 rounded-xl border text-sm font-medium ${
                  step.includes('Decision') || step.includes('Condition') 
                    ? 'bg-amber-50 border-amber-200 text-amber-900' 
                    : step.includes('Start') || step.includes('Stop') || step.includes('End')
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : step.includes('Input') || step.includes('Output')
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Flow Explanation</h4>
          <div className="prose prose-slate text-slate-600 text-sm leading-relaxed">
            {explanation.split('\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Example Scenario</h4>
          <p className="text-slate-600 text-sm italic font-medium">
            {scenario}
          </p>
        </div>
      </div>
    </div>
  </div>
);
