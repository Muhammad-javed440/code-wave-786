import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! I\'m the CodeWaveAI Assistant. Ask me anything about our services.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8005/run-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.output || 'No response.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I couldn\'t connect to the server. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 ${open ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat popup */}
      <div className={`fixed bottom-6 right-6 z-50 w-[380px] h-[500px] flex flex-col rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-gray-800 transition-all duration-300 origin-bottom-right ${open ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <span className="font-bold text-sm">CodeWaveAI Assistant</span>
          <button onClick={() => setOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-xl text-sm text-gray-500 dark:text-gray-400 flex gap-1">
                <span className="animate-bounce">.</span><span className="animate-bounce [animation-delay:0.15s]">.</span><span className="animate-bounce [animation-delay:0.3s]">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-800">
          <button onClick={toggleVoice} className={`p-2 rounded-full transition-colors ${listening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'}`} aria-label="Voice input">
            <Mic className="w-4 h-4" />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about CodeWaveAI..."
            className="flex-1 bg-transparent outline-none text-sm text-black dark:text-white placeholder-gray-400"
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()} className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white disabled:opacity-50 transition-opacity" aria-label="Send">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
