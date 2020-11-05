const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/card-wallet-intent', controller.cardWalletIntent);
router.get('/get-cards', controller.getWalletCards);
router.post('/delete-card', controller.deleteCard);
router.post('/payment-intent', controller.confirmPayment);

module.exports = router;
