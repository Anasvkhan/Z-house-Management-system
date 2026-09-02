'use client';

import React, { useState } from 'react';
import { ZohoSyncItem } from '@/lib/types';
import { 
  CloudSync, 
  RefreshCw, 
  CheckCircle2, 
  ArrowLeftRight, 
  Clock, 
  Database, 
  ShieldCheck,
  Server
} from 'lucide-react';

interface ZohoSyncPortalProps {
  logs: ZohoSyncItem[];
  onTriggerSync: () => void;
}

export const ZohoSyncPortal: React.FC<ZohoSyncPortalProps> = ({
  logs,
  onTriggerSync,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const handleSyncClick = () => {
    setIsSyncing(true);
    setSyncProgress(15);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          onTriggerSync();
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <CloudSync className="w-4 h-4 text-emerald-600" />
            <span>Zoho Ecosystem Integration</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Bi-Directional Zoho Integration & Mapping</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Synchronizes client/company data, contracts, invoices, payment status, contract dates, and workspace allocations seamlessly to prevent duplicate data entry.
          </p>
        </div>

        <button
          onClick={handleSyncClick}
          disabled={isSyncing}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? `Syncing... ${syncProgress}%` : 'Trigger Full Bi-Directional Sync Now'}</span>
        </button>
      </div>

      {/* Sync Progress Bar */}
      {isSyncing && (
        <div className="bg-white border border-emerald-200 p-4 rounded-xl space-y-2 shadow-sm">
          <div className="flex justify-between text-xs text-emerald-800 font-bold font-mono">
            <span>Executing Sync Protocol with Zoho OAuth2 Gateway...</span>
            <span>{syncProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${syncProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Sync Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-slate-500 font-medium">Zoho CRM Integration</div>
            <div className="text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Connected
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Syncs Accounts & Contacts</div>
          </div>
          <Server className="w-8 h-8 text-slate-300" />
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-slate-500 font-medium">Zoho Books & Invoices</div>
            <div className="text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Connected
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Syncs Payments & Penalties</div>
          </div>
          <Database className="w-8 h-8 text-slate-300" />
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-slate-500 font-medium">Webhook Gateway</div>
            <div className="text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Listening
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Real-time status events</div>
          </div>
          <ArrowLeftRight className="w-8 h-8 text-slate-300" />
        </div>
      </div>

      {/* Sync Log Feed */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>Recent Zoho Sync Activity Stream</span>
        </h3>

        <div className="divide-y divide-slate-100 border-t border-slate-200 pt-2">
          {logs.map((item) => (
            <div key={item.id} className="py-3.5 flex items-start justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono font-bold text-[10px] bg-slate-100 text-emerald-800 px-2 py-0.5 rounded border border-slate-200">
                    {item.zohoId}
                  </span>
                  <span className="font-bold text-slate-900">{item.entityName}</span>
                </div>
                <p className="text-slate-500 text-[11px]">{item.details}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] block">
                  {item.status.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">{item.lastSynced}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
