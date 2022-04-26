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
    const user = req.user[0];
    const likeEstates = await favoriteService.getLikeEstates(user);
    return res
      .status(200)
      .json({ messgae: 'LIKE_ESTATES_IS_RENDERED', liked: likeEstates });
  } catch (err) {
    next(err);
  }
};

module.exports = { changeLike, getLikeEstates };
