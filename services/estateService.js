const estateDao = require('../models/estateDao');

const filteredMaps = async (category, tradeType) => {
  const filteredMaps = await estateDao.getFilteredMaps(category, tradeType);

  return filteredMaps;
};

module.exports = { filteredMaps };
