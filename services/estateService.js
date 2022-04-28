const estateDao = require("../models/estateDao");

const filteredMaps = async (user, tradeType, search, headers) => {
  const arrTradeTypes = tradeType.split(",");
  const keyword = `%${search}%`;
  const filteredMaps = await estateDao.getFilteredMaps(
    user,
    arrTradeTypes,
    keyword,
    headers
  );

  return filteredMaps;
};
const createEstateInfo = async (body) => {
  await estateDao.createEstateInfo(body);
};
const getEstateInfo = async (estateId, agentId) => {
  return await estateDao.getEstateInfo(estateId, agentId);
};
const getEstateList = async (estateId, agentId) => {
  return await estateDao.getEstateList(estateId, agentId);
};
const putEstateInfo = async (estateId, body) => {
  return await estateDao.putEstateInfo(estateId, body);
};
const deleteEstateInfo = async (estateId, agentId) => {
  return await estateDao.deleteEstateInfo(estateId, agentId);
};
const search = async (search) => {
  return await estateDao.search(search);
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
