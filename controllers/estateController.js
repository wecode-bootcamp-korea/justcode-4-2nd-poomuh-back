const estateService = require("../services/estateService");
const errUtils = require("../utils/errUtils");

const filteredMaps = async (req, res, next) => {
  try {
    const user = req.user ? req.user : "";
    const headers = req.headers;

    const { tradeType, search } = req.query;

    const filteredMaps = await estateService.filteredMaps(
      user,
      tradeType,
      search,
      headers
    );

    return res.status(200).json({ map: filteredMaps });
  } catch (err) {
    next(err);
  }
};

const createEstateInfo = async (req, res, next) => {
  try {
    const body = req.body;
    await estateService.createEstateInfo(body);
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
const putEstateInfo = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const body = req.body;
    await estateService.putEstateInfo(estateId, body);
    return res.status(200).json({ message: "업데이트 성공" });
  } catch (err) {
    next(err);
  }
};
const getEstateList = async (req, res, next) => {
  try {
    const agentId = req.agent;
    const list = await estateService.getEstateList(agentId);
    return res.status(200).json(list);
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

const search = async (req, res, next) => {
  try {
    const { search } = req.query;

    const searchInfo = await estateService.search(search);
    console.log(searchInfo[0]);
    return res
      .status(200)
      .json({ office: searchInfo[0], apartment: searchInfo[1] });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  filteredMaps,
  createEstateInfo,
  getEstateInfo,
  getEstateList,
  deleteEstateInfo,
  putEstateInfo,
  search,
};
