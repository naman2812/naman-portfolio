"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { getChatbotResponse } from "@/data/chatbotKnowledge";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  isTyping?: boolean;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hi! I'm Naman's AI Assistant. Ask me anything about his tech stack, experience, or projects!",
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Create an empty AI message that is "typing"
    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMessageId, role: "ai", content: "", isTyping: true }]);

    const fullResponse = getChatbotResponse(userMsg.content);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    // Simulate typing effect
    let currentText = "";
    for (let i = 0; i < fullResponse.length; i++) {
      currentText += fullResponse[i];
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: currentText, isTyping: i < fullResponse.length - 1 } 
            : msg
        )
      );
      // Faster typing for spaces, slightly randomized overall
      const delay = fullResponse[i] === " " ? 10 : 20 + Math.random() * 20;
      await new Promise(r => setTimeout(r, delay));
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] z-50 cursor-pointer overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
            <MessageSquare size={24} className="relative z-10" />
            <Sparkles size={12} className="absolute top-3 right-3 text-white/70 animate-pulse relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 relative">
                  <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-20" />
                  <Bot size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Ask AI Naman</h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-white/10 text-neutral-300" : "bg-primary/20 text-primary border border-primary/30"}`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                    msg.role === "user" 
                      ? "bg-neutral-800 text-white rounded-tr-sm" 
                      : "bg-primary/10 text-neutral-200 border border-primary/20 rounded-tl-sm leading-relaxed"
                  }`}>
                    {msg.content}
                    {msg.isTyping && <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse" />}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || messages[messages.length - 1]?.isTyping}
                  className="w-10 h-10 bg-primary text-black rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-neutral-600 font-mono">Simulated LLM Engine v1.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
