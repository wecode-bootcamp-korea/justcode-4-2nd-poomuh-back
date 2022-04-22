const agentDao = require('../models/agentDao');
const errUtils = require('../utils/errUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (email, password, username, nickname) => {
  // 패스워드 암호화
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

const getAgentByUserId = async (id) => {
  return await agentDao.getAgentByUserId(id);
};

module.exports = {
  signUp,
  logIn,
  getAgentByUserId,
};
