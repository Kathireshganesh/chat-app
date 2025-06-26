const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =========================
// 📌 Register Controller
// =========================
exports.registerUser = async (req, res) => {
  try {
    console.log('📨 Register Request Received:', req.body);

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    console.log('✅ Registered user:', newUser.email);
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Register Error:', err);
    res.status(500).send('Server error');
  }
};

// =========================
// 🔐 Login Controller
// =========================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Email not found:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Wrong password');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    console.log('✅ Login success:', user.username);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('🔥 Login Error:', err);
    res.status(500).send('Server error');
  }
};
