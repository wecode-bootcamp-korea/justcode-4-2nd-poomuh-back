const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkByEmail = async (email) => {
  return await prisma.$queryRaw`
   SELECT id,password FROM real_estate_agents
   WHERE email= ${email}
   `;
};
const getAgentByUserId = async (id) => {
  return await prisma.$queryRaw`
  SELECT id FROM real_estate_agents
  WHERE ID = ${id}
  `;
};
module.exports = { checkByEmail, getAgentByUserId };
