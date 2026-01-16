import { useNavigate } from 'react-router-dom';
import { TrainingLayout } from '../components/training/TrainingLayout';
import { WelcomeHero } from '../components/dashboard/WelcomeHero';
import { ContinueLearning } from '../components/dashboard/ContinueLearning';
import { RequiredTraining } from '../components/dashboard/RequiredTraining';
import { ProgressOverview } from '../components/dashboard/ProgressOverview';
import { BadgeCollection } from '../components/dashboard/BadgeCollection';
import { SafetyAlerts } from '../components/dashboard/SafetyAlerts';
import { Leaderboard } from '../components/dashboard/Leaderboard';

// Mock user data - in production this would come from auth/database
const mockUser = {
  id: 'james-001',
  firstName: 'James',
  lastName: 'Mitchell',
  role: 'Field Lead',
  department: 'Maintenance',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  stats: {
    totalTrainingHours: 24.5,
    completedModules: 8,
    totalModules: 12,
    currentStreak: 5,
    safetyScore: 94,
    certifications: 3,
  },
  currentModule: {
    id: 'p-101',
    title: 'P-101 Isobutane Pump Recommissioning',
    progress: 65,
    lastAccessedStep: 'briefing',
  },
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <TrainingLayout>
      <div className="space-y-6">
        {/* Welcome Hero */}
        <WelcomeHero user={mockUser} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <ContinueLearning 
              currentModule={mockUser.currentModule}
              onContinue={() => navigate(`/training/${mockUser.currentModule.id}`)}
              onBrowse={() => navigate('/training')}
            />

            {/* Required Training */}
            <RequiredTraining />

            {/* Safety Alerts */}
            <SafetyAlerts />
          </div>

          {/* Right Column - Stats & Gamification */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <ProgressOverview stats={mockUser.stats} />

            {/* Badge Collection */}
            <BadgeCollection />

            {/* Leaderboard */}
            <Leaderboard currentUserId={mockUser.id} />
          </div>
        </div>
      </div>
    </TrainingLayout>
  );
}
