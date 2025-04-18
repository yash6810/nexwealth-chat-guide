
import React, { useState } from 'react';
import { Send, Wallet, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Predefined questions/suggestions
  const suggestions = [
    { text: "How do I start investing?", icon: <Wallet className="w-4 h-4" /> },
    { text: "Should I save or invest?", icon: <Wallet className="w-4 h-4" /> },
    { text: "Explain retirement plans", icon: <Lightbulb className="w-4 h-4" /> },
    { text: "Tips for financial freedom", icon: <Lightbulb className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full border-t bg-white/80 backdrop-blur-sm p-4">
      {/* Suggestions */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none pb-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setMessage(suggestion.text)}
            className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors whitespace-nowrap"
          >
            {suggestion.icon}
            {suggestion.text}
          </button>
        ))}
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Ask about personal finance..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 pr-10 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-nexwealth-teal"
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={!message.trim() || isLoading}
          className="bg-nexwealth-teal hover:bg-nexwealth-blue text-white p-3 rounded-full"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
