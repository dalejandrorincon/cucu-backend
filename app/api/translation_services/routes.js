const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer')()

const {
  isAuthenticated,
  isRole  
} = require('../middlewares/auth');

var adminCheck = (req, res, next) => {
  isRole(req, res, next, ['1']);
}

router.get('/', isAuthenticated, controller.index);
router.get('/translator', isAuthenticated, controller.servicesByTranslator);
router.get('/client', isAuthenticated, controller.servicesByClient);

router.get('/all', adminCheck, controller.getAll);
router.get('/:id', isAuthenticated, controller.getService);

router.post('/', isAuthenticated, controller.store);
router.put('/cancel/:id', isAuthenticated, controller.cancel);
//router.put('/start/:id', isAuthenticated, controller.start);
router.put('/pay/:id', isAuthenticated, controller.pay);
router.put('/accept/:id', isAuthenticated, controller.accept);
router.put('/reject/:id', isAuthenticated, controller.reject);
router.put('/finish/:id', isAuthenticated, controller.finish);
router.put('/reprogram/:id', isAuthenticated, controller.update);
router.put('/rate/:id', isAuthenticated, controller.rate);
router.put('/:id', isAuthenticated, controller.update);
router.put('/share/:id', isAuthenticated, controller.share);


router.delete('/:id', isAuthenticated, controller.remove);
router.post('/image', multer.array('files'), (req, res) => {
  controller.uploadFile(req, res)
})
module.exports = router;
