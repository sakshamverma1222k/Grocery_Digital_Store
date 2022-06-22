import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
var cors = require('cors');
const path = require("path");  
import Db from './app';

const db = new Db();
const app = express();
app.use(bodyParser.json());
app.use(cors())


app.use('/images',express.static('uploads'));

AppRoutes.forEach(route => {
    app[route.method](route.path, (request: Request, response: Response, next: Function) => {
        route.action(request, response)
            .then(() => next)
            .catch(err => next(err));
    });
});

app.listen(3001);
console.log("Express application is up and running on port 3001");