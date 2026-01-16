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
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex items-center">
            <div className="flex flex-col items-center flex-1">
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!onStepClick}
                className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all ${
                  index < currentIndex
                    ? 'bg-muted border-muted-foreground/30'
                    : index === currentIndex
                    ? 'bg-primary border-primary ring-2 ring-primary/20'
                    : 'bg-card border-border'
                } ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
              >
                {index < currentIndex ? (
                  <Check className="w-3 h-3 text-muted-foreground" />
                ) : index === currentIndex ? (
                  <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground">{index + 1}</span>
                )}
              </button>

              <p
                className={`mt-1.5 text-xs font-medium ${
                  index <= currentIndex ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 -mt-7 transition-all ${
                  index < currentIndex ? 'bg-muted-foreground/30' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
