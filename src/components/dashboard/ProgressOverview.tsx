import { Award, Clock, BookCheck, Shield, TrendingUp } from 'lucide-react';

interface Stats {
  totalTrainingHours: number;
  completedModules: number;
  totalModules: number;
  safetyScore: number;
  certifications: number;
}

interface ProgressOverviewProps {
  stats: Stats;
}

export function ProgressOverview({ stats }: ProgressOverviewProps) {
  const completionPercentage = Math.round((stats.completedModules / stats.totalModules) * 100);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        Your Progress
      </h3>

      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${completionPercentage * 3.52} 352`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{completionPercentage}%</span>
            <span className="text-xs text-muted-foreground">Complete</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <p className="text-lg font-semibold text-foreground">{stats.totalTrainingHours}h</p>
          <p className="text-xs text-muted-foreground">Training Hours</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
            <BookCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-lg font-semibold text-foreground">{stats.completedModules}/{stats.totalModules}</p>
          <p className="text-xs text-muted-foreground">Modules Done</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
            <Shield className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-lg font-semibold text-foreground">{stats.safetyScore}%</p>
          <p className="text-xs text-muted-foreground">Safety Score</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-lg font-semibold text-foreground">{stats.certifications}</p>
          <p className="text-xs text-muted-foreground">Certifications</p>
        </div>
      </div>
    </div>
  );
}
