// controllers/authController.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_32_chars_min';

exports.signup = (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ id: 'mock_id', email, role: 'customer' }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: 'mock_id', email, role: 'customer' } });
};

exports.login = (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ id: 'mock_id', email, role: 'customer' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: 'mock_id', email, role: 'customer' } });
};

exports.oauthCallback = (req, res) => {
  const token = jwt.sign({ id: 'mock_id', email: 'oauth@example.com', role: 'customer' }, JWT_SECRET, { expiresIn: '7d' });
  res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
};

exports.getProfile = (req, res) => {
  res.json({ user: req.user, profile: null });
};