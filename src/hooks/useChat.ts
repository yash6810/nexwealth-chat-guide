import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { generateResponse } from '@/services/chatService';
import { conversationContext } from '@/services/contextService';

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [useWebSearch, setUseWebSearch] = useState(true);
  
  useEffect(() => {
    const savedChats = localStorage.getItem('nexwealth-chats');
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        
        if (parsedChats.length > 0) {
          setActiveChat(parsedChats[0].id);
        }
      } catch (error) {
        console.error('Error loading chat history', error);
      }
    } else {
      createNewChat();
    }
  }, []);
  
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('nexwealth-chats', JSON.stringify(chats));
    }
  }, [chats]);
  
  const messages = activeChat 
    ? chats.find(chat => chat.id === activeChat)?.messages || []
    : [];

  const createNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString()
    };
    
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChatId);
    conversationContext.clearContext();
    return newChatId;
  };

  const updateChatTitle = (chatId: string, userMessage: string) => {
    const title = userMessage.length > 30
      ? `${userMessage.substring(0, 30)}...`
      : userMessage;
      
    setChats(prev => prev.map(chat => 
      chat.id === chatId
        ? { ...chat, title }
        : chat
    ));
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const currentChatId = activeChat || createNewChat();
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 0 ? content : chat.title
          }
        : chat
    ));
    
    conversationContext.addToHistory(userMessage);
    
    const botMessageId = `bot-${Date.now()}`;
    
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId
        ? { 
            ...chat, 
            messages: [...chat.messages, {
              id: botMessageId, 
              content: '', 
              role: 'bot' as const, 
              timestamp: new Date().toISOString()
            }]
          }
        : chat
    ));
    
    setIsLoading(true);
    
    try {
      const currentChat = chats.find(chat => chat.id === currentChatId);
      const currentMessages = currentChat ? currentChat.messages : [];
      
      const response = await generateResponse(
        content, 
        currentMessages, 
        currentLanguage, 
        useWebSearch
      );
      
      const botMessage = {
        id: botMessageId,
        content: response,
        role: 'bot' as const,
        timestamp: new Date().toISOString()
      };
      
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId
          ? { 
              ...chat, 
              messages: chat.messages.map(msg => 
                msg.id === botMessageId ? botMessage : msg
              )
            }
          : chat
      ));
      
      conversationContext.addToHistory(botMessage);
    } catch (error) {
      console.error('Error generating response', error);
      
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId
          ? { 
              ...chat, 
              messages: chat.messages.map(msg => 
                msg.id === botMessageId 
                  ? { ...msg, content: "I'm sorry, I'm having trouble responding right now. Please try again." } 
                  : msg
              )
            }
          : chat
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = (chatId?: string) => {
    if (chatId) {
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      
      if (activeChat === chatId) {
        const remainingChats = chats.filter(chat => chat.id !== chatId);
        setActiveChat(remainingChats.length > 0 ? remainingChats[0].id : null);
      }
    } else {
      setChats([]);
      setActiveChat(null);
    }
    
    conversationContext.clearContext();
    localStorage.removeItem('nexwealth-chats');
  };

  const switchChat = (chatId: string) => {
    setActiveChat(chatId);
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      conversationContext.clearContext();
      const lastMessages = chat.messages.slice(-5);
      lastMessages.forEach(msg => conversationContext.addToHistory(msg));
    }
  };

  const deleteChat = (chatId: string) => {
    clearChat(chatId);
  };

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
  };
  
  const toggleWebSearch = (enabled: boolean) => {
    setUseWebSearch(enabled);
  };

  return {
    messages,
    chats,
    activeChat,
    sendMessage,
    clearChat,
    createNewChat,
    switchChat,
    deleteChat,
    isLoading,
    currentLanguage,
    changeLanguage,
    useWebSearch,
    toggleWebSearch
  };
}
