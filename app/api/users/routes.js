const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validators = require('./validators');
const {
  isAuthenticated  
} = require('../middlewares/auth');

router.get('/', controller.index);
router.get('/:id', controller.getUser);
router.post('/', controller.store);
router.put('/', isAuthenticated, controller.update);
router.delete('/:id', controller.remove);


module.exports = router;
