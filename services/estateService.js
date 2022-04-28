const estateDao = require('../models/estateDao');

const filteredClusters = async (tradeType, headers) => {
  const arrTradeTypes = tradeType.split(',');
  const arrLatLng = headers.latlng ? headers.latlng.split(',') : '';
  const filteredClusters = await estateDao.getfilteredClusters(
    arrTradeTypes,
    arrLatLng
  );

  return filteredClusters;
};

const filteredEstates = async (user, tradeType, headers) => {
  const arrTradeTypes = tradeType.split(',');
  const arrLatLng = headers.latlng ? headers.latlng.split(',') : '';
  const filteredEstates = await estateDao.getfilteredEstates(
    user,
    arrTradeTypes,
    headers,
    arrLatLng
  );

  return filteredEstates;
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
  filteredClusters,
  filteredEstates,
  createEstateInfo,
  getEstateInfo,
  getEstateList,
  deleteEstateInfo,
  putEstateInfo,
  search,
};
