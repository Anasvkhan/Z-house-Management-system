'use client';

import React, { useState } from 'react';
import { AutomationRule } from '@/lib/types';
import { 
  Zap, 
  Plus, 
  Activity, 
  X
} from 'lucide-react';

interface RuleEngineBuilderProps {
  rules: AutomationRule[];
  onToggleRule: (id: string) => void;
  onAddRule: (newRule: AutomationRule) => void;
}

export const RuleEngineBuilder: React.FC<RuleEngineBuilderProps> = ({
  rules,
  onToggleRule,
  onAddRule,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Rule Form State
  const [ruleName, setRuleName] = useState('');
  const [ruleCategory, setRuleCategory] = useState<'Renewal' | 'Vacancy' | 'Payment' | 'Zoho'>('Vacancy');
  const [ruleTrigger, setRuleTrigger] = useState('Office Status Changes');
  const [ruleCondition, setRuleCondition] = useState('IF office becomes vacant');
  const [ruleAction, setRuleAction] = useState('THEN change map status to Red + Notify Sales Team');

  const [logsFeed, setLogsFeed] = useState<string[]>([
    '⚡ Rule [Automated 5% Base Late Penalty] executed on Invoice #INV-2026-0891 (Quantum Tech Labs)',
    '⚡ Rule [Mark Non-Renewed Office as Upcoming Vacancy] executed on Office PO-102 (Status: Yellow)',
    '⚡ Rule [Initiate Contract Renewal Workflow] triggered for 3 contracts in 60-90 day window',
    '⚡ Rule [Zoho Real-Time Synchronization] synced 4 client profiles from Zoho CRM'
  ]);

  const handleCreateRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim()) return;

    const newRule: AutomationRule = {
      id: `RULE-${Math.floor(100 + Math.random() * 900)}`,
      name: ruleName,
      trigger: ruleTrigger,
      condition: ruleCondition,
      action: ruleAction,
      active: true,
      timesTriggered: 0,
      category: ruleCategory
    };

    onAddRule(newRule);
    setLogsFeed((prev) => [`⚡ New Rule [${ruleName}] created and activated successfully!`, ...prev]);
    setIsModalOpen(false);

    // Reset
    setRuleName('');
  };

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Operational Automation Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Custom Rules & Workflow Automation Engine</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Define flexible IF/THEN conditions to trigger map color updates, late fee penalties, renewal workflows, and sales notification alerts automatically.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Automation Rule</span>
        </button>
      </div>

      {/* Grid of Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white border rounded-2xl p-5 space-y-4 shadow-sm transition-all ${
              rule.active ? 'border-slate-200 hover:border-amber-300' : 'border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {rule.id}
                  </span>
                  <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                    {rule.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{rule.name}</h3>
              </div>

              {/* Active Toggle Switch */}
              <button
                onClick={() => onToggleRule(rule.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                  rule.active
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
              >
                {rule.active ? 'Rule Active' : 'Disabled'}
              </button>
            </div>

            {/* IF / THEN Display */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex items-start gap-2">
                <span className="text-amber-800 font-bold shrink-0">IF:</span>
                <span className="text-slate-800">{rule.condition}</span>
              </div>
              <div className="flex items-start gap-2 border-t border-slate-200/80 pt-2">
                <span className="text-emerald-800 font-bold shrink-0">THEN:</span>
                <span className="text-slate-800">{rule.action}</span>
              </div>
            </div>

            {/* Footer execution stats */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Trigger: <strong className="text-slate-700 font-normal">{rule.trigger}</strong></span>
              <span className="font-mono text-emerald-700 font-bold">Triggered {rule.timesTriggered} times</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Automation Execution Feed Log */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Real-Time Rule Execution Activity Stream</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Live event listener</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 font-mono text-xs max-h-40 overflow-y-auto">
          {logsFeed.map((log, idx) => (
            <div key={idx} className="text-slate-800 flex items-center gap-2">
              <span className="text-emerald-600 font-bold">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form for Creating Custom Automation Rule */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>Create Custom Rule</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRuleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. IF Invoice Passes 15 Days THEN Alert Management"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Category</label>
                <select
                  value={ruleCategory}
                  onChange={(e) => setRuleCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Vacancy">Vacancy & Marketing</option>
                  <option value="Renewal">Contract Renewal</option>
                  <option value="Payment">Client Billing & Fees</option>
                  <option value="Zoho">Zoho Sync</option>
                </select>
              </div>

              <div>
                <label className="text-amber-800 font-semibold block mb-1">IF Condition Trigger</label>
                <input
                  type="text"
                  value={ruleCondition}
                  onChange={(e) => setRuleCondition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-emerald-800 font-semibold block mb-1">THEN Action Executed</label>
                <input
                  type="text"
                  value={ruleAction}
                  onChange={(e) => setRuleAction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Save & Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
