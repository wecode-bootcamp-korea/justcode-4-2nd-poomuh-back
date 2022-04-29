const agentDao = require('../models/agentDao');
const errUtils = require('../utils/errUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (email, password, username, nickname) => {
  const agentEmail = await agentDao.getAgentEmailByEmail(email);
  if (agentEmail[0]) {
    throw errUtils.errGenerator({
      statusCode: 400,
      message: 'EXSITING_USER',
    });
  }

  // const emailRegex =
  //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  // const nicknameRegex = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]{0,10}$/;
  // const passwordRegex = /(?=.*[a-zA-Z]{2,20}).{8,20}$/;
  // const regex = {
  //   email: emailRegex.test(email),
  //   nickname: nicknameRegex.test(nickname),
  //   password: passwordRegex.test(password),
  // };
  // for (const key in regex) {
  //   if (!regex[key]) {
  //     throw errUtils.errGenerator({
  //       statusCode: 400,
  //       message: `${key.toUpperCase()}_IS_NOT_VALID`,
  //     });
  //   }
  // }

  const encryptPw = bcrypt.hashSync(password, bcrypt.genSaltSync());

  return await agentDao.createAgent(email, encryptPw, username, nickname);
};

const logIn = async (email, password) => {
  const agent = await agentDao.checkByEmail(email);
  if (agent[0] === undefined) {
    throw errUtils.errGenerator({
      statusCode: 400,
      message: '존재하지 않는 사용자입니다.',
    });
  }

  const checkPassword = bcrypt.compare(password, agent[0].password);
  if (!checkPassword) {
    throw errUtils.errGenerator({
      statusCode: 400,
      message: '이메일 혹은 비밀번호가 올바르지 않습니다.',
    });
  }

  const token = jwt.sign({ agentId: agent[0].id }, process.env.SECRET_KEY);
  return token;
};

const getAgentByUserId = async (number) => {
  return await agentDao.getAgentIdById(number);
};

module.exports = {
  signUp,
  logIn,
  getAgentByUserId,
};
