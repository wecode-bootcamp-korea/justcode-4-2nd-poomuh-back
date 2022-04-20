const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (email, encryptPw, username, nickname) => {
  return await prisma.$queryRaw`
    INSERT INTO real_estate_agents(email, password, username, nickname) VALUES (${email}, ${encryptPw}, ${username}, ${nickname})`;
};

module.exports = {
  createUser,
};
