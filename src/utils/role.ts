import axios from "axios";
import logger from "./logger";

type Roles = 'member' | 'seller' | 'moderator' | 'admin' | 'agent' | 'service_internal' | 'service_external' | 'anonymous';

const ROLES: Record<Roles, number> = {
  member: 1,
  seller: 2,
  moderator: 3,
  admin: 4,
  agent: 5,
  service_internal: 6,
  service_external: 7,
  anonymous: 8,
};

// async function syncRoles() {
//   try {
//     const path = `${process.env.GATEWAY}/user-service/admin/roles`;
//     const Authorization = "Bearer " + process.env.SERVICE_TOKEN;
//     const {
//       data: { data: actualRoles },
//     } = await axios.get(path, { headers: { Authorization } });
//     // ROLES = {};

//     for (const index in actualRoles) {
//       ROLES[actualRoles[index].slug] = actualRoles[index].id;
//     }
//     logger.info("Roles retrieved");
//   } catch (e) {
//     logger.error(`${e}`);
//     logger.error("Can't get roles");
//   }
// }

// function getRoles() {
//   return ROLES;
// }

export { ROLES };
