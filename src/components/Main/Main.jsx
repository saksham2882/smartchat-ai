import { useContext, useRef, useEffect, useState } from 'react';
import './Main.css';
import { MdSend, MdMenu, MdContentCopy, MdImage, MdMic, MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaRobot, FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    sendPrompt,
    showChat,
    isLoading,
    userInput,
    setUserInput,
    chatHistory,
    setSidebarOpen,
    darkMode,
    toggleDarkMode,
  } = useContext(Context);

  const messagesEndRef = useRef(null);
  const [copiedId, setCopiedId] = useState(null);


  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);


  // Copy text to clipboard and show temporary "Copied!" tooltip
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };


  // Send prompt when input is not empty
  const handleSend = () => {
    if (userInput.trim()) {
      sendPrompt();
    }
  };


  return (
    <div className={`main ${darkMode ? 'dark' : ''}`}>
      <div className="navbar">

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          <MdMenu size={24} />
        </button>

        <div className="logo">
          <div className="chat-logo">
            <FaRobot size={24} className="text-primary" />
            {isLoading && <div className="pulse-dot"></div>}
          </div>
          <h1>SmartChat AI</h1>
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
          </button>

          <div className="user-avatar">
            <FaUser size={14} />
          </div>

        </div>
      </div>


      <div className="chat-container">
        {!showChat ? (
          <div className="welcome-screen">
            <div className="welcome-content">
              <h1>
                Hello, <span className="gradient-text">User</span> 👋
              </h1>

              <p>How can I help you today?</p>

              <div className="suggestion-cards">
                {[
                  'Suggest beautiful places to see on an upcoming road trip',
                  'Help me find the best restaurants in a new city',
                  'Explain quantum computing in simple terms',
                  'Help me plan a romantic evening with my partner',
                ].map((text, i) => (

                  <div
                    key={i}
                    className="card"
                    onClick={() => {
                      setUserInput(text);
                      handleSend();
                    }}
                  >
                    <p>{text}</p>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        ) : (
          <div className="messages-container">

            {chatHistory.map((item, index) => {
              const messageId = `msg-${index}`;

              return (
                <div
                  key={index}
                  className={`message ${item.role === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className={`avatar ${item.role === 'user' ? 'user-avatar' : 'bot-avatar'}`}>
                    {item.role === 'user' ? <FaUser size={14} /> : <FaRobot size={14} className="text-primary" />}
                  </div>

                  <div className="message-content">
                    {isLoading && index === chatHistory.length - 1 && item.role === 'model' ? (
                      <div className="thinking-container">

                        <div className="thinking-animation">
                          <span>Thinking</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="emoji">🤔</span>
                        </div>

                        <div className="loading-bar">
                          <div className="loading-progress"></div>
                        </div>
                      </div>
                      
                    ) : (
                      <>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }) => (
                              <p style={{ marginBottom: '1.5em', lineHeight: '1.6' }} {...props} />
                            ),

                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '');
                              const codeId = `code-${index}-${Math.random().toString(36).substr(2, 9)}`;

                              return !inline && match ? (
                                <div className="code-block" style={{ marginBottom: '1.5em' }}>
                                  <div className="code-header">
                                    <span>{match[1]}</span>

                                    <button
                                      className="copy-btn"
                                      onClick={() => handleCopy(String(children).replace(/\n$/, ''), codeId)}
                                    >
                                      <MdContentCopy size={14} />
                                      {copiedId === codeId && <span className="copy-tooltip">Copied!</span>}
                                    </button>
                                  </div>

                                  <SyntaxHighlighter
                                    language={match[1]}
                                    style={darkMode ? atomDark : vs}
                                    PreTag="div"
                                    customStyle={{
                                      margin: 0,
                                      padding: '16px',
                                      borderRadius: '0 0 8px 8px',
                                      backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
                                    }}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>

                                </div>
                              ) : (
                                <code className={className} style={{ marginBottom: '1.5em' }} {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {item.parts[0].text}
                        </ReactMarkdown>


                        {item.role === 'model' && (
                          <div className="message-actions">
                            <button
                              className="action-btn"
                              onClick={() => handleCopy(item.parts[0].text, messageId)}
                              title="Copy message"
                            >
                              <MdContentCopy size={16} />

                              {copiedId === messageId && <span className="copy-tooltip">Copied!</span>}
                            </button>
                          </div>

                        )}

                      </>
                    )}
                  </div>
                </div>
              );

            })}

            <div ref={messagesEndRef} />
          </div>
        )}


        <div className="input-container">
          <div className="input-box">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message SmartChat AI..."
            />

            <div className="input-actions">
              <button className="action-btn" aria-label="Upload image">
                <MdImage size={20} />
              </button>

              <button className="action-btn" aria-label="Record voice">
                <MdMic size={20} />
              </button>
              
              {userInput && (
                <button className="send-btn" onClick={handleSend} aria-label="Send message">
                  <MdSend size={20} />
                </button>
              )}
            </div>

          </div>
          <p className="disclaimer">
            SmartChat AI may display inaccurate info, including about people, so double-check its responses.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Main;