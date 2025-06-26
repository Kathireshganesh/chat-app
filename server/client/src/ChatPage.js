import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      window.location.href = '/';
    } else {
      setUser(JSON.parse(storedUser));
      fetchMessages();
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load messages');
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/messages', {
        sender: user.username,
        text: newMessage
      });
      setNewMessage('');
      fetchMessages(); // Refresh after send
    } catch (err) {
      console.error('Failed to send message');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chat Room</h2>
      <p>Welcome, {user?.username} <button onClick={handleLogout}>Logout</button></p>

      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'scroll', marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '0.5rem 0' }}>
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type your message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={handleSend} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
        Send
      </button>
    </div>
  );
}

export default ChatPage;
