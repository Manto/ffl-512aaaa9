import { useState, useEffect, useRef } from 'react';
import { Users, FileText, BookOpen, Shield, AlertTriangle, X } from 'lucide-react';
import { TrainingModule, TeamMember, Resource } from '../../types/training';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface SimulationResourcesDropdownProps {
  module: TrainingModule;
  onClose: () => void;
}

type TabType = 'team' | 'permit' | 'resources';

export function SimulationResourcesDropdown({ module, onClose }: SimulationResourcesDropdownProps) {
  const [activeTab, setActiveTab] = useState<TabType>('team');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

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
        <Badge variant="secondary" className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
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
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-[400px] bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Quick Reference</span>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-2 flex gap-1 border-b border-border">
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
      <div className="p-4 max-h-[350px] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
