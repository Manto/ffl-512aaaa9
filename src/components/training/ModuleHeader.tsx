import { BookOpen } from 'lucide-react';
import { TrainingModule, TrainingStep } from '../../types/training';
import { ProgressStepper } from './ProgressStepper';

interface ModuleHeaderProps {
  module: TrainingModule;
  currentStep: TrainingStep;
  onStepClick?: (step: TrainingStep) => void;
}

export function ModuleHeader({ module, currentStep, onStepClick }: ModuleHeaderProps) {
  return (
    <>

      <div className="bg-card rounded-2xl shadow-lg p-5 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {module.title}
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>

        <ProgressStepper currentStep={currentStep} onStepClick={onStepClick} />
      </div>
    </>
  );
}
