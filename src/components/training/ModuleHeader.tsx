import { ArrowLeft, BookOpen } from 'lucide-react';
import { TrainingModule, TrainingStep } from '../../types/training';
import { ProgressStepper } from './ProgressStepper';

interface ModuleHeaderProps {
  module: TrainingModule;
  currentStep: TrainingStep;
  onStepClick?: (step: TrainingStep) => void;
  onBack?: () => void;
}

export function ModuleHeader({ module, currentStep, onStepClick, onBack }: ModuleHeaderProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm px-4 py-2 mb-4">
      <div className="flex items-center gap-3">
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1"
            aria-label="Back to Training Library"
            data-onboarding="back-button"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        {/* Module title */}
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 text-foreground flex-shrink-0" />
          <span className="text-sm font-medium text-foreground truncate">
            {module.title}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Inline stepper */}
        <div data-onboarding="progress-stepper">
          <ProgressStepper currentStep={currentStep} onStepClick={onStepClick} />
        </div>
      </div>
    </div>
  );
}
