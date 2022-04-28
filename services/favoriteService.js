const favoriteDao = require('../models/favoriteDao');

const changeLike = async (user, estate) => {
  const liked = await favoriteDao.getLikeByUserAndEstateId(user, estate);

  if (!liked[0]) {
    await favoriteDao.updateLike(user, estate);
    return 1;
  } else {
    await favoriteDao.deleteLike(user, estate);
    return 0;
  }
};

const getLikeEstates = async (user) => {
  const ids = '';
  return await favoriteDao.getFavEstatesById(user, ids);
};

const getRecentEstates = async (ids) => {
  const user = '';
  const arrIds = ids.split(',').reverse();
  return await favoriteDao.getFavEstatesById(user, arrIds);
};

module.exports = { changeLike, getLikeEstates, getRecentEstates };
