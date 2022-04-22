const { PrismaClient } = require("@prisma/client");
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
const createEstateInfo = async (
  is_deleted,
  address_main,
  address_dong,
  address_ho,
  latitude,
  longtitude,
  supply_size,
  exclusive_size,
  building_floor,
  current_floor,
  available_date,
  description_title,
  description_detail,
  heat,
  category,
  real_estate_agent
) => {
  return await prisma.$queryRaw`
  INSERT INTO real_estates( 
    is_deleted,
    address_main,
    address_dong,
    address_ho,
    latitude,
    longitude,
    supply_size,
    exclusive_size,
    building_floor,
    current_floor,
    available_date,
    description_title,
    description_detail,
    heat_id,
    category_id,
    real_estate_agent_id) 
  VALUES (
    ${is_deleted},
    ${address_main},
    ${address_dong},
    ${address_ho},
    ${latitude},
    ${longtitude},
    ${supply_size},
    ${exclusive_size},
    ${building_floor},
    ${current_floor},
    ${available_date},
    ${description_title},
    ${description_detail},
    ${heat},
    ${category},
    ${real_estate_agent}) 
  `;
};
module.exports = { getFilteredMaps, createEstateInfo };
