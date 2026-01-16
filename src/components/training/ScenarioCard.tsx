import { useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, FileText, MapPin, Play } from 'lucide-react';
import { TrainingModule } from '../../types/training';
import { Button } from '../ui/button';

interface ScenarioCardProps {
  module: TrainingModule;
}

export function ScenarioCard({ module }: ScenarioCardProps) {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (module.status) {
      case 'in-progress':
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-600">
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-600">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
            Available
          </span>
        );
    }
  };

  const getDifficultyColor = () => {
    switch (module.difficulty) {
      case 'Advanced':
        return 'text-destructive';
      case 'Intermediate':
        return 'text-amber-500';
      default:
        return 'text-emerald-500';
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border">
      {/* Gradient Header */}
      <div className="h-32 bg-gradient-to-br from-primary/80 via-primary to-primary/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <h3 className="text-lg font-bold text-primary-foreground drop-shadow-md">
            {module.title}
          </h3>
          {module.version && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
              {module.version}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Status Badge */}
        <div className="mb-3">
          {getStatusBadge()}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {module.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${getDifficultyColor()}`} />
            <span className="text-xs text-muted-foreground">{module.difficulty || 'Beginner'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{module.duration || '30 min'}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{module.permit.equipment.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground truncate">{module.location || 'Unit 1'}</span>
          </div>
        </div>

        {/* Launch Button */}
        <Button
          onClick={() => navigate(`/training/${module.id}`)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Play className="w-4 h-4 mr-2" />
          Launch Scenario
        </Button>
      </div>
    </div>
  );
}
