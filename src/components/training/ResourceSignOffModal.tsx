import { useState } from 'react';
import { X, Check, FileText } from 'lucide-react';
import { Resource, ChecklistItem } from '../../types/training';

interface ResourceSignOffModalProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onUpdateChecklist: (resourceId: string, checklist: ChecklistItem[]) => void;
}

export function ResourceSignOffModal({ resource, isOpen, onClose, onUpdateChecklist }: ResourceSignOffModalProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(resource.checklist || []);

  if (!isOpen) return null;

  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;
  const allComplete = totalCount > 0 && completedCount === totalCount;

  const toggleItem = (itemId: string) => {
    const updated = checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    onUpdateChecklist(resource.id, updated);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[60]" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-card border-l border-border z-[70] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-foreground text-sm">{resource.title}</h2>
            {totalCount > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {completedCount} of {totalCount} items signed off
              </p>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Document description */}
        {resource.description && (
          <div className="px-5 py-3 border-b border-border">
            <p className="text-sm text-muted-foreground">{resource.description}</p>
          </div>
        )}

        {/* Checklist */}
        {totalCount > 0 ? (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-2">
              {checklist.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${
                    item.completed
                      ? 'border-primary/20 bg-primary/5'
                      : 'border-border hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    item.completed
                      ? 'bg-primary border-primary'
                      : 'border-muted-foreground/30'
                  }`}>
                    {item.completed && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-muted-foreground/60 font-medium">#{index + 1}</span>
                    <p className={`text-sm ${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {item.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center px-5">
            <p className="text-sm text-muted-foreground text-center">No checklist items for this document.</p>
          </div>
        )}

        {/* Footer */}
        {totalCount > 0 && (
          <div className="px-5 py-4 border-t border-border shrink-0">
            {allComplete ? (
              <div className="flex items-center gap-2 justify-center text-primary">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">All items signed off</span>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center">
                Tap each item to sign off as verified
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
