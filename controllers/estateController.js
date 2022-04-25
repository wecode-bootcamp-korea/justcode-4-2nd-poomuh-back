const estateService = require('../services/estateService');
const errUtils = require('../utils/errUtils');

const filteredMaps = async (req, res, next) => {
  try {
    const user = req.userid ? req.userid[0].id : '';
    const { tradeType } = req.query;

    const filteredMaps = await estateService.filteredMaps(user, tradeType);

    return res.status(200).json({ map: filteredMaps });
  } catch (err) {
    next(err);
  }
};

module.exports = { filteredMaps };
