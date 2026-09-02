'use client';

import React from 'react';
import { Workspace } from '@/lib/types';
import { 
  X, 
  User, 
  Maximize2, 
  Users, 
  Wind, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  BellRing, 
  Tag
} from 'lucide-react';

interface OfficeProfileDrawerProps {
  workspace: Workspace | null;
  onClose: () => void;
  onInitiateRenewal?: (id: string) => void;
  onToggleVacancyStatus?: (id: string) => void;
  onToggleWeeklyReminder?: (id: string) => void;
}

export const OfficeProfileDrawer: React.FC<OfficeProfileDrawerProps> = ({
  workspace,
  onClose,
  onInitiateRenewal,
  onToggleVacancyStatus,
  onToggleWeeklyReminder,
}) => {
  if (!workspace) return null;

  const getStatusBadge = () => {
    switch (workspace.status) {
      case 'occupied':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Occupied
          </span>
        );
      case 'vacant':
        return (
          <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Vacant / Available Now
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Vacant &lt; 60 Days ({workspace.daysUntilExpiry ?? 0} days remaining)
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fade-in">
      <div className="w-full max-w-lg bg-white border-l border-slate-200 text-slate-800 h-full overflow-y-auto flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/90 sticky top-0 z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                {workspace.id}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {workspace.locationName} • {workspace.floor}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{workspace.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Status & Key Stats */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium mb-1">Current Occupancy Status</div>
              {getStatusBadge()}
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Monthly Rate</div>
              <div className="text-lg font-bold text-emerald-700">${workspace.monthlyPrice.toLocaleString()}<span className="text-xs font-normal text-slate-500">/mo</span></div>
            </div>
          </div>

          {/* Current Occupant / Client Card */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Current Occupant & Contract</span>
            </h3>

            {workspace.currentClient ? (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{workspace.currentClient.company}</h4>
                    <p className="text-xs text-slate-500">Contact: {workspace.currentClient.name}</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-300 font-mono">
                    Zoho Synced
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-slate-400 block">Email</span>
                    <span className="text-slate-700 font-mono text-[11px] truncate block">{workspace.currentClient.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone</span>
                    <span className="text-slate-700 font-mono text-[11px]">{workspace.currentClient.phone}</span>
                  </div>
                </div>

                {workspace.contractStart && (
                  <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-slate-400 block flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> Start Date
                      </span>
                      <span className="text-slate-800 font-medium">{workspace.contractStart}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Expiry Date
                      </span>
                      <span className={`font-medium ${workspace.daysUntilExpiry && workspace.daysUntilExpiry <= 60 ? 'text-amber-700 font-bold' : 'text-slate-800'}`}>
                        {workspace.contractExpiry}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 text-center text-slate-500 text-xs">
                No active client assigned. Workspace is ready for immediate onboarding.
              </div>
            )}
          </div>

          {/* Physical Specifications */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Workspace Specifications</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Area</div>
                  <div className="text-sm font-bold text-slate-900">{workspace.sqft} Sq Ft</div>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Seating Capacity</div>
                  <div className="text-sm font-bold text-slate-900">{workspace.capacity} Seats</div>
                </div>
              </div>
            </div>

            {/* AC Specs */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-sky-50 text-sky-700 rounded-lg shrink-0">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Climate & AC Specs</div>
                <div className="text-xs font-medium text-slate-800 mt-0.5">{workspace.acSpecs}</div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Included Features & Facilities</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {workspace.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {fac}
                </span>
              ))}
            </div>
          </div>

          {/* Security Deposit & Zoho Sync */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block">Security Deposit Held</span>
              <span className="text-sm font-bold text-slate-900">${workspace.securityDeposit.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zoho Contract Sync Active</span>
            </div>
          </div>
        </div>

        {/* Drawer Action Buttons Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 sticky bottom-0 space-y-2">
          {workspace.status === 'occupied' && (
            <button
              onClick={() => {
                onInitiateRenewal?.(workspace.id);
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Initiate Contract Renewal Workflow</span>
            </button>
          )}

          {workspace.status === 'upcoming' && (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onToggleWeeklyReminder?.(workspace.id);
                }}
                className={`w-full py-2.5 px-4 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border ${
                  workspace.weeklyReminderActive
                    ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <BellRing className="w-4 h-4 text-amber-600" />
                <span>{workspace.weeklyReminderActive ? 'Weekly Reminders Active (Enabled)' : 'Enable Weekly Sales Reminders'}</span>
              </button>
            </div>
          )}

          <button
            onClick={() => {
              onToggleVacancyStatus?.(workspace.id);
            }}
            className="w-full py-2 px-4 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-slate-300"
          >
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <span>Toggle Occupancy Status Manually</span>
          </button>
        </div>
      </div>
    </div>
  );
};
