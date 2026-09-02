'use client';

import React from 'react';
import { LocationId } from '@/lib/types';
import { LOCATIONS } from '@/lib/data';
import { Building2, Search, Bell, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  selectedLocation: LocationId;
  onLocationChange: (loc: LocationId) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeTabTitle: string;
  totalWorkspacesCount: number;
  upcomingVacanciesCount: number;
  overdueInvoicesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLocation,
  onLocationChange,
  searchTerm,
  onSearchChange,
  activeTabTitle,
  totalWorkspacesCount,
  upcomingVacanciesCount,
  overdueInvoicesCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 px-4 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm no-x-overflow">
      {/* Title & Location Selector */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-emerald-600/20">
            Z
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 leading-tight flex items-center gap-2">
              Z HOUSE <span className="text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold">Workspace OS</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">{activeTabTitle}</p>
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value as LocationId)}
            aria-label="Select Z House Location"
            className="appearance-none bg-slate-100 hover:bg-slate-200/80 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-3.5 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer shadow-sm"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id} className="bg-white text-slate-900">
                📍 {loc.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
            ▼
          </div>
        </div>
      </div>

      {/* Global Search & Action Badges */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search office ID, client..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Quick KPI Badges */}
        <div className="hidden lg:flex items-center gap-2 border-l border-slate-200 pl-3">
          {upcomingVacanciesCount > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-lg" title="Upcoming Vacancies within 60 Days">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>{upcomingVacanciesCount} Vacancies &lt;60d</span>
            </div>
          )}

          {overdueInvoicesCount > 0 && (
            <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold px-2.5 py-1 rounded-lg" title="Overdue Invoices requiring late penalty">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>{overdueInvoicesCount} Overdue</span>
            </div>
          )}

          <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zoho Synced</span>
          </div>
        </div>
      </div>
    </header>
  );
};
