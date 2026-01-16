import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TrainingLayout } from '../components/training/TrainingLayout';
import { ModuleHeader } from '../components/training/ModuleHeader';
import { PermitResourcesScreen } from '../components/training/PermitResourcesScreen';
import { TeamScreen } from '../components/training/TeamScreen';
import { MissionBriefingScreen } from '../components/training/MissionBriefingScreen';
import { SimulationScreen } from '../components/training/SimulationScreen';
import { VideoPlayer } from '../components/training/VideoPlayer';
import { trainingModules } from '../data/trainingModules';
import { BriefingScreen, TrainingStep } from '../types/training';
import { Button } from '../components/ui/button';

export default function TrainingModule() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<TrainingStep>('intro');
  const [briefingScreen, setBriefingScreen] = useState<BriefingScreen>('permit-resources');

  const module = moduleId ? trainingModules[moduleId] : null;

  if (!module) {
    return (
      <TrainingLayout>
        <div className="bg-card rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">Module Not Found</h3>
          <p className="text-muted-foreground mb-6">The training module you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/training')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training Library
          </Button>
        </div>
      </TrainingLayout>
    );
  }

  const handleNextBriefing = () => {
    if (briefingScreen === 'permit-resources') {
      setBriefingScreen('team');
    } else if (briefingScreen === 'team') {
      setBriefingScreen('mission-summary');
    }
  };

  const handlePreviousBriefing = () => {
    if (briefingScreen === 'team') {
      setBriefingScreen('permit-resources');
    } else if (briefingScreen === 'mission-summary') {
      setBriefingScreen('team');
    }
  };

  const handleStartSimulation = () => {
    setCurrentStep('simulation');
  };

  // Navigation back to briefing can be done via step click

  const handleStepClick = (step: TrainingStep) => {
    // Only allow navigation to completed steps or current step
    const stepOrder: TrainingStep[] = ['intro', 'briefing', 'simulation', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const targetIndex = stepOrder.indexOf(step);
    
    if (targetIndex <= currentIndex) {
      setCurrentStep(step);
      if (step === 'briefing') {
        setBriefingScreen('permit-resources');
      }
    }
  };

  const renderBriefingContent = () => {
    switch (briefingScreen) {
      case 'permit-resources':
        return (
          <PermitResourcesScreen 
            module={module} 
            onNext={handleNextBriefing} 
          />
        );
      case 'team':
        return (
          <TeamScreen 
            module={module} 
            onNext={handleNextBriefing}
            onPrevious={handlePreviousBriefing}
          />
        );
      case 'mission-summary':
        return (
          <MissionBriefingScreen 
            module={module} 
            onStartSimulation={handleStartSimulation}
            onPrevious={handlePreviousBriefing}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <VideoPlayer
            title={module.title}
            onComplete={() => setCurrentStep('briefing')}
            onSkip={() => setCurrentStep('briefing')}
          />
        );
      case 'briefing':
        return renderBriefingContent();
      case 'simulation':
        return (
          <SimulationScreen 
            module={module} 
            currentStep={currentStep}
            onStepClick={handleStepClick}
            onComplete={() => setCurrentStep('review')}
          />
        );
      case 'review':
        return (
          <div className="bg-card rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">Review</h3>
            <p className="text-muted-foreground">Feedback and results would go here</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TrainingLayout>
      {/* Back Navigation */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/training')}
        className="mb-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Training Library
      </Button>

      <ModuleHeader 
        module={module} 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      {renderContent()}
    </TrainingLayout>
  );
}
