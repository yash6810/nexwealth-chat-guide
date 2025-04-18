
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { generateResponse } from '@/services/chatService';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    
    // Add empty bot message to show typing indicator
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
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Get bot response
      const response = await generateResponse(content, messages);
      
      // Update bot message with response
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, content: response } 
          : msg
      ));
    } catch (error) {
      console.error('Error generating response', error);
      
      // Update bot message with error
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
  };

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading,
  };
}
