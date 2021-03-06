const { PrismaClient, Prisma } = require("@prisma/client");
const { header } = require("express/lib/request");
const prisma = new PrismaClient();

const getfilteredClusters = async (arrTradeTypes, arrLatLng) => {
  const west = arrLatLng[0] ? arrLatLng[0] : 0;
  const east = arrLatLng[1] ? arrLatLng[1] : 999;
  const south = arrLatLng[2] ? arrLatLng[2] : 0;
  const north = arrLatLng[3] ? arrLatLng[3] : 99;
  return await prisma.$queryRaw`
    SELECT
      re.id,
      re.address_main,
      re.building_name,
      re.address_ho,
      re.latitude AS lat,
      re.longitude AS lng,
      re.supply_size,
      re.exclusive_size,
      re.building_floor,
      re.current_floor,
      re.description_title,
      re.price_main,
      re.price_deposit,
      re.price_monthly,
      re.room_image AS image_url,
      c.type AS category_type,
      JSON_ARRAYAGG(t.type) AS trade_type
      FROM real_estates AS re
      JOIN categories AS c ON re.category_id = c.id
      JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
      JOIN trades AS t ON t.id = tre.trade_id
      ${Prisma.sql`WHERE
      (re.latitude BETWEEN ${south} AND ${north}) AND
      (re.longitude BETWEEN ${west} AND ${east})`}
      ${
        arrTradeTypes[0]
          ? Prisma.sql`AND (t.type IN (${Prisma.join(arrTradeTypes)}))`
          : Prisma.empty
      }
    GROUP BY re.id
  `;
};

const getfilteredEstates = async (user, arrTradeTypes, headers, arrLatLng) => {
  const offset = headers.offset ? headers.offset * 4 : "";
  const limit = headers.offset ? 4 : "";
  const west = arrLatLng[0] ? arrLatLng[0] : 0;
  const east = arrLatLng[1] ? arrLatLng[1] : 999;
  const south = arrLatLng[2] ? arrLatLng[2] : 0;
  const north = arrLatLng[3] ? arrLatLng[3] : 99;

  return await prisma.$queryRaw`
    SELECT
      re.id,
      re.address_main,
      re.building_name,
      re.address_ho,
      re.latitude AS lat,
      re.longitude AS lng,
      re.supply_size,
      re.exclusive_size,
      re.building_floor,
      re.current_floor,
      re.description_title,
      re.price_main,
      re.price_deposit,
      re.price_monthly,
      re.room_image AS image_url,
      c.type AS category_type,
      JSON_ARRAYAGG(t.type) AS trade_type
      ${
        user
          ? Prisma.sql`
        , ( SELECT l.real_estate_id 
        FROM users_real_estates_likes AS l
        WHERE l.user_id = ${user} AND re.id = l.real_estate_id ) AS is_like
        `
          : Prisma.empty
      }
    FROM real_estates AS re
    JOIN categories AS c ON re.category_id = c.id
    JOIN trades_real_estates AS tre ON tre.real_estate_id = re.id
    JOIN trades AS t ON t.id = tre.trade_id
    WHERE
      (re.latitude BETWEEN ${south} AND ${north}) AND
      (re.longitude BETWEEN ${west} AND ${east})
      ${
        arrTradeTypes[0]
          ? Prisma.sql`AND (t.type IN (${Prisma.join(arrTradeTypes)}))`
          : Prisma.empty
      }
    GROUP BY re.id
    ${limit ? Prisma.sql`LIMIT ${limit} OFFSET ${offset}` : Prisma.empty}
    
  `;
};

const createEstateInfo = async (body, agentId) => {
  const {
    address_main,
    building_name,
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
    trade_id,
  } = body;
  await prisma.$queryRaw`
  INSERT INTO real_estates( 
    address_main,
    building_name,
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
    ${building_name},
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
    ${agentId}
    )
   `;

  const b = await prisma.$queryRaw`
    SELECT id FROM real_estates
    WHERE address_ho=${address_ho} AND address_main=${address_main} AND current_floor=${current_floor}`;

  const id = b[0].id;

  for (j = 0; j < trade_id.length; j++) {
    const trade = trade_id[j];
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
      building_name: true,
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
      trades_real_estates: {
        where: { real_estate_id: Number(estateId) },
        select: { trade_id: true },
      },
    },
  });
};

const getEstateList = async (agentId) => {
  const estateId = await prisma.realEstates.findMany({
    where: {
      AND: [{ real_estate_agent_id: Number(agentId) }, { is_deleted: false }],
    },
    select: { id: true },
  });

  let result = [];
  for (i = 0; i < estateId.length; i++) {
    const estateInfo = await prisma.realEstates.findUnique({
      where: { id: estateId[i].id },
      select: {
        id: true,
        price_main: true,
        price_deposit: true,
        price_monthly: true,
        categories: { select: { type: true } },
        created_at: true,
      },
    });
    const likes = await prisma.usersRealEstatesLikes.aggregate({
      where: { real_estate_id: estateId[i].id },
      _count: true,
    });
    result[i] = { likes, estateInfo };
  }
  return result;
};

const updateEstateInfo = async (estateId, agentId, body) => {
  const {
    address_main,
    building_name,
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
    trade_id,
  } = body;

  await prisma.$queryRaw`
  UPDATE real_estates
  SET 
    address_main= ${address_main},
    building_name=${building_name},
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
    real_estate_agent_id=${agentId}
    WHERE id = ${estateId} 
    `;
  await prisma.$queryRaw`
    DELETE FROM trades_real_estates WHERE real_estate_id=${estateId}
    `;

  for (i = 0; i < trade_id.length; i++) {
    const trade = trade_id[i];
    await prisma.$queryRaw`
     INSERT trades_real_estates (trade_id,real_estate_id) VALUES (${trade},${estateId})
      `;
  }

  return;
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
  const office = await prisma.realEstates.findMany({
    where: {
      AND: [
        { category_id: 3 },
        {
          OR: [
            { address_main: { contains: search } },
            { building_name: { contains: search } },
          ],
        },
      ],
    },
    select: {
      building_name: true,
      address_main: true,
      latitude: true,
      longitude: true,
      categories: { select: { type: true } },
    },
  });
  const apartment = await prisma.realEstates.findMany({
    where: {
      AND: [
        { category_id: 4 },
        {
          OR: [
            { address_main: { contains: search } },
            { building_name: { contains: search } },
          ],
        },
      ],
    },
    select: {
      building_name: true,
      address_main: true,
      latitude: true,
      longitude: true,
      categories: { select: { type: true } },
    },
  });
  const room = [office, apartment];
  return room;
};
module.exports = {
  getfilteredClusters,
  getfilteredEstates,
  createEstateInfo,
  getEstateList,
  getEstateInfo,
  updateEstateInfo,
  deleteEstateInfo,
  search,
};
