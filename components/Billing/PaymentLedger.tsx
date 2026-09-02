'use client';

import React, { useState } from 'react';
import { Invoice } from '@/lib/types';
import { LateFeeCalculator } from './LateFeeCalculator';
import { 
  CreditCard, 
  Send, 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  Search
} from 'lucide-react';

interface PaymentLedgerProps {
  invoices: Invoice[];
  onMarkInvoicePaid: (id: string) => void;
  onSendReminder: (id: string) => void;
}

export const PaymentLedger: React.FC<PaymentLedgerProps> = ({
  invoices,
  onMarkInvoicePaid,
  onSendReminder,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'overdue' | 'unpaid' | 'paid'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sentReminderId, setSentReminderId] = useState<string | null>(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    const matchesSearch = 
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalOverdueCount = invoices.filter((i) => i.status === 'overdue').length;
  const totalOverduePenaltyAmount = invoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + i.lateFeeApplied, 0);

  const handleSendReminderClick = (id: string) => {
    onSendReminder(id);
    setSentReminderId(id);
    setTimeout(() => setSentReminderId(null), 3000);
  };

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Late Fee Simulator Header Component */}
      <LateFeeCalculator />

      {/* Payment Tracking Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Client Payment Ledger & Auto Follow-ups</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Client Invoices & Late Charges Tracking</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manages payments for Private Offices, Fixed Desks, and Coworking spaces. Overdue invoices automatically accumulate 5% + 1%/5d penalty fees.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Invoices
          </button>
          <button
            onClick={() => setFilterStatus('overdue')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filterStatus === 'overdue' ? 'bg-rose-100 text-rose-900 border border-rose-300 font-bold' : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            Overdue ({totalOverdueCount})
          </button>
          <button
            onClick={() => setFilterStatus('unpaid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === 'unpaid' ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold' : 'text-slate-600 hover:text-amber-700'
            }`}
          >
            Unpaid
          </button>
          <button
            onClick={() => setFilterStatus('paid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === 'paid' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold' : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            Paid
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by invoice ID or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Accumulated Late Penalties: <span className="text-rose-700 font-bold">${totalOverduePenaltyAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200 text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Client / Company</th>
                <th className="p-4">Workspace</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Base Rent</th>
                <th className="p-4">Late Penalty</th>
                <th className="p-4">Total Payable</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => {
                const isOverdue = inv.status === 'overdue';
                const isPaid = inv.status === 'paid';

                return (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">{inv.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{inv.company}</div>
                      <div className="text-[10px] text-slate-400">{inv.clientName}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{inv.spaceName}</td>
                    <td className="p-4 font-mono">
                      <span className={isOverdue ? 'text-rose-700 font-bold' : 'text-slate-700'}>
                        {inv.dueDate}
                      </span>
                      {isOverdue && (
                        <div className="text-[10px] text-rose-700 font-bold">
                          {inv.overdueDays} days past due
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-mono text-slate-700">${inv.amount.toLocaleString()}</td>
                    <td className="p-4 font-mono">
                      {inv.lateFeeApplied > 0 ? (
                        <span className="text-rose-800 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          +${inv.lateFeeApplied.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400">$0</span>
                      )}
                    </td>
                    <td className="p-4 font-mono font-extrabold text-slate-900 text-sm">
                      ${inv.totalAmountDue.toLocaleString()}
                    </td>
                    <td className="p-4">
                      {isPaid && (
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                        </span>
                      )}
                      {isOverdue && (
                        <span className="text-rose-800 font-bold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1 w-max">
                          <AlertOctagon className="w-3 h-3 text-rose-600" /> Overdue
                        </span>
                      )}
                      {inv.status === 'unpaid' && (
                        <span className="text-amber-900 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1 w-max">
                          <Clock className="w-3 h-3 text-amber-600" /> Pending Due
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {!isPaid && (
                        <>
                          <button
                            onClick={() => handleSendReminderClick(inv.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[11px] font-semibold transition-colors border border-slate-200 inline-flex items-center gap-1"
                          >
                            <Send className="w-3 h-3 text-amber-600" />
                            <span>
                              {sentReminderId === inv.id ? 'Reminder Sent!' : 'Send Reminder'}
                            </span>
                          </button>

                          <button
                            onClick={() => onMarkInvoicePaid(inv.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold transition-colors inline-flex items-center gap-1 shadow-sm"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Mark Paid</span>
                          </button>
                        </>
                      )}
                      {isPaid && (
                        <span className="text-[11px] text-slate-400 font-mono">Synced to Zoho</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
