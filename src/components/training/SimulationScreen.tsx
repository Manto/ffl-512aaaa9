import { useState, useRef, useEffect } from 'react';
import { Send, Target, ArrowLeft } from 'lucide-react';
import { TrainingModule, ChatMessage as ChatMessageType } from '../../types/training';
import { ChatMessage } from './ChatMessage';
import { SimulationReferencePanel } from './SimulationReferencePanel';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface SimulationScreenProps {
  module: TrainingModule;
  onBack?: () => void;
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

export function SimulationScreen({ module, onBack }: SimulationScreenProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([getInitialMessage(module)]);
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
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
      {/* Back Navigation */}
      {onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="self-start mb-3 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Briefing
        </Button>
      )}

      {/* Simulation Intro Banner */}
      <div className="bg-card border border-primary/20 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              SIMULATION: Start Work Verification
            </h3>
            <p className="text-sm text-muted-foreground">
              You'll roleplay a real conversation with your field team. 
              Respond as you would on-site. Your choices will affect the outcome.
            </p>
            <p className="text-xs text-primary mt-2 font-medium">
              Your Role: {module.userRole}
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Reference Panel */}
      <div className="mb-4">
        <SimulationReferencePanel module={module} />
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto bg-card border border-border rounded-xl p-4 space-y-4">
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
      <div className="mt-4 flex gap-3">
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
