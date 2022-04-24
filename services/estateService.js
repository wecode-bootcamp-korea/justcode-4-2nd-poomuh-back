const estateDao = require("../models/estateDao");

const filteredMaps = async (categories, tradeType) => {
  const filteredMaps = await estateDao.getFilteredMaps(categories, tradeType);

  return filteredMaps;
};
const createEstateInfo = async (req) => {
  const {
    address_main,
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
  } = req.body;
  await estateDao.createEstateInfo(
    address_main,
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
    real_estate_agent_id
  );
};

const getEstateInfo = async (estateId, agentId) => {
  return await estateDao.getEstateInfo(estateId, agentId);
};

const deleteEstateInfo = async (estateId, agentId) => {
  return await estateDao.deleteEstateInfo(estateId, agentId);
};

module.exports = {
  filteredMaps,
  createEstateInfo,
  getEstateInfo,
  deleteEstateInfo,
};
