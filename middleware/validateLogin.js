const err = require("../utils/errUtils");

const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw err.errGenerator({
        statusCode: 500,
        message: "KeyError",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateLogin };
