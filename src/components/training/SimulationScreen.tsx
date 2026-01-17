import { useState, useRef, useEffect } from 'react';
import { Send, HelpCircle, Play } from 'lucide-react';
import { TrainingModule, ChatMessage as ChatMessageType } from '../../types/training';
import { ChatMessage } from './ChatMessage';
import { AICoachPanel } from './AICoachPanel';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface SimulationScreenProps {
  module: TrainingModule;
  onComplete?: () => void;
}

type SimulationPhase = 'chat' | 'decision' | 'correct' | 'incorrect' | 'video' | 'complete';

const getInitialMessages = (module: TrainingModule): ChatMessageType[] => {
  const rachel = module.team.find(m => m.id === 'rachel');
  return [
    {
      id: 'msg-1',
      speakerId: 'rachel',
      speakerName: rachel?.name || 'Rachel Chen',
      speakerRole: rachel?.role || 'Lead Maintenance Technician',
      speakerAvatar: rachel?.avatar || 'RC',
      speakerAvatarUrl: rachel?.avatarUrl,
      content: "Morning! We're ready to get started on P-101. The guys are setting up their tools now. I've got the permit here - want me to walk you through what we're doing, or do you want to verify the isolation points first?",
      timestamp: new Date(),
      isUser: false,
    }
  ];
};

// Script of the conversation leading to the decision point

// Script of the conversation leading to the decision point
const conversationScript: { trigger: string; response: string }[] = [
  {
    trigger: '', // First response after initial message
    response: "Got it. The isolation points are marked on the P&ID - there's the suction valve, discharge valve, and the electrical disconnect. Mike's confirmed LOTO from the control room. Want me to show you where each one is on the equipment?"
  },
  {
    trigger: '',
    response: "Perfect. All isolation points have been verified and we're good to proceed. The pump has been depressurized according to the procedure."
  }
];

const DECISION_QUESTION = "Alright, let's proceed with the task. Remember, safety is our top priority. Do you want to crack the bleeder first or head straight to the blind flange?";

const CORRECT_RESPONSE = "Great choice! You vent a small hiss to zero, confirm no odor, and note a 0% LEL reading. This shows respect for trapped pressure and protects against spray when the blind comes off.";

export function SimulationScreen({ module, onComplete }: SimulationScreenProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>(getInitialMessages(module));
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCoachPanelOpen, setIsCoachPanelOpen] = useState(false);
  const [phase, setPhase] = useState<SimulationPhase>('chat');
  const [messageCount, setMessageCount] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showContinueButton]);

  const getRachelMessage = (content: string): ChatMessageType => {
    const rachel = module.team.find(m => m.id === 'rachel');
    return {
      id: `msg-${Date.now()}`,
      speakerId: 'rachel',
      speakerName: rachel?.name || 'Rachel Chen',
      speakerRole: rachel?.role || 'Lead Maintenance Technician',
      speakerAvatar: rachel?.avatar || 'RC',
      speakerAvatarUrl: rachel?.avatarUrl,
      content,
      timestamp: new Date(),
      isUser: false,
    };
  };

  const checkAnswer = (input: string): 'correct' | 'incorrect' | null => {
    const lowerInput = input.toLowerCase();
    
    // Check for correct answer
    if (lowerInput.includes('bleeder') || lowerInput.includes('crack') || lowerInput.includes('vent')) {
      return 'correct';
    }
    
    // Check for incorrect answer
    if (lowerInput.includes('blind') || lowerInput.includes('flange') || lowerInput.includes('straight')) {
      return 'incorrect';
    }
    
    return null;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}-user`,
      speakerId: 'user',
      speakerName: 'You',
      content: inputValue.trim(),
      timestamp: new Date(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    // If we're at the decision point, check the answer
    if (phase === 'decision') {
      const result = checkAnswer(userInput);
      
      setTimeout(() => {
        if (result === 'correct') {
          const congratsMessage = getRachelMessage(CORRECT_RESPONSE);
          setMessages(prev => [...prev, congratsMessage]);
          setPhase('correct');
          setShowContinueButton(true);
        } else if (result === 'incorrect') {
          const incorrectMessage = getRachelMessage("Hold on - going straight to the blind flange without venting first could be dangerous. There might still be trapped pressure. Let's crack the bleeder first to verify zero energy before we proceed.");
          setMessages(prev => [...prev, incorrectMessage]);
          // Give them another chance
          setTimeout(() => {
            const retryMessage = getRachelMessage("So, let's try again. Do you want to crack the bleeder first to verify zero energy?");
            setMessages(prev => [...prev, retryMessage]);
            setIsTyping(false);
          }, 1500);
        } else {
          // Unclear answer, prompt again
          const clarifyMessage = getRachelMessage("I need a clear answer on this one - it's a safety-critical decision. Should we crack the bleeder first, or head straight to the blind flange?");
          setMessages(prev => [...prev, clarifyMessage]);
          setIsTyping(false);
        }
        if (result === 'correct') {
          setIsTyping(false);
        }
      }, 1500);
      return;
    }

    // Regular conversation flow
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    setTimeout(() => {
      let responseContent: string;
      
      if (newCount < conversationScript.length) {
        responseContent = conversationScript[newCount].response;
        const responseMessage = getRachelMessage(responseContent);
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
      } else if (newCount === conversationScript.length) {
        // Transition to decision point
        responseContent = DECISION_QUESTION;
        const responseMessage = getRachelMessage(responseContent);
        setMessages(prev => [...prev, responseMessage]);
        setPhase('decision');
        setIsTyping(false);
      } else {
        // Already past decision point in chat phase, redirect to decision
        const responseMessage = getRachelMessage(DECISION_QUESTION);
        setMessages(prev => [...prev, responseMessage]);
        setPhase('decision');
        setIsTyping(false);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleContinueToVideo = () => {
    setPhase('video');
    setShowContinueButton(false);
  };

  const handleVideoComplete = () => {
    onComplete?.();
  };

  // Show video player after correct answer
  if (phase === 'video') {
    return (
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Completion Video</span>
          </div>
        </div>

        {/* Video Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-muted/30">
          <div className="w-full max-w-2xl aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-border mb-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">Completion video placeholder</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Video would play here</p>
            </div>
          </div>
          
          <Button onClick={handleVideoComplete} size="lg" className="px-8">
            Complete Training
          </Button>
        </div>
      </div>
    );
  }

  const currentPhaseLabel = phase === 'decision' ? 'Decision Point' : phase === 'correct' ? 'Completed' : 'Active';

  return (
    <div className="flex h-[calc(100vh-200px)] max-h-[700px] gap-0">
      {/* Main Simulation Area */}
      <div className={`bg-card rounded-2xl shadow-lg overflow-hidden flex flex-col flex-1 transition-all duration-300 ${isCoachPanelOpen ? 'md:rounded-r-none' : ''}`}>
      {/* Inline Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        {/* Left: Group Chat with Avatars */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Group Chat</span>
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
        </div>

        {/* Right: Help Button */}
        <button
          onClick={() => setIsCoachPanelOpen(true)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-onboarding="help-button"
        >
          <HelpCircle className="w-4 h-4" />
          Help
        </button>
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

        {/* Continue to Video Button - appears after correct answer */}
        {showContinueButton && (
          <div className="flex justify-center pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Button 
              onClick={handleContinueToVideo}
              size="lg"
              className="px-8 gap-2"
            >
              <Play className="w-4 h-4" />
              Continue to Completion Video
            </Button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - disabled after correct answer */}
      <div className="p-4 border-t border-border flex gap-3">
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={showContinueButton ? "Simulation complete - click Continue above" : "Type your response..."}
          className="min-h-[52px] max-h-[120px] resize-none"
          rows={1}
          disabled={showContinueButton}
        />
        <Button 
          onClick={handleSend} 
          disabled={!inputValue.trim() || isTyping || showContinueButton}
          size="lg"
          className="px-6"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      </div>

      {/* AI Coach Panel */}
      <AICoachPanel
        module={module}
        currentPhase={currentPhaseLabel}
        isOpen={isCoachPanelOpen}
        onClose={() => setIsCoachPanelOpen(false)}
      />
    </div>
  );
}