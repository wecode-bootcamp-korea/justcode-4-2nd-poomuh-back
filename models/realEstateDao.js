const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFilteredMaps = async (category, tradeType) => {
  return await prisma.$queryRaw`
    SELECT 
      re.address_main AS addresMain,
      re.latitude AS lat,
      re.longitude AS lng,
      re.exclusive_size AS excSize,
      re.building_floor AS buildFloor,
      re.current_floor AS currFloor,
      re.available_date AS ableDate,
      re.descrption_title AS descTitle,
      re.price_main AS priceMain,
      re.price_deposit AS priceDeposit,
      re.price_monthly AS priceMonthly,
      c.type AS categoryType,
      JSON_ARRAYAGG(t.type) AS tradesType
    FROM real_estates AS re 
    WHERE (lat BETWEEN 0 AND 99) AND (lng BETWEEN 0 AND 999)
    JOIN trades_real_estates AS trs ON trs.real_estate_id = re.id
    JOIN trades AS t ON t.id = trs.trade_id
  `;
};
