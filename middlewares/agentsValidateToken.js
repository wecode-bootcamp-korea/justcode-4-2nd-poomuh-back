const jwt = require("jsonwebtoken");
const errUtils = require("../utils/errUtils");
const agentService = require("../services/agentService");

const agentsValidateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);
    if (!token) {
      throw errUtils.errGenerator({
        statusCode: 401,
        message: "로그인이 필요합니다.",
      });
    }
    const id = jwt.verify(token, process.env.SECRET_KEY);
    const number = id.agentId;
    const findAgent = await agentService.getAgentByUserId(number);

    if (!findAgent[0]) {
      throw await errUtils.errGenerator({
        statusCode: 400,
        message: "해당하는 유저를 찾을 수 없습니다. ",
      });
    }
    req.agent = findAgent[0].id;
    console.log(req.agent);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { agentsValidateToken };
