import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../api/apiService';
import { Bot, MessageCircle, X, Send, User } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! Welcome to Medimart. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(input);
      setMessages(prev => [...prev, { role: 'bot', text: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting to the server. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 w-[350px] sm:w-[400px] h-[500px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-primary-600 p-6 flex justify-between items-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Bot className="w-20 h-20" />
            </div>
            <div className="relative z-10 flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                    <h5 className="font-black tracking-tight">Medimart AI</h5>
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Online</span>
                    </div>
                </div>
            </div>
            <button className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'}`}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div 
                    className={`p-4 rounded-3xl text-sm font-medium shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700/50'
                    }`}
                    >
                    {msg.text}
                    </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="p-4 rounded-3xl rounded-tl-none bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm font-bold flex items-center space-x-2 border border-slate-100 dark:border-slate-700/50 shadow-sm ml-10">
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                  <span>AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSend} className="relative group">
              <input
                type="text"
                className="w-full pl-5 pr-14 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white text-sm"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 active:scale-90 disabled:opacity-50" 
                type="submit" 
                disabled={loading}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          className="w-16 h-16 rounded-3xl bg-primary-600 hover:bg-primary-700 text-white shadow-2xl shadow-primary-600/40 flex items-center justify-center transition-all hover:scale-110 hover:-rotate-12 active:scale-95 group relative"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-8 h-8 relative z-10" />
          <span className="absolute inset-0 bg-primary-600 rounded-3xl animate-ping opacity-20"></span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
