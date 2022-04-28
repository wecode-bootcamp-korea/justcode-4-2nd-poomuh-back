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

const getFavEstatesById = async (user, arrIds, state) => {
  return await prisma.$queryRaw`
    SELECT
      re.id,
      re.exclusive_size,
      re.current_floor,
      re.available_date,
      re.description_title,
      re.price_main,
      re.price_deposit,
      re.price_monthly,
      re.room_image AS image_url,
      c.type AS category_type,
      JSON_ARRAYAGG(t.type) AS trade_type,
      ( SELECT l.real_estate_id 
              FROM users_real_estates_likes AS l
              WHERE l.user_id = ${user} AND re.id = l.real_estate_id ) AS is_like
      ${
        state !== 'recent'
          ? Prisma.sql`
              ,
              l.real_estate_id AS is_like
              FROM real_estates AS re
              JOIN categories AS c ON re.category_id = c.id
              JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
              JOIN trades AS t ON t.id = tre.trade_id
              JOIN users_real_estates_likes AS l ON l.real_estate_id = re.id
              WHERE l.user_id = ${user}
              GROUP BY re.id, c.type
            `
          : Prisma.sql`
          
              FROM real_estates AS re
              JOIN categories AS c ON re.category_id = c.id
              JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
              JOIN trades AS t ON t.id = tre.trade_id
              WHERE re.id IN (${Prisma.join(arrIds)})
              GROUP BY re.id, c.type
              ORDER BY FIELD(re.id, ${Prisma.join(arrIds)})
            `
      }`;
};

module.exports = {
  getLikeByUserAndEstateId,
  updateLike,
  deleteLike,
  getFavEstatesById,
};
