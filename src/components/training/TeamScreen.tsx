import { Users, User, ChevronLeft, Play } from 'lucide-react';
import { TrainingModule } from '../../types/training';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface TeamScreenProps {
  module: TrainingModule;
  onNext: () => void;
  onPrevious: () => void;
}

// Placeholder avatar URLs using UI Faces style placeholders
const avatarImages: Record<string, string> = {
  brent: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
  mike: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
  rachel: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
  ted: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
};

export function TeamScreen({ module, onNext, onPrevious }: TeamScreenProps) {
  const { team, userRole } = module;

  return (
    <div className="space-y-4">
      {/* Your Role - Compact inline */}
      <div className="bg-card rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Your Role</p>
            <h3 className="text-sm font-semibold text-foreground">{userRole}</h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs hidden md:block">
            Verify all safety conditions before authorizing work.
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-card rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Your Team</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage 
                  src={avatarImages[member.id]} 
                  alt={member.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-primary/60 to-primary text-primary-foreground text-xs font-semibold">
                  {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">{member.name}</h4>
                <p className="text-xs text-primary font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Play className="w-4 h-4" />
          Begin Simulation
        </button>
      </div>
    </div>
  );
}
