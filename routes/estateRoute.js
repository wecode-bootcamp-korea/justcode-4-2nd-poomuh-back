const express = require('express');
const router = express.Router();

const estateController = require('../controllers/estateController');

router.get('/', estateController.filteredMaps);

module.exports = router;
