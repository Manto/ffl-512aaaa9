import { PlayCircle, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface CurrentModule {
  id: string;
  title: string;
  progress: number;
  lastAccessedStep: string;
}

interface ContinueLearningProps {
  currentModule: CurrentModule | null;
  onContinue: () => void;
  onBrowse: () => void;
}

const stepLabels: Record<string, string> = {
  intro: 'Introduction Video',
  briefing: 'Safety Briefing',
  situation: 'Situation Video',
  simulation: 'Interactive Simulation',
  review: 'Review & Feedback',
};

export function ContinueLearning({ currentModule, onContinue, onBrowse }: ContinueLearningProps) {
  if (!currentModule) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No training in progress</h3>
          <p className="text-muted-foreground mb-4">Start a new training module to begin learning</p>
          <Button onClick={onBrowse}>
            Browse Training Library
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Continue where you left off</p>
            <h2 className="text-lg font-semibold text-foreground">{currentModule.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Last activity: {stepLabels[currentModule.lastAccessedStep] || 'In progress'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">{currentModule.progress}%</span>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full mb-4 overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${currentModule.progress}%` }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button onClick={onContinue} className="flex-1 gap-2">
            <PlayCircle className="w-4 h-4" />
            Continue Training
          </Button>
          <Button variant="outline" onClick={onBrowse}>
            Browse All
          </Button>
        </div>
      </div>
    </div>
  );
}
