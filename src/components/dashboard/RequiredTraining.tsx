import { AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';

interface RequiredModule {
  id: string;
  title: string;
  dueDate: Date;
  type: 'mandatory' | 'recommended' | 'refresher';
  duration: string;
}

// Mock data - would come from backend
const requiredModules: RequiredModule[] = [
  {
    id: 'h2s-safety-2025',
    title: 'H2S Safety Awareness Refresher',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    type: 'mandatory',
    duration: '30 min',
  },
  {
    id: 'confined-space-entry',
    title: 'Confined Space Entry Procedures',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    type: 'refresher',
    duration: '45 min',
  },
  {
    id: 'ppe-inspection',
    title: 'PPE Inspection & Maintenance',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    type: 'recommended',
    duration: '20 min',
  },
];

function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getUrgencyStyles(daysUntil: number, type: string) {
  if (type === 'mandatory' && daysUntil <= 3) {
    return {
      border: 'border-l-4 border-l-destructive',
      badge: 'bg-destructive/10 text-destructive border-destructive/20',
      text: 'text-destructive',
    };
  }
  if (daysUntil <= 7) {
    return {
      border: 'border-l-4 border-l-amber-500',
      badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      text: 'text-amber-600',
    };
  }
  return {
    border: 'border-l-4 border-l-muted',
    badge: 'bg-muted text-muted-foreground border-border',
    text: 'text-muted-foreground',
  };
}

export function RequiredTraining() {
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="font-semibold text-foreground">Required Training</h3>
        </div>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          View all
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="divide-y divide-border">
        {requiredModules.map((module) => {
          const daysUntil = getDaysUntil(module.dueDate);
          const styles = getUrgencyStyles(daysUntil, module.type);
          
          return (
            <div
              key={module.id}
              className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer ${styles.border}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">{module.title}</h4>
                    <Badge variant="outline" className={`text-xs capitalize ${styles.badge}`}>
                      {module.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {module.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-medium ${styles.text}`}>
                    {daysUntil <= 0 ? 'Overdue' : `${daysUntil} days left`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Due {module.dueDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
