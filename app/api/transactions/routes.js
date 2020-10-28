const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);
router.get('/user', controller.transactionsByUser);
router.get('/:id', controller.getTransaction);
router.post('/', controller.storeOnPay);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
