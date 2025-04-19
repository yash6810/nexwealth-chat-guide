
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Trash2, ChevronRight } from 'lucide-react';
import { Message } from '@/types/chat';
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

interface GroupedChat {
  date: string;
  messages: Message[];
}

// Helper function to group messages by date
const groupMessagesByDate = (messages: Message[]): GroupedChat[] => {
  const groups: { [key: string]: Message[] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  
  return Object.keys(groups).map(date => ({
    date,
    messages: groups[date].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
  })).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

const ChatHistory = () => {
  const { messages, clearChat } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<Message[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const groupedChats = groupMessagesByDate(messages);
  
  const filteredChats = searchTerm ? 
    groupedChats.map(group => ({
      ...group,
      messages: group.messages.filter(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.messages.length > 0) : 
    groupedChats;
    
  const handleChatSelect = (messages: Message[]) => {
    setSelectedChat(messages);
    setDialogOpen(true);
  };

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
        {filteredChats.length > 0 ? (
          filteredChats.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {format(new Date(group.date), 'PPPP')}
              </h3>
              
              {group.messages
                .filter(msg => msg.role === 'user')
                .map((msg, idx) => {
                  // Find all messages that belong to this conversation (user + bot responses)
                  const conversationStart = group.messages.indexOf(msg);
                  const conversation = [msg];
                  
                  // Add bot responses that follow this user message
                  for (let i = conversationStart + 1; i < group.messages.length; i++) {
                    if (group.messages[i].role === 'bot') {
                      conversation.push(group.messages[i]);
                    } else {
                      break;
                    }
                  }
                  
                  return (
                    <Card 
                      key={msg.id}
                      className="p-4 mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => handleChatSelect(conversation)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium truncate">{msg.content}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(msg.timestamp), 'p')}
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
      
      {messages.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10" onClick={clearChat}>
            <Trash2 className="h-4 w-4 mr-2" /> Clear All History
          </Button>
        </div>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Conversation</DialogTitle>
            <DialogDescription>
              {format(new Date(selectedChat[0]?.timestamp || new Date()), 'PPpp')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            {selectedChat.map((msg) => (
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatHistory;
