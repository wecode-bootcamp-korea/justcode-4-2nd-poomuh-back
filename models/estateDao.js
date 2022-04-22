const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFilteredMaps = async (categories, tradeType) => {
  const category = categories.map((el) => `(c.type = ${el})`);
  console.log(category);

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
    FROM real_estates AS re
    LEFT JOIN categories AS c ON re.category_id = c.id
    LEFT JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
    LEFT JOIN trades AS t ON t.id = tre.trade_id
    WHERE
      (re.latitude BETWEEN 0 AND 99) AND
      (re.longitude BETWEEN 0 AND 999) AND
      (c.type IN '원룸','빌라')
    GROUP BY re.id, c.type, t.type
  `;
};

module.exports = { getFilteredMaps };
