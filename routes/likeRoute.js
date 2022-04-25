const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const { usersValidateToken } = require('../middlewares/usersValidateToken');

router.get('/', usersValidateToken, likeController.getLikeEstates);
router.get('/:id', usersValidateToken, likeController.changeLike);

module.exports = router;
