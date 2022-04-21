const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkByEmail = async (email) => {
  return await prisma.$queryRaw`
   SELECT id,password FROM users
   WHERE email= ${email}
   `;
};
const findUserById = async (id) => {
  return await prisma.$queryRaw`
  SELECT id 
  FROM users
  where id =${id}
  `;
};
module.exports = { checkByEmail, findUserById };
