import axios from "axios";
import logger from "../../utils/logger";

const getUser = async (userId: string) => {
  try {
    const path = `${process.env.GATEWAY}/user-service/admin/user/${userId}?lang=ru`;
    const Authorization = "Bearer " + process.env.SERVICE_TOKEN;
    const user = await axios.get(path, { headers: { Authorization } });
    if (user.data.data.count > 0) {
        return user.data.data;
    }
    return null;
  } catch (e: any) {
    logger.error(e.response?.data || `${e}`);
    return null;
  }
}

export default getUser;
