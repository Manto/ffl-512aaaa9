import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TrainingLayout } from '../components/training/TrainingLayout';
import { ModuleHeader } from '../components/training/ModuleHeader';
import { PermitResourcesScreen } from '../components/training/PermitResourcesScreen';
import { TeamScreen } from '../components/training/TeamScreen';
import { MissionBriefingScreen } from '../components/training/MissionBriefingScreen';
import { SimulationScreen } from '../components/training/SimulationScreen';
import { ReviewScreen } from '../components/training/ReviewScreen';
import { VideoPlayer } from '../components/training/VideoPlayer';
import { trainingModules } from '../data/trainingModules';
import { BriefingScreen, TrainingStep } from '../types/training';
import { Button } from '../components/ui/button';
import { OnboardingProvider, useOnboarding } from '../contexts/OnboardingContext';
import { OnboardingOverlay } from '../components/onboarding/OnboardingOverlay';

function TrainingModuleContent() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<TrainingStep>('intro');
  const [briefingScreen, setBriefingScreen] = useState<BriefingScreen>('permit-resources');
  const { hasCompletedOnboarding, startOnboarding } = useOnboarding();

  const module = moduleId ? trainingModules[moduleId] : null;

  // Start onboarding for first-time users when on intro step
  useEffect(() => {
    if (!hasCompletedOnboarding && currentStep === 'intro' && module) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        startOnboarding();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedOnboarding, currentStep, module, startOnboarding]);

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
    setCurrentStep('situation');
  };

  const handleStepClick = (step: TrainingStep) => {
    const stepOrder: TrainingStep[] = ['intro', 'briefing', 'situation', 'simulation', 'review'];
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
            subtitle="Introduction"
            continueLabel="Continue to Briefing"
            onComplete={() => setCurrentStep('briefing')}
          />
        );
      case 'briefing':
        return renderBriefingContent();
      case 'situation':
        return (
          <VideoPlayer
            title="Arriving at the Work Site"
            subtitle="Situation Video"
            continueLabel="Start Simulation"
            backgroundImage="https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1920"
            onComplete={() => setCurrentStep('simulation')}
          />
        );
      case 'simulation':
        return (
          <SimulationScreen 
            module={module} 
            onComplete={() => setCurrentStep('review')}
          />
        );
      case 'review':
        return (
          <ReviewScreen 
            onPrevious={() => setCurrentStep('simulation')}
            onRestart={() => {
              setCurrentStep('intro');
              setBriefingScreen('permit-resources');
            }}
            onNextModule={() => navigate('/training')}
          />
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
        onBack={() => navigate('/training')}
      />
      {renderContent()}
      <OnboardingOverlay />
    </TrainingLayout>
  );
}

export default function TrainingModule() {
  return (
    <OnboardingProvider>
      <TrainingModuleContent />
    </OnboardingProvider>
  );
}
