const errUtils = require('../utils/errUtils');

const validateSignup = async (req, res, next) => {
  try {
    const { email, password, username, nickname } = req.body;

    const obj = { email, password, username, nickname };

    for (const key in obj) {
      if (!obj[key]) {
        throw errUtils.errGenerator({
          statusCode: '400',
          message: `KEY_ERROR_${key}`,
        });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateSignup };
