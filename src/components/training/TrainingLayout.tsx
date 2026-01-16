import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Award,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

interface TrainingLayoutProps {
  children: ReactNode;
}

export function TrainingLayout({ children }: TrainingLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['training']);

  const isTrainingActive = location.pathname === '/' || location.pathname.startsWith('/training');

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarExpanded ? 'w-72' : 'w-20'} bg-card border-r border-border flex flex-col transition-all duration-300 relative`}>
        <div className="p-4 border-b border-border">
          {sidebarExpanded ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                JC
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Trainee</p>
                <p className="text-sm font-semibold text-foreground truncate">James Carter</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                JC
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm z-10"
        >
          {sidebarExpanded ? (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {sidebarExpanded && (
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Main
              </p>
            )}

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
              <Home className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Dashboard</span>
              )}
            </button>

            <div>
              <button
                onClick={() => {
                  toggleMenu('training');
                  navigate('/training');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isTrainingActive ? 'bg-primary/10' : 'hover:bg-muted'
                }`}
              >
                <BookOpen className={`w-5 h-5 ${isTrainingActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                {sidebarExpanded && (
                  <>
                    <span className={`flex-1 text-left text-sm font-medium ${isTrainingActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      Training
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedMenus.includes('training') ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {sidebarExpanded && expandedMenus.includes('training') && (
                <div className="ml-8 mt-1 space-y-1">
                  <button 
                    onClick={() => navigate('/training')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                      location.pathname === '/training' || location.pathname === '/'
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    All Modules
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                    In Progress
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                    Completed
                  </button>
                </div>
              )}
            </div>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
              <PlayCircle className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Simulations</span>
              )}
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
              <Award className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Certifications</span>
              )}
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 transition-colors group">
              <Calendar className="w-5 h-5 text-primary" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-primary">Schedule</span>
              )}
            </button>

            <div>
              <button
                onClick={() => toggleMenu('progress')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
              >
                <BarChart3 className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                {sidebarExpanded && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium text-muted-foreground group-hover:text-foreground">
                      Progress
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedMenus.includes('progress') ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {sidebarExpanded && expandedMenus.includes('progress') && (
                <div className="ml-8 mt-1 space-y-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                    Overview
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                    Assessments
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                    Performance
                  </button>
                </div>
              )}
            </div>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
              <FileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Resources</span>
              )}
            </button>

            {sidebarExpanded && (
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-2">
                Settings
              </p>
            )}

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
              <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Settings</span>
              )}
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
            <HelpCircle className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            {sidebarExpanded && (
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Help</span>
            )}
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-colors group">
            <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-destructive" />
            {sidebarExpanded && (
              <span className="text-sm font-medium text-muted-foreground group-hover:text-destructive">Logout Account</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground">FFL Roleplay Simulator</h1>
            <span className="text-sm text-muted-foreground">Industrial Learning</span>
          </div>

          <div className="flex items-center gap-3">
            <img src="https://flagcdn.com/w40/us.png" alt="US Flag" className="w-6 h-4 object-cover" />
          </div>
        </header>

        <main className="flex-1 relative overflow-auto">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(4px)',
            }}
          />
          <div className="absolute inset-0 bg-background/30" />
          
          <div className="relative z-10 p-8 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
