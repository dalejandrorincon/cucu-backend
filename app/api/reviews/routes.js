const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
  isAuthenticated,
  isRole  
} = require('../middlewares/auth');

var adminCheck = (req, res, next) => {
  isRole(req, res, next, ['1']);
}
router.get('/', controller.index);
router.get('/all', controller.getAll);
router.get('/translator', controller.reviewsByTranslator);
router.get('/client', controller.reviewsByClient);
router.get('/user/:id', controller.userReviews);

router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.put('/approval/:id', /* isAuthenticated, adminCheck, */ controller.approval);

module.exports = router;
