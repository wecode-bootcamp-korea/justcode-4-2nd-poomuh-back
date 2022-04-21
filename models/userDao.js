const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (email, encryptPw, username, nickname) => {
  return await prisma.$queryRaw`
    INSERT INTO users(email, password, name, nickname) VALUES (${email}, ${encryptPw}, ${username}, ${nickname})`;
};

module.exports = {
  createUser,
};
