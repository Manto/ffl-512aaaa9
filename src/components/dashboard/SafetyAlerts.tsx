import { AlertCircle, FileText, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

interface SafetyAlert {
  id: string;
  type: 'bulletin' | 'procedure-update' | 'incident';
  title: string;
  summary: string;
  date: Date;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

// Mock data
const initialAlerts: SafetyAlert[] = [
  {
    id: 'alert-1',
    type: 'bulletin',
    title: 'Updated Bleeder Valve Procedures',
    summary: 'New guidance on pressure verification before removing blinds. All field personnel must review.',
    date: new Date('2025-01-15'),
    priority: 'high',
    read: false,
  },
  {
    id: 'alert-2',
    type: 'incident',
    title: 'Near Miss Report - Unit 4',
    summary: 'Lessons learned from near miss during pump isolation. Key takeaways for all maintenance teams.',
    date: new Date('2025-01-14'),
    priority: 'medium',
    read: false,
  },
  {
    id: 'alert-3',
    type: 'procedure-update',
    title: 'PTW Form Version 3.2 Released',
    summary: 'Updated permit-to-work form now includes additional verification checkpoints.',
    date: new Date('2025-01-12'),
    priority: 'low',
    read: true,
  },
];

const typeStyles = {
  bulletin: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  'procedure-update': { icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  incident: { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
};

const priorityDot = {
  high: 'bg-destructive',
  medium: 'bg-amber-500',
  low: 'bg-muted-foreground',
};

export function SafetyAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const unreadCount = alerts.filter(a => !a.read).length;

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Safety Alerts</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>

      <div className="divide-y divide-border">
        {alerts.map((alert) => {
          const TypeIcon = typeStyles[alert.type].icon;
          
          return (
            <div
              key={alert.id}
              className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer relative ${
                !alert.read ? 'bg-primary/5' : ''
              }`}
              onClick={() => markAsRead(alert.id)}
            >
              {/* Unread indicator */}
              {!alert.read && (
                <div className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${priorityDot[alert.priority]}`} />
              )}
              
              <div className="flex items-start gap-3 pl-3">
                <div className={`w-8 h-8 rounded-lg ${typeStyles[alert.type].bg} flex items-center justify-center shrink-0`}>
                  <TypeIcon className={`w-4 h-4 ${typeStyles[alert.type].color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-sm font-medium text-foreground line-clamp-1 ${!alert.read ? 'font-semibold' : ''}`}>
                      {alert.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissAlert(alert.id);
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{alert.summary}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {alert.date.toLocaleDateString()}
                    </span>
                    <button className="text-xs text-primary hover:underline flex items-center gap-1">
                      Read more
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
