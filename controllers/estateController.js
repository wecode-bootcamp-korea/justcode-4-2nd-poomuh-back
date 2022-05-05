const estateService = require("../services/estateService");
const errUtils = require("../utils/errUtils");

const filteredClusters = async (req, res, next) => {
  try {
    const headers = req.headers;
    const tradeType = req.query.tradeType;

    const filteredClusters = await estateService.filteredClusters(
      tradeType,
      headers
    );

    return res.status(200).json({ clusters: filteredClusters });
  } catch (err) {
    next(err);
  }
};

const filteredEstates = async (req, res, next) => {
  try {
    const user = req.user ? req.user : "";
    const headers = req.headers;
    const tradeType = req.query.tradeType;

    const filteredMaps = await estateService.filteredEstates(
      user,
      tradeType,
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
    const agentId = req.agent;
    await estateService.createEstateInfo(body, agentId);
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
const updateEstateInfo = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const agentId = req.agent;
    const body = req.body;
    await estateService.updateEstateInfo(estateId, agentId, body);
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
    return res
      .status(200)
      .json({ office: searchInfo[0], apartment: searchInfo[1] });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  filteredClusters,
  filteredEstates,
  createEstateInfo,
  getEstateInfo,
  getEstateList,
  deleteEstateInfo,
  updateEstateInfo,
  search,
};
