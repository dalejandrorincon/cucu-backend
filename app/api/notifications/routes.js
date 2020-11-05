const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.userNotifications);
router.post('/', controller.store);
router.put('/set-read', controller.setRead);
//router.put('/:id', controller.update);
router.delete('/:id', controller.remove);


module.exports = router;
