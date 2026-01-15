import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { TrainingModule, ChatMessage as ChatMessageType } from '../../types/training';
import { ChatMessage } from './ChatMessage';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface SimulationScreenProps {
  module: TrainingModule;
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

export function SimulationScreen({ module }: SimulationScreenProps) {
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
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px] bg-card border border-border rounded-xl overflow-hidden">
      {/* Unified Header with Team + Context */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {module.team.slice(0, 4).map((member) => (
              <img
                key={member.id}
                src={`https://i.pravatar.cc/40?u=${member.id}`}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Field Team Chat</h3>
            <p className="text-xs text-muted-foreground">
              {module.team.length} members • {module.userRole}
            </p>
          </div>
        </div>
        <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
          Simulation Active
        </span>
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
