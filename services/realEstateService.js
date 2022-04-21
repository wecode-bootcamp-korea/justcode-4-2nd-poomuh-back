const realEstateDao = require('../models/realEstateDao');

const filteredMaps = async (category, tradeType) => {
  const filteredMaps = await realEstateDao.getFilteredMaps(category, tradeType);

  return filteredMaps;
};

module.exports = { filteredMaps };
