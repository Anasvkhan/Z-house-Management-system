'use client';

import React, { useState } from 'react';
import { calculateLateFee } from '@/lib/data';
import { Calculator, AlertTriangle } from 'lucide-react';

export const LateFeeCalculator: React.FC = () => {
  const [sampleRentAmount, setSampleRentAmount] = useState<number>(4500);
  const [overdueDaysSlider, setOverdueDaysSlider] = useState<number>(18);

  const { penaltyPercentage, penaltyAmount, totalDue } = calculateLateFee(sampleRentAmount, overdueDaysSlider);

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6 no-x-overflow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4 text-rose-600" />
            <span>Policy Engine Simulation</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Automated Late Fee Rule Simulator</h3>
          <p className="text-xs text-slate-500 mt-1">
            Policy Rule: <span className="text-rose-700 font-semibold">5% Base Late Charge</span> immediately after due date + <span className="text-rose-700 font-semibold">+1% additional fee every 5 days</span> of delay.
          </p>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
        {/* Rent input */}
        <div>
          <label className="text-xs text-slate-600 font-semibold block mb-2">
            Base Monthly Invoice Amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
            <input
              type="number"
              value={sampleRentAmount}
              onChange={(e) => setSampleRentAmount(Math.max(100, Number(e.target.value)))}
              className="w-full bg-white border border-slate-300 text-slate-900 font-mono font-bold text-sm rounded-xl pl-8 pr-4 py-2.5 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Days Overdue Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-600">Days Past Due Date:</span>
            <span className="text-rose-700 font-mono font-bold text-sm">{overdueDaysSlider} Days Overdue</span>
          </div>
          <input
            type="range"
            min="0"
            max="45"
            step="1"
            value={overdueDaysSlider}
            onChange={(e) => setOverdueDaysSlider(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>0 Days (On Time)</span>
            <span>15 Days</span>
            <span>30 Days</span>
            <span>45 Days</span>
          </div>
        </div>
      </div>

      {/* Calculation Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Base Rent Invoice</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">${sampleRentAmount.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1">Standard charge</div>
        </div>

        <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200">
          <div className="text-[10px] text-rose-800 uppercase font-semibold flex items-center justify-between">
            <span>Late Penalty ({penaltyPercentage}%)</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-bold font-mono text-rose-700 mt-1">+${penaltyAmount.toLocaleString()}</div>
          <div className="text-[10px] text-rose-800 mt-1 font-mono">
            {overdueDaysSlider === 0 
              ? '0% penalty applied' 
              : `5% base + ${Math.floor(overdueDaysSlider / 5)}% (${Math.floor(overdueDaysSlider / 5)} x 5d delay)`}
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <div className="text-[10px] text-emerald-800 uppercase font-semibold">Total Invoice Payable</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-950 mt-1">${totalDue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">Auto-recorded against Client Record</div>
        </div>
      </div>
    </div>
  );
};
