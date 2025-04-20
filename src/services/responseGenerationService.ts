
import { Message } from '@/types/chat';
import { extractTopics, findMostRelevantTopic } from '@/utils/nlpUtils';
import { conversationContext } from './contextService';
import { financialGlossaryMultilingual } from '@/data/financialGlossary';
import { financialAdviceTemplates, welcomeMessages } from '@/data/responseTemplates';

const getRandomAdvice = (category: keyof typeof financialAdviceTemplates): string => {
  const advice = financialAdviceTemplates[category];
  return advice[Math.floor(Math.random() * advice.length)];
};

const generateFollowUpQuestion = (topic: string): string => {
  const followUps: Record<string, string[]> = {
    budgeting: [
      "Would you like to learn more about specific budgeting methods?",
      "Shall we discuss tools that can help you budget better?",
      "Would you like to explore ways to reduce your expenses?"
    ],
    saving: [
      "Would you like to learn about high-yield savings accounts?",
      "Shall we discuss strategies to increase your savings rate?",
      "Would you like to explore automatic saving methods?"
    ],
    investing: [
      "Would you like to learn more about different investment vehicles?",
      "Shall we discuss how to build a diversified portfolio?",
      "Would you like to explore retirement investment options?"
    ],
    debt: [
      "Would you like to learn more about debt consolidation?",
      "Shall we discuss strategies to pay off debt faster?",
      "Would you like to explore ways to reduce your interest rates?"
    ]
  };

  const questions = followUps[topic] || [
    "Would you like to explore this topic further?",
    "What specific aspects would you like to learn more about?",
    "Shall we discuss how this relates to your financial goals?"
  ];

  return questions[Math.floor(Math.random() * questions.length)];
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

  // Handle greetings
  if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
    const lastTopic = conversationContext.getLastUserTopic();
    if (lastTopic) {
      return `${welcomeMessages[language] || welcomeMessages.en} I see we were discussing ${lastTopic}. Would you like to continue that conversation?`;
    }
    return welcomeMessages[language] || welcomeMessages.en;
  }

  // Handle financial topics
  if (extractedTopics.length > 0) {
    const mainTopic = findMostRelevantTopic(message, Object.keys(financialAdviceTemplates));
    if (mainTopic) {
      const advice = getRandomAdvice(mainTopic as keyof typeof financialAdviceTemplates);
      conversationContext.updateContext('lastAdviceTopic', mainTopic);
      return `${advice}\n\n${generateFollowUpQuestion(mainTopic)}`;
    }
  }

  // Handle financial terms
  for (const [term, definitionObj] of Object.entries(financialGlossaryMultilingual)) {
    const similarity = findMostRelevantTopic(message, [term]);
    if (similarity) {
      const definition = definitionObj[language] || definitionObj['en'];
      const lastTopic = conversationContext.getContext('lastAdviceTopic');
      
      if (lastTopic) {
        return `${term}: ${definition}\n\nThis relates to our previous discussion about ${lastTopic}. Would you like to know more about how they're connected?\n\nI can provide specific examples or practical applications if you're interested.`;
      }
      return `${term}: ${definition}\n\nWould you like to know more about how this relates to your financial situation? I can provide practical examples and tips for applying this knowledge.`;
    }
  }

  // Generic responses with context awareness
  const lastTopic = conversationContext.getContext('lastAdviceTopic');
  const genericResponses = [
    lastTopic
      ? `Let's explore how this connects to our discussion about ${lastTopic}. Understanding the relationships between different financial concepts can help you make better decisions. What specific aspects would you like to learn more about?`
      : "That's an interesting question about personal finance. To provide the most helpful response, could you tell me more about what specific aspect you'd like to explore? For example, are you interested in budgeting, investing, saving, or debt management?",
    "I'm here to help you understand financial concepts better. To provide more specific guidance, could you share what particular financial goals you're working towards?",
    lastTopic
      ? `Building on our discussion about ${lastTopic}, I can provide more detailed information or practical examples. What would be most helpful for your situation?`
      : "Financial planning is very personal, and I want to make sure I provide relevant advice. Could you tell me more about your specific interests or concerns?"
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};
