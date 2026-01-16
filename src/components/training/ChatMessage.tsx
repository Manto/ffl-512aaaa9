import { ChatMessage as ChatMessageType } from '../../types/training';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (message.isUser) {
    return (
      <div className="flex justify-end gap-3 animate-in slide-in-from-right-2 duration-300">
        <div className="flex flex-col items-end max-w-[75%]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">
              {formatTime(message.timestamp)}
            </span>
            <span className="text-sm font-medium text-foreground">You</span>
          </div>
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" alt="You" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
            You
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3 animate-in slide-in-from-left-2 duration-300">
      <Avatar className="h-9 w-9 border-2 border-border">
        <AvatarImage src={message.speakerAvatarUrl} alt={message.speakerName} />
        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
          {message.speakerAvatar || message.speakerName.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col max-w-[75%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground">{message.speakerName}</span>
          {message.speakerRole && (
            <span className="text-xs text-muted-foreground">• {message.speakerRole}</span>
          )}
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="text-sm leading-relaxed text-foreground">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
