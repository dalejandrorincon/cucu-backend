const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);
router.get('/translator', controller.servicesByTranslator);
router.get('/all', controller.getAll);
router.post('/', controller.store);
router.put('/cancel/:id', controller.cancel);
router.put('/reprogram/:id', controller.update);
router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

module.exports = router;
