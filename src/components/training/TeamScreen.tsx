import { Users, ChevronLeft } from 'lucide-react';
import { TrainingModule } from '../../types/training';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface TeamScreenProps {
  module: TrainingModule;
  onNext: () => void;
  onPrevious: () => void;
}

export function TeamScreen({ module, onNext, onPrevious }: TeamScreenProps) {
  const { team, userRole } = module;

  return (
    <div className="space-y-6">
      {/* Team Members */}
      <div className="bg-card rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Meet Your Team</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* You - the learner */}
          <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl ring-2 ring-primary">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" alt="You" />
              <AvatarFallback className="bg-gradient-to-br from-primary/60 to-primary text-primary-foreground font-semibold">
                YOU
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">You</h4>
                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">You</span>
              </div>
              <p className="text-sm text-primary font-medium">{userRole}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Responsible for verifying all safety conditions before authorizing work to begin.
              </p>
            </div>
          </div>

          {/* Other team members */}
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
            >
              <Avatar className="w-12 h-12 flex-shrink-0">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/60 to-primary text-primary-foreground font-semibold">
                  {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
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
