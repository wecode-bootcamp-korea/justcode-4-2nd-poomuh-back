const estateDao = require("../models/estateDao");

const filteredMaps = async (user, tradeType) => {
  const arrTradeTypes = tradeType.split(",");
  const filteredMaps = await estateDao.getFilteredMaps(user, arrTradeTypes);

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
const putEstateInfo = async (
  estateId,
  address_main,
  building_name,
  address_dong,
  address_ho,
  latitude,
  longitude,
  supply_size,
  exclusive_size,
  building_floor,
  current_floor,
  available_date,
  description_title,
  description_detail,
  price_main,
  price_deposit,
  price_monthly,
  heat_id,
  category_id,
  real_estate_agent_id,
  trade_id
) => {
  return await estateDao.putEstateInfo(
    estateId,
    address_main,
    building_name,
    address_dong,
    address_ho,
    latitude,
    longitude,
    supply_size,
    exclusive_size,
    building_floor,
    current_floor,
    available_date,
    description_title,
    description_detail,
    price_main,
    price_deposit,
    price_monthly,
    heat_id,
    category_id,
    real_estate_agent_id,
    trade_id
  );
};
const deleteEstateInfo = async (estateId, agentId) => {
  return await estateDao.deleteEstateInfo(estateId, agentId);
};
// const search = async (search, take) => {
//   return await estateDao.search(search, take);
// };

module.exports = {
  filteredMaps,
  createEstateInfo,
  getEstateInfo,
  getEstateList,
  deleteEstateInfo,
  putEstateInfo,
};
