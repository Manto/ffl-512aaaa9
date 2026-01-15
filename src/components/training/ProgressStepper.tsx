import { Check, Circle } from 'lucide-react';
import { TrainingStep } from '../../types/training';

interface Step {
  id: TrainingStep;
  label: string;
  description: string;
}

const steps: Step[] = [
  { id: 'intro', label: 'Intro', description: 'Introduction' },
  { id: 'briefing', label: 'Briefing', description: 'Mission Details' },
  { id: 'simulation', label: 'Simulation', description: 'Interactive Training' },
  { id: 'review', label: 'Review', description: 'Summary & Assessment' },
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
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  index < currentIndex
                    ? 'bg-muted border-muted-foreground/30'
                    : index === currentIndex
                    ? 'bg-primary border-primary ring-4 ring-primary/20'
                    : 'bg-card border-border'
                } ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
              >
                {index < currentIndex ? (
                  <Check className="w-4 h-4 text-muted-foreground" />
                ) : index === currentIndex ? (
                  <Circle className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                ) : (
                  <span className="text-sm font-semibold text-muted-foreground">{index + 1}</span>
                )}
              </button>

              <div className="mt-2 text-center">
                <p
                  className={`text-xs font-semibold ${
                    index <= currentIndex ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs ${
                    index <= currentIndex ? 'text-muted-foreground' : 'text-muted-foreground/60'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 -mt-10 transition-all ${
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
