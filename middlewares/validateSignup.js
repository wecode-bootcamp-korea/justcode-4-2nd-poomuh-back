const errUtils = require('../utils/errUtils');

const validateSignup = async (req, res, next) => {
  try {
    const { email, password, username, nickname } = req.body;

    if (!email || !password || !username || !nickname) {
      throw errUtils.errGenerator({
        statusCode: '400',
        message: 'KEY_ERROR',
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateSignup };
