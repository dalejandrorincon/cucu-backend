const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validators = require('./validators');
const {
  isAuthenticated  
} = require('../middlewares/auth');

router.get('/', controller.index);
router.get('/translators', controller.getTranslators);
router.get('/:id', controller.getUser);
router.post('/', validators('store'), controller.store);
router.post('/set-unavailability', controller.setUnavailability);
router.post('/set-availability', controller.setAvailability);
router.put('/', isAuthenticated, validators('update'), controller.update);
router.delete('/:id', controller.remove);


module.exports = router;
