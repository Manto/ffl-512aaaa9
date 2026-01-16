import { ChevronLeft, ChevronRight, Shield, CheckCircle2, RotateCcw, ArrowRight, Clock } from 'lucide-react';
import { Button } from '../ui/button';

interface ReviewScreenProps {
  onPrevious?: () => void;
  onRestart?: () => void;
  onNextModule?: () => void;
}

// Mock next module recommendation - in a real app this would come from props or context
const nextModuleRecommendation = {
  id: 'v-201',
  title: 'V-201 Pressure Vessel Inspection',
  description: 'Learn proper procedures for inspecting pressure vessels after extended shutdown.',
  difficulty: 'Intermediate',
  duration: '30-45 min',
};

export function ReviewScreen({ onPrevious, onRestart, onNextModule }: ReviewScreenProps) {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
      <div className="p-8 space-y-6">
        {/* Coach Feedback Card */}
        <div className="bg-muted/30 rounded-xl p-6 border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-foreground mb-1">Coach Feedback</h3>
          <p className="text-sm text-muted-foreground mb-4">Safeguard verification</p>
          <p className="text-foreground leading-relaxed">
            Great job on safeguard verification! By proactively requesting the correct isolation list and 
            thoroughly verifying zero energy before starting the task, you ensured that all potential energy 
            sources were safely controlled. This step is critical in preventing accidental releases and protecting 
            both personnel and equipment.
          </p>
        </div>

        {/* Rewards Card */}
        <div className="bg-muted/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Rewards</h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Badges Earned</p>
            
            <div className="flex items-center gap-3 bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">badge-bleeder</span>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-muted/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">What's Next?</h3>
          
          <div className="space-y-4">
            {/* Practice Again Option */}
            <button
              onClick={onRestart}
              className="w-full flex items-center gap-4 p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Practice Again</p>
                <p className="text-sm text-muted-foreground">Retry this scenario to improve your score</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            {/* Recommended Next Module */}
            <button
              onClick={onNextModule}
              className="w-full flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Recommended</span>
                </div>
                <p className="font-medium text-foreground truncate">{nextModuleRecommendation.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{nextModuleRecommendation.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {nextModuleRecommendation.duration}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {nextModuleRecommendation.difficulty}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button 
            onClick={onNextModule}
            className="gap-2"
          >
            Continue Learning
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
