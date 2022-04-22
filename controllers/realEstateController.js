const realEstateService = require('../services/realEstateService');
const errUtils = require('../utils/errUtils');

const filteredMaps = async (req, res, next) => {
  try {
    // const { category, tradeType } = req.query;

    // if (!category || !tradeType) {
    //   throw errUtils.errGenerator({
    //     statusCode: 400,
    //     message: 'KEY_ERROR',
    //   });
    // }

    const filteredMaps = await realEstateService.filteredMaps(
      category,
      tradeType
    );

    return res.status(200).json({ map: filteredMaps });
  } catch (err) {
    next(err);
  }
};

module.exports = { filteredMaps };
