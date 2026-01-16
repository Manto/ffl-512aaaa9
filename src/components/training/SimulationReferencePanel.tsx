import { useState } from 'react';
import { ChevronDown, ChevronUp, Users, FileText, BookOpen, Shield, AlertTriangle } from 'lucide-react';
import { TrainingModule, TeamMember, Resource } from '../../types/training';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SimulationReferencePanelProps {
  module: TrainingModule;
}

type TabType = 'team' | 'permit' | 'resources';

export function SimulationReferencePanel({ module }: SimulationReferencePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('team');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { id: 'permit', label: 'Permit', icon: <FileText className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const renderTeamContent = () => (
    <div className="grid grid-cols-2 gap-3">
      {module.team.map((member: TeamMember) => (
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
  );

  const renderPermitContent = () => (
    <div className="space-y-4">
      {/* Permit Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{module.permit.permitNumber}</p>
          <p className="text-xs text-muted-foreground">Valid until {module.permit.validUntil}</p>
        </div>
        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
          {module.permit.status}
        </Badge>
      </div>

      {/* Equipment */}
      <div className="p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground mb-1">Equipment</p>
        <p className="text-sm font-medium text-foreground">{module.permit.equipment.name}</p>
        <p className="text-xs text-muted-foreground">{module.permit.equipment.location}</p>
      </div>

      {/* Critical Safety Requirements */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
          <Shield className="w-3 h-3" /> Critical Requirements
        </p>
        <div className="space-y-2">
          {module.permit.safetyRequirements
            .filter(req => req.critical)
            .map((req) => (
              <div key={req.id} className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertTriangle className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-xs text-foreground">{req.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderResourcesContent = () => (
    <div className="space-y-2">
      {module.resources.map((resource: Resource) => (
        <button
          key={resource.id}
          className="w-full flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-left"
        >
          <div className="p-1.5 bg-primary/20 rounded">
            <FileText className="w-3 h-3 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{resource.title}</p>
            {resource.description && (
              <p className="text-xs text-muted-foreground truncate">{resource.description}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'team':
        return renderTeamContent();
      case 'permit':
        return renderPermitContent();
      case 'resources':
        return renderResourcesContent();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Quick Reference</span>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {module.team.length} team
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {module.resources.length} docs
            </Badge>
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

      {/* Expanded Content */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {/* Tabs */}
          <div className="px-4 pb-2 flex gap-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 max-h-[300px] overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
}
