const express = require('express');
const passport = require('passport');
const { signup, login, oauthCallback, getProfile } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Email/password
router.post('/signup', signup);
router.post('/login', login);

// OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), oauthCallback);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), oauthCallback);

// Profile
router.get('/profile', authenticateToken, getProfile);

module.exports = router;