const userDao = require('../models/userDao');
const errUtils = require('../utils/errUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (email, password, username, nickname) => {
  const userEmail = await userDao.getUserEmailByEmail(email);
  if (userEmail[0]) {
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

  return await userDao.createUser(email, encryptPw, username, nickname);
};

const logIn = async (email, password) => {
  const user = await userDao.checkByEmail(email);
  if (user[0] === undefined) {
    throw errUtils.errGenerator({
      statusCode: 400,
      message: '존재하지 않는 사용자입니다.',
    });
  }
  //암호화된 비밀번호 받아와서 해독해서 인자password와 비교하기
  const checkPassword = bcrypt.compare(password, user[0].password);
  if (!checkPassword) {
    throw errUtils.errGenerator({
      statusCode: 400,
      message: '이메일 혹은 비밀번호가 올바르지 않습니다.',
    });
  }
  //토큰받아와야함
  const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY);
  return token;
};

const findUserById = async (number) => {
  return userDao.getUserIdById(number);
};

module.exports = {
  signUp,
  logIn,
  findUserById,
};
