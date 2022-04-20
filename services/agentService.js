const agentDao = require('../models/agentDao');
const errUtils = require('../utils/errUtils');
const bcrypt = require('bcrypt');

const signUp = async (email, password, username, nickname) => {
  // 패스워드 암호화
  const encryptPw = bcrypt.hashSync(password, bcrypt.genSaltSync());

  return await agentDao.createAgent(email, encryptPw, username, nickname);
};

module.exports = { signUp };
