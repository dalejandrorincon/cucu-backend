const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/password-recovery', controller.recoveryPassword )
router.post('/change-password', controller.changePassword )
router.post('/check-recovery-token', controller.checkRecoveryToken )

module.exports = router;
