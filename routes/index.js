const express = require('express');
const router = express.Router();

const testRoute = require('./testRoute');
// const userRoute = require('./userRoute');
const realEstatateRoute = require('./realEstateRoute');

router.use('/', testRoute);
// router.use('/users', userRoute);
router.use('/realestate', realEstatateRoute);

module.exports = router;
