import http from 'http';

import express from "express";

import routes from "./routes/index.js";
import {swaggerDocs} from "./modules/swagger.js";

export const initiateExpress = async (config) => {

    const app = express();
    app.disable('x-powered-by');
    app.use(function (req, res, next) {
        res.removeHeader("X-Powered-By");
        next();
    });

    app.set("trust proxy", 1)

    app.use(express.text());
    app.use(express.urlencoded({limit: "0.4mb", extended: true}));
    app.use(express.json());

    routes(app);

    swaggerDocs(app,config.port)

    const httpServer = http.createServer({}, app);

    httpServer.listen(config.port, function () {
        console.log(`🚀 Server ready at http://localhost:${config.port}`);
    }).on('error', function (err) {
        console.error("HTTPS server error:", err.message);
        process.exit(1);
    });
}
