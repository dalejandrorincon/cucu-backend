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
router.get('/all', adminCheck, controller.getAll);
router.get('/user', isAuthenticated, controller.unavailabilitiesByUser);
router.get('/user-all/:id', isAuthenticated, controller.allUnavailabilitiesByUser);
router.post('/', isAuthenticated, controller.store);
router.put('/:id', isAuthenticated, controller.update);
router.delete('/:id', isAuthenticated, controller.remove);


module.exports = router;
