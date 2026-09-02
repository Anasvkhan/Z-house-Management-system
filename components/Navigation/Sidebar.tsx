'use client';

import React from 'react';
import { 
  Map, 
  Grid, 
  Megaphone, 
  RefreshCw, 
  CreditCard, 
  Bot, 
  Zap, 
  CloudSync,
  Layers,
  ChevronRight
} from 'lucide-react';

export type TabId = 
  | 'map' 
  | 'matrix' 
  | 'vacancies' 
  | 'renewals' 
  | 'billing' 
  | 'ai_parser' 
  | 'rules' 
  | 'zoho';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  upcomingCount: number;
  renewalsCount: number;
  overdueCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  upcomingCount,
  renewalsCount,
  overdueCount,
}) => {
  const menuItems = [
    {
      id: 'map' as TabId,
      label: 'Floor Inventory Map',
      icon: Map,
      description: 'Interactive floor-wise visual maps',
      badge: null
    },
    {
      id: 'matrix' as TabId,
      label: 'Occupancy Status',
      icon: Grid,
      description: 'Color-coded real-time inventory',
      badge: null
    },
    {
      id: 'vacancies' as TabId,
      label: 'Upcoming Vacancies',
      icon: Megaphone,
      description: 'Pre-marketing & sales alerts',
      badge: upcomingCount > 0 ? upcomingCount : null,
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      id: 'renewals' as TabId,
      label: 'Contract Renewals',
      icon: RefreshCw,
      description: '60-90 day expiry workflows',
      badge: renewalsCount > 0 ? renewalsCount : null,
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'billing' as TabId,
      label: 'Billing & Late Fees',
      icon: CreditCard,
      description: '5% + 1%/5d penalty follow-ups',
      badge: overdueCount > 0 ? overdueCount : null,
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200'
    },
    {
      id: 'ai_parser' as TabId,
      label: 'AI Contract Reader',
      icon: Bot,
      description: 'Auto-extract PDF terms & update',
      badge: 'AI',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      id: 'rules' as TabId,
      label: 'Automation Engine',
      icon: Zap,
      description: 'Flexible IF-THEN rules builder',
      badge: null
    },
    {
      id: 'zoho' as TabId,
      label: 'Zoho Integration',
      icon: CloudSync,
      description: 'Bi-directional CRM & Books sync',
      badge: null
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 no-x-overflow">
      <div className="p-4 border-b border-slate-200 hidden lg:block">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>Modules Navigation</span>
        </div>
      </div>

      {/* Menu items list */}
      <nav className="p-2 space-y-1 overflow-y-auto flex-1 flex lg:flex-col horizontal-scroll-on-mobile">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-500 group-hover:text-slate-800 group-hover:bg-slate-200'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <div className={`font-semibold text-xs truncate ${isActive ? 'text-emerald-950 font-bold' : 'text-slate-800'}`}>{item.label}</div>
                  <div className="text-[10px] text-slate-400 truncate hidden lg:block">{item.description}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge !== null && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg || 'bg-slate-100 text-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-0.5 text-emerald-600' : 'text-slate-300 group-hover:text-slate-500'}`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Location Footer Note */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50 hidden lg:block text-xs">
        <div className="flex items-center justify-between text-slate-500 mb-1 font-medium">
          <span>Active Hubs:</span>
          <span className="font-bold text-slate-900">3 Locations</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Private Offices • Fixed Desks • Coworking
        </div>
      </div>
    </aside>
  );
};
