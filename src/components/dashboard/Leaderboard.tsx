import { Users, Trophy, Medal, Award } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  department: string;
  points: number;
  rank: number;
}

// Mock leaderboard data
const leaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'Sarah Chen', initials: 'SC', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', department: 'Operations', points: 2450, rank: 1 },
  { id: '2', name: 'Mike Rodriguez', initials: 'MR', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', department: 'Maintenance', points: 2280, rank: 2 },
  { id: 'james-001', name: 'James Mitchell', initials: 'JM', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', department: 'Maintenance', points: 2150, rank: 3 },
  { id: '4', name: 'Emily Watson', initials: 'EW', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', department: 'HSE', points: 1980, rank: 4 },
  { id: '5', name: 'David Park', initials: 'DP', department: 'Operations', points: 1820, rank: 5 },
];

const rankIcons = {
  1: <Trophy className="w-4 h-4 text-amber-500" />,
  2: <Medal className="w-4 h-4 text-slate-400" />,
  3: <Award className="w-4 h-4 text-amber-600" />,
};

interface LeaderboardProps {
  currentUserId: string;
}

export function Leaderboard({ currentUserId }: LeaderboardProps) {
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Team Leaderboard</h3>
        </div>
        <span className="text-xs text-muted-foreground">This month</span>
      </div>

      <div className="p-2">
        {leaderboardData.map((entry) => {
          const isCurrentUser = entry.id === currentUserId;
          
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/30'
              }`}
            >
              {/* Rank */}
              <div className="w-6 flex items-center justify-center">
                {entry.rank <= 3 ? (
                  rankIcons[entry.rank as keyof typeof rankIcons]
                ) : (
                  <span className="text-sm text-muted-foreground font-medium">{entry.rank}</span>
                )}
              </div>

              {/* Avatar */}
              <Avatar className="w-8 h-8">
                <AvatarImage src={entry.avatarUrl} alt={entry.name} />
                <AvatarFallback className="text-xs bg-muted">
                  {entry.initials}
                </AvatarFallback>
              </Avatar>

              {/* Name & Department */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${isCurrentUser ? 'font-semibold text-foreground' : 'text-foreground'}`}>
                  {entry.name}
                  {isCurrentUser && <span className="text-xs text-primary ml-1">(You)</span>}
                </p>
                <p className="text-xs text-muted-foreground">{entry.department}</p>
              </div>

              {/* Points */}
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
