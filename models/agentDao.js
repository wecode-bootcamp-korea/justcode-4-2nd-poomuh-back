const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAgent = async (email, encryptPw, username, nickname) => {
  return await prisma.$queryRaw`
    INSERT INTO real_estate_agents(email, password, name, nickname) 
    VALUES (${email}, ${encryptPw}, ${username}, ${nickname})
  `;
};

const checkByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT id,password FROM real_estate_agents
    WHERE email= ${email}
  `;
};
const getAgentIdById = async (number) => {
  return await prisma.$queryRaw`
    SELECT id FROM real_estate_agents
    WHERE ID = ${number}
  `;
};

const getAgentEmailByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT email FROM real_estate_agents
    WHERE email = ${email}
  `;
};

module.exports = {
  createAgent,
  checkByEmail,
  getAgentIdById,
  getAgentEmailByEmail,
};
