const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);
router.post('/', controller.store);
router.put('/', controller.update);
router.delete('/:id', controller.remove);


module.exports = router;
