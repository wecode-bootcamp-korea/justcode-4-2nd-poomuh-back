const agentService = require('../services/agentService');

const signUp = async (req, res, next) => {
  try {
    const { email, password, username, nickname } = req.body;

    await agentService.signUp(email, password, username, nickname);

    return res.status(201).json({
      username: username,
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp };
