const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST a new message
router.post('/', async (req, res) => {
  try {
    const { user, text } = req.body;
    const newMessage = new Message({ user, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to send message' });
  }
});

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // oldest first
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to load messages' });
  }
});

module.exports = router;
