const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFilteredMaps = async (arrCategories, arrTradeTypes) => {
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
    JOIN categories AS c ON re.category_id = c.id
    JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
    JOIN trades AS t ON t.id = tre.trade_id
    WHERE
      (re.latitude BETWEEN 0 AND 99) AND
      (re.longitude BETWEEN 0 AND 999) AND
      (c.type IN (${Prisma.join(arrCategories)})) AND
      (t.type IN (${Prisma.join(arrTradeTypes)}))
    GROUP BY re.id, c.type
  `;
};
const createEstateInfo = async (
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
  price_main,
  price_deposit,
  price_monthly,
  heat_id,
  category_id,
  real_estate_agent_id,
  trade_id
) => {
  await prisma.$queryRaw`
  INSERT INTO real_estates( 
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
    price_main,
    price_deposit,
    price_monthly,
    heat_id,
    category_id,
    real_estate_agent_id
    )
  VALUES (
    ${address_main},
    ${address_dong},
    ${address_ho},
    ${latitude},
    ${longitude},
    ${supply_size},
    ${exclusive_size},
    ${building_floor},
    ${current_floor},
    ${available_date},
    ${description_title},
    ${description_detail},
    ${price_main},
    ${price_deposit},
    ${price_monthly},
    ${heat_id},
    ${category_id},
    ${real_estate_agent_id}
    )
   `;

  const b = await prisma.$queryRaw`
    SELECT id FROM real_estates
    WHERE address_ho=${address_ho} AND address_main=${address_main}`;
  const id = b[0].id;
  for (i = 0; i < trade_id.length; i++) {
    const trade = trade_id[i];
    await prisma.$queryRaw`
    INSERT INTO trades_real_estates (trade_id,real_estate_id) VALUES (${trade},${id})
    `;
  }
  return;
};
const getEstateInfo = async (estateId, agentId) => {
  return await prisma.realEstates.findUnique({
    where: { id: Number(estateId) },
    select: {
      id: true,
      address_main: true,
      address_dong: true,
      address_ho: true,
      latitude: true,
      longitude: true,
      supply_size: true,
      exclusive_size: true,
      building_floor: true,
      current_floor: true,
      available_date: true,
      description_title: true,
      description_detail: true,
      price_main: true,
      price_deposit: true,
      price_monthly: true,
      heat_id: true,
      category_id: true,
      real_estate_agent_id: true,
    },
  });
};

const getEstateList = async (agentId) => {
  const estateId = await prisma.realEstates.findMany({
    where: { real_estate_agent_id: Number(agentId) },
    select: { id: true },
  });
  let result = [];
  for (i = 0; i < estateId.length; i++) {
    result[i] = await prisma.realEstates.findUnique({
      where: { id: estateId[i].id },
      select: {
        id: true,
        price_main: true,
        price_deposit: true,
        price_monthly: true,
        category_id: true,
        created_at: true,
        users_real_estate_likes: {
          where: { real_estate_id: Number(`${estateId[i].id}`) },
          select: {
            id: true,
          },
        },
      },
    });
  }
  return result;
};

const putEstateInfo = async (
  estateId,
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
  price_main,
  price_deposit,
  price_monthly,
  heat_id,
  category_id,
  real_estate_agent_id,
  trade_id
) => {
  const a = await prisma.$queryRaw`
  UPDATE real_estates
  SET 
    address_main= ${address_main},
    address_dong=${address_dong},
    address_ho = ${address_ho},
    latitude= ${latitude},
    longitude= ${longitude},
    supply_size=${supply_size},
    exclusive_size=${exclusive_size},
    building_floor=${building_floor},
    current_floor=${current_floor},
    available_date=${available_date},
    description_title=${description_title},
    description_detail=${description_detail},
    price_main=${price_main},
    price_deposit=${price_deposit},
    price_monthly=${price_monthly},
    heat_id=${heat_id},
    category_id=${category_id},
    real_estate_agent_id=${real_estate_agent_id}
    WHERE id = ${estateId} 
    `;

  for (i = 0; i < trade_id.length; i++) {
    const trade = trade_id[i];
    await prisma.$queryRaw`
      UPDATE trades_real_estates SET trade_id=${trade} WHERE real_estate_id=${estateId}
      `;
  }
  return a;
};
const deleteEstateInfo = async (estateId, agentId) => {
  return await prisma.$queryRaw`
  UPDATE real_estates 
  SET is_deleted = 1
  WHERE real_estate_agent_id=${agentId}
  AND id=${estateId}
  `;
};

const search = async (search) => {
  await prisma.realEstates.findMany({
    where: { address_main: ILIKE(`%${search}%`) },
    select: {
      supply_size: true,
      current_floor: true,
      price_main: true,
      price_deposit: true,
      price_monthly: true,
      description_title: true,
      trades_real_estates: { select: { trade_id: true } },
    },
  });
};
module.exports = {
  getFilteredMaps,
  createEstateInfo,
  getEstateList,
  getEstateInfo,
  putEstateInfo,
  deleteEstateInfo,
  search,
};
