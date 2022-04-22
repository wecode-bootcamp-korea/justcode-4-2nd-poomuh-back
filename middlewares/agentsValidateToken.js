const jwt = require('jsonwebtoken');
const errUtils = require('../utils/errUtils');
const agentService = require('../services/agentService');

const agentsValidateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      throw errUtils.errGenerator({
        statusCode: 401,
        message: '로그인이 필요합니다.',
      });
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const findAgent = await agentService.getAgentByUserId(id);

    if (!findAgent) {
      throw await errUtils.errGenerator({
        statusCode: 400,
        message: '해당하는 유저를 찾을 수 없습니다. ',
      });
    }
    req.agent = findAgent;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { agentsValidateToken };
