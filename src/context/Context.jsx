import { createContext, useState, useEffect } from 'react';
import run from '../config/gemini';

// Context for managing chat state and settings
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [userInput, setUserInput] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);


  // Update dark mode in localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  // Start a new chat session
  const newChat = () => {
    setIsLoading(false);
    setShowChat(false);
    setChatHistory([]);
    setUserInput('');
  };


  // Clear all chat history
  const clearChatHistory = () => {
    setChatHistory([]);
    setRecentPrompts([]);
    setShowChat(false);
    setIsLoading(false);
    setUserInput('');
  };


  // Send a prompt to the Gemini
  const sendPrompt = async (prompt) => {
    setIsLoading(true);
    setShowChat(true);

    const currentPrompt = prompt || userInput;
    setCurrentPrompt(currentPrompt);

    // Add prompt to recent prompts if it's new
    if (!prompt && !recentPrompts.includes(currentPrompt)) {
      setRecentPrompts((prev) => [currentPrompt, ...prev].slice(0, 10));
    }

    // Add user message to history
    const userMessage = { 
      role: 'user', 
      parts: [{ text: currentPrompt }] 
    };
    setChatHistory((prev) => [...prev, userMessage]);


    // Add placeholder for AI response
    const thinkingMessage = { 
      role: 'model', 
      parts: [{ text: '' }] 
    };
    setChatHistory((prev) => [...prev, thinkingMessage]);

    
    try {
      const response = await run(currentPrompt, chatHistory);
      // Update the placeholder with the actual response
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: 'model', parts: [{ text: response }] },
      ]);

    } catch (error) {
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: 'model', 
          parts: [{ text: 'Sorry, something went wrong. Please try again.' }] 
        },
      ]);

    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  };


  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };


  const contextValue = {
    recentPrompts,
    setRecentPrompts,
    sendPrompt,
    currentPrompt,
    showChat,
    isLoading,
    userInput,
    setUserInput,
    newChat,
    chatHistory,
    isSidebarOpen,
    setSidebarOpen,
    clearChatHistory,
    darkMode,
    toggleDarkMode,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
};

export default ContextProvider;