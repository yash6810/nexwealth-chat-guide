
import React from 'react';
import { Chat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus, Trash2, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: () => void;
  onDeleteChat: (chatId: string) => void;
  show?: boolean;
  onClose?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChat,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
  show,
  onClose
}) => {
  // Mobile sidebar with Sheet component
  const mobileSidebar = (
    <Sheet open={show} onOpenChange={(open) => !open && onClose?.()}>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="border-b p-4 flex items-center justify-between">
            <h2 className="font-bold">Chat History</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={18} />
            </Button>
          </div>
          <div className="p-4">
            <Button 
              onClick={onCreateChat}
              className="w-full bg-nexwealth-teal hover:bg-nexwealth-teal/90 mb-4"
            >
              <Plus size={16} className="mr-2" /> New Chat
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {renderChatList()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop sidebar as regular div
  const desktopSidebar = (
    <div className="hidden md:flex md:w-64 flex-col border-r bg-white overflow-hidden">
      <div className="border-b p-4">
        <h2 className="font-bold">Chat History</h2>
      </div>
      <div className="p-4">
        <Button 
          onClick={onCreateChat}
          className="w-full bg-nexwealth-teal hover:bg-nexwealth-teal/90 mb-4"
        >
          <Plus size={16} className="mr-2" /> New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderChatList()}
      </div>
    </div>
  );

  // Function to render the chat list
  function renderChatList() {
    return chats.length > 0 ? (
      <div className="space-y-1 px-2">
        {chats.map((chat) => (
          <div 
            key={chat.id}
            className={`flex group items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer ${
              chat.id === activeChat 
                ? 'bg-nexwealth-teal/10 text-nexwealth-teal' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="flex items-center space-x-3 truncate">
              <MessageSquare size={16} />
              <div className="truncate">
                <div className="truncate font-medium">{chat.title || 'New Conversation'}</div>
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(chat.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="opacity-0 group-hover:opacity-100 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>
    ) : (
      <div className="py-8 text-center text-sm text-gray-500">
        No conversations yet
      </div>
    );
  }

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default ChatSidebar;
