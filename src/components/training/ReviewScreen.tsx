import { ChevronLeft, ChevronRight, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ReviewScreenProps {
  onPrevious?: () => void;
  onRestart?: () => void;
}

export function ReviewScreen({ onPrevious, onRestart }: ReviewScreenProps) {
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
            onClick={onRestart}
            className="gap-2"
          >
            Restart Simulation
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}