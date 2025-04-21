import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Plus, Globe, Settings } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/chat';
import { useChat } from '@/hooks/useChat';
import LanguageSelector from './LanguageSelector';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ChatSidebar from './ChatSidebar';
import { ThemeToggle } from "@/components/ThemeToggle";

const ChatContainer: React.FC = () => {
  const { 
    messages, 
    chats, 
    activeChat,
    sendMessage, 
    createNewChat,
    switchChat,
    deleteChat,
    isLoading, 
    currentLanguage, 
    changeLanguage,
    useWebSearch,
    toggleWebSearch
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
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
    <div className="relative h-full">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex h-full">
        <ChatSidebar 
          chats={chats}
          activeChat={activeChat}
          onSelectChat={switchChat}
          onCreateChat={createNewChat}
          onDeleteChat={deleteChat}
          show={showSidebar}
          onClose={() => setShowSidebar(false)}
        />
        
        <div className="flex flex-col h-full w-full bg-gray-50/50 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setShowSidebar(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </Button>
              
              <div>
                <h2 className="font-bold text-nexwealth-blue">NexWealth AI Assistant</h2>
                <p className="text-xs text-gray-500">Ask me anything about personal finance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={createNewChat}
                  >
                    <Plus size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>New Chat</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Globe size={16} className="text-gray-500" />
                    <Switch 
                      checked={useWebSearch}
                      onCheckedChange={toggleWebSearch}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {useWebSearch ? 'Web search enabled' : 'Web search disabled'}
                </TooltipContent>
              </Tooltip>
              
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={changeLanguage}
              />
              
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          
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
              </div>
              <p className="text-xl font-medium mb-2 text-nexwealth-blue">Welcome to NexWealth!</p>
              <p className="text-gray-500 max-w-md text-center mb-8">Your AI financial assistant with web browsing capabilities. Ask me about investing, saving, budgeting, or any personal finance questions you have.</p>
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
            ) : (
              <>
                {messages.map((msg, index) => (
                  <ChatMessage 
                    key={msg.id} 
                    message={msg} 
                    isLast={index === messages.length - 1} 
                  />
                ))}
              </>
            )}
            <div ref={messagesEndRef} />
            
            {showScrollButton && (
              <Button 
                className="absolute bottom-20 right-6 bg-nexwealth-blue rounded-full p-2 shadow-lg"
                onClick={scrollToBottom}
              >
                <ArrowDown size={16} />
              </Button>
            )}
          </div>
          
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
