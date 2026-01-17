export interface OnboardingStep {
  id: string;
  target: string | null; // null means center modal
  title: string;
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    target: null,
    title: 'Welcome to Your Training',
    message: "Let us show you around before you begin. This will only take 30 seconds.",
    position: 'center',
  },
  {
    id: 'progress-stepper',
    target: 'progress-stepper',
    title: 'Track Your Progress',
    message: 'Your training has 5 steps: Intro, Briefing, Situation, Simulation, and Review. Click completed steps to revisit anytime.',
    position: 'bottom',
  },
  {
    id: 'back-button',
    target: 'back-button',
    title: 'Easy Navigation',
    message: 'Return to the Training Library anytime using this button.',
    position: 'bottom',
  },
  {
    id: 'video-player',
    target: 'video-player',
    title: 'Watch & Learn',
    message: 'Videos prepare you for each training phase. Watch them fully to unlock the next step.',
    position: 'top',
  },
  {
    id: 'complete',
    target: null,
    title: "You're Ready!",
    message: 'Now you know the interface. Focus on your training—the UI will stay out of your way.',
    position: 'center',
  },
];
