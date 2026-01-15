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
    <div className="bg-card rounded-xl shadow-lg px-4 py-3 mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <BookOpen className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            {module.title}
          </h2>
        </div>
        <div className="flex-1">
          <ProgressStepper currentStep={currentStep} onStepClick={onStepClick} />
        </div>
      </div>
    </div>
  );
}
