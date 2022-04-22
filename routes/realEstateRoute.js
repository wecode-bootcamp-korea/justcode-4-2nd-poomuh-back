const express = require('express');
const router = express.Router();

const realEstatateController = require('../controllers/realEstateController');

router.get('/', realEstatateController.filteredMaps);

module.exports = router;
