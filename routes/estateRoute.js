const express = require('express');
const router = express.Router();

const estatateController = require('../controllers/estateController');

router.get('/', estatateController.filteredMaps);

module.exports = router;
