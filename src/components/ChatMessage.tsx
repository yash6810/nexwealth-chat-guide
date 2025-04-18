
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';
import { Message } from '@/types/chat';
import TypingIndicator from './TypingIndicator';

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const isBot = message.role === 'bot';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cn(
      "flex w-full mb-4 animate-slide-in",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "flex gap-3 max-w-[85%] md:max-w-[70%]",
        isBot ? "flex-row" : "flex-row-reverse"
      )}>
        {/* Avatar */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isBot ? "bg-nexwealth-teal" : "bg-nexwealth-blue"
        )}>
          {isBot ? 
            <Bot size={16} className="text-white" /> :
            <User size={16} className="text-white" />
          }
        </div>

        {/* Message content */}
        <div className="flex flex-col">
          <div className={cn(
            "px-4 py-2 rounded-2xl",
            isBot ? "bg-white border border-gray-200 text-gray-800 rounded-tl-none" : 
                   "bg-nexwealth-blue text-white rounded-tr-none"
          )}>
            {message.content ? (
              <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
            ) : isBot && isLast ? (
              <TypingIndicator />
            ) : null}
          </div>
          <span className={cn(
            "text-xs text-gray-500 mt-1 self-start",
            !isBot && "self-end"
          )}>
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
