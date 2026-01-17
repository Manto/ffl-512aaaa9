import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useOnboardingStorage } from '../hooks/useOnboardingStorage';
import { onboardingSteps } from '../data/onboardingSteps';

interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  isOnboardingActive: boolean;
  totalSteps: number;
  currentStepData: typeof onboardingSteps[number] | null;
  startOnboarding: () => void;
  nextStep: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const storage = useOnboardingStorage();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => storage.getCompleted());
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);

  const startOnboarding = useCallback(() => {
    setCurrentStep(0);
    setIsOnboardingActive(true);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      setIsOnboardingActive(false);
      setHasCompletedOnboarding(true);
      storage.setCompleted(true);
    }
  }, [currentStep, storage]);

  const skipOnboarding = useCallback(() => {
    setIsOnboardingActive(false);
    setHasCompletedOnboarding(true);
    storage.setCompleted(true);
  }, [storage]);

  const resetOnboarding = useCallback(() => {
    storage.reset();
    setHasCompletedOnboarding(false);
    setCurrentStep(0);
  }, [storage]);

  const currentStepData = isOnboardingActive ? onboardingSteps[currentStep] : null;

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        currentStep,
        isOnboardingActive,
        totalSteps: onboardingSteps.length,
        currentStepData,
        startOnboarding,
        nextStep,
        skipOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
