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

router.get('/', isAuthenticated, controller.index);
router.post('/', isAuthenticated, controller.store);
router.put('/', isAuthenticated, controller.update);
router.delete('/:id', isAuthenticated, controller.remove);


module.exports = router;
