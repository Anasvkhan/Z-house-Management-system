'use client';

import React, { useState } from 'react';
import { Workspace, LocationId } from '@/lib/types';
import { OfficeProfileDrawer } from '../InventoryMap/OfficeProfileDrawer';
import { 
  Grid, 
  List, 
  Search
} from 'lucide-react';

interface OccupancyMatrixProps {
  workspaces: Workspace[];
  selectedLocation: LocationId | 'all';
  onLocationChange: (loc: LocationId) => void;
  onInitiateRenewal: (id: string) => void;
  onToggleVacancyStatus: (id: string) => void;
  onToggleWeeklyReminder: (id: string) => void;
}

export const OccupancyMatrix: React.FC<OccupancyMatrixProps> = ({
  workspaces,
  selectedLocation,
  onLocationChange,
  onInitiateRenewal,
  onToggleVacancyStatus,
  onToggleWeeklyReminder,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'occupied' | 'vacant' | 'upcoming'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'private_office' | 'fixed_desk' | 'coworking'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);

  const filteredWorkspaces = workspaces.filter((ws) => {
    const matchesLoc = selectedLocation === 'all' ? true : ws.location === selectedLocation;
    const matchesStatus = statusFilter === 'all' || ws.status === statusFilter;
    const matchesType = typeFilter === 'all' || ws.type === typeFilter;
    const matchesSearch = 
      ws.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ws.currentClient?.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ws.currentClient?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLoc && matchesStatus && matchesType && matchesSearch;
  });

  // Summary counts
  const totalCount = workspaces.length;
  const occupiedCount = workspaces.filter((w) => w.status === 'occupied').length;
  const vacantCount = workspaces.filter((w) => w.status === 'vacant').length;
  const upcomingCount = workspaces.filter((w) => w.status === 'upcoming').length;
  const occupancyPercentage = Math.round((occupiedCount / totalCount) * 100);

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Top KPI Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-slate-500 font-medium">Total Workspaces</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount} Spaces</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 3 Z House Locations</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700 font-bold text-lg border border-emerald-200">
            {occupancyPercentage}%
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-slate-500 font-medium">🟢 Occupied Offices</div>
            <div className="text-2xl font-bold text-emerald-700 mt-1">{occupiedCount} Spaces</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Active Contracts & Clients</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-slate-500 font-medium">🔴 Vacant / Available</div>
            <div className="text-2xl font-bold text-rose-700 mt-1">{vacantCount} Spaces</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ready for immediate sale</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-slate-500 font-medium">🟡 Vacant &lt;60 Days</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">{upcomingCount} Spaces</div>
            <div className="text-[11px] text-amber-600 mt-0.5 font-semibold">Pre-Marketing Active</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => setStatusFilter('occupied')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 ${
                statusFilter === 'occupied' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold' : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Occupied
            </button>
            <button
              onClick={() => setStatusFilter('vacant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 ${
                statusFilter === 'vacant' ? 'bg-rose-100 text-rose-900 border border-rose-300 font-bold' : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-600"></span> Vacant
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 ${
                statusFilter === 'upcoming' ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold' : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Vacant &lt;60d
            </button>
          </div>

          {/* Space type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            aria-label="Filter by Space Type"
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Space Types</option>
            <option value="private_office">Private Offices</option>
            <option value="fixed_desk">Fixed Desks</option>
            <option value="coworking">Coworking Lounges</option>
          </select>
        </div>

        {/* Search & Layout toggle */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search office or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors duration-150 ${
                viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid Cards View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors duration-150 ${
                viewMode === 'table' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View rendering */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkspaces.map((ws) => {
            const isOccupied = ws.status === 'occupied';
            const isVacant = ws.status === 'vacant';
            const isUpcoming = ws.status === 'upcoming';

            return (
              <div
                key={ws.id}
                onClick={() => setActiveWorkspace(ws)}
                className={`bg-white border rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-colors duration-150 flex flex-col justify-between group ${
                  isOccupied
                    ? 'border-slate-200 hover:border-emerald-500'
                    : isVacant
                    ? 'border-rose-200 bg-gradient-to-b from-white to-rose-50/20 hover:border-rose-400'
                    : 'border-amber-200 bg-gradient-to-b from-white to-amber-50/20 hover:border-amber-400'
                }`}
              >
                <div>
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                        {ws.id}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {ws.floor}
                      </span>
                    </div>

                    {isOccupied && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Occupied
                      </span>
                    )}
                    {isVacant && (
                      <span className="text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        Vacant
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                        {ws.daysUntilExpiry}d Remaining
                      </span>
                    )}
                  </div>

                  {/* Office Title */}
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors mb-1">
                    {ws.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">{ws.locationName}</p>

                  {/* Client Info */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs mb-4">
                    {ws.currentClient ? (
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Occupant</div>
                        <div className="font-bold text-slate-900 text-sm">{ws.currentClient.company}</div>
                        <div className="text-slate-500 text-[11px]">Contract Expiry: <span className="text-slate-800 font-medium">{ws.contractExpiry}</span></div>
                      </div>
                    ) : (
                      <div className="text-emerald-700 font-semibold flex items-center justify-between">
                        <span>Ready for Immediate Lease</span>
                        <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specs Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{ws.sqft} SqFt • {ws.capacity} Seats</span>
                  <span className="font-bold text-emerald-700">${ws.monthlyPrice}/mo</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200 text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Office ID</th>
                  <th className="p-4">Workspace Name</th>
                  <th className="p-4">Location / Floor</th>
                  <th className="p-4">Occupant / Client</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Monthly Rate</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkspaces.map((ws) => (
                  <tr
                    key={ws.id}
                    onClick={() => setActiveWorkspace(ws)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-emerald-700">{ws.id}</td>
                    <td className="p-4 font-bold text-slate-900">{ws.name}</td>
                    <td className="p-4 text-slate-500">{ws.locationName} ({ws.floor})</td>
                    <td className="p-4">
                      {ws.currentClient ? (
                        <div>
                          <div className="font-semibold text-slate-900">{ws.currentClient.company}</div>
                          <div className="text-[10px] text-slate-400">{ws.currentClient.name}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">None (Vacant)</span>
                      )}
                    </td>
                    <td className="p-4 font-mono">{ws.sqft} SqFt ({ws.capacity} Seats)</td>
                    <td className="p-4">
                      {ws.status === 'occupied' && <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Occupied</span>}
                      {ws.status === 'vacant' && <span className="text-rose-800 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Vacant</span>}
                      {ws.status === 'upcoming' && <span className="text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Vacant &lt;60d ({ws.daysUntilExpiry}d)</span>}
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-700">${ws.monthlyPrice}/mo</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveWorkspace(ws);
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-semibold transition-colors border border-slate-200"
                      >
                        Profile & Actions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drawer */}
      <OfficeProfileDrawer
        workspace={activeWorkspace}
        onClose={() => setActiveWorkspace(null)}
        onInitiateRenewal={onInitiateRenewal}
        onToggleVacancyStatus={onToggleVacancyStatus}
        onToggleWeeklyReminder={onToggleWeeklyReminder}
      />
    </div>
  );
};
