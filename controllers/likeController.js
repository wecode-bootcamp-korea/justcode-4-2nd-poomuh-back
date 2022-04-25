const likeService = require('../services/likeService');

const changeLike = async (req, res, next) => {
  try {
    const user = req.userid[0].id;
    const estate = req.params.id;

    const isLike = await likeService.changeLike(user, estate);
    const result = isLike ? 'ADDED' : 'DELETED';
    return res.status(200).json({ message: `LIKE_IS_${result}` });
  } catch (err) {
    next(err);
  }
};

const getLikeEstates = async (req, res, next) => {
  try {
    const user = req.userid[0].id;
    const likeEstates = await likeService.getLikeEstates(user);
    return res.status(200).json({ messgae: 'LIKE_ESTATES_IS_RENDERED' });
  } catch (err) {
    next(err);
  }
};

module.exports = { changeLike, getLikeEstates };
