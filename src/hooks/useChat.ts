import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { generateResponse } from '@/services/chatService';
import { conversationContext } from '@/services/contextService';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Load chat history from localStorage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem('nexwealth-chat');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat history', error);
      }
    }
  }, []);
  
  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('nexwealth-chat', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    conversationContext.addToHistory(userMessage);
    
    const botMessageId = `bot-${Date.now()}`;
    setMessages(prev => [
      ...prev, 
      {
        id: botMessageId, 
        content: '', 
        role: 'bot', 
        timestamp: new Date().toISOString()
      }
    ]);
    
    setIsLoading(true);
    
    try {
      const response = await generateResponse(content, messages, currentLanguage);
      const botMessage = {
        id: botMessageId,
        content: response,
        role: 'bot' as const,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId ? botMessage : msg
      ));
      conversationContext.addToHistory(botMessage);
    } catch (error) {
      console.error('Error generating response', error);
      
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, content: "I'm sorry, I'm having trouble responding right now. Please try again." } 
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('nexwealth-chat');
    conversationContext.clearContext();
  };

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading,
    currentLanguage,
    changeLanguage,
  };
}
