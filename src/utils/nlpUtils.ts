
// Basic NLP utilities for improved text processing
export const tokenize = (text: string): string[] => {
  return text.toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .split(/\s+/)
    .filter(Boolean);
};

export const calculateSimilarity = (text1: string, text2: string): number => {
  const tokens1 = new Set(tokenize(text1));
  const tokens2 = new Set(tokenize(text2));
  const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
  const union = new Set([...tokens1, ...tokens2]);
  return intersection.size / union.size;
};

export const extractTopics = (text: string): string[] => {
  const financialTopics = [
    'budget', 'invest', 'save', 'debt', 'retirement',
    'mortgage', 'loan', 'credit', 'tax', 'insurance'
  ];
  
  const tokens = tokenize(text);
  return financialTopics.filter(topic => 
    tokens.some(token => calculateSimilarity(token, topic) > 0.7)
  );
};

export const findMostRelevantTopic = (text: string, topics: string[]): string | null => {
  let maxSimilarity = 0;
  let bestMatch = null;
  
  for (const topic of topics) {
    const similarity = calculateSimilarity(text, topic);
    if (similarity > maxSimilarity && similarity > 0.3) {
      maxSimilarity = similarity;
      bestMatch = topic;
    }
  }
  
  return bestMatch;
};
