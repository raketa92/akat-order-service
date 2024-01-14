import axios from "axios";
import logger from "./logger";

let ROLES: any = {};

async function syncRoles() {
  try {
    const path = `${process.env.GATEWAY}/user-service/admin/roles`;
    const Authorization = "Bearer " + process.env.SERVICE_TOKEN;
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

export { syncRoles, getRoles };
