const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validators = require('./validators');
const {
  isAuthenticated,
  isRole  
} = require('../middlewares/auth');

var adminCheck = (req, res, next) => {
  isRole(req, res, next, ['1']);
}

const multer = require('multer')()

router.get('/', controller.index);
router.get('/translators', controller.getTranslators);
router.get('/admins', controller.getAdmins);
router.get('/clients', controller.getClients);
router.get('/:id', controller.getUser);
router.post('/', validators('store'), controller.store);
router.post('/set-unavailability', controller.setUnavailability);
router.post('/set-availability', controller.setAvailability);
router.put('/', isAuthenticated, validators('update'), controller.update);
router.put('/:id', isAuthenticated, isRole, validators('update'), controller.adminUpdate);
router.put('/approval/:id', isAuthenticated, isRole, controller.approval);


router.delete('/:id', controller.remove);

router.post('/image', multer.array('files'), (req, res) => {
  controller.uploadImage(req, res)
})


module.exports = router;
