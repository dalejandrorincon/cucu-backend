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

router.get('/', adminCheck, controller.index);
router.get('/translators', controller.getTranslators);
//router.get('/admins', adminCheck, controller.getAdmins);
//router.get('/clients', adminCheck, controller.getClients);
router.get('/:id', controller.getUser);
router.post('/', validators('store'), controller.store);
//router.post('/set-unavailability', controller.setUnavailability);
//router.post('/set-availability', controller.setAvailability);
router.put('/', isAuthenticated, controller.update);
router.put('/password', isAuthenticated, validators('password'), controller.updatePassword);
router.put('/disable', isAuthenticated, isRole, controller.disable);
router.put('/approval/:id', isAuthenticated, isRole, controller.approval);
router.put('/:id', isAuthenticated, isRole, validators('update'), controller.adminUpdate);



router.delete('/:id', controller.remove);

router.post('/file', multer.array('files'), (req, res) => {
  controller.uploadImage(req, res)
})


module.exports = router;
