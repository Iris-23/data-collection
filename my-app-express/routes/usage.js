const express = require('express');
const router = express.Router();
const { getAnswerByUsernameHandler } = require('../controller/Usage');

router.get('/usage/:username', getAnswerByUsernameHandler);

module.exports = router;
