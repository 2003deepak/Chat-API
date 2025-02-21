import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import 'react-toastify/dist/ReactToastify.css';
import authStore from '../store/authStore';
import axios from 'axios';

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const { user, isLoggedIn } = authStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchChatHistory();
    }
  }, [isLoggedIn, navigate]);

  const fetchChatHistory = async () => {
    try {
      if (!user) {
        toast.error("User ID is missing. Please login again.", { position: "top-right" });
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/getChat/`, {
        params: { userId: user },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data && Array.isArray(response.data)) {
        setChats(response.data);
      } else {
        toast.info(response.data.message || "No chat history found", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error fetching chat history!", { position: "top-right" });
      console.error("Error fetching chat history:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-100 via-blue-200 to-indigo-300 p-8 font-sans">
      <ToastContainer />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-white hover:bg-gray-200 text-teal-700 font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white transition-all text-lg"
          onClick={() => navigate('/chat')}
        >
          Back to Chat
        </button>
      </div>

      {/* Chat History Display */}
      <div className="flex flex-col h-3/4 overflow-y-auto space-y-4 px-4">
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <div key={index} className="flex flex-col">
              {/* User Message */}
              <div className="flex justify-end mb-2">
                <div className="bg-teal-600 text-white p-4 rounded-xl max-w-xs shadow-lg">
                  <p className="text-md font-semibold">{chat.question}</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start mb-2 w-full md:w-[600px]">
                <div className="bg-white text-gray-800 p-4 rounded-xl max-w-xl shadow-lg">
                  <ReactMarkdown>{chat.answer}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white text-lg font-semibold">No chat history found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
