import { TrainingModule, TrainingStep } from '../../types/training';

interface ModuleHeaderProps {
  module: TrainingModule;
  currentStep: TrainingStep;
  onStepClick?: (step: TrainingStep) => void;
}

const steps: { id: TrainingStep; label: string }[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'briefing', label: 'Briefing' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'review', label: 'Review' },
];

export function ModuleHeader({ module, currentStep, onStepClick }: ModuleHeaderProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);
  const currentLabel = steps[currentIndex]?.label || 'Intro';

  return (
    <div className="flex items-center justify-between gap-4 py-3 px-4 mb-4 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
      {/* Left: Step indicator */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">
          {currentLabel}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentIndex + 1} of {steps.length}
        </span>
      </div>

      {/* Center: Step dots */}
      <div className="hidden sm:flex items-center gap-1.5">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick?.(step.id)}
            disabled={!onStepClick || index > currentIndex}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 bg-primary'
                : index < currentIndex
                ? 'bg-primary/50 hover:bg-primary/70'
                : 'bg-border'
            } ${onStepClick && index <= currentIndex ? 'cursor-pointer' : 'cursor-default'}`}
            title={step.label}
          />
        ))}
      </div>

      {/* Right: Scenario title */}
      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
        {module.title}
      </p>
    </div>
  );
}
