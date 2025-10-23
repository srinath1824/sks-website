import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, BotMessageSquare } from 'lucide-react';
import { getChatbotResponse, quickReplies } from '../utils/chatbotKnowledge';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  // Function to convert URLs and markdown links to clickable links
  const formatMessageText = (text: string) => {
    // Convert markdown links [text](url) to HTML first
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let formattedText = text.replace(markdownLinkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">$1</a>');
    
    // Only convert remaining plain URLs (not already in links) to clickable links
    const urlRegex = /(?<!href=")(https?:\/\/[^\s<>"]+)(?!")/g;
    formattedText = formattedText.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline break-all">$1</a>');
    
    return formattedText;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Sivoham! 🙏 I\'m here to help you with questions about Siva Kundalini Sadhana, our courses, and spiritual practices. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(quickReplies.slice(0, 6));
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getChatbotResponse(inputText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sivoham! ${response.text}\n\nJai Gurudev! 🙏`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setCurrentSuggestions(response.suggestions || []);
      setShowQuickReplies(true);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    setShowQuickReplies(false);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="fixed bottom-[1rem] right-[1rem] z-50 sm:bottom-[1.5rem] sm:right-[1.5rem] md:bottom-[2rem] md:right-[2rem]">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 sm:p-5 md:p-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse border-2 border-orange-300 relative overflow-hidden"
            aria-label="Open chat"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-ping"></div>
            <BotMessageSquare size={24} className="relative z-10 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          </button>
          <div className="absolute right-full mr-[0.75rem] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-[0.75rem] py-[0.5rem] rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with our Guru Sevak 🙏
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-[min(calc(100vw-2rem),28rem)] h-[min(calc(100vh-2rem),37.5rem)] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center min-h-[3rem] flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Sparkles size={20} className="text-yellow-200" />
              <h3 className="font-semibold">Guru Sevak</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-orange-700 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div 
                    className="text-sm whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
                  />
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Suggestions */}
          {showQuickReplies && currentSuggestions.length > 0 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {currentSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs sm:text-sm bg-orange-50 hover:bg-orange-100 text-orange-600 px-2 py-1 sm:px-3 rounded-full border border-orange-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowQuickReplies(false)}
                placeholder="Ask about Kundalini..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;