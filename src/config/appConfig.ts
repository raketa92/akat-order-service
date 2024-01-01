import winston from "winston";
import dotenv from "dotenv";
import path from "path";
import logger from "../utils/logger";

dotenv.config({ path: path.resolve(__dirname, './.env') });
logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));

export const appConfig = {
  port: process.env.PORT,
  rabbitHost: process.env.RABBIT_MQ_SERVICE_HOST,
  configServerHost: process.env.CONFIG_SERVER_HOST,
  gateway: process.env.GATEWAY,
  host: process.env.HOST,
  hostApi: process.env.HOST_API,
  nodeEnv: process.env.NODE_ENV,
  myIpAddress: process.env.MY_IP_ADDRESS,
  serviceName: process.env.SERVICE_NAME,
  serviceToken: process.env.SERVICE_TOKEN,
  jwtToken: process.env.JWT_KEY
};

const checkRequiredVariables = () => {
  const missingVariables: string[] = [];

  Object.entries(appConfig).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subkey, subValue]) => {
        if (!subValue) {
          missingVariables.push(`"${key}->${subkey}"`);
        }
      });
    } else if (!value) {
      missingVariables.push(`"${key}"`);
    }
  });

  if (missingVariables.length > 0) {
    missingVariables.forEach((el) => console.warn(`ENV VAR = ${el} MISSING`));
    console.error('MISSING REQUIRED VARIABLES');
    process.exit(1);
  }
}

checkRequiredVariables();