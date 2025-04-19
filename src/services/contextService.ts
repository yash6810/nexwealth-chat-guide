
import { Message } from '@/types/chat';

export class ConversationContext {
  private context: Map<string, any> = new Map();
  private messageHistory: Message[] = [];
  
  addToHistory(message: Message) {
    this.messageHistory = [...this.messageHistory, message].slice(-5); // Keep last 5 messages
  }
  
  updateContext(key: string, value: any) {
    this.context.set(key, value);
  }
  
  getContext(key: string) {
    return this.context.get(key);
  }
  
  getRecentMessages(): Message[] {
    return this.messageHistory;
  }
  
  getLastUserTopic(): string | null {
    const lastUserMessage = this.messageHistory
      .filter(m => m.role === 'user')
      .pop();
      
    return lastUserMessage?.content || null;
  }
  
  clearContext() {
    this.context.clear();
    this.messageHistory = [];
  }
}

export const conversationContext = new ConversationContext();
