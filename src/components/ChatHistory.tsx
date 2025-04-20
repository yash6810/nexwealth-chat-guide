
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Trash2, ChevronRight } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChatHistory = () => {
  const { chats, switchChat, clearChat, activeChat } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const filteredChats = searchTerm ? 
    chats.filter(chat => 
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : 
    chats;
    
  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    setDialogOpen(true);
  };
  
  const handleSwitchToChat = (chatId: string) => {
    switchChat(chatId);
    setDialogOpen(false);
  };

  // Group chats by date
  const chatsByDate = filteredChats.reduce((groups: Record<string, typeof chats>, chat) => {
    const date = new Date(chat.createdAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(chat);
    return groups;
  }, {});

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Chat History</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          View and search your past conversations
        </p>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search your chat history..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {Object.keys(chatsByDate).length > 0 ? (
          Object.entries(chatsByDate).map(([date, dateChats]) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {format(new Date(date), 'PPPP')}
              </h3>
              
              {dateChats.map((chat) => {
                // Get first user message to display as summary
                const firstUserMessage = chat.messages.find(msg => msg.role === 'user');
                
                return (
                  <Card 
                    key={chat.id}
                    className={`p-4 mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      chat.id === activeChat ? 'border-nexwealth-teal' : ''
                    }`}
                    onClick={() => handleChatSelect(chat.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium truncate">{chat.title}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {firstUserMessage?.content || "Empty conversation"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {format(new Date(chat.createdAt), 'p')}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Card>
                );
              })}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            {searchTerm ? 'No matching chats found.' : 'No chat history yet.'}
          </div>
        )}
      </div>
      
      {chats.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10" onClick={() => clearChat()}>
            <Trash2 className="h-4 w-4 mr-2" /> Clear All History
          </Button>
        </div>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedChat && (() => {
            const chat = chats.find(c => c.id === selectedChat);
            if (!chat) return null;
            
            return (
              <>
                <DialogHeader>
                  <DialogTitle>{chat.title}</DialogTitle>
                  <DialogDescription>
                    {format(new Date(chat.createdAt), 'PPpp')}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 my-4">
                  {chat.messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`p-4 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-nexwealth-blue/10 ml-auto max-w-[80%]' 
                          : 'bg-gray-100 dark:bg-gray-800 mr-auto max-w-[80%]'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(msg.timestamp), 'p')}
                      </p>
                    </div>
                  ))}
                </div>
                
                <DialogFooter>
                  <Button 
                    variant="default"
                    className="bg-nexwealth-teal hover:bg-nexwealth-teal/90"
                    onClick={() => handleSwitchToChat(selectedChat)}
                  >
                    Continue this conversation
                  </Button>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatHistory;
