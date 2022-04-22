const errUtils = require('../utils/errUtils');

const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw errUtils.errGenerator({
        statusCode: 500,
        message: 'KeyError',
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateLogin };
