import { Trophy, Lock, ChevronRight } from 'lucide-react';

interface BadgeData {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  description: string;
}

// Mock badge data
const badges: BadgeData[] = [
  { id: 'first-steps', name: 'First Steps', icon: '🎯', earned: true, earnedDate: new Date('2025-01-10'), description: 'Complete your first module' },
  { id: 'safety-star', name: 'Safety Star', icon: '⭐', earned: true, earnedDate: new Date('2025-01-12'), description: 'Score 100% on a safety quiz' },
  { id: 'badge-bleeder', name: 'Bleeder Pro', icon: '🔧', earned: true, earnedDate: new Date('2025-01-15'), description: 'Master pressure relief procedures' },
  { id: 'week-warrior', name: 'Week Warrior', icon: '🔥', earned: true, earnedDate: new Date('2025-01-14'), description: '7-day learning streak' },
  { id: 'lockout-legend', name: 'Lockout Legend', icon: '🔒', earned: false, description: 'Complete all LOTO training' },
  { id: 'permit-pro', name: 'Permit Pro', icon: '📋', earned: false, description: 'Master permit-to-work procedures' },
];

export function BadgeCollection() {
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="font-semibold text-foreground">Badges</h3>
          <span className="text-xs text-muted-foreground">({earnedBadges.length}/{badges.length})</span>
        </div>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          View all
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4">
        {/* Earned Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="relative group"
              title={badge.name}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer">
                {badge.icon}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {badge.name}
              </div>
            </div>
          ))}
        </div>

        {/* Locked Badges Preview */}
        <div className="flex flex-wrap gap-2">
          {lockedBadges.slice(0, 3).map((badge) => (
            <div
              key={badge.id}
              className="relative group"
              title={`${badge.name} - ${badge.description}`}
            >
              <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-xl opacity-40 cursor-pointer">
                {badge.icon}
                <Lock className="w-3 h-3 absolute bottom-1 right-1 text-muted-foreground" />
              </div>
            </div>
          ))}
          {lockedBadges.length > 3 && (
            <div className="w-12 h-12 rounded-xl bg-muted/30 border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
              +{lockedBadges.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
