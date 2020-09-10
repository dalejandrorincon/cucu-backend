const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/save-card', controller.saveCard);


module.exports = router;
