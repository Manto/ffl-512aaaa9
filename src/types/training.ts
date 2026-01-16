export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar?: string;
  avatarUrl?: string;
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

export type ModuleDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ModuleStatus = 'available' | 'in-progress' | 'completed';

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
  // New metadata fields
  difficulty?: ModuleDifficulty;
  duration?: string;
  location?: string;
  version?: string;
  status?: ModuleStatus;
}

export type TrainingStep = 'intro' | 'briefing' | 'simulation' | 'review';
export type BriefingScreen = 'permit-resources' | 'team' | 'mission-summary';

export interface ChatMessage {
  id: string;
  speakerId: string;
  speakerName: string;
  speakerRole?: string;
  speakerAvatar?: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export interface SimulationState {
  messages: ChatMessage[];
  currentSceneId: string;
  isComplete: boolean;
}
