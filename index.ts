import express, { Express, request } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import oktaExpress from '@okta/okta-sdk-nodejs';
import { LexRuntime } from 'aws-sdk';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import options from './spec/options';
import swaggerDocument from './spec/swagger.json';
import SwaggerParser from 'swagger-parser';
import Connect from './database/connection';
import bodyParser from 'body-parser';
import cors from 'cors';
import cluster from "cluster";
import redis from 'redis';
import { promisify } from 'util';
import { errorHandler } from './error/error-handler';
import {ErrorException} from './error/error-exception';
import { ErrorCode } from './error/error';


Connect();
const totalCPUs = require("os").cpus().length;
const fetch = require('node-fetch');
//const NodeCache = require('node-cache');
//const myCache = new NodeCache({ stdTTL: 600 });


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
const specs = swaggerJsdoc(options);

//console.log(require.cache, { depth: Infinity });


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Set up OpenAPI validator middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//okta

app.use(session({
  secret: 'your-session-secret',
  resave: true,
  saveUninitialized: false
}));


const myLogger = function (req: any, res: any, next: () => void) {
  console.log('LOGGED by middle ware' + req + res)
  next();
};
const child_process = require('child_process');
app.use(myLogger);
child_process.exec('node_support.js');

app.listen(port, () => {
  console.log(`App is running at https://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello My World!');
});

app.put('/metro', (req, res) => {
  res.send('I am metro');
});


import { router as router2 } from "./cats/cats";
app.use("/cats", router2);

import { usersController } from "./controllers/usersController";
app.use("/test", usersController);

import { eventRouter } from "./event/event";
app.use("/e", eventRouter);

app.use(errorHandler);
console.log(JSON.stringify(process.env));

/*
if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);
 
  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
 
  cluster.on("exit", (worker: any, code: any, signal: any) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);
 
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
 
  app.get("/api/", function (req, res) {
    let n = 50000000000;
    let count = 0;
 
    if (n > 50000000000) n = 50000000000;
 
    for (let i = 0; i <= n; i++) {
      count += i;
    }
 
    res.send(`Final count is ${count}`);
  });
 
  app.listen(4000, () => {
    console.log(`App listening on port ${4000}`);
  });
}*/
