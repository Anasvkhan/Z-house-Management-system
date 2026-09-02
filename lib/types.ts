export type LocationId = 'downtown' | 'innovation' | 'marina';

export type OccupancyStatus = 'occupied' | 'vacant' | 'upcoming';

export type SpaceType = 'private_office' | 'fixed_desk' | 'coworking';

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface Workspace {
  id: string;
  name: string;
  location: LocationId;
  locationName: string;
  floor: string;
  type: SpaceType;
  sqft: number;
  capacity: number;
  acSpecs: string;
  facilities: string[];
  status: OccupancyStatus;
  monthlyPrice: number;
  securityDeposit: number;
  currentClient: ClientInfo | null;
  contractStart: string | null;
  contractExpiry: string | null;
  daysUntilExpiry: number | null;
  renewalNoticeSent: boolean;
  renewalStatus: 'pending' | 'renewed' | 'declined' | 'not_started';
  weeklyReminderActive: boolean;
  // Map positioning (percentage coordinates for SVG floorplan)
  mapCoord: {
    x: number; // % from left
    y: number; // % from top
    w: number; // % width
    h: number; // % height
  };
}

export interface Invoice {
  id: string;
  workspaceId: string;
  clientName: string;
  company: string;
  spaceName: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  overdueDays: number;
  lateFeeApplied: number;
  totalAmountDue: number;
  remindersSent: number;
  lastReminderDate: string | null;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  active: boolean;
  timesTriggered: number;
  category: 'Renewal' | 'Vacancy' | 'Payment' | 'Zoho';
}

export interface ZohoSyncItem {
  id: string;
  entityType: 'Contract' | 'Invoice' | 'Client' | 'Workspace';
  entityName: string;
  zohoId: string;
  lastSynced: string;
  status: 'synced' | 'pending' | 'error';
  details: string;
}

export interface ExtractedContractData {
  clientName: string;
  company: string;
  email: string;
  assignedOfficeId: string;
  contractStart: string;
  contractExpiry: string;
  monthlyCharge: number;
  securityDeposit: number;
  paymentDueDateDay: number;
  noticePeriodDays: number;
  lateFeePolicy: string;
  renewalTerms: string;
  confidenceScore: number;
}
