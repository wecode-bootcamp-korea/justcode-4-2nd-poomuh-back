const estateService = require("../services/estateService");
const errUtils = require("../utils/errUtils");

const filteredMaps = async (req, res, next) => {
  try {
    const { category, tradeType } = req.query;

    console.log(tradeType);
    // if (!category || !tradeType) {
    //   throw errUtils.errGenerator({
    //     statusCode: 400,
    //     message: 'KEY_ERROR',
    //   });
    // }
    const categories = category.split(",");
    console.log(categories);

    const filteredMaps = await estateService.filteredMaps(
      categories,
      tradeType
    );

    return res.status(200).json({ map: filteredMaps });
  } catch (err) {
    next(err);
  }
};

const createEstateInfo = async (req, res, next) => {
  try {
    await estateService.createEstateInfo(req);
    return res.status(200).json({ message: "등록 성공!" });
  } catch (err) {
    next(err);
  }
};

const getEstateInfo = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const agentId = req.agent;
    const estate = await estateService.getEstateInfo(estateId, agentId);
    return res.status(200).json(estate);
  } catch (err) {
    next(err);
  }
};
const deleteEstateInfo = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const agentId = req.agent;
    await estateService.deleteEstateInfo(estateId, agentId);
    return res.status(200).json({ message: "삭제 성공!" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  filteredMaps,
  createEstateInfo,
  getEstateInfo,
  deleteEstateInfo,
};
