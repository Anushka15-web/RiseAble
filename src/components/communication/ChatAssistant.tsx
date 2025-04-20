import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatAssistant: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setChatMessages(prev => [...prev, { text: message, isUser: true }]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev,
        { text: "Bot is thinking...", isUser: false }
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

  return (
    <div className="space-y-4">
      <div className="mb-4 h-80 overflow-y-auto border rounded-lg p-4 bg-background shadow-inner">
        <div className="space-y-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start gap-2 max-w-[80%] ${msg.isUser ? "flex-row-reverse" : ""}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 
                  ${msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {msg.isUser ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl ${
                    msg.isUser
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}>
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
      </div>

      <div className="flex gap-2 items-end">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="resize-none pr-10 min-h-[80px] border-2 focus:border-primary/50"
        />
        <Button
          className="h-10 w-10 rounded-full flex justify-center items-center"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatAssistant;
