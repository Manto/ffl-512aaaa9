const STORAGE_KEY = 'training-onboarding-completed';

export function useOnboardingStorage() {
  const getCompleted = (): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  };

  const setCompleted = (value: boolean): void => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      console.error('Failed to save onboarding status to localStorage');
    }
  };

  const reset = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.error('Failed to reset onboarding status in localStorage');
    }
  };

  return { getCompleted, setCompleted, reset };
}
