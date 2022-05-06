const http = require('http');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const routes = require('./routes');
const errUtils = require('./utils/errUtils');
const cors = require('cors');

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./databases/uploads'));
app.use(routes);
app.use(errUtils.errHandler);

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(process.env.PORT, () =>
      console.log(`Server is listening on ${process.env.PORT}`)
    );
  } catch (err) {
    await prisma.$disconnect();
  }
};

start();
