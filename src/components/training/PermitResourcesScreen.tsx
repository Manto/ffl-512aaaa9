import { CheckCircle2, FileText, AlertTriangle, MapPin, Wrench } from 'lucide-react';
import { TrainingModule } from '../../types/training';

interface PermitResourcesScreenProps {
  module: TrainingModule;
  onNext: () => void;
}

export function PermitResourcesScreen({ module, onNext }: PermitResourcesScreenProps) {
  const { permit, resources } = module;

  return (
    <div className="space-y-6">
      {/* Permit Section */}
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary/5 px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Permit to Work (PTW)</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{permit.permitNumber}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <CheckCircle2 className="w-3 h-3" />
                {permit.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Permit Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Equipment Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Wrench className="w-4 h-4 text-primary" />
                Equipment Information
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Equipment ID</span>
                  <span className="text-sm font-medium text-foreground">{permit.equipment.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium text-foreground">{permit.equipment.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">System</span>
                  <span className="text-sm font-medium text-foreground">{permit.equipment.system}</span>
                </div>
              </div>
            </div>

            {/* Permit Validity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                Permit Details
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Issue Date</span>
                  <span className="text-sm font-medium text-foreground">{permit.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valid Until</span>
                  <span className="text-sm font-medium text-foreground">{permit.validUntil}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Work Description */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-2">Work Description</h4>
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
              {permit.workDescription}
            </p>
          </div>

          {/* Conditions & Safety */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Conditions */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Conditions</h4>
              <ul className="space-y-2">
                {permit.conditions.map((condition, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Requirements */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Safety Requirements</h4>
              <ul className="space-y-2">
                {permit.safetyRequirements.map((req) => (
                  <li key={req.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                    {req.critical ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    {req.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-card rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Scenario Resources</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <button
              key={resource.id}
              className="flex flex-col items-center justify-center p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-center group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{resource.title}</span>
              {resource.description && (
                <span className="text-xs text-muted-foreground mt-1">{resource.description}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          Next: Meet Your Team →
        </button>
      </div>
    </div>
  );
}
