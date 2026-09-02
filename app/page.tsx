'use client';

import React, { useState } from 'react';
import { LocationId, Workspace, Invoice, AutomationRule, ZohoSyncItem, ExtractedContractData } from '@/lib/types';
import { INITIAL_WORKSPACES, INITIAL_INVOICES, INITIAL_RULES, INITIAL_ZOHO_LOGS } from '@/lib/data';
import { Header } from '@/components/Navigation/Header';
import { Sidebar, TabId } from '@/components/Navigation/Sidebar';
import { FloorMap } from '@/components/InventoryMap/FloorMap';
import { OccupancyMatrix } from '@/components/Occupancy/OccupancyMatrix';
import { VacancyMarketing } from '@/components/Vacancies/VacancyMarketing';
import { RenewalWorkflow } from '@/components/Renewals/RenewalWorkflow';
import { PaymentLedger } from '@/components/Billing/PaymentLedger';
import { ContractParserDemo } from '@/components/AIContractParser/ContractParserDemo';
import { RuleEngineBuilder } from '@/components/RulesEngine/RuleEngineBuilder';
import { ZohoSyncPortal } from '@/components/ZohoSync/ZohoSyncPortal';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<LocationId>('downtown');
  const [activeTab, setActiveTab] = useState<TabId>('map');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Main state arrays
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [rules, setRules] = useState<AutomationRule[]>(INITIAL_RULES);
  const [zohoLogs, setZohoLogs] = useState<ZohoSyncItem[]>(INITIAL_ZOHO_LOGS);

  // State handlers
  const handleInitiateRenewal = (id: string) => {
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, renewalNoticeSent: true, renewalStatus: 'pending' } : w
      )
    );
  };

  const handleToggleVacancyStatus = (id: string) => {
    setWorkspaces((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextStatus = w.status === 'occupied' ? 'upcoming' : w.status === 'upcoming' ? 'vacant' : 'occupied';
          return {
            ...w,
            status: nextStatus,
            daysUntilExpiry: nextStatus === 'upcoming' ? 30 : nextStatus === 'vacant' ? null : w.daysUntilExpiry
          };
        }
        return w;
      })
    );
  };

  const handleToggleWeeklyReminder = (id: string) => {
    setWorkspaces((prev) =>
      prev.map((w) => (w.id === id ? { ...w, weeklyReminderActive: !w.weeklyReminderActive } : w))
    );
  };

  const handleSimulateRenewalResponse = (id: string, response: 'renewed' | 'declined') => {
    setWorkspaces((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          if (response === 'renewed') {
            return {
              ...w,
              renewalStatus: 'renewed',
              status: 'occupied',
              daysUntilExpiry: 365,
              contractStart: '2026-10-01',
              contractExpiry: '2027-09-30'
            };
          } else {
            return {
              ...w,
              renewalStatus: 'declined',
              status: 'upcoming',
              daysUntilExpiry: 20
            };
          }
        }
        return w;
      })
    );
  };

  const handleMarkInvoicePaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'paid', overdueDays: 0, totalAmountDue: inv.amount } : inv
      )
    );
    setZohoLogs((prev) => [
      {
        id: `Z-SYNC-${Math.floor(100 + Math.random() * 900)}`,
        entityType: 'Invoice',
        entityName: `Invoice ${id} Payment Received`,
        zohoId: `ZOHO-INV-${Math.floor(10000 + Math.random() * 90000)}`,
        lastSynced: 'Just now',
        status: 'synced',
        details: 'Payment recorded & synced to Zoho Books. Automated reminders stopped.'
      },
      ...prev
    ]);
  };

  const handleSendInvoiceReminder = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, remindersSent: inv.remindersSent + 1, lastReminderDate: '2026-09-02' } : inv
      )
    );
  };

  const handleApplyExtractedContract = (data: ExtractedContractData) => {
    setWorkspaces((prev) =>
      prev.map((w) => {
        if (w.id === data.assignedOfficeId) {
          return {
            ...w,
            status: 'occupied',
            monthlyPrice: data.monthlyCharge,
            securityDeposit: data.securityDeposit,
            contractStart: data.contractStart,
            contractExpiry: data.contractExpiry,
            daysUntilExpiry: 365,
            currentClient: {
              name: data.clientName,
              email: data.email,
              phone: '+1 (555) 990-1122',
              company: data.company
            }
          };
        }
        return w;
      })
    );

    setZohoLogs((prev) => [
      {
        id: `Z-SYNC-${Math.floor(100 + Math.random() * 900)}`,
        entityType: 'Contract',
        entityName: `AI Processed ${data.company} Lease`,
        zohoId: `ZOHO-AI-${Math.floor(10000 + Math.random() * 90000)}`,
        lastSynced: 'Just now',
        status: 'synced',
        details: `Parsed & updated office ${data.assignedOfficeId} with $${data.monthlyCharge}/mo rate`
      },
      ...prev
    ]);
  };

  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleAddRule = (newRule: AutomationRule) => {
    setRules((prev) => [newRule, ...prev]);
  };

  const handleTriggerZohoSync = () => {
    setZohoLogs((prev) => [
      {
        id: `Z-SYNC-${Math.floor(100 + Math.random() * 900)}`,
        entityType: 'Workspace',
        entityName: 'All 3 Z House Locations Inventory Sync',
        zohoId: 'ZOHO-FULL-SYNC',
        lastSynced: 'Just now',
        status: 'synced',
        details: 'Full bi-directional sync completed across Private Offices, Fixed Desks & Coworking spaces.'
      },
      ...prev
    ]);
  };

  // Badge counts
  const upcomingCount = workspaces.filter((w) => w.status === 'upcoming').length;
  const renewalsCount = workspaces.filter((w) => w.daysUntilExpiry !== null && w.daysUntilExpiry <= 90 && w.daysUntilExpiry > 0).length;
  const overdueCount = invoices.filter((i) => i.status === 'overdue').length;

  const getTabTitle = () => {
    switch (activeTab) {
      case 'map': return 'Interactive Floor-Wise Inventory Map';
      case 'matrix': return 'Visual Occupancy Status Matrix';
      case 'vacancies': return 'Upcoming Vacancy Pre-Marketing Hub';
      case 'renewals': return 'Contract Expiry & Renewal Automation';
      case 'billing': return 'Client Billing & Automated Payment Reminders';
      case 'ai_parser': return 'AI-Powered Contract Document Reader';
      case 'rules': return 'Rules & Notification Engine';
      case 'zoho': return 'Zoho Integration & Bi-Directional Sync Portal';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans no-x-overflow">
      {/* Top Header Navigation */}
      <Header
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeTabTitle={getTabTitle()}
        totalWorkspacesCount={workspaces.length}
        upcomingVacanciesCount={upcomingCount}
        overdueInvoicesCount={overdueCount}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col lg:flex-row no-x-overflow">
        {/* Module Navigator Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          upcomingCount={upcomingCount}
          renewalsCount={renewalsCount}
          overdueCount={overdueCount}
        />

        {/* Tab Content Display Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full no-x-overflow">
          {activeTab === 'map' && (
            <FloorMap
              workspaces={workspaces}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              onInitiateRenewal={handleInitiateRenewal}
              onToggleVacancyStatus={handleToggleVacancyStatus}
              onToggleWeeklyReminder={handleToggleWeeklyReminder}
            />
          )}

          {activeTab === 'matrix' && (
            <OccupancyMatrix
              workspaces={workspaces}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              onInitiateRenewal={handleInitiateRenewal}
              onToggleVacancyStatus={handleToggleVacancyStatus}
              onToggleWeeklyReminder={handleToggleWeeklyReminder}
            />
          )}

          {activeTab === 'vacancies' && (
            <VacancyMarketing
              workspaces={workspaces}
              onToggleWeeklyReminder={handleToggleWeeklyReminder}
            />
          )}

          {activeTab === 'renewals' && (
            <RenewalWorkflow
              workspaces={workspaces}
              onInitiateRenewal={handleInitiateRenewal}
              onSimulateRenewalResponse={handleSimulateRenewalResponse}
            />
          )}

          {activeTab === 'billing' && (
            <PaymentLedger
              invoices={invoices}
              onMarkInvoicePaid={handleMarkInvoicePaid}
              onSendReminder={handleSendInvoiceReminder}
            />
          )}

          {activeTab === 'ai_parser' && (
            <ContractParserDemo
              onApplyExtractedContract={handleApplyExtractedContract}
            />
          )}

          {activeTab === 'rules' && (
            <RuleEngineBuilder
              rules={rules}
              onToggleRule={handleToggleRule}
              onAddRule={handleAddRule}
            />
          )}

          {activeTab === 'zoho' && (
            <ZohoSyncPortal
              logs={zohoLogs}
              onTriggerSync={handleTriggerZohoSync}
            />
          )}
        </main>
      </div>
    </div>
  );
}
