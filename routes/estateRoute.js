const express = require('express');
const router = express.Router();

const estateController = require('../controllers/estateController');
const { keyErrorEstate } = require('../middlewares/keyError');
const {
  usersValidateToken,
  agentsValidateToken,
} = require('../middlewares/validateToken');

router.get('/', estateController.filteredClusters);
router.get('/scroll', estateController.filteredEstates);
router.get(
  '/scroll/users',
  usersValidateToken,
  estateController.filteredEstates
);
router.post(
  '/',
  keyErrorEstate,
  agentsValidateToken,
  estateController.createEstateInfo
);
router.get('/:id', agentsValidateToken, estateController.getEstateInfo);
router.put('/:id', agentsValidateToken, estateController.putEstateInfo);
router.get('/list/myList', agentsValidateToken, estateController.getEstateList);
router.delete('/:id', agentsValidateToken, estateController.deleteEstateInfo);
router.get('/content/search', estateController.search);

module.exports = router;
