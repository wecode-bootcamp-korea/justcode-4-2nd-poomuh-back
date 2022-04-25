const jwt = require("jsonwebtoken");
const errUtils = require("../utils/errUtils");
const userService = require("../services/userService");

const usersValidateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      throw errUtils.errGenerator({
        statusCode: 401,
        message: "로그인이 필요합니다.",
      });
    }

    //token이 해당유저것이 맞는지 확인
    const id = jwt.verify(token, process.env.SECRET_KEY);
    const number = id.userId;
    const findUser = await userService.findUserById(number);

    if (!findUser[0]) {
      throw errUtils.errGenerator({
        statusCode: 400,
        message: "해당하는 유저를 찾을 수 없습니다.",
      });
    }
    req.user = findUser[0].id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { usersValidateToken };
