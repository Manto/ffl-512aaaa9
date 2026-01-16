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
    <div className="bg-card rounded-xl shadow-lg px-4 py-3 mb-4 space-y-2">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
        <h2 className="text-sm font-semibold text-foreground">
          {module.title}
        </h2>
      </div>
      
      <p className="text-xs text-muted-foreground">
        The pump was isolated 6 months ago. The discharge blind is still in place. You are the Field Lead responsible for verifying conditions before work begins.
      </p>
      
      <ProgressStepper currentStep={currentStep} onStepClick={onStepClick} />
    </div>
  );
}
