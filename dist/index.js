"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
const catsRoutes = require("./cats/cats");
app.use("/cats", catsRoutes);
//# sourceMappingURL=index.js.map