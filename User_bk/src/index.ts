import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import {AppRoutes} from "./routes";
var cors = require('cors')

createConnection().then(async connection => {
    const app = express();
    app.use(cors())
    app.use(bodyParser.json());

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            console.log(request);
		route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    app.listen(3002);
    console.log("Express application is up and running on port 3002");

}).catch(error => console.log("TypeORM connection error: ", error));
