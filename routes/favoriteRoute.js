const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { usersValidateToken } = require('../middlewares/validateToken');

router.get('/likes', usersValidateToken, favoriteController.getLikeEstates);
router.get('/likes/:id', usersValidateToken, favoriteController.changeLike);

module.exports = router;
