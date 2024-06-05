const express = require('express');
const router = express.Router();
const { getAnswerByUsernameHandler } = require('../controller/Usage');

router.get('/answer/:username', getAnswerByUsernameHandler);

module.exports = router;
