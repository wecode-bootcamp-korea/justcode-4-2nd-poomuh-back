const http = require('http');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const routes = require('./routes');
const errUtils = require('./utils/errUtils');

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errUtils.errHandler);

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(process.env.PORT, () =>
      console.log(`Server is listening on ${process.env.PORT}`)
    );
  } catch (err) {
    console.error(err);
    //    await prisma.$disconnect()
  }
};

start();
