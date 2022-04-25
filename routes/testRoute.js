const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const testController = require('../controllers/testController');

// 업로드 파일 저장 경로 및 파일이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'databases/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    fullname = path.basename(file.originalname, ext) + '_' + Date.now() + ext;
    cb(null, fullname);
  },
});

// 업로드 파일 필터
const fileFilter = (req, file, cb) => {
  allowedMimeTypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        message: `${file.mimetype}은 업로드가 불가능한 확장자 입니다. 이미지 파일만 업로드 가능 합니다.`,
      },
      false
    );
  }
};

// multer
// storage, fileFilter, limits(파일크기 혹은 갯수등 제한)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 3 },
});

// Router
// test1
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the poomuh backend server',
  });
});

// test2
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// image upload API
router.post('/profile', upload.array('image'), testController.uploadImage);

module.exports = router;
