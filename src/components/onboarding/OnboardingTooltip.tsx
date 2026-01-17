import { Button } from '../ui/button';

interface OnboardingTooltipProps {
  title: string;
  message: string;
  currentStep: number;
  totalSteps: number;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  targetRect: DOMRect | null;
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingTooltip({
  title,
  message,
  currentStep,
  totalSteps,
  position,
  targetRect,
  onNext,
  onSkip,
}: OnboardingTooltipProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  const isCentered = position === 'center' || !targetRect;

  const getPositionStyles = (): React.CSSProperties => {
    if (isCentered) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const padding = 16;
    const tooltipWidth = 320;

    let styles: React.CSSProperties = {
      position: 'fixed',
    };

    switch (position) {
      case 'bottom':
        styles.top = targetRect.bottom + padding;
        styles.left = targetRect.left + targetRect.width / 2;
        styles.transform = 'translateX(-50%)';
        break;
      case 'top':
        styles.bottom = window.innerHeight - targetRect.top + padding;
        styles.left = targetRect.left + targetRect.width / 2;
        styles.transform = 'translateX(-50%)';
        break;
      case 'left':
        styles.top = targetRect.top + targetRect.height / 2;
        styles.right = window.innerWidth - targetRect.left + padding;
        styles.transform = 'translateY(-50%)';
        break;
      case 'right':
        styles.top = targetRect.top + targetRect.height / 2;
        styles.left = targetRect.right + padding;
        styles.transform = 'translateY(-50%)';
        break;
    }

    // Ensure tooltip doesn't overflow viewport
    if (styles.left && typeof styles.left === 'number') {
      const maxLeft = window.innerWidth - tooltipWidth - padding;
      styles.left = Math.max(padding, Math.min(styles.left, maxLeft));
    }

    return styles;
  };

  return (
    <div
      style={getPositionStyles()}
      className="w-[320px] max-w-[calc(100vw-32px)] bg-card border border-border rounded-xl shadow-2xl p-5 z-[60] animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{message}</p>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {!isFirstStep && !isLastStep ? (
          <button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip Tutorial
          </button>
        ) : (
          <div />
        )}
        <Button onClick={onNext} size="sm">
          {isLastStep ? 'Get Started' : isFirstStep ? "Let's Go" : 'Next'}
        </Button>
      </div>
    </div>
  );
}
