import { useState } from 'react';
import {
  Home,
  Menu,
  BookOpen,
  CheckCircle2,
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
  Check,
  Circle
} from 'lucide-react';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['training']);

  const steps = [
    { id: 'intro', label: 'Intro', description: 'Introduction' },
    { id: 'simulation', label: 'Simulation', description: 'Interactive Training' },
    { id: 'review', label: 'Review', description: 'Summary & Assessment' }
  ];

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`${sidebarExpanded ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}>
        <div className="p-4 border-b border-gray-200">
          {sidebarExpanded ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                JC
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Trainee</p>
                <p className="text-sm font-semibold text-gray-900 truncate">James Carter</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                JC
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm z-10"
        >
          {sidebarExpanded ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {sidebarExpanded && (
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Main
              </p>
            )}

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
              <Home className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Dashboard</span>
              )}
            </button>

            <div>
              <button
                onClick={() => toggleMenu('training')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <BookOpen className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                {sidebarExpanded && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Training
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedMenus.includes('training') ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {sidebarExpanded && expandedMenus.includes('training') && (
                <div className="ml-8 mt-1 space-y-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900">
                    All Modules
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900">
                    In Progress
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900 bg-gray-50">
                    Completed
                  </button>
                </div>
              )}
            </div>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
              <PlayCircle className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Simulations</span>
              )}
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
              <Award className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Certifications</span>
              )}
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 transition-colors group">
              <Calendar className="w-5 h-5 text-blue-600" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-blue-600">Schedule</span>
              )}
            </button>

            <div>
              <button
                onClick={() => toggleMenu('progress')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <BarChart3 className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                {sidebarExpanded && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Progress
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedMenus.includes('progress') ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {sidebarExpanded && expandedMenus.includes('progress') && (
                <div className="ml-8 mt-1 space-y-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900">
                    Overview
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900">
                    Assessments
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900">
                    Performance
                  </button>
                </div>
              )}
            </div>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
              <FileText className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Resources</span>
              )}
            </button>

            {sidebarExpanded && (
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">
                Settings
              </p>
            )}

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              {sidebarExpanded && (
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Settings</span>
              )}
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
            <HelpCircle className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            {sidebarExpanded && (
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Help</span>
            )}
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors group">
            <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
            {sidebarExpanded && (
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Logout Account</span>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-900">FFL Roleplay Simulator</h1>
            <span className="text-sm text-gray-500">Industrial Learning</span>
          </div>

          <div className="flex items-center gap-3">
            <img src="https://flagcdn.com/w40/us.png" alt="US Flag" className="w-6 h-4 object-cover" />
          </div>
        </header>

        <main className="flex-1 relative overflow-auto">
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(4px)',
            }}
          />

          <div className="relative z-10 p-8 max-w-6xl mx-auto">
            <button className="absolute top-8 right-8 p-3 bg-white hover:bg-gray-100 rounded-lg transition-colors shadow-lg">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    P-101 Isobutane Pump Recommissioning
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Version 2 with 5-scene structure covering background setup, team greeting, document review, operation decision, and stop work outcomes.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center flex-1">
                        <button
                          onClick={() => setActiveStep(index)}
                          className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                            index < activeStep
                              ? 'bg-green-500 border-green-500'
                              : index === activeStep
                              ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {index < activeStep ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : index === activeStep ? (
                            <Circle className="w-4 h-4 text-white fill-white" />
                          ) : (
                            <span className="text-sm font-semibold text-gray-400">{index + 1}</span>
                          )}
                        </button>

                        <div className="mt-2 text-center">
                          <p
                            className={`text-xs font-semibold ${
                              index <= activeStep ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </p>
                          <p
                            className={`text-xs ${
                              index <= activeStep ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 -mt-10 transition-all ${
                            index < activeStep ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="px-4 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                  Permit to Work (PTW)
                </h3>

                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    PERMIT TO WORK
                  </h4>
                  <div className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Permit Number:</span> PTW-2025-1024{' '}
                    <span className="font-semibold">Issue Date:</span> October 24, 2025{' '}
                    <span className="font-semibold">Valid Until:</span> October 24, 2025 at 18:00{' '}
                    <span className="font-semibold">Permit Status:</span>{' '}
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">ACTIVE</span>
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    EQUIPMENT INFORMATION
                  </h4>
                  <div className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Equipment ID:</span> P-101 Isobutane Pump{' '}
                    <span className="font-semibold">Location:</span> Process Area A, Unit 1{' '}
                    <span className="font-semibold">System:</span> Isobutane Transfer System
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    WORK DESCRIPTION
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
