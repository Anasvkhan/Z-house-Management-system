'use client';

import React, { useState } from 'react';
import { Workspace, LocationId } from '@/lib/types';
import { LOCATIONS } from '@/lib/data';
import { OfficeProfileDrawer } from './OfficeProfileDrawer';
import { 
  Building2, 
  Layers, 
  Info, 
  Search
} from 'lucide-react';

interface FloorMapProps {
  workspaces: Workspace[];
  selectedLocation: LocationId;
  onLocationChange: (loc: LocationId) => void;
  onInitiateRenewal: (id: string) => void;
  onToggleVacancyStatus: (id: string) => void;
  onToggleWeeklyReminder: (id: string) => void;
}

export const FloorMap: React.FC<FloorMapProps> = ({
  workspaces,
  selectedLocation,
  onLocationChange,
  onInitiateRenewal,
  onToggleVacancyStatus,
  onToggleWeeklyReminder,
}) => {
  const currentLocation = LOCATIONS.find((l) => l.id === selectedLocation) || LOCATIONS[0];
  const [selectedFloor, setSelectedFloor] = useState<string>('1st Floor');
  const [statusFilter, setStatusFilter] = useState<'all' | 'occupied' | 'vacant' | 'upcoming'>('all');
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [hoveredWorkspace, setHoveredWorkspace] = useState<Workspace | null>(null);

  // Filter workspaces for current location & floor
  const locationWorkspaces = workspaces.filter((w) => w.location === selectedLocation);
  
  // Available floors for current location
  const availableFloors = Array.from(new Set(locationWorkspaces.map((w) => w.floor)));
  const currentFloor = availableFloors.includes(selectedFloor) ? selectedFloor : (availableFloors[0] || '1st Floor');

  const filteredWorkspaces = locationWorkspaces.filter((w) => {
    const matchesFloor = w.floor === currentFloor;
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchesFloor && matchesStatus;
  });

  // Calculate floor occupancy stats
  const totalOnFloor = locationWorkspaces.filter((w) => w.floor === currentFloor).length;
  const occupiedCount = locationWorkspaces.filter((w) => w.floor === currentFloor && w.status === 'occupied').length;
  const vacantCount = locationWorkspaces.filter((w) => w.floor === currentFloor && w.status === 'vacant').length;
  const upcomingCount = locationWorkspaces.filter((w) => w.floor === currentFloor && w.status === 'upcoming').length;

  const getStatusColorClass = (status: Workspace['status'], isHovered: boolean) => {
    switch (status) {
      case 'occupied':
        return isHovered 
          ? 'bg-emerald-100 border-emerald-600 text-emerald-950 shadow-md' 
          : 'bg-emerald-50 border-emerald-300 text-emerald-900';
      case 'vacant':
        return isHovered 
          ? 'bg-rose-100 border-rose-600 text-rose-950 shadow-md' 
          : 'bg-rose-50 border-rose-300 text-rose-900';
      case 'upcoming':
        return isHovered 
          ? 'bg-amber-100 border-amber-600 text-amber-950 shadow-md' 
          : 'bg-amber-50 border-amber-300 text-amber-900';
    }
  };

  const getBadgeIcon = (status: Workspace['status']) => {
    switch (status) {
      case 'occupied':
        return <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse shrink-0"></span>;
      case 'vacant':
        return <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block animate-pulse shrink-0"></span>;
      case 'upcoming':
        return <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-ping shrink-0"></span>;
    }
  };

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Top Banner & Control Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>{currentLocation.name}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              Interactive Floor Inventory Map
              <span className="text-xs bg-slate-100 text-slate-600 font-normal px-3 py-1 rounded-full border border-slate-200">
                {currentLocation.address}
              </span>
            </h2>
          </div>

          {/* Location Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => onLocationChange(loc.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                  selectedLocation === loc.id
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {loc.name.split(' ')[2] || loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Floor selector & Filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-4">
          {/* Floor tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" /> Floor:
            </span>
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {availableFloors.map((floor) => (
                <button
                  key={floor}
                  onClick={() => setSelectedFloor(floor)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-150 ${
                    currentFloor === floor
                      ? 'bg-white text-emerald-800 border border-slate-300 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>
          </div>

          {/* Color-Coded Legend & Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto shrink-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors duration-150 border ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All ({totalOnFloor})
            </button>

            <button
              onClick={() => setStatusFilter('occupied')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 border ${
                statusFilter === 'occupied'
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Green – Occupied ({occupiedCount})
            </button>

            <button
              onClick={() => setStatusFilter('vacant')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 border ${
                statusFilter === 'vacant'
                  ? 'bg-rose-100 text-rose-900 border-rose-400 font-bold'
                  : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              Red – Vacant ({vacantCount})
            </button>

            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 border ${
                statusFilter === 'upcoming'
                  ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Yellow – Vacant &lt;60d ({upcomingCount})
            </button>
          </div>
        </div>
      </div>

      {/* Architectural Floor Blueprint Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm min-h-[480px] flex flex-col justify-between">
        {/* Floor Layout Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 z-10 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 font-mono font-bold text-slate-700">
            <span>LOCATION: {selectedLocation.toUpperCase()}</span>
            <span>/</span>
            <span>{currentFloor.toUpperCase()}</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            Click any office rectangle to view complete profile & contract terms
          </div>
        </div>

        {/* Vector SVG Blueprint Map Container */}
        <div className="relative w-full h-[400px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex-1 no-x-overflow">
          {/* Corridor & Central Core */}
          <div className="absolute inset-[5%] border border-slate-200 rounded-lg pointer-events-none flex items-center justify-center">
            <div className="border border-dashed border-slate-300 text-slate-400 text-xs font-mono tracking-widest uppercase py-1 px-4 rounded bg-white/80">
              Central Circulation & Service Core
            </div>
          </div>

          {/* Render interactive workspace room blocks */}
          {filteredWorkspaces.map((ws) => {
            const isHovered = hoveredWorkspace?.id === ws.id;
            const statusClass = getStatusColorClass(ws.status, isHovered);

            return (
              <div
                key={ws.id}
                onClick={() => setActiveWorkspace(ws)}
                onMouseEnter={() => setHoveredWorkspace(ws)}
                onMouseLeave={() => setHoveredWorkspace(null)}
                style={{
                  left: `${ws.mapCoord.x}%`,
                  top: `${ws.mapCoord.y}%`,
                  width: `${ws.mapCoord.w}%`,
                  height: `${ws.mapCoord.h}%`,
                }}
                className={`absolute p-3 rounded-xl border-2 box-border cursor-pointer transition-colors duration-150 flex flex-col justify-between select-none overflow-hidden ${statusClass}`}
              >
                {/* Header inside Room Node */}
                <div className="flex items-start justify-between gap-1 shrink-0">
                  <div className="flex items-center gap-1.5">
                    {getBadgeIcon(ws.status)}
                    <span className="font-mono font-bold text-xs text-slate-900 leading-none">
                      {ws.id}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/90 px-1.5 py-0.5 rounded text-slate-700 border border-slate-200 font-semibold leading-none shrink-0">
                    {ws.capacity} Seats
                  </span>
                </div>

                {/* Body inside Room Node */}
                <div className="my-1 min-w-0 overflow-hidden shrink-0">
                  <div className="font-bold text-xs text-slate-900 truncate leading-tight">{ws.name}</div>
                  <div className="text-[10px] text-slate-600 truncate font-medium leading-tight mt-0.5">
                    {ws.currentClient ? ws.currentClient.company : 'Available'}
                  </div>
                </div>

                {/* Footer inside Room Node */}
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60 shrink-0">
                  <span className="text-slate-600 font-mono font-semibold leading-none">${ws.monthlyPrice}/mo</span>
                  {ws.status === 'upcoming' && ws.daysUntilExpiry !== null && (
                    <span className="text-amber-800 font-bold bg-amber-100 px-1 rounded border border-amber-300 leading-none">
                      {ws.daysUntilExpiry}d left
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredWorkspaces.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs">
              <Search className="w-8 h-8 text-slate-300 mb-2" />
              <span>No offices match the selected status filter on this floor.</span>
            </div>
          )}
        </div>

        {/* Permanent Fixed Hover Quick Preview Footer (Zero Glitch / Zero Reflow / Zero Flicker) */}
        <div className="mt-4 bg-slate-900 text-white px-4 py-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between shadow-sm min-h-[54px] shrink-0">
          {hoveredWorkspace ? (
            <>
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 bg-emerald-500 text-slate-950 rounded-lg font-mono font-extrabold text-xs">
                  {hoveredWorkspace.id}
                </div>
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <span>{hoveredWorkspace.name}</span>
                    <span className="text-emerald-400 font-mono text-[11px]">({hoveredWorkspace.sqft} SqFt)</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Client: <span className="text-emerald-400 font-semibold">{hoveredWorkspace.currentClient?.company || 'Available (Vacant)'}</span> • AC: {hoveredWorkspace.acSpecs}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-emerald-400 font-bold text-xs">${hoveredWorkspace.monthlyPrice}/mo</div>
                <div className="text-[10px] text-slate-400">Click room to open profile</div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full text-slate-400 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Hover over any office box above to preview specs, client details & pricing</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">Click room node for complete profile modal</span>
            </div>
          )}
        </div>
      </div>

      {/* Office Profile Drawer Modal */}
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
