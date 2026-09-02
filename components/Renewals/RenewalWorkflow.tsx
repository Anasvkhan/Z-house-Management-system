'use client';

import React, { useState } from 'react';
import { Workspace } from '@/lib/types';
import { 
  RefreshCw, 
  Clock, 
  Send, 
  CheckCircle2, 
  XCircle
} from 'lucide-react';

interface RenewalWorkflowProps {
  workspaces: Workspace[];
  onInitiateRenewal: (id: string) => void;
  onSimulateRenewalResponse: (id: string, response: 'renewed' | 'declined') => void;
}

export const RenewalWorkflow: React.FC<RenewalWorkflowProps> = ({
  workspaces,
  onInitiateRenewal,
  onSimulateRenewalResponse,
}) => {
  const [filterWindow, setFilterWindow] = useState<'all' | '60_90' | '30_60' | 'less_30'>('all');
  const [sentNoticeId, setSentNoticeId] = useState<string | null>(null);

  // Filter occupied workspaces with expiry dates
  const occupiedWorkspaces = workspaces.filter(
    (w) => w.status === 'occupied' || (w.daysUntilExpiry !== null && w.daysUntilExpiry <= 90)
  );

  const filteredWorkspaces = occupiedWorkspaces.filter((w) => {
    if (w.daysUntilExpiry === null) return false;
    if (filterWindow === '60_90') return w.daysUntilExpiry >= 60 && w.daysUntilExpiry <= 90;
    if (filterWindow === '30_60') return w.daysUntilExpiry >= 30 && w.daysUntilExpiry < 60;
    if (filterWindow === 'less_30') return w.daysUntilExpiry < 30;
    return true;
  });

  const handleSendNotice = (id: string) => {
    onInitiateRenewal(id);
    setSentNoticeId(id);
    setTimeout(() => setSentNoticeId(null), 3000);
  };

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <span>Automated Expiry & Renewal Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">60–90 Day Contract Expiry Window Tracker</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Contracts entering the 60-90 day window trigger automated renewal workflows. Reminders prompt clients to renew or end their lease early.
          </p>
        </div>

        {/* Filter window tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto shrink-0">
          <button
            onClick={() => setFilterWindow('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterWindow === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All (&le;90 Days)
          </button>
          <button
            onClick={() => setFilterWindow('60_90')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterWindow === '60_90' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            60-90 Days Window
          </button>
          <button
            onClick={() => setFilterWindow('30_60')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterWindow === '30_60' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            30-60 Days
          </button>
          <button
            onClick={() => setFilterWindow('less_30')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterWindow === 'less_30' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            &lt;30 Days Critical
          </button>
        </div>
      </div>

      {/* Renewal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredWorkspaces.map((ws) => {
          const isPending = ws.renewalStatus === 'pending';
          const isRenewed = ws.renewalStatus === 'renewed';
          const isDeclined = ws.renewalStatus === 'declined';
          const daysLeft = ws.daysUntilExpiry ?? 0;

          return (
            <div
              key={ws.id}
              className={`bg-white border rounded-2xl p-6 relative overflow-hidden shadow-sm transition-all ${
                daysLeft < 30
                  ? 'border-rose-200 bg-gradient-to-b from-white to-rose-50/20'
                  : daysLeft <= 60
                  ? 'border-amber-200 bg-gradient-to-b from-white to-amber-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Card top */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-blue-800 px-2.5 py-1 rounded-md border border-slate-200">
                      {ws.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{ws.locationName} • {ws.floor}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">{ws.name}</h3>
                </div>

                <div className="text-right bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className={`text-xl font-extrabold font-mono ${daysLeft <= 30 ? 'text-rose-700 animate-pulse' : daysLeft <= 60 ? 'text-amber-700' : 'text-blue-700'}`}>
                    {daysLeft} Days
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">To Expiry</div>
                </div>
              </div>

              {/* Client Info & Contract Dates */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Client / Company:</span>
                  <span className="font-bold text-slate-900 text-sm">{ws.currentClient?.company || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200/80 pt-2">
                  <span className="text-slate-500">Contract End Date:</span>
                  <span className="font-medium text-slate-800 font-mono">{ws.contractExpiry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Monthly Rate:</span>
                  <span className="font-bold text-emerald-700 font-mono">${ws.monthlyPrice.toLocaleString()}/mo</span>
                </div>
              </div>

              {/* Renewal Status Badge */}
              <div className="mb-5 flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">Renewal Status:</span>
                {isRenewed && (
                  <span className="text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Renewal Confirmed!
                  </span>
                )}
                {isDeclined && (
                  <span className="text-amber-900 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-amber-600" /> Non-Renewal (Upcoming Vacancy)
                  </span>
                )}
                {isPending && (
                  <span className="text-blue-800 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" /> Pending Client Response
                  </span>
                )}
                {!isRenewed && !isDeclined && !isPending && (
                  <span className="text-slate-500 font-semibold">Not Initiated</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleSendNotice(ws.id)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200"
                >
                  <Send className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    {sentNoticeId === ws.id ? 'Renewal Notice Sent to Client!' : 'Send Automated Renewal Reminder Email'}
                  </span>
                </button>

                {/* Interactive Client Response Simulator */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onSimulateRenewalResponse(ws.id, 'renewed')}
                    className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl text-[11px] border border-emerald-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Simulate Client Renews</span>
                  </button>

                  <button
                    onClick={() => onSimulateRenewalResponse(ws.id, 'declined')}
                    className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-xl text-[11px] border border-amber-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Simulate Non-Renewal</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
