const express = require('express');
const router = express.Router();

const testRoute = require('./testRoute');
const userRoute = require('./userRoute');
const agentRoute = require('./agentRoute');
const estatateRoute = require('./estateRoute');

router.use('/', testRoute);
router.use('/users', userRoute);
router.use('/agents', agentRoute);
router.use('/estate', estatateRoute);

module.exports = router;
