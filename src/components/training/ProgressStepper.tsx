import { Check } from 'lucide-react';
import { TrainingStep } from '../../types/training';

interface Step {
  id: TrainingStep;
  label: string;
}

const steps: Step[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'briefing', label: 'Briefing' },
  { id: 'situation', label: 'Situation' },
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
            disabled={!onStepClick || index > currentIndex}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
              index < currentIndex
                ? 'bg-muted text-muted-foreground'
                : index === currentIndex
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground bg-transparent'
            } ${onStepClick && index <= currentIndex ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
          >
            {index < currentIndex ? (
              <Check className="w-3 h-3" />
            ) : (
              <span>{index + 1}</span>
            )}
            <span>{step.label}</span>
          </button>

          {index < steps.length - 1 && (
            <div
              className={`w-3 h-px mx-0.5 ${
                index < currentIndex ? 'bg-muted-foreground/40' : 'bg-border'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
