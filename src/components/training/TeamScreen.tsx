import { Users, User, ChevronLeft } from 'lucide-react';
import { TrainingModule } from '../../types/training';

interface TeamScreenProps {
  module: TrainingModule;
  onNext: () => void;
  onPrevious: () => void;
}

export function TeamScreen({ module, onNext, onPrevious }: TeamScreenProps) {
  const { team, userRole } = module;

  return (
    <div className="space-y-6">
      {/* Your Role Card */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl shadow-lg p-6 text-primary-foreground">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-80">Your Role</p>
            <h3 className="text-xl font-semibold">{userRole}</h3>
          </div>
        </div>
        <p className="text-sm opacity-90">
          As the Field Lead, you are responsible for verifying all safety conditions before authorizing work to begin. 
          Your decisions directly impact the safety of the entire team.
        </p>
      </div>

      {/* Team Members */}
      <div className="bg-card rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Meet Your Team</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground">{member.name}</h4>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-1">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          Next: Mission Briefing →
        </button>
      </div>
    </div>
  );
}
