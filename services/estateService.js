const estateDao = require("../models/estateDao");

const filteredMaps = async (categories, tradeType) => {
  const filteredMaps = await estateDao.getFilteredMaps(categories, tradeType);

  return filteredMaps;
};
const createEstateInfo = async (req) => {
  const {
    is_deleted,
    address_main,
    address_dong,
    address_ho,
    latitude,
    longtitude,
    supply_size,
    exclusive_size,
    building_floor,
    current_floor,
    available_date,
    description_title,
    description_detail,
    heat,
    category,
    real_estate_agent,
  } = req.body;
  await estateDao.createEstateInfo(
    is_deleted,
    address_main,
    address_dong,
    address_ho,
    latitude,
    longtitude,
    supply_size,
    exclusive_size,
    building_floor,
    current_floor,
    available_date,
    description_title,
    description_detail,
    heat,
    category,
    real_estate_agent
  );
};
module.exports = { filteredMaps, createEstateInfo };
