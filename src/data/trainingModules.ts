import { TrainingModule } from '../types/training';

export const p101Module: TrainingModule = {
  id: 'p-101',
  title: 'P-101 Isobutane Pump Recommissioning',
  description: 'Scenario: The pump was isolated 6 months ago. The discharge blind is still in place. You are the Field Lead responsible for verifying conditions before work begins.',
  introVideoUrl: 'https://example.com/intro-video.mp4',
  userRole: 'Field Lead / Start Work Verifier',
  keyReminders: [
    'Verify all isolation points before work begins',
    'Confirm zero energy verification',
    'Maintain LEL monitoring throughout',
    'Stop work immediately if unsafe conditions arise',
  ],
  // New metadata
  difficulty: 'Advanced',
  duration: '45-60 min',
  location: 'Isobutane Processing Unit',
  version: 'V2',
  status: 'available',
  permit: {
    permitNumber: 'PTW-2025-1024',
    issueDate: 'October 24, 2025',
    validUntil: 'October 24, 2025 at 18:00',
    status: 'ACTIVE',
    equipment: {
      id: 'P-101',
      name: 'P-101 Isobutane Pump',
      location: 'Process Area A, Unit 1',
      system: 'Isobutane Transfer System',
    },
    workDescription: 'Recommissioning of P-101 Isobutane Pump following scheduled maintenance. Work includes verification of isolation points, functional testing, and return to service procedures.',
    conditions: [
      'Daylight hours only (06:00 - 18:00)',
      'Weather conditions permitting (no lightning within 10 miles)',
      'Emergency response team on standby',
      'All personnel briefed on evacuation routes',
    ],
    safetyRequirements: [
      { id: 'sr1', description: 'LEL monitoring required continuously', critical: true },
      { id: 'sr2', description: 'Zero energy verification completed', critical: true },
      { id: 'sr3', description: 'PPE: Hard hat, safety glasses, FR clothing, H2S monitor', critical: false },
      { id: 'sr4', description: 'Hot work permit if welding required', critical: false },
      { id: 'sr5', description: 'Confined space entry permit if applicable', critical: false },
    ],
  },
  team: [
    {
      id: 'brent',
      name: 'Brent Thompson',
      role: 'Safety Representative',
      description: 'HSE specialist responsible for ensuring all safety protocols are followed. Report any concerns directly to Brent.',
      avatar: 'BT',
    },
    {
      id: 'mike',
      name: 'Mike Rodriguez',
      role: 'Control Room Operator',
      description: 'Controls process parameters from the control room. Coordinates lockout/tagout procedures.',
      avatar: 'MR',
    },
    {
      id: 'rachel',
      name: 'Rachel Chen',
      role: 'Lead Maintenance Technician',
      description: 'Leads the hands-on maintenance work on P-101. Experienced with pump recommissioning.',
      avatar: 'RC',
    },
    {
      id: 'ted',
      name: 'Ted Williams',
      role: 'Maintenance Technician',
      description: 'Assists Rachel with mechanical work. Certified for confined space entry.',
      avatar: 'TW',
    },
  ],
  resources: [
    {
      id: 'ptw',
      title: 'Permit to Work (PTW)',
      type: 'permit',
      description: 'Active permit document for this job',
    },
    {
      id: 'jsa',
      title: 'Job Safety Analysis (JSA)',
      type: 'jsa',
      description: 'Hazard identification and mitigation steps',
    },
    {
      id: 'procedure',
      title: 'P-101 Recommissioning Procedure',
      type: 'procedure',
      description: 'Step-by-step work instructions',
    },
  ],
};

export const trainingModules: Record<string, TrainingModule> = {
  'p-101': p101Module,
};
