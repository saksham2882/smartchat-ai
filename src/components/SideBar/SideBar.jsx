import { useContext } from 'react';
import './SideBar.css';
import { MdAdd, MdMessage, MdHistory, MdSettings, MdHelpOutline, MdDelete, MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';
import { Context } from '../../context/Context';

const SideBar = () => {
  const {
    recentPrompts,
    newChat,
    isSidebarOpen,
    setSidebarOpen,
    clearChatHistory,
    darkMode,
    toggleDarkMode,
    sendPrompt,
  } = useContext(Context);


  // Load a previous prompt and close sidebar on mobile
  const loadPrompt = async (prompt) => {
    await sendPrompt(prompt);
    setSidebarOpen(false);
  };


  return (
    <div className={`sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'} ${darkMode ? 'dark' : ''}`}>

      <div className="sidebar-header">
        <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
          &times;
        </button>

        <div className="new-chat-btn" onClick={newChat}>
          <MdAdd size={20} />
          <span>New chat</span>
        </div>
      </div>


      <div className="recent-chats">

        <div className="sidebar-title">
          <FaRobot size={16} />
          <h3>Recent chats</h3>
        </div>

        <div className="chat-list">
          {recentPrompts &&  recentPrompts.length > 0 ? (

            recentPrompts.map((prompt, index) => (
              <div
                key={index}
                className="chat-item"
                onClick={() => loadPrompt(prompt)}
                title={prompt}
              >
                <MdMessage size={18} />
                <span>{prompt.length > 25 ? `${prompt.substring(0, 25)}...` : prompt}</span>
              </div>
            ))

          ) : (
            <div className="empty-state">
              <p>No recent chats</p>
            </div>
          )}
        </div>

      </div>


      <div className="sidebar-footer">
        <div className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? (
            <>
              <MdLightMode size={18} />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <MdDarkMode size={18} />
              <span>Dark Mode</span>
            </>
          )}
        </div>

        <div className="footer-item" onClick={clearChatHistory}>
          <MdDelete size={18} />
          <span>Clear conversations</span>
        </div>

        <div className="footer-item">
          <MdHelpOutline size={18} />
          <span>Help & FAQ</span>
        </div>

        <div className="footer-item">
          <MdHistory size={18} />
          <span>Activity</span>
        </div>

        <div className="footer-item">
          <MdSettings size={18} />
          <span>Settings</span>
        </div>
        
      </div>
    </div>
  );
};

export default SideBar;