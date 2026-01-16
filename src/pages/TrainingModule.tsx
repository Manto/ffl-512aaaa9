import { useState } from 'react';
import { TrainingLayout } from '../components/training/TrainingLayout';
import { ModuleHeader } from '../components/training/ModuleHeader';
import { PermitResourcesScreen } from '../components/training/PermitResourcesScreen';
import { TeamScreen } from '../components/training/TeamScreen';
import { MissionBriefingScreen } from '../components/training/MissionBriefingScreen';
import { SimulationScreen } from '../components/training/SimulationScreen';
import { p101Module } from '../data/trainingModules';
import { BriefingScreen, TrainingStep } from '../types/training';

export default function TrainingModule() {
  const [currentStep, setCurrentStep] = useState<TrainingStep>('briefing');
  const [briefingScreen, setBriefingScreen] = useState<BriefingScreen>('permit-resources');

  const module = p101Module;

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
          <div className="bg-card rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">Introduction Video</h3>
            <p className="text-muted-foreground">Video player would go here</p>
          </div>
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
      <ModuleHeader 
        module={module} 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      {renderContent()}
    </TrainingLayout>
  );
}
