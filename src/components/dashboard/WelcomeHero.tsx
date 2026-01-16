import { Sun, Moon, CloudSun } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface UserData {
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
  stats: {
    currentStreak: number;
  };
}

interface WelcomeHeroProps {
  user: UserData;
}

function getGreeting(): { text: string; icon: React.ReactNode } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good morning', icon: <Sun className="w-5 h-5 text-amber-500" /> };
  if (hour < 17) return { text: 'Good afternoon', icon: <CloudSun className="w-5 h-5 text-orange-500" /> };
  return { text: 'Good evening', icon: <Moon className="w-5 h-5 text-indigo-400" /> };
}

export function WelcomeHero({ user }: WelcomeHeroProps) {
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage src={user.avatarUrl} alt={user.firstName} />
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              {greeting.icon}
              <span className="text-sm text-muted-foreground">{greeting.text}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user.firstName}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {user.role} • {today}
            </p>
          </div>
        </div>

        {/* Streak Badge */}
        {user.stats.currentStreak > 0 && (
          <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 px-3 py-2 rounded-full">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-medium">{user.stats.currentStreak} day streak</span>
          </div>
        )}
      </div>
    </div>
  );
}
