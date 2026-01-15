import { Target, CheckCircle2, FileText, ChevronLeft, Play } from 'lucide-react';
import { TrainingModule } from '../../types/training';

interface MissionBriefingScreenProps {
  module: TrainingModule;
  onStartSimulation: () => void;
  onPrevious: () => void;
}

export function MissionBriefingScreen({ module, onStartSimulation, onPrevious }: MissionBriefingScreenProps) {
  const { userRole, keyReminders, team, resources } = module;

  return (
    <div className="space-y-6">
      {/* Mission Briefing Header */}
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-amber-50 dark:bg-amber-900/20 px-6 py-4 border-b border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-bold text-foreground">Mission Briefing</h2>
          </div>
        </div>

        <div className="p-6">
          {/* Your Role */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Your Role</p>
            <p className="text-lg font-semibold text-foreground">{userRole}</p>
          </div>

          {/* Key Reminders */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
              Key Reminders
            </h3>
            <div className="space-y-2">
              {keyReminders.map((reminder, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-foreground">{reminder}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Team Overview */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
              Your Team
            </h3>
            <div className="flex flex-wrap gap-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                    {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Available */}
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>
                <strong className="text-foreground">{resources.length} documents</strong> will be available during the simulation
              </span>
            </div>
          </div>
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
          onClick={onStartSimulation}
          className="flex items-center gap-2 px-8 py-3 text-base font-semibold text-primary-foreground bg-gradient-to-r from-primary to-primary/80 rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg hover:shadow-xl"
        >
          <Play className="w-5 h-5" />
          Begin Simulation
        </button>
      </div>
    </div>
  );
}
