'use client';

import React, { useState } from 'react';
import { Workspace } from '@/lib/types';
import { 
  Megaphone, 
  Clock, 
  BellRing, 
  Calendar, 
  Send, 
  CheckCircle, 
  Sparkles,
  Users
} from 'lucide-react';

interface VacancyMarketingProps {
  workspaces: Workspace[];
  onToggleWeeklyReminder: (id: string) => void;
}

export const VacancyMarketing: React.FC<VacancyMarketingProps> = ({
  workspaces,
  onToggleWeeklyReminder,
}) => {
  const upcomingVacancies = workspaces.filter(
    (w) => w.status === 'upcoming' || (w.daysUntilExpiry !== null && w.daysUntilExpiry <= 60 && w.daysUntilExpiry > 0)
  );

  const [notifiedSalesState, setNotifiedSalesState] = useState<Record<string, boolean>>({});
  const [copiedFlyerState, setCopiedFlyerState] = useState<string | null>(null);

  const handleNotifySales = (id: string) => {
    setNotifiedSalesState((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setNotifiedSalesState((prev) => ({ ...prev, [id]: false }));
    }, 4000);
  };

  const handleGenerateFlyer = (workspace: Workspace) => {
    setCopiedFlyerState(workspace.id);
    setTimeout(() => setCopiedFlyerState(null), 3000);
  };

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Megaphone className="w-4 h-4 text-amber-600" />
            <span>Pre-Marketing & Early Sales Hub</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Upcoming Vacancy Pipeline</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Offices confirmed or projected to become vacant within 60 days. Automated weekly reminders keep sales teams active before existing clients move out.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-amber-900 text-xs font-bold shrink-0">
          <Clock className="w-4 h-4 text-amber-600 animate-spin" />
          <span>{upcomingVacancies.length} Offices Available Soon</span>
        </div>
      </div>

      {/* Vacancy Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {upcomingVacancies.map((ws) => (
          <div
            key={ws.id}
            className="bg-white border border-amber-200 rounded-2xl p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150 group"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500"></div>

            {/* Header info */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200">
                    {ws.id}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{ws.locationName} • {ws.floor}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-800 transition-colors">
                  {ws.name}
                </h3>
              </div>

              {/* Days Countdown Badge */}
              <div className="text-right bg-amber-50 border border-amber-200 p-3 rounded-xl shrink-0">
                <div className="text-2xl font-extrabold text-amber-800 font-mono leading-none">
                  {ws.daysUntilExpiry ?? 30}
                </div>
                <div className="text-[10px] text-amber-700 font-bold uppercase mt-1">Days Remaining</div>
              </div>
            </div>

            {/* Specs & Availability Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-5">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Expected Availability</span>
                <span className="text-slate-800 font-bold flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {ws.contractExpiry || 'Available soon'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Capacity & Size</span>
                <span className="text-slate-800 font-bold flex items-center gap-1.5 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  {ws.capacity} Seats ({ws.sqft} SqFt)
                </span>
              </div>
            </div>

            {/* Current Client notice */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs mb-5 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">Current Occupant (Moving Out)</span>
                <span className="text-slate-800 font-semibold">{ws.currentClient?.company || 'Outgoing Occupant'}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Target Monthly Rate</span>
                <span className="text-emerald-700 font-bold font-mono">${ws.monthlyPrice.toLocaleString()}/mo</span>
              </div>
            </div>

            {/* Weekly Reminder & Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className={`w-4 h-4 ${ws.weeklyReminderActive ? 'text-amber-600 animate-pulse' : 'text-slate-400'}`} />
                  <span className="text-xs text-slate-700 font-medium">Automated Weekly Sales Reminders</span>
                </div>
                <button
                  onClick={() => onToggleWeeklyReminder(ws.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors duration-150 border ${
                    ws.weeklyReminderActive
                      ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ws.weeklyReminderActive ? 'Active (Enabled)' : 'Disabled (Enable)'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleNotifySales(ws.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-150 border ${
                    notifiedSalesState[ws.id]
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                  }`}
                >
                  {notifiedSalesState[ws.id] ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sales Team Alerted!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-amber-600" />
                      <span>Alert Sales Team</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleGenerateFlyer(ws)}
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors duration-150 shadow-sm"
                >
                  {copiedFlyerState === ws.id ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Flyer Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Marketing Flyer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
