const userService = require("../services/userService");
const err = require("../utils/errUtils");

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.logIn(email, password);
    return res.status(200).json({
      message: "Login success",
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { logIn };
