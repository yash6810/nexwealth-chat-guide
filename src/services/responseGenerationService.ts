
import { Message } from '@/types/chat';
import { extractTopics, findMostRelevantTopic } from '@/utils/nlpUtils';
import { conversationContext } from './contextService';
import { financialGlossaryMultilingual } from '@/data/financialGlossary';
import { financialAdviceTemplates, welcomeMessages } from '@/data/responseTemplates';

const getRandomAdvice = (category: keyof typeof financialAdviceTemplates): string => {
  const advice = financialAdviceTemplates[category];
  return advice[Math.floor(Math.random() * advice.length)];
};

export const generateResponse = async (
  userMessage: string,
  chatHistory: Message[],
  language: string = 'en'
): Promise<string> => {
  const message = userMessage.toLowerCase();
  const extractedTopics = extractTopics(message);
  
  if (extractedTopics.length > 0) {
    conversationContext.updateContext('currentTopics', extractedTopics);
  }

  if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
    const lastTopic = conversationContext.getLastUserTopic();
    if (lastTopic) {
      return `${welcomeMessages[language] || welcomeMessages.en} I see we were discussing ${lastTopic}. Would you like to continue that conversation?`;
    }
    return welcomeMessages[language] || welcomeMessages.en;
  }

  if (extractedTopics.length > 0) {
    const mainTopic = findMostRelevantTopic(message, Object.keys(financialAdviceTemplates));
    if (mainTopic) {
      const advice = getRandomAdvice(mainTopic as keyof typeof financialAdviceTemplates);
      conversationContext.updateContext('lastAdviceTopic', mainTopic);
      return advice;
    }
  }

  for (const [term, definitionObj] of Object.entries(financialGlossaryMultilingual)) {
    const similarity = findMostRelevantTopic(message, [term]);
    if (similarity) {
      const definition = definitionObj[language] || definitionObj['en'];
      const lastTopic = conversationContext.getContext('lastAdviceTopic');
      
      if (lastTopic) {
        return `${term}: ${definition}\n\nThis relates to our previous discussion about ${lastTopic}. Would you like to know more about how they're connected?`;
      }
      return `${term}: ${definition}\n\nWould you like to know more about how this relates to your financial situation?`;
    }
  }

  const lastTopic = conversationContext.getContext('lastAdviceTopic');
  const genericResponses = [
    lastTopic
      ? `Building on our discussion about ${lastTopic}, let's explore how this relates to your financial goals.`
      : "That's a great question about personal finance. When making financial decisions, it's important to consider your long-term goals and risk tolerance.",
    "I'd be happy to discuss that financial topic. Building financial literacy is an important step toward financial independence.",
    lastTopic
      ? `While we were discussing ${lastTopic}, this brings up an interesting point about financial planning.`
      : "Financial planning requires a personalized approach. Everyone's situation is unique, but generally, diversification and long-term planning are key strategies."
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};
