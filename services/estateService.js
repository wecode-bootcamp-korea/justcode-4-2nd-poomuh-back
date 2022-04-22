const estateDao = require('../models/estateDao');

const filteredMaps = async (categories, tradeType) => {
  const filteredMaps = await estateDao.getFilteredMaps(categories, tradeType);

  return filteredMaps;
};

module.exports = { filteredMaps };
