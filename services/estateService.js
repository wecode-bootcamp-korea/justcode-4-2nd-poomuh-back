const estateDao = require('../models/estateDao');

const filteredMaps = async (categories, tradeType) => {
  const arrCategories = categories.split(',');
  const arrTradeTypes = tradeType.split(',');
  const filteredMaps = await estateDao.getFilteredMaps(
    arrCategories,
    arrTradeTypes
  );

  return filteredMaps;
};

module.exports = { filteredMaps };
