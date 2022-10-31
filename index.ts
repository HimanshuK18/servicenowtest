import express, { Express } from 'express';
import dotenv from 'dotenv';

const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
const catsRoutes = require("./cats/cats");
app.use("/cats", catsRoutes);
