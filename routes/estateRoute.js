const express = require("express");
const router = express.Router();

const estateController = require("../controllers/estateController");
const { keyErrorEstate } = require("../middlewares/keyError");
const {
  usersValidateToken,
  agentsValidateToken,
} = require("../middlewares/validateToken");

router.get("/", estateController.filteredMaps);
router.get("/users", usersValidateToken, estateController.filteredMaps);
router.post(
  "/",
  keyErrorEstate,
  agentsValidateToken,
  estateController.createEstateInfo
);
router.get("/:id", agentsValidateToken, estateController.getEstateInfo);
router.put("/:id", agentsValidateToken, estateController.putEstateInfo);
router.get("/myList", agentsValidateToken, estateController.getEstateList);
router.delete("/:id", agentsValidateToken, estateController.deleteEstateInfo);
router.get("/search/d", estateController.search);

module.exports = router;
