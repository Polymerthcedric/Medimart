import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../api/apiService';

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
    <div className="chatbot-wrapper" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen ? (
        <div className="card shadow-lg border-0" style={{ width: '350px', height: '450px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
            <h5 className="mb-0 fw-bold">Medimart Assistant</h5>
            <button className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
          </div>
          <div className="card-body p-3 overflow-auto" style={{ flexGrow: 1, backgroundColor: 'var(--secondary-bg)' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div 
                  className={`p-3 rounded-custom shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                  style={{ maxWidth: '80%', fontSize: '0.9rem' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="d-flex justify-content-start mb-3">
                <div className="p-3 rounded-custom bg-white text-muted shadow-sm" style={{ fontSize: '0.9rem' }}>
                  <span className="spinner-grow spinner-grow-sm me-1" role="status"></span>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="card-footer bg-white border-top-0 p-3">
            <form onSubmit={handleSend} className="input-group">
              <input
                type="text"
                className="form-control border-light shadow-none"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                ➤
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          className="btn btn-primary rounded-circle shadow-lg p-3 d-flex align-items-center justify-content-center"
          style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
