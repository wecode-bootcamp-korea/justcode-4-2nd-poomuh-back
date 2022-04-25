const express = require('express');
const router = express.Router();

const estateController = require('../controllers/estateController');
const { keyErrorEstate } = require('../middlewares/keyError');
const {
  agentsValidateToken,
  usersValidateToken,
} = require('../middlewares/agentsValidateToken');

router.get('/', estateController.filteredMaps);
router.get('/users', usersValidateToken, estateController.filteredMaps);
router.post(
  '/',
  keyErrorEstate,
  agentsValidateToken,
  estateController.createEstateInfo
);
router.put('/:id', agentsValidateToken, estateController.putEstateInfo);
router.get('/myList', agentsValidateToken, estateController.getEstateList);
router.get('/:id', agentsValidateToken, estateController.getEstateInfo);
router.delete('/:id', agentsValidateToken, estateController.deleteEstateInfo);
// router.get("/", estateController.search);

module.exports = router;
