const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const getFilteredMaps = async (user, arrTradeTypes) => {
  return await prisma.$queryRaw`
    SELECT
      re.address_main AS addresMain,
      re.address_ho AS addressHo,
      re.latitude AS lat,
      re.longitude AS lng,
      re.exclusive_size AS excSize,
      re.building_floor AS buildFloor,
      re.current_floor AS currFloor,
      re.available_date AS ableDate,
      re.description_title AS descTitle,
      re.price_main AS priceMain,
      re.price_deposit AS priceDeposit,
      re.price_monthly AS priceMonthly,
      c.type AS categoryType,
      JSON_ARRAYAGG(t.type) AS tradeTypes
      ${
        user
          ? Prisma.sql`
        , ( SELECT l.real_estate_id 
        FROM users_real_estates_likes AS l
        WHERE l.user_id = ${user} AND re.id = l.real_estate_id ) AS isLike
        `
          : Prisma.empty
      }
    FROM real_estates AS re
    JOIN categories AS c ON re.category_id = c.id
    JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
    JOIN trades AS t ON t.id = tre.trade_id
    WHERE
      (re.latitude BETWEEN 0 AND 99) AND
      (re.longitude BETWEEN 0 AND 999) AND
      (t.type IN (${Prisma.join(arrTradeTypes)}))
    GROUP BY re.id, c.type
  `;
};

module.exports = { getFilteredMaps };
