const express = require("express");
const router = express.Router();

const estateController = require("../controllers/estateController");

router.get("/", estateController.filteredMaps);
router.post("/", estateController.createEstateInfo);
// router.get("/", estateController.getEstateInfo);
//근데 내용만 사라지는건데 db에서 지워야하는가?
// router.delete("/", estateController.deleteEstateInfo);

module.exports = router;
