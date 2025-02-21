import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import ReactMarkdown from 'react-markdown';
import 'react-toastify/dist/ReactToastify.css';
import authStore from '../store/authStore';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { isLoggedIn, setLogOut , user } = authStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.warn("Message cannot be empty!", { position: "top-right" });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.get(`https://chat-api-backend-d3m6.onrender.com/api/generate/${input}`, {
        headers: { "Content-Type": "application/json" },
      });

      const newChat = { question: input, answer: response.data.message };
      setChatHistory((prevChats) => [...prevChats, newChat]);
      setInput('');
    } catch (error) {
      toast.error("Error fetching response!", { position: "top-right" });
      console.error('Error fetching response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleReadAloud = (text) => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.length > 0 ? voices[0] : null;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCloseChat = async () => {
    try {
      if (!user) {
        toast.error("User ID is missing. Please login again.", { position: "top-right" });
        return;
      }

      const response = await axios.post('https://chat-api-backend-d3m6.onrender.com/api/saveChat', {
        chatHistory: chatHistory,
        userId: user,
      });

      setChatHistory([]);
      toast.success(response.data.message || "Chat saved successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error saving chat history!", { position: "top-right" });
      console.error('Error saving chat history:', error);
    }
  };

  const handleLogout = () => {
    try {
      setLogOut();
      toast.success("Logged out successfully!", { position: "top-right" });
      navigate('/');
    } catch (error) {
      toast.error("Error logging out!", { position: "top-right" });
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-100 via-blue-200 to-indigo-300 p-8 font-sans">
      <ToastContainer />

      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button 
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all text-lg" 
          onClick={() => navigate('/chatHistory')}
        >
          View History
        </button>
        <button 
          onClick={handleCloseChat} 
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-lg"
        >
          End Chat
        </button>
        <button 
          onClick={handleLogout} 
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all text-lg"
        >
          Logout
        </button>
      </div>

      {/* Chat History */}
      <div className="flex flex-col h-3/4 overflow-y-auto space-y-4 px-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className="flex flex-col">
            {/* User Message */}
            <div className="flex justify-end mb-2">
              <div className="bg-teal-600 text-white p-4 rounded-xl max-w-xs shadow-md">
                <p className="text-md font-semibold">{chat.question}</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start mb-2 w-full md:w-[600px]">
              <div className="bg-white text-gray-800 p-4 rounded-xl max-w-xl shadow-md relative">
                {/* Read Aloud Button (Moved to Top Right) */}
                <button 
                  onClick={() => toggleReadAloud(chat.answer)} 
                  className="absolute top-2 right-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  {speaking ? '⏹ Stop' : '🔊 Read'}
                </button>

                {/* AI Response */}
                <div className="flex-1 mt-6">
                  <ReactMarkdown>{chat.answer}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-4 w-full max-w-3xl mx-auto mt-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-1 bg-white border-2 border-gray-300 rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all text-lg" 
          placeholder="Type your message..." 
        />
        <button 
          type="submit" 
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all text-lg" 
          disabled={isGenerating}
        >
          {isGenerating ? <CircularProgress size={24} color="inherit" /> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
