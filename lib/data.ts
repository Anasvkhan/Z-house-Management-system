import { Workspace, Invoice, AutomationRule, ZohoSyncItem, LocationId } from './types';

export const LOCATIONS: { id: LocationId; name: string; address: string; totalFloors: number }[] = [
  { id: 'downtown', name: 'Z House Downtown HQ', address: 'Financial Center Tower 1, Level 4-7', totalFloors: 4 },
  { id: 'innovation', name: 'Z House Innovation Park', address: 'Tech District Cyber Hub, Floor 2-4', totalFloors: 3 },
  { id: 'marina', name: 'Z House Marina Bay', address: 'Harbor Waterfront Square, Tower B', totalFloors: 3 },
];

export const INITIAL_WORKSPACES: Workspace[] = [
  // DOWNTOWN HQ - Ground / 1st Floor
  {
    id: 'PO-101',
    name: 'Executive Suite 101',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'private_office',
    sqft: 450,
    capacity: 8,
    acSpecs: 'Dual Inverter 3.0 Ton Central Climate Control (Dedicated Thermostat)',
    facilities: ['High-speed Fiber Wi-Fi (1Gbps)', '24/7 Biometric Access', 'Ergonomic Herman Miller Chairs', 'Private Balcony', 'Executive Whiteboard'],
    status: 'occupied',
    monthlyPrice: 3800,
    securityDeposit: 7600,
    currentClient: {
      name: 'Sarah Jenkins',
      email: 's.jenkins@nexusventures.com',
      phone: '+1 (555) 234-8901',
      company: 'Nexus Ventures Inc.'
    },
    contractStart: '2025-10-15',
    contractExpiry: '2026-10-14',
    daysUntilExpiry: 42,
    renewalNoticeSent: true,
    renewalStatus: 'pending',
    weeklyReminderActive: true,
    mapCoord: { x: 5, y: 10, w: 28, h: 24 }
  },
  {
    id: 'PO-102',
    name: 'Corner Suite 102',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'private_office',
    sqft: 620,
    capacity: 12,
    acSpecs: 'Smart VRF Multi-Zone Air Conditioning System',
    facilities: ['Dedicated 1Gbps Line', '24/7 Access', 'Soundproof Phone Booth', 'Private Lounge Area', 'Meeting Display Screen'],
    status: 'upcoming',
    monthlyPrice: 5200,
    securityDeposit: 10400,
    currentClient: {
      name: 'Alexander Wright',
      email: 'a.wright@quantumtech.io',
      phone: '+1 (555) 890-1234',
      company: 'Quantum Tech Labs'
    },
    contractStart: '2025-04-01',
    contractExpiry: '2026-09-25',
    daysUntilExpiry: 23,
    renewalNoticeSent: true,
    renewalStatus: 'declined',
    weeklyReminderActive: true,
    mapCoord: { x: 36, y: 10, w: 30, h: 24 }
  },
  {
    id: 'PO-103',
    name: 'Private Studio 103',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'private_office',
    sqft: 280,
    capacity: 4,
    acSpecs: 'Split AC 1.5 Ton Inverter',
    facilities: ['Wi-Fi 6', '24/7 Access', 'Height Adjustable Desks', 'Coffee Lounge Access'],
    status: 'vacant',
    monthlyPrice: 2400,
    securityDeposit: 4800,
    currentClient: null,
    contractStart: null,
    contractExpiry: null,
    daysUntilExpiry: null,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 69, y: 10, w: 26, h: 24 }
  },
  {
    id: 'FD-01',
    name: 'Fixed Desk Hub Alpha',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'fixed_desk',
    sqft: 120,
    capacity: 2,
    acSpecs: 'Central Building HVAC',
    facilities: ['Dedicated Locker', 'Power Hub & USB-C', 'Print & Scan Station'],
    status: 'occupied',
    monthlyPrice: 450,
    securityDeposit: 900,
    currentClient: {
      name: 'David Miller',
      email: 'david@millercodes.dev',
      phone: '+1 (555) 456-7890',
      company: 'Miller Codes LLC'
    },
    contractStart: '2026-01-01',
    contractExpiry: '2026-12-31',
    daysUntilExpiry: 120,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 5, y: 40, w: 28, h: 22 }
  },
  {
    id: 'PO-104',
    name: 'Tech Suite 104',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'private_office',
    sqft: 500,
    capacity: 10,
    acSpecs: '2.5 Ton Inverter Central AC',
    facilities: ['1Gbps Dual Router', 'Whiteboard Wall', 'Acoustic Wall Panels', 'Nespresso Machine'],
    status: 'occupied',
    monthlyPrice: 4100,
    securityDeposit: 8200,
    currentClient: {
      name: 'Elena Rostova',
      email: 'elena@cyberdefense.com',
      phone: '+1 (555) 345-6789',
      company: 'Aegis CyberDefense'
    },
    contractStart: '2025-11-01',
    contractExpiry: '2026-10-31',
    daysUntilExpiry: 59,
    renewalNoticeSent: true,
    renewalStatus: 'pending',
    weeklyReminderActive: true,
    mapCoord: { x: 36, y: 40, w: 30, h: 22 }
  },
  {
    id: 'CW-HUB',
    name: 'Open Coworking Lounge',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'coworking',
    sqft: 900,
    capacity: 25,
    acSpecs: 'Quad High-Flow Climate Units',
    facilities: ['Flex Hot Desks', 'High-Speed Wi-Fi', 'Barista Coffee Counter', 'Phone Booths'],
    status: 'vacant',
    monthlyPrice: 290,
    securityDeposit: 300,
    currentClient: null,
    contractStart: null,
    contractExpiry: null,
    daysUntilExpiry: null,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 69, y: 40, w: 26, h: 50 }
  },
  {
    id: 'PO-105',
    name: 'Director Suite 105',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'private_office',
    sqft: 380,
    capacity: 6,
    acSpecs: '2.0 Ton Dedicated AC',
    facilities: ['Ergonomic Seating', 'Direct Sunlight Bay Windows', 'Private Intercom'],
    status: 'upcoming',
    monthlyPrice: 3200,
    securityDeposit: 6400,
    currentClient: {
      name: 'Marcus Vance',
      email: 'm.vance@vancemedia.co',
      phone: '+1 (555) 678-9012',
      company: 'Vance Digital Media'
    },
    contractStart: '2025-09-15',
    contractExpiry: '2026-09-14',
    daysUntilExpiry: 12,
    renewalNoticeSent: true,
    renewalStatus: 'declined',
    weeklyReminderActive: true,
    mapCoord: { x: 5, y: 68, w: 28, h: 22 }
  },
  {
    id: 'PO-106',
    name: 'Startup Pod 106',
    location: 'downtown',
    locationName: 'Z House Downtown HQ',
    floor: '1st Floor',
    type: 'private_office',
    sqft: 300,
    capacity: 5,
    acSpecs: '1.8 Ton Climate Control',
    facilities: ['4K Conference TV', 'High Speed Ethernet', 'Locker Storage'],
    status: 'vacant',
    monthlyPrice: 2600,
    securityDeposit: 5200,
    currentClient: null,
    contractStart: null,
    contractExpiry: null,
    daysUntilExpiry: null,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 36, y: 68, w: 30, h: 22 }
  },

  // INNOVATION PARK
  {
    id: 'IP-201',
    name: 'BioTech Suite 201',
    location: 'innovation',
    locationName: 'Z House Innovation Park',
    floor: '2nd Floor',
    type: 'private_office',
    sqft: 550,
    capacity: 10,
    acSpecs: 'HEPA Filtered Dual VRF AC Unit',
    facilities: ['Lab-grade power backups', 'Fiber 1Gbps', 'Card Access Security'],
    status: 'occupied',
    monthlyPrice: 4800,
    securityDeposit: 9600,
    currentClient: {
      name: 'Dr. Robert Chen',
      email: 'rchen@synbiolabs.com',
      phone: '+1 (555) 789-0123',
      company: 'SynBio Therapeutics'
    },
    contractStart: '2025-11-15',
    contractExpiry: '2026-11-14',
    daysUntilExpiry: 73,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 8, y: 12, w: 40, h: 35 }
  },
  {
    id: 'IP-202',
    name: 'Robotics Suite 202',
    location: 'innovation',
    locationName: 'Z House Innovation Park',
    floor: '2nd Floor',
    type: 'private_office',
    sqft: 700,
    capacity: 14,
    acSpecs: 'Industrial Grade Heavy Duty Climate System',
    facilities: ['3-Phase Electric Outlets', 'High Ceiling', 'Direct Freight Elevator Access'],
    status: 'upcoming',
    monthlyPrice: 5900,
    securityDeposit: 11800,
    currentClient: {
      name: 'Samantha Brooks',
      email: 'brooks@autonome.ai',
      phone: '+1 (555) 901-2345',
      company: 'Autonome AI Systems'
    },
    contractStart: '2025-10-01',
    contractExpiry: '2026-10-05',
    daysUntilExpiry: 33,
    renewalNoticeSent: true,
    renewalStatus: 'declined',
    weeklyReminderActive: true,
    mapCoord: { x: 52, y: 12, w: 40, h: 35 }
  },
  {
    id: 'IP-203',
    name: 'AI Incubator Hub 203',
    location: 'innovation',
    locationName: 'Z House Innovation Park',
    floor: '2nd Floor',
    type: 'private_office',
    sqft: 400,
    capacity: 8,
    acSpecs: '2.5 Ton Inverter AC',
    facilities: ['Sound Isolation', 'Standing Desks', 'Gaming Lounge Keycard'],
    status: 'vacant',
    monthlyPrice: 3400,
    securityDeposit: 6800,
    currentClient: null,
    contractStart: null,
    contractExpiry: null,
    daysUntilExpiry: null,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 8, y: 52, w: 40, h: 38 }
  },
  {
    id: 'IP-FD-02',
    name: 'Hardware Dev Desk Pod',
    location: 'innovation',
    locationName: 'Z House Innovation Park',
    floor: '2nd Floor',
    type: 'fixed_desk',
    sqft: 150,
    capacity: 4,
    acSpecs: 'Central HVAC',
    facilities: ['Soldering Station access', 'Dedicated LAN Cable', 'Tool Storage'],
    status: 'occupied',
    monthlyPrice: 520,
    securityDeposit: 1040,
    currentClient: {
      name: 'Kevin Zhao',
      email: 'zhao@circuitcraft.io',
      phone: '+1 (555) 234-5678',
      company: 'CircuitCraft Design'
    },
    contractStart: '2026-02-01',
    contractExpiry: '2027-01-31',
    daysUntilExpiry: 151,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 52, y: 52, w: 40, h: 38 }
  },

  // MARINA BAY
  {
    id: 'MB-301',
    name: 'Harbor View Suite 301',
    location: 'marina',
    locationName: 'Z House Marina Bay',
    floor: '3rd Floor',
    type: 'private_office',
    sqft: 850,
    capacity: 16,
    acSpecs: 'Panoramic Sea Breeze Air Handling Unit + VRF Units',
    facilities: ['Panoramic Ocean View', 'Private Boardroom', 'Private En-Suite Restroom', 'Valet Parking Tokens'],
    status: 'occupied',
    monthlyPrice: 7500,
    securityDeposit: 15000,
    currentClient: {
      name: 'Oliver Thorne',
      email: 'oliver@atlanticcapital.sg',
      phone: '+65 6789 0123',
      company: 'Atlantic Capital Management'
    },
    contractStart: '2025-08-01',
    contractExpiry: '2026-09-30',
    daysUntilExpiry: 28,
    renewalNoticeSent: true,
    renewalStatus: 'pending',
    weeklyReminderActive: true,
    mapCoord: { x: 6, y: 15, w: 42, h: 70 }
  },
  {
    id: 'MB-302',
    name: 'Waterfront Office 302',
    location: 'marina',
    locationName: 'Z House Marina Bay',
    floor: '3rd Floor',
    type: 'private_office',
    sqft: 480,
    capacity: 9,
    acSpecs: '3.0 Ton Multi-Split Inverter',
    facilities: ['Glass Partition Walls', 'Acoustic Sound Masking', 'Espresso Lounge Access'],
    status: 'vacant',
    monthlyPrice: 4600,
    securityDeposit: 9200,
    currentClient: null,
    contractStart: null,
    contractExpiry: null,
    daysUntilExpiry: null,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 52, y: 15, w: 42, h: 32 }
  },
  {
    id: 'MB-303',
    name: 'Executive Studio 303',
    location: 'marina',
    locationName: 'Z House Marina Bay',
    floor: '3rd Floor',
    type: 'private_office',
    sqft: 350,
    capacity: 6,
    acSpecs: '2.0 Ton Inverter AC',
    facilities: ['24/7 Access', 'Harbor View Balcony', 'High Speed Wi-Fi'],
    status: 'occupied',
    monthlyPrice: 3500,
    securityDeposit: 7000,
    currentClient: {
      name: 'Isabella Rossi',
      email: 'i.rossi@milanodesign.it',
      phone: '+65 8901 2345',
      company: 'Milano Design Studio'
    },
    contractStart: '2026-03-01',
    contractExpiry: '2027-02-28',
    daysUntilExpiry: 179,
    renewalNoticeSent: false,
    renewalStatus: 'not_started',
    weeklyReminderActive: false,
    mapCoord: { x: 52, y: 53, w: 42, h: 32 }
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-0891',
    workspaceId: 'PO-102',
    clientName: 'Alexander Wright',
    company: 'Quantum Tech Labs',
    spaceName: 'Corner Suite 102 (Downtown HQ)',
    amount: 5200,
    dueDate: '2026-08-15',
    status: 'overdue',
    overdueDays: 18,
    lateFeeApplied: 416, // 5% base + 3% (3 intervals of 5 days) = 8% of 5200 = 416
    totalAmountDue: 5616,
    remindersSent: 3,
    lastReminderDate: '2026-08-30'
  },
  {
    id: 'INV-2026-0892',
    workspaceId: 'IP-202',
    clientName: 'Samantha Brooks',
    company: 'Autonome AI Systems',
    spaceName: 'Robotics Suite 202 (Innovation Park)',
    amount: 5900,
    dueDate: '2026-08-25',
    status: 'overdue',
    overdueDays: 8,
    lateFeeApplied: 354, // 5% base + 1% (1 interval of 5 days) = 6% of 5900 = 354
    totalAmountDue: 6254,
    remindersSent: 2,
    lastReminderDate: '2026-09-01'
  },
  {
    id: 'INV-2026-0901',
    workspaceId: 'PO-101',
    clientName: 'Sarah Jenkins',
    company: 'Nexus Ventures Inc.',
    spaceName: 'Executive Suite 101 (Downtown HQ)',
    amount: 3800,
    dueDate: '2026-09-05',
    status: 'unpaid',
    overdueDays: 0,
    lateFeeApplied: 0,
    totalAmountDue: 3800,
    remindersSent: 1,
    lastReminderDate: '2026-08-28'
  },
  {
    id: 'INV-2026-0902',
    workspaceId: 'MB-301',
    clientName: 'Oliver Thorne',
    company: 'Atlantic Capital Management',
    spaceName: 'Harbor View Suite 301 (Marina Bay)',
    amount: 7500,
    dueDate: '2026-09-01',
    status: 'overdue',
    overdueDays: 1,
    lateFeeApplied: 375, // 5% base immediately = 375
    totalAmountDue: 7875,
    remindersSent: 1,
    lastReminderDate: '2026-09-02'
  },
  {
    id: 'INV-2026-0850',
    workspaceId: 'PO-104',
    clientName: 'Elena Rostova',
    company: 'Aegis CyberDefense',
    spaceName: 'Tech Suite 104 (Downtown HQ)',
    amount: 4100,
    dueDate: '2026-08-01',
    status: 'paid',
    overdueDays: 0,
    lateFeeApplied: 0,
    totalAmountDue: 4100,
    remindersSent: 1,
    lastReminderDate: '2026-07-28'
  }
];

export const INITIAL_RULES: AutomationRule[] = [
  {
    id: 'RULE-101',
    name: 'Initiate Contract Renewal Workflow',
    trigger: 'Contract Expiry Approaching',
    condition: 'Contract expires within 60 to 90 days',
    action: 'Send automated client renewal query email + Flag in dashboard',
    active: true,
    timesTriggered: 14,
    category: 'Renewal'
  },
  {
    id: 'RULE-102',
    name: 'Mark Non-Renewed Office as Upcoming Vacancy',
    trigger: 'Client Confirms Non-Renewal',
    condition: 'Client selects "End Lease" in renewal portal',
    action: 'Change Floor Map status to Yellow + Alert Sales Team with availability date',
    active: true,
    timesTriggered: 6,
    category: 'Vacancy'
  },
  {
    id: 'RULE-103',
    name: 'Automated 5% Base Late Penalty Charge',
    trigger: 'Invoice Due Date Passed',
    condition: 'Invoice unpaid after 11:59 PM on Due Date',
    action: 'Apply 5% late fee penalty immediately + Send WhatsApp & Email Notice',
    active: true,
    timesTriggered: 29,
    category: 'Payment'
  },
  {
    id: 'RULE-104',
    name: 'Escalating 1% Late Charge Every 5 Days',
    trigger: 'Overdue Invoice Delay Counter',
    condition: 'Every 5 additional days of unpaid delay',
    action: 'Add +1% penalty to invoice total + Send urgent reminder to Finance & Client',
    active: true,
    timesTriggered: 11,
    category: 'Payment'
  },
  {
    id: 'RULE-105',
    name: 'Zoho Real-Time Synchronization',
    trigger: 'Contract/Invoice Status Updated in Zoho',
    condition: 'Webhook payload received from Zoho CRM or Zoho Books',
    action: 'Auto-sync Client profiles, contract dates, and payment logs',
    active: true,
    timesTriggered: 142,
    category: 'Zoho'
  }
];

export const INITIAL_ZOHO_LOGS: ZohoSyncItem[] = [
  {
    id: 'Z-SYNC-901',
    entityType: 'Contract',
    entityName: 'Nexus Ventures Lease Renewal.pdf',
    zohoId: 'ZOHO-REC-88214',
    lastSynced: '2 mins ago',
    status: 'synced',
    details: 'Synced start date 2025-10-15 & expiry 2026-10-14 with Suite PO-101'
  },
  {
    id: 'Z-SYNC-902',
    entityType: 'Invoice',
    entityName: 'Invoice #INV-2026-0891 (Quantum Tech)',
    zohoId: 'ZOHO-INV-44109',
    lastSynced: '14 mins ago',
    status: 'synced',
    details: 'Updated status to Overdue + synced $416 late penalty charge'
  },
  {
    id: 'Z-SYNC-903',
    entityType: 'Client',
    entityName: 'Atlantic Capital Management',
    zohoId: 'ZOHO-CRM-10928',
    lastSynced: '1 hour ago',
    status: 'synced',
    details: 'Updated contact details & payment method'
  },
  {
    id: 'Z-SYNC-904',
    entityType: 'Workspace',
    entityName: 'Corner Suite 102 Allocation',
    zohoId: 'ZOHO-MAP-33019',
    lastSynced: '3 hours ago',
    status: 'pending',
    details: 'Awaiting sales confirmation for upcoming vacancy status sync'
  }
];

// Late fee calculation formula according to requirement 5:
// 1) Payment due date passed -> 5% late charge applied immediately.
// 2) Every additional 5 days of delay -> additional 1% charge added.
export function calculateLateFee(amount: number, overdueDays: number): { penaltyPercentage: number; penaltyAmount: number; totalDue: number } {
  if (overdueDays <= 0) {
    return { penaltyPercentage: 0, penaltyAmount: 0, totalDue: amount };
  }
  const additionalIntervals = Math.floor(overdueDays / 5);
  const penaltyPercentage = 5 + (additionalIntervals * 1);
  const penaltyAmount = Math.round((amount * penaltyPercentage) / 100);
  const totalDue = amount + penaltyAmount;
  return { penaltyPercentage, penaltyAmount, totalDue };
}
