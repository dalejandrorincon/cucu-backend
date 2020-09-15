const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);
router.get('/all', controller.getAll);
router.get('/translator', controller.reviewsByTranslator);
router.get('/client', controller.reviewsByClient);
router.get('/user/:id', controller.userReviews);

router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);


module.exports = router;
