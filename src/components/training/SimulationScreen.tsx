import { useState, useRef, useEffect } from 'react';
import { Send, FileText, Check } from 'lucide-react';
import { TrainingModule, ChatMessage as ChatMessageType, TrainingStep } from '../../types/training';
import { ChatMessage } from './ChatMessage';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { ProgressStepper } from './ProgressStepper';

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
    content: "Morning! We're ready to get started on P-101. The guys are setting up their tools now. I've got the permit here - want me to walk you through what we're doing, or do you want to verify the isolation points first?",
    timestamp: new Date(),
    isUser: false,
  };
};

export function SimulationScreen({ module, currentStep, onStepClick, onComplete }: SimulationScreenProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([getInitialMessage(module)]);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px] bg-card border border-border rounded-xl overflow-hidden">
      {/* Header with Breadcrumb + Team + Resources */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        {/* Left: Breadcrumb + Team avatars */}
        <div className="flex items-center gap-4">
          <ProgressStepper 
            currentStep={currentStep} 
            onStepClick={onStepClick}
            variant="breadcrumb"
          />
          
          <div className="h-5 w-px bg-border hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {module.team.slice(0, 3).map((member) => (
                <Popover key={member.id}>
                  <PopoverTrigger asChild>
                    <button className="relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full">
                      <img
                        src={`https://i.pravatar.cc/40?u=${member.id}`}
                        alt={member.name}
                        className="w-7 h-7 rounded-full border-2 border-background object-cover hover:scale-110 transition-transform cursor-pointer"
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3 bg-popover" align="start">
                    <div className="flex items-start gap-3">
                      <img
                        src={`https://i.pravatar.cc/64?u=${member.id}`}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm">{member.name}</h4>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                        {member.description && (
                          <p className="text-xs text-muted-foreground mt-1">{member.description}</p>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {module.team.length} in team
            </span>
          </div>
        </div>

        {/* Right: Resources + Done */}
        <div className="flex items-center gap-2">
          <Sheet open={resourcesOpen} onOpenChange={setResourcesOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Resources</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Scenario Resources</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                <div className="space-y-3 pr-4">
                  {module.resources.map((resource, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{resource.title}</h4>
                          {resource.description && (
                            <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {onComplete && (
            <Button variant="default" size="sm" onClick={onComplete} className="gap-1.5">
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Done</span>
            </Button>
          )}
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
      <div className="p-3 border-t border-border bg-muted/20">
        <div className="flex gap-3">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your response..."
            className="min-h-[44px] max-h-[120px] resize-none bg-background"
            rows={1}
          />
          <Button 
            onClick={handleSend} 
            disabled={!inputValue.trim() || isTyping}
            size="lg"
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
