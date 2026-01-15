export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'permit' | 'jsa' | 'procedure' | 'other';
  description?: string;
}

export interface SafetyRequirement {
  id: string;
  description: string;
  critical?: boolean;
}

export interface EquipmentInfo {
  id: string;
  name: string;
  location: string;
  system: string;
}

export interface PermitToWork {
  permitNumber: string;
  issueDate: string;
  validUntil: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  equipment: EquipmentInfo;
  workDescription: string;
  conditions: string[];
  safetyRequirements: SafetyRequirement[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  introVideoUrl?: string;
  permit: PermitToWork;
  team: TeamMember[];
  resources: Resource[];
  userRole: string;
  keyReminders: string[];
}

export type TrainingStep = 'intro' | 'briefing' | 'simulation' | 'review';
export type BriefingScreen = 'permit-resources' | 'team' | 'mission-summary';
