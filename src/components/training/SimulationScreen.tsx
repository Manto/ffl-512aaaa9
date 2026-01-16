import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen } from 'lucide-react';
import { TrainingModule, ChatMessage as ChatMessageType, TrainingStep } from '../../types/training';
import { ChatMessage } from './ChatMessage';
import { SimulationResourcesDropdown } from './SimulationResourcesDropdown';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface SimulationScreenProps {
  module: TrainingModule;
  currentStep: TrainingStep;
  onStepClick?: (step: TrainingStep) => void;
  onComplete?: () => void;
}

const getInitialMessage = (module: TrainingModule): ChatMessageType => {
  const rachel = module.team.find(m => m.id === 'rachel');
  return {
    id: 'msg-1',
    speakerId: 'rachel',
    speakerName: rachel?.name || 'Rachel Chen',
    speakerRole: rachel?.role || 'Lead Maintenance Technician',
    speakerAvatar: rachel?.avatar || 'RC',
    speakerAvatarUrl: rachel?.avatarUrl,
    content: "Morning! We're ready to get started on P-101. The guys are setting up their tools now. I've got the permit here - want me to walk you through what we're doing, or do you want to verify the isolation points first?",
    timestamp: new Date(),
    isUser: false,
  };
};

const steps: { id: TrainingStep; label: string }[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'briefing', label: 'Briefing' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'review', label: 'Review' },
];

export function SimulationScreen({ module, currentStep, onStepClick, onComplete }: SimulationScreenProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([getInitialMessage(module)]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessageType = {
      id: `msg-${messages.length + 1}`,
      speakerId: 'user',
      speakerName: 'You',
      content: inputValue.trim(),
      timestamp: new Date(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate NPC response (placeholder for future AI integration)
    setTimeout(() => {
      const rachel = module.team.find(m => m.id === 'rachel');
      const responseMessage: ChatMessageType = {
        id: `msg-${messages.length + 2}`,
        speakerId: 'rachel',
        speakerName: rachel?.name || 'Rachel Chen',
        speakerRole: rachel?.role || 'Lead Maintenance Technician',
        speakerAvatar: rachel?.avatar || 'RC',
        speakerAvatarUrl: rachel?.avatarUrl,
        content: "Got it. The isolation points are marked on the P&ID - there's the suction valve, discharge valve, and the electrical disconnect. Mike's confirmed LOTO from the control room. Want me to show you where each one is on the equipment?",
        timestamp: new Date(),
        isUser: false,
      };
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getStepState = (stepId: TrainingStep) => {
    const stepOrder: TrainingStep[] = ['intro', 'briefing', 'simulation', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);
    
    if (stepId === currentStep) return 'current';
    if (stepIndex < currentIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
      {/* Inline Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        {/* Left: Breadcrumb Navigation */}
        <div className="flex items-center gap-1">
          {steps.map((step, index) => {
            const state = getStepState(step.id);
            return (
              <div key={step.id} className="flex items-center">
                {index > 0 && (
                  <span className="text-muted-foreground/50 mx-1">/</span>
                )}
                <button
                  onClick={() => onStepClick?.(step.id)}
                  disabled={state === 'upcoming'}
                  className={`flex items-center gap-1.5 text-sm transition-colors ${
                    state === 'current'
                      ? 'text-foreground font-medium'
                      : state === 'completed'
                      ? 'text-muted-foreground hover:text-foreground cursor-pointer'
                      : 'text-muted-foreground/50 cursor-not-allowed'
                  }`}
                >
                  {state === 'current' && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                  {step.label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Team Avatars, Resources, Done */}
        <div className="flex items-center gap-4">
          {/* Separator */}
          <div className="h-5 w-px bg-border" />

          {/* Avatar Stack */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {module.team.slice(0, 4).map((member, index) => (
                <Avatar 
                  key={member.id} 
                  className="h-7 w-7 border-2 border-card"
                  style={{ zIndex: module.team.length - index }}
                >
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
                    {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {module.team.length} in team
            </span>
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-border" />

          {/* Resources Button */}
          <div className="relative">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Resources
            </button>
            
            {isResourcesOpen && (
              <SimulationResourcesDropdown 
                module={module} 
                onClose={() => setIsResourcesOpen(false)} 
              />
            )}
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-border" />

          {/* Done Button */}
          <Button 
            size="sm" 
            onClick={onComplete}
            className="px-4"
          >
            Done
          </Button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs">Rachel is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border flex gap-3">
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your response..."
          className="min-h-[52px] max-h-[120px] resize-none"
          rows={1}
        />
        <Button 
          onClick={handleSend} 
          disabled={!inputValue.trim() || isTyping}
          size="lg"
          className="px-6"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
