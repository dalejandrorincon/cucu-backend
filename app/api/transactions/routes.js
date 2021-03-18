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

router.get('/', adminCheck, controller.index);
router.get('/user', isAuthenticated, controller.transactionsByUser);
//router.get('/:id', controller.getTransaction);
router.post('/', isAuthenticated, controller.storeOnPay);
router.put('/:id', adminCheck, controller.update);
router.delete('/:id', adminCheck, controller.remove);

module.exports = router;
