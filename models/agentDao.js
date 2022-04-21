const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAgent = async (email, encryptPw, username, nickname) => {
  return await prisma.$queryRaw`
    INSERT INTO real_estate_agents(email, password, name, nickname) VALUES (${email}, ${encryptPw}, ${username}, ${nickname})`;
};

module.exports = {
  createAgent,
};
