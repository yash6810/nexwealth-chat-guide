
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/chat';
import { useChat } from '@/hooks/useChat';
import LanguageSelector from './LanguageSelector';

const ChatContainer: React.FC = () => {
  const { messages, sendMessage, isLoading, currentLanguage, changeLanguage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Check if should show scroll down button
  useEffect(() => {
    const checkScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isAtBottom);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <div>
          <h2 className="font-bold text-nexwealth-blue">NexWealth AI Assistant</h2>
          <p className="text-xs text-gray-500">Ask me anything about personal finance</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={changeLanguage}
          />
          {/* Status indicator */}
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-nexwealth-teal/10 rounded-full flex items-center justify-center mb-4 animate-float">
              <div className="w-12 h-12 bg-nexwealth-teal/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-nexwealth-teal rounded-full flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-xl font-medium mb-2 text-nexwealth-blue">Welcome to NexWealth!</p>
            <p className="text-gray-500 max-w-md text-center mb-8">Your AI financial assistant. Ask me about investing, saving, budgeting, or any personal finance questions you have.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                "How do I create a budget?",
                "What's the difference between a Roth and Traditional IRA?",
                "How much should I save for retirement?",
                "What's the 50/30/20 rule?"
              ].map((q, i) => (
                <button 
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="bg-white p-2 rounded-md border border-gray-200 text-left hover:bg-gray-50 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <ChatMessage 
                key={index} 
                message={msg} 
                isLast={index === messages.length - 1} 
              />
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
        
        {/* Scroll to bottom button */}
        {showScrollButton && (
          <Button 
            className="absolute bottom-20 right-6 bg-nexwealth-blue rounded-full p-2 shadow-lg"
            onClick={scrollToBottom}
          >
            <ArrowDown size={16} />
          </Button>
        )}
      </div>
      
      {/* Chat input */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
