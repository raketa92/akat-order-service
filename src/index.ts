import express, { Request, Response } from 'express';
import { sequelize } from "./models/connect";
import { appConfig } from "./config/appConfig";
import logger from "./utils/logger";
import routes from "./routes";
import { registerService, getServiceToken, getServiceData } from "./services/configServer";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const start = async () => {
    try {
        await sequelize.authenticate();
        // await registerService();
        // await getServiceToken();
        // await getServiceData();
        app.use(routes);
    } catch (error) {
        logger.error(error);
        await Promise.reject(error);
    }
}

start().catch((err) => {
    console.log(err);
    console.log(`Failed to start ${appConfig.serviceName} service`);
    process.exit(1);
})

app.listen(port, () => {
    console.log(`${appConfig.serviceName} service --> running mode: ${appConfig.nodeEnv}, port: ${appConfig.port} `);
});