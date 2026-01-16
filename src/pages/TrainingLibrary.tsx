import { useState } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';
import { TrainingLayout } from '../components/training/TrainingLayout';
import { ScenarioCard } from '../components/training/ScenarioCard';
import { trainingModules } from '../data/trainingModules';
import { ModuleStatus } from '../types/training';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

type FilterType = 'all' | ModuleStatus;

export default function TrainingLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const modules = Object.values(trainingModules);

  const filteredModules = modules.filter((module) => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || module.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <TrainingLayout>
      {/* Header Section */}
      <div className="bg-card rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Training Library</h1>
              <p className="text-sm text-muted-foreground">
                Select a scenario to begin your interactive training session
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search scenarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filterButtons.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
                className={
                  activeFilter === filter.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <ScenarioCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-lg p-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No scenarios found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </TrainingLayout>
  );
}
