const estateService = require('../services/estateService');
const errUtils = require('../utils/errUtils');

const filteredMaps = async (req, res, next) => {
  try {
    const { category, tradeType } = req.query;

    console.log(tradeType);
    // if (!category || !tradeType) {
    //   throw errUtils.errGenerator({
    //     statusCode: 400,
    //     message: 'KEY_ERROR',
    //   });
    // }
    const categories = category.split(',');
    console.log(categories);

    const filteredMaps = await estateService.filteredMaps(
      categories,
      tradeType
    );

    return res.status(200).json({ map: filteredMaps });
  } catch (err) {
    next(err);
  }
};

module.exports = { filteredMaps };
