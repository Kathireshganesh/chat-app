import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  // ❌ If user not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  // ✅ Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // ✅ Send message
  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/messages', {
        user: user.username,
        text: message,
      });
      setMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // ✅ Auto refresh messages every 3s
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Welcome, {user?.username}</h3>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="border rounded p-3 mb-3" style={{ height: '300px', overflowY: 'auto', background: '#f8f9fa' }}>
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}:</strong> {msg.text}
            <br />
            <small className="text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
