
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: string;
}

export interface ChatHistory {
  messages: Message[];
}
