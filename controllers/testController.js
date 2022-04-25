const errUtils = require('../utils/errUtils');

const uploadImage = async (req, res, next) => {
  try {
    const images = req.files;
    const fileName = images.map((el) => el.filename);

    if (!images[0]) {
      errUtils.errGenerator({
        message: '이미지가 존재하지 않습니다.',
        statusCode: 404,
      });
    }

    return res.status(201).json({
      message: '이미지가 성공적으로 저장되었습니다.',
      imagesName: fileName,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImage };
