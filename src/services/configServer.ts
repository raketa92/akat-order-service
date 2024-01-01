import axios from "axios";
import { appConfig } from "../config/appConfig";
import logger from "../utils/logger";
import { TOPICS } from "./rabbitMq/topics";

const services = {} as any;

export const registerService = async () => {
  try {
    const path = appConfig.configServerHost + "/services/register";
    const Authorization = "Bearer " + appConfig.serviceToken;
    let data = {
      name: "order-service",
      urls: [`${appConfig.myIpAddress}:${appConfig.port}`],
      topic: {
        name: TOPICS.order.topicName,
        events: {
          status_updated: TOPICS.order.events.status_updated,
        },
      },
    };
    await axios.post(path, data, { headers: { Authorization } });
    logger.info(`${appConfig.serviceName} service registration success`);
    await getPublicKey();
  } catch (err: any) {
    logger.error(err.response?.data || err);
    logger.error("Payment service registration failed");
  }
};

export const getServiceData = async () => {
  try {
    const path = appConfig.configServerHost + "/services";
    const Authorization = "Bearer " + appConfig.serviceToken;
    const servicesData = await axios.get(path, { headers: { Authorization } });
    for (let service of servicesData.data.data) {
        services[service.name] = service;
    }
    return services.data;
  } catch (err: any) {
    logger.error(err.response?.data || err);
    logger.error("Service names retrieve error");
    await Promise.reject(err);
  }
};

export const getServiceToken = async () => {
  try {
    const path = `${appConfig.gateway}/user-service/admin/service/signin`;
    const data = { service: "internal", password: "E7G4@swhBh" };
    const serviceToken = await axios.post(path, data);
    appConfig.serviceToken = serviceToken.data.data;
    logger.info("Service token recieved");
  } catch (err: any) {
    logger.error(err.response?.data || err);
    logger.error("Can't get service token from user-service");
    await Promise.reject(err);
  }
};

async function getPublicKey() {
  try {
    const path = appConfig.configServerHost + "/keys/public?api_key=all-service";
    const public_jwt_key = await axios.get(path);
    appConfig.jwtToken = public_jwt_key.data.data;
    logger.info("JWT Token recieved");
  } catch (err: any) {
    logger.error(err.response?.data || err);
    logger.error("Can't get token from config server");
  }
}
