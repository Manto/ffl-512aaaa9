import { useState } from 'react';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { TeamMember } from '../../types/training';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

interface TeamQuickReferenceProps {
  team: TeamMember[];
}

export function TeamQuickReference({ team }: TeamQuickReferenceProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Your Team</span>
          <div className="flex -space-x-2">
            {team.map((member) => (
              <Avatar key={member.id} className="h-6 w-6 border-2 border-card">
                <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-medium">
                  {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-200">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-background text-foreground text-xs font-medium">
                  {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
