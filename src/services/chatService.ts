
import { Message } from '@/types/chat';

// Financial terms glossary for the chatbot to use
const financialGlossary = {
  "401k": "A retirement savings plan sponsored by an employer that allows workers to save and invest a portion of their paycheck before taxes are taken out.",
  "IRA": "Individual Retirement Account - a tax-advantaged investment account for retirement savings.",
  "Roth IRA": "A retirement account where contributions are made after-tax and withdrawals in retirement are tax-free.",
  "ETF": "Exchange-Traded Fund - a type of investment fund that trades on stock exchanges.",
  "Mutual Fund": "An investment vehicle made up of a pool of money collected from many investors to invest in securities.",
  "Compound Interest": "Interest calculated on the initial principal and on the accumulated interest over previous periods.",
  "FICO Score": "A credit score created by the Fair Isaac Corporation, used by lenders to determine credit risk.",
  "Diversification": "A risk management strategy that mixes a variety of investments within a portfolio.",
  "Dollar-Cost Averaging": "An investment strategy where you invest a fixed amount regularly, regardless of the asset's price.",
  "Emergency Fund": "Money set aside for unexpected expenses or financial emergencies, typically 3-6 months of living expenses.",
  "APR": "Annual Percentage Rate - the yearly rate charged for borrowing, expressed as a percentage."
};

// Sample financial advice templates
const financialAdviceTemplates = {
  budgeting: [
    "When creating a budget, consider using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
    "Track your spending for a month to understand where your money is going before creating a detailed budget.",
    "Consider using budgeting apps like Mint, YNAB, or Personal Capital to automate expense tracking.",
    "Review and adjust your budget regularly as your income and expenses change."
  ],
  saving: [
    "Start by building an emergency fund with 3-6 months of living expenses.",
    "Automate your savings by setting up automatic transfers to your savings account on payday.",
    "Consider high-yield savings accounts to earn more interest on your emergency fund.",
    "Use the 24-hour rule: wait 24 hours before making non-essential purchases to avoid impulse spending."
  ],
  investing: [
    "Start investing early to take advantage of compound interest over time.",
    "Consider low-cost index funds for a diversified investment portfolio, especially for beginners.",
    "Regularly contribute to retirement accounts like 401(k)s and IRAs for tax advantages.",
    "Diversify your investments across different asset classes to manage risk."
  ],
  debt: [
    "Prioritize paying off high-interest debt first, like credit cards.",
    "Consider the debt avalanche method (highest interest rate first) or debt snowball method (smallest balance first).",
    "Look into refinancing high-interest loans to lower rates when possible.",
    "Avoid taking on new debt while paying off existing obligations."
  ]
};

// Generate a chatbot response based on user input and chat history
export const generateResponse = async (
  userMessage: string, 
  chatHistory: Message[]
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const message = userMessage.toLowerCase();
  
  // Check for specific topics
  if (message.includes('budget') || message.includes('spending') || message.includes('expense')) {
    return getRandomAdvice('budgeting');
  } 
  else if (message.includes('save') || message.includes('saving') || message.includes('emergency fund')) {
    return getRandomAdvice('saving');
  } 
  else if (message.includes('invest') || message.includes('stock') || message.includes('bond') || 
           message.includes('etf') || message.includes('fund')) {
    return getRandomAdvice('investing');
  } 
  else if (message.includes('debt') || message.includes('loan') || message.includes('credit card') || 
           message.includes('mortgage')) {
    return getRandomAdvice('debt');
  } 
  else if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
    return "Hello! I'm your NexWealth financial assistant. How can I help you with your personal finances today?";
  }
  else if (message.includes('thank')) {
    return "You're welcome! I'm happy to help with any other financial questions you might have.";
  }
  else if (message.includes('how are you')) {
    return "I'm doing well, thank you for asking! I'm ready to assist you with any financial questions or concerns you might have.";
  }
  
  // Check for financial terms in the message
  for (const [term, definition] of Object.entries(financialGlossary)) {
    if (message.includes(term.toLowerCase())) {
      return `${term}: ${definition}\n\nWould you like to know more about how this relates to your financial situation?`;
    }
  }
  
  // Generic responses for other queries
  const genericResponses = [
    "That's a great question about personal finance. When making financial decisions, it's important to consider your long-term goals and risk tolerance.",
    "I'd be happy to discuss that financial topic. Building financial literacy is an important step toward financial independence.",
    "Financial planning requires a personalized approach. Everyone's situation is unique, but generally, diversification and long-term planning are key strategies.",
    "Thanks for asking about that. When it comes to personal finance, starting early and being consistent with your habits often leads to the best outcomes.",
    "That's an important financial question. Remember that financial health involves balancing present needs with future goals while managing risks appropriately."
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

// Get random financial advice from a specific category
const getRandomAdvice = (category: 'budgeting' | 'saving' | 'investing' | 'debt'): string => {
  const advice = financialAdviceTemplates[category];
  return advice[Math.floor(Math.random() * advice.length)];
};
