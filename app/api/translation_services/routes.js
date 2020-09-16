const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer')()

router.get('/', controller.index);
router.get('/translator', controller.servicesByTranslator);
router.get('/client', controller.servicesByClient);

router.get('/all', controller.getAll);
router.get('/:id', controller.getService);

router.post('/', controller.store);
router.put('/cancel/:id', controller.cancel);
router.put('/start/:id', controller.start);
router.put('/finish/:id', controller.finish);
router.put('/reprogram/:id', controller.update);
router.put('/:id', controller.update);
router.put('/share/:id', controller.share);


router.delete('/:id', controller.remove);
router.post('/image', multer.array('files'), (req, res) => {
  controller.uploadFile(req, res)
})
module.exports = router;
