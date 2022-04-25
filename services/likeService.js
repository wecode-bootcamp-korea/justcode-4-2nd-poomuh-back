const likeDao = require('../models/likeDao');

const changeLike = async (user, estate) => {
  const liked = await likeDao.getLikeByUserAndEstateId(user, estate);

  if (!liked[0]) {
    await likeDao.updateLike(user, estate);
    return 1;
  } else {
    await likeDao.deleteLike(user, estate);
    return 0;
  }
};

const getLikeEstates = async (user) => {
  return await likeDao.getLikeEstatesByUserId(user);
};

module.exports = { changeLike, getLikeEstates };
