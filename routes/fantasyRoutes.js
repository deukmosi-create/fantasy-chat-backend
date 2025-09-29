const express = require('express');
const { getFantasyProfiles } = require('../controllers/fantasyController');
const router = express.Router();

router.get('/', getFantasyProfiles);
module.exports = router;