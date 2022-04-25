const userService = require('../services/userService');

const signUp = async (req, res, next) => {
  try {
    const { email, password, username, nickname } = req.body;

    await userService.signUp(email, password, username, nickname);

    return res.status(201).json({
      username: username,
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.logIn(email, password);
    return res.status(200).json({
      message: 'Login success',
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, logIn };
