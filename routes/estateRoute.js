const express = require("express");
const router = express.Router();

const estateController = require("../controllers/estateController");
const { keyErrorEstate } = require("../middlewares/keyError");
const { agentsValidateToken } = require("../middlewares/agentsValidateToken");

router.get("/", estateController.filteredMaps);
router.post(
  "/",
  keyErrorEstate,
  agentsValidateToken,
  estateController.createEstateInfo
);
router.get("/:id", agentsValidateToken, estateController.getEstateInfo);
router.delete("/:id", agentsValidateToken, estateController.deleteEstateInfo);

module.exports = router;
