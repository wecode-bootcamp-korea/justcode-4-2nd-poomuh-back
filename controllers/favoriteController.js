const favoriteService = require('../services/favoriteService');

const changeLike = async (req, res, next) => {
  try {
    const user = req.user;
    const estate = req.params.id;

    const isLike = await favoriteService.changeLike(user, estate);
    const result = isLike ? 'ADDED' : 'DELETED';
    return res.status(200).json({ message: `LIKE_IS_${result}` });
  } catch (err) {
    next(err);
  }
};

const getLikeEstates = async (req, res, next) => {
  try {
    const user = req.user;
    const likeEstates = await favoriteService.getLikeEstates(user);
    return res
      .status(200)
      .json({ messgae: 'LIKE_ESTATES_IS_RENDERED', likeEstates });
  } catch (err) {
    next(err);
  }
};

const getRecentEstates = async (req, res, next) => {
  try {
    const ids = req.headers.recent;
    const recent = await favoriteService.getRecentEstates(ids);
    return res
      .status(200)
      .json({ messgae: 'RECENT_ESTATES_IS_RENDERED', recent });
  } catch (err) {
    next(err);
  }
};
module.exports = { changeLike, getLikeEstates, getRecentEstates };
