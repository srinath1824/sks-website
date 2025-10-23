import chatbotData from '../data/chatbotResponses.json';

export interface ChatResponse {
  text: string;
  suggestions?: string[];
}

interface ResponseData {
  keywords: string[];
  text: string;
  suggestions: string[];
}

interface ChatbotData {
  quickReplies: string[];
  responses: {
    [key: string]: ResponseData | { text: string; suggestions: string[] };
  };
}

export const getChatbotResponse = (userMessage: string): ChatResponse => {
  const message = userMessage.toLowerCase();
  const data = chatbotData as ChatbotData;
  
  // Check each response category
  for (const [key, response] of Object.entries(data.responses)) {
    if (key === 'default') continue;
    
    const responseWithKeywords = response as ResponseData;
    if (responseWithKeywords.keywords && responseWithKeywords.keywords.some((keyword: string) => message.includes(keyword))) {
      return {
        text: responseWithKeywords.text,
        suggestions: responseWithKeywords.suggestions
      };
    }
  }
  
  // Default response
  const defaultResponse = data.responses.default as { text: string; suggestions: string[] };
  return {
    text: defaultResponse.text,
    suggestions: defaultResponse.suggestions
  };
};

export const quickReplies = (chatbotData as ChatbotData).quickReplies;