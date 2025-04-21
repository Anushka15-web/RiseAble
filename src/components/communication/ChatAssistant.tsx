
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mic, MicOff, Send, User, Bot, Hand } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Sample responses for demonstration
const botResponses = [
  "Thank you for your message. How can I assist you further?",
  "I understand your concern. Let me help you with that.",
  "That's a great question! Here's what I can tell you...",
  "I'm here to help. Could you provide more details?",
  "I'm looking into that for you right now.",
  "Here's what I found that might help you.",
  "Let me know if you need any clarification on this topic.",
];

const botResponsesHindi = [
  "आपके संदेश के लिए धन्यवाद। मैं आपकी और कैसे सहायता कर सकता हूं?",
  "मैं आपकी चिंता को समझता हूं। मुझे आपकी मदद करने दें।",
  "यह एक बढ़िया सवाल है! यहां बताता हूं...",
  "मैं आपकी मदद के लिए यहां हूं। क्या आप अधिक जानकारी प्रदान कर सकते हैं?",
  "मैं अभी आपके लिए इसकी जांच कर रहा हूं।",
  "यहां मुझे कुछ मिला जो आपकी मदद कर सकता है।",
  "अगर आपको इस विषय पर कोई स्पष्टीकरण चाहिए तो मुझे बताएं।",
];

interface ChatAssistantProps {
  onSwitchToSign: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ onSwitchToSign }) => {
  const { language } = useAccessibility();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Welcome message
  useEffect(() => {
    if (chatMessages.length === 0) {
      setTimeout(() => {
        setChatMessages([
          { 
            text: language === "en" 
              ? "Hello! I'm the RiseAble virtual assistant. How can I help you today?" 
              : "नमस्ते! मैं राइज़एबल वर्चुअल असिस्टेंट हूं। आज मैं आपकी कैसे मदद कर सकता हूं?", 
            isUser: false 
          }
        ]);
      }, 1000);
    }
  }, [language]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { text: message, isUser: true }]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev, 
        { 
          text: language === "en" 
            ? botResponses[Math.floor(Math.random() * botResponses.length)]
            : botResponsesHindi[Math.floor(Math.random() * botResponsesHindi.length)], 
          isUser: false 
        }
      ]);
    }, 1500);
    
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: language === "en" ? "Voice Input Stopped" : "वॉइस इनपुट रुका",
        description: language === "en" ? "Voice recording has stopped." : "वॉइस रिकॉर्डिंग रुक गई है।",
      });
    } else {
      setIsRecording(true);
      toast({
        title: language === "en" ? "Voice Input Started" : "वॉइस इनपुट शुरू हुआ",
        description: language === "en" ? "Please speak clearly..." : "कृपया स्पष्ट बोलें...",
      });
      
      // Simulate voice recognition
      setTimeout(() => {
        setIsRecording(false);
        const randomPhrases = [
          "Can you tell me more about accessibility features?",
          "How do I enable high contrast mode?",
          "I need help with the translation tool"
        ];
        
        const randomHindiPhrases = [
          "क्या आप मुझे एक्सेसिबिलिटी फीचर्स के बारे में अधिक बता सकते हैं?",
          "मैं हाई कंट्रास्ट मोड कैसे सक्षम करूं?",
          "मुझे अनुवाद टूल के साथ मदद चाहिए"
        ];
        
        const phrases = language === "en" ? randomPhrases : randomHindiPhrases;
        const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        setMessage(selectedPhrase);
        
        toast({
          title: language === "en" ? "Voice Captured" : "आवाज़ कैप्चर की गई",
          description: language === "en" ? "Voice converted to text." : "आवाज़ को टेक्स्ट में परिवर्तित किया गया।",
        });
      }, 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4 h-80 overflow-y-auto border rounded-lg p-4 bg-background shadow-inner">
        {chatMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="animate-spin mr-2 h-5 w-5 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
            {language === "en"
              ? "Starting a conversation..."
              : "बातचीत शुरू कर रहा है..."}
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${msg.isUser ? "flex-row-reverse" : ""}`}>
                  <div className={`rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 
                    ${msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"}
                  `}>
                    {msg.isUser ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div 
                    className={`p-3 rounded-2xl ${
                      msg.isUser 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 bg-muted">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-muted rounded-tl-none min-w-[60px] flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
        )}
      </div>
      
      <div className="flex gap-2 items-end">
        <div className="relative flex-grow">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={language === "en" ? "Type your message..." : "अपना संदेश टाइप करें..."}
            className="resize-none pr-10 min-h-[80px] border-2 focus:border-primary/50"
            disabled={isRecording}
          />
          <button 
            className={`absolute right-3 bottom-3 rounded-full p-1.5 transition-colors
              ${isRecording ? "bg-red-500 text-white animate-pulse" : "bg-muted/50 hover:bg-primary/20"}
            `}
            onClick={toggleVoiceInput}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        </div>
        <Button 
          className="h-10 w-10 rounded-full flex justify-center items-center"
          onClick={handleSendMessage}
          disabled={!message.trim() || isRecording}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-4 flex justify-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover:bg-primary/10 transition-colors"
          onClick={onSwitchToSign}
        >
          <Hand className="h-4 w-4" />
          {language === "en" ? "Sign Language Mode" : "सांकेतिक भाषा मोड"}
        </Button>
      </div>
    </div>
  );
};

export default ChatAssistant;
