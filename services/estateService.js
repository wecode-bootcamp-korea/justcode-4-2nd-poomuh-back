const estateDao = require('../models/estateDao');

const filteredMaps = async (user, tradeType) => {
  const arrTradeTypes = tradeType.split(',');
  const filteredMaps = await estateDao.getFilteredMaps(user, arrTradeTypes);

  return filteredMaps;
};

module.exports = { filteredMaps };
