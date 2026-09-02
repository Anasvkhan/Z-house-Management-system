'use client';

import React, { useState } from 'react';
import { ExtractedContractData } from '@/lib/types';
import { 
  Bot, 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Zap
} from 'lucide-react';

interface ContractParserDemoProps {
  onApplyExtractedContract: (extractedData: ExtractedContractData) => void;
}

const SAMPLE_CONTRACTS: { filename: string; data: ExtractedContractData }[] = [
  {
    filename: 'Zoho_Contract_ApexDigital_PO103.pdf',
    data: {
      clientName: 'Marcus Vance',
      company: 'Apex Digital Solutions',
      email: 'm.vance@apexdigital.co',
      assignedOfficeId: 'PO-103',
      contractStart: '2026-10-01',
      contractExpiry: '2027-09-30',
      monthlyCharge: 2600,
      securityDeposit: 5200,
      paymentDueDateDay: 5,
      noticePeriodDays: 60,
      lateFeePolicy: '5% immediate charge upon due date + 1% per 5 days delay',
      renewalTerms: 'Automatic 60-day renewal notice window',
      confidenceScore: 98.4
    }
  },
  {
    filename: 'Zoho_Agreement_CyberFortress_IP203.pdf',
    data: {
      clientName: 'Dr. Aris Thorne',
      company: 'CyberFortress Systems',
      email: 'a.thorne@cyberfortress.io',
      assignedOfficeId: 'IP-203',
      contractStart: '2026-09-15',
      contractExpiry: '2027-09-14',
      monthlyCharge: 3600,
      securityDeposit: 7200,
      paymentDueDateDay: 1,
      noticePeriodDays: 90,
      lateFeePolicy: '5% late fee post due date + 1% per 5d delay',
      renewalTerms: '90-day option period',
      confidenceScore: 99.1
    }
  }
];

export const ContractParserDemo: React.FC<ContractParserDemoProps> = ({
  onApplyExtractedContract,
}) => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [extractedResult, setExtractedResult] = useState<ExtractedContractData | null>(SAMPLE_CONTRACTS[0].data);
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);

  const handleSimulateScan = (index: number) => {
    setSelectedSampleIndex(index);
    setIsScanning(true);
    setExtractedResult(null);
    setAppliedSuccess(false);

    setScanStep('1/3 Extracting raw document text & OCR scanning...');

    setTimeout(() => {
      setScanStep('2/3 Running AI Named Entity Recognition (LLM Model)...');
    }, 1000);

    setTimeout(() => {
      setScanStep('3/3 Verifying contractual clauses, rates & notice periods...');
    }, 2000);

    setTimeout(() => {
      setIsScanning(false);
      setExtractedResult(SAMPLE_CONTRACTS[index].data);
    }, 2800);
  };

  const handleApplyToSystem = () => {
    if (!extractedResult) return;
    onApplyExtractedContract(extractedResult);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 no-x-overflow">
      {/* Banner Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4 text-purple-600" />
            <span>AI Contract Intelligence Layer</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Automated PDF Contract Reader & Extraction</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Parses contracts received via Zoho or manual upload using AI. Automatically identifies client, assigned office, rental rates, due dates, renewal terms, and late fee conditions without manual data entry.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3.5 py-2 rounded-xl text-purple-900 text-xs font-bold shrink-0">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>LLM Document OCR Active</span>
        </div>
      </div>

      {/* Selector & Drag-and-drop simulated box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Select Sample Zoho Contract File</span>
            </h3>

            <div className="space-y-2">
              {SAMPLE_CONTRACTS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateScan(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    selectedSampleIndex === idx
                      ? 'bg-purple-50 border-purple-300 text-purple-950 font-bold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-mono text-slate-900 text-[11px]">{sample.filename}</div>
                      <div className="text-[10px] text-slate-500">Office: {sample.data.assignedOfficeId} • Client: {sample.data.company}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-1 rounded text-purple-800 font-mono border border-slate-200">Scan AI</span>
                </button>
              ))}
            </div>

            {/* Dropzone mock */}
            <div className="border-2 border-dashed border-slate-300 hover:border-purple-500 p-6 rounded-xl text-center bg-slate-50 transition-colors cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-purple-600 transition-colors mx-auto mb-2" />
              <div className="text-xs text-slate-700 font-semibold">Drag and drop any custom PDF lease contract</div>
              <div className="text-[10px] text-slate-400 mt-1">Supports PDF, DOCX, scanned image OCR formats</div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction Output */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <span>AI Extracted Contract Payload</span>
                </h3>

                {extractedResult && (
                  <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Confidence: {extractedResult.confidenceScore}%
                  </span>
                )}
              </div>

              {/* Scanning Loader State */}
              {isScanning && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto"></div>
                  <div className="text-xs text-purple-900 font-mono font-bold">{scanStep}</div>
                  <div className="text-[11px] text-slate-400">AI Deep Learning vision model analyzing clause parameters...</div>
                </div>
              )}

              {/* Extracted JSON Payload Cards */}
              {!isScanning && extractedResult && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block uppercase font-semibold">Client Company</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{extractedResult.company}</span>
                      <span className="text-slate-500 text-[11px] block">{extractedResult.clientName} ({extractedResult.email})</span>
                    </div>

                    <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200">
                      <span className="text-purple-800 text-[10px] block uppercase font-semibold">Assigned Office ID</span>
                      <span className="text-purple-950 font-mono font-bold text-base block mt-0.5">{extractedResult.assignedOfficeId}</span>
                      <span className="text-slate-500 text-[11px] block">Target Workspace</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block uppercase font-semibold">Monthly Rate</span>
                      <span className="text-emerald-700 font-mono font-bold text-sm block mt-0.5">${extractedResult.monthlyCharge.toLocaleString()}/mo</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block uppercase font-semibold">Security Deposit</span>
                      <span className="text-slate-900 font-mono font-bold text-sm block mt-0.5">${extractedResult.securityDeposit.toLocaleString()}</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block uppercase font-semibold">Payment Due Day</span>
                      <span className="text-amber-800 font-mono font-bold text-sm block mt-0.5">Day {extractedResult.paymentDueDateDay} of month</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lease Term Period:</span>
                      <span className="text-slate-800 font-mono font-medium">{extractedResult.contractStart} to {extractedResult.contractExpiry}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/80 pt-2">
                      <span className="text-slate-500">Late Payment Policy Detected:</span>
                      <span className="text-rose-700 font-semibold">{extractedResult.lateFeePolicy}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/80 pt-2">
                      <span className="text-slate-500">Renewal & Notice Period:</span>
                      <span className="text-blue-800 font-semibold">{extractedResult.noticePeriodDays} Days Notice ({extractedResult.renewalTerms})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit / Sync action */}
            {!isScanning && extractedResult && (
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleApplyToSystem}
                  className={`w-full py-3 px-4 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                    appliedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-purple-700 hover:bg-purple-800 text-white'
                  }`}
                >
                  {appliedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Successfully Updated Record & Triggered Workflows!</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Auto-Update Office Record ({extractedResult.assignedOfficeId}) & Initiate Workflows</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
