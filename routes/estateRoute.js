const express = require('express');
const router = express.Router();

const estateController = require('../controllers/estateController');
const { usersValidateToken } = require('../middlewares/usersValidateToken');

router.get('/', estateController.filteredMaps);
router.get('/users', usersValidateToken, estateController.filteredMaps);

module.exports = router;
