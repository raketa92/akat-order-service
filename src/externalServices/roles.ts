import axios from "axios";
import logger from "../utils/logger";
import { appConfig } from "../config/appConfig";

let ROLES = {} as any;

async function syncRoles() {
  try {
    const path = `${appConfig.gateway}/user-service/admin/roles`;
    const Authorization = "Bearer " + appConfig.serviceToken;
    const {
      data: { data: actualRoles },
    } = await axios.get(path, { headers: { Authorization } });
    ROLES = {};

    for (const index in actualRoles) {
      ROLES[actualRoles[index].slug] = actualRoles[index].id;
    }
    logger.info("Roles retrieved");
  } catch (e) {
    logger.error(`${e}`);
    logger.error("Can't get roles");
  }
}

function getRoles() {
  return ROLES;
}

module.exports = { syncRoles, getRoles };
