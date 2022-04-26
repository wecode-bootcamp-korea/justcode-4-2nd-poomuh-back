const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const getLikeByUserAndEstateId = async (user, estate) => {
  return await prisma.$queryRaw`
    SELECT id FROM users_real_estates_likes
    WHERE user_id = ${user} AND real_estate_id = ${estate}
  `;
};
const updateLike = async (user, estate) => {
  return await prisma.$queryRaw`
    INSERT INTO users_real_estates_likes(user_id, real_estate_id)
    VALUES (${user}, ${estate})
  `;
};
const deleteLike = async (user, estate) => {
  return await prisma.$queryRaw`
    DELETE FROM users_real_estates_likes
    WHERE user_id = ${user} AND real_estate_id = ${estate}
  `;
};

const getLikeEstatesByUserId = async (user) => {
  return await prisma.$queryRaw`
    SELECT
      re.exclusive_size AS excSize,
      re.current_floor AS currFloor,
      re.available_date AS ableDate,
      re.description_title AS descTitle,
      re.price_main AS priceMain,
      re.price_deposit AS priceDeposit,
      re.price_monthly AS priceMonthly,
      c.type AS categoryType,
      JSON_ARRAYAGG(t.type) AS tradeTypes,
      ( SELECT l.real_estate_id 
      FROM users_real_estates_likes AS l
      WHERE l.user_id = ${user} AND re.id = l.real_estate_id ) AS isLike
    FROM real_estates AS re
    JOIN categories AS c ON re.category_id = c.id
    JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
    JOIN trades AS t ON t.id = tre.trade_id
    GROUP BY re.id, c.type
  `;
};

module.exports = {
  getLikeByUserAndEstateId,
  updateLike,
  deleteLike,
  getLikeEstatesByUserId,
};
