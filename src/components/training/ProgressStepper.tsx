import { Check } from 'lucide-react';
import { TrainingStep } from '../../types/training';

interface Step {
  id: TrainingStep;
  label: string;
}

const steps: Step[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'briefing', label: 'Briefing' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'review', label: 'Review' },
];

interface ProgressStepperProps {
  currentStep: TrainingStep;
  onStepClick?: (step: TrainingStep) => void;
}

export function ProgressStepper({ currentStep, onStepClick }: ProgressStepperProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => onStepClick?.(step.id)}
            disabled={!onStepClick}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              index < currentIndex
                ? 'bg-muted text-muted-foreground'
                : index === currentIndex
                ? 'bg-primary text-primary-foreground ring-2 ring-primary/20'
                : 'border border-border text-muted-foreground'
            } ${onStepClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
          >
            {index < currentIndex && (
              <Check className="w-3 h-3" />
            )}
            {step.label}
          </button>

          {index < steps.length - 1 && (
            <div className="w-3 h-px bg-border mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}
