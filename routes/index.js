const express = require('express');
const router = express.Router();

const testRoute = require('./testRoute');
const userRoute = require('./userRoute');
const agentRoute = require('./agentRoute');

router.use('/', testRoute);
router.use('/users', userRoute);
router.use('/agents', agentRoute);

module.exports = router;
