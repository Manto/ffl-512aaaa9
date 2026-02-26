import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Users, FileText, HelpCircle } from 'lucide-react';
import { TrainingModule } from '../../types/training';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useOnboarding } from '../../contexts/OnboardingContext';

interface AICoachPanelProps {
  module: TrainingModule;
  currentPhase: string;
  isOpen: boolean;
  onClose: () => void;
}

interface CoachMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

type TabId = 'coach' | 'team' | 'resources';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/training-coach`;

export function AICoachPanel({ module, currentPhase, isOpen, onClose }: AICoachPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('coach');
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { resetOnboarding, startOnboarding } = useOnboarding();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: CoachMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          context: {
            moduleId: module.id,
            moduleName: module.title,
            equipment: module.permit?.equipment?.name || 'P-101 Pump',
            permitNumber: module.permit?.permitNumber || 'PTW-2024-0892',
            currentPhase,
            teamMembers: module.team.map(t => `${t.name} (${t.role})`),
          },
        }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      const updateAssistant = (content: string) => {
        assistantContent = content;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m));
          }
          return [...prev, { id: `msg-${Date.now()}-assistant`, role: 'assistant', content }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              updateAssistant(assistantContent);
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('AI Coach error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          role: 'assistant',
          content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'coach', label: 'AI Coach', icon: <Bot className="w-4 h-4" /> },
    { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <FileText className="w-4 h-4" /> },
  ];

  const renderCoachContent = () => (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">AI Training Coach</h3>
            <p className="text-sm text-muted-foreground">
              Ask me anything about the scenario, safety procedures, or your role.
            </p>
          </div>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2.5 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="rounded-full shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTeamContent = () => (
    <div className="p-4 space-y-3">
      {module.team.map(member => (
        <div key={member.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.avatarUrl} alt={member.name} />
            <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
              {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.role}</p>
            {member.description && (
              <p className="text-xs text-muted-foreground/70 mt-1">{member.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const handleReplayTutorial = () => {
    resetOnboarding();
    startOnboarding();
    onClose();
  };

  const renderResourcesContent = () => (
    <div className="p-4 space-y-4">
      {/* Scenario Brief */}
      <div className="rounded-xl border border-border p-4">
        <p className="font-medium text-foreground text-sm">Scenario Brief</p>
        <p className="text-xs text-muted-foreground mt-0.5">View scenario overview</p>
      </div>

      {/* Replay Tutorial Card */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground text-sm">Interface Tutorial</p>
            <p className="text-xs text-muted-foreground">Review how to navigate the training</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleReplayTutorial}>
            Replay
          </Button>
        </div>
      </div>

      {/* Available Resources */}
      <div className="space-y-2">
        <h4 className="font-medium text-foreground text-sm px-1">Available Resources</h4>
        {module.resources?.map((resource, index) => (
          <div key={index} className="rounded-xl border border-border p-4">
            <p className="font-medium text-foreground text-sm">{resource.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
          </div>
        ))}
        {/* Additional resources matching screenshot */}
        <div className="rounded-xl border border-border p-4">
          <p className="font-medium text-foreground text-sm">Start Work Check (SWC) Form</p>
          <p className="text-xs text-muted-foreground mt-1">Mandatory checklist for verifying safety requirements before starting work</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="font-medium text-foreground text-sm">Isolation List - P-101</p>
          <p className="text-xs text-muted-foreground mt-1">Complete list of all isolation points, locks, and tags for P-101 pump</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'coach':
        return renderCoachContent();
      case 'team':
        return renderTeamContent();
      case 'resources':
        return renderResourcesContent();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`
          fixed md:relative right-0 top-0 h-full z-50
          w-full md:w-[360px] bg-card border-l border-border
          flex flex-col
          animate-in slide-in-from-right duration-300
        `}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
          <h2 className="font-semibold text-foreground">Resources</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
