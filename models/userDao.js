const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (email, encryptPw, username, nickname) => {
  return await prisma.$queryRaw`
    INSERT INTO users(email, password, name, nickname) 
    VALUES (${email}, ${encryptPw}, ${username}, ${nickname})
  `;
};

const checkByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT id,password FROM users
    WHERE email= ${email}
  `;
};

const getUserIdById = async (number) => {
  return await prisma.$queryRaw`
    SELECT id FROM users
    where id =${number}
  `;
};

const getUserEmailByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT email FROM users
    WHERE email = ${email}
  `;
};

module.exports = {
  createUser,
  checkByEmail,
  getUserIdById,
  getUserEmailByEmail,
};
