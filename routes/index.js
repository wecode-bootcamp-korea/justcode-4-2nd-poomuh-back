const express = require('express');
const router = express.Router();

const testRoute = require('./testRoute');
const userRoute = require('./userRoute');
const agentRoute = require('./agentRoute');
const estateRoute = require('./estateRoute');
const favoriteRoute = require('./favoriteRoute');

router.use('/', testRoute);
router.use('/users', userRoute);
router.use('/agents', agentRoute);
router.use('/estates', estateRoute);
router.use('/favorites', favoriteRoute);

module.exports = router;
