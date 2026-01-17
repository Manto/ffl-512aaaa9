import { useEffect, useState, useCallback } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { OnboardingTooltip } from './OnboardingTooltip';

export function OnboardingOverlay() {
  const {
    isOnboardingActive,
    currentStep,
    totalSteps,
    currentStepData,
    nextStep,
    skipOnboarding,
  } = useOnboarding();

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const updateTargetRect = useCallback(() => {
    if (!currentStepData?.target) {
      setTargetRect(null);
      return;
    }

    const element = document.querySelector(`[data-onboarding="${currentStepData.target}"]`);
    if (element) {
      setTargetRect(element.getBoundingClientRect());
    } else {
      setTargetRect(null);
    }
  }, [currentStepData]);

  useEffect(() => {
    updateTargetRect();

    // Update on resize/scroll
    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect, true);

    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect, true);
    };
  }, [updateTargetRect]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOnboardingActive) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        skipOnboarding();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOnboardingActive, nextStep, skipOnboarding]);

  if (!isOnboardingActive || !currentStepData) return null;

  const padding = 8;

  return (
    <div className="fixed inset-0 z-50">
      {/* Dark overlay with spotlight cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - padding}
                y={targetRect.top - padding}
                width={targetRect.width + padding * 2}
                height={targetRect.height + padding * 2}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.7)"
          mask="url(#spotlight-mask)"
          className="transition-all duration-300"
        />
      </svg>

      {/* Spotlight border glow */}
      {targetRect && (
        <div
          className="absolute rounded-xl ring-2 ring-primary/50 ring-offset-2 ring-offset-transparent pointer-events-none transition-all duration-300"
          style={{
            left: targetRect.left - padding,
            top: targetRect.top - padding,
            width: targetRect.width + padding * 2,
            height: targetRect.height + padding * 2,
          }}
        />
      )}

      {/* Tooltip */}
      <OnboardingTooltip
        title={currentStepData.title}
        message={currentStepData.message}
        currentStep={currentStep}
        totalSteps={totalSteps}
        position={currentStepData.position}
        targetRect={targetRect}
        onNext={nextStep}
        onSkip={skipOnboarding}
      />
    </div>
  );
}
