import { AnyObject, ObjectSchema } from "yup";
import logger from "./logger";
import ValidationError from "../errorTypes/validationError";

const options = {
    abortEarly: false,
    stripUnknown: true,
  };
  
  const getParsedData = (body: string | null, parse: boolean) => {
    if (!parse) return body;
    try {
      const decodedBody = Buffer.from(body ?? "", "base64").toString("ascii");
      return JSON.parse(decodedBody || "{}");
    } catch (e: any) {
      return JSON.parse(body || "{}");
    }
  };

const validate = async <T extends ObjectSchema<AnyObject>>(
    body: string | null,
    schema: T,
    parse = true
  ) => {
    try {
      const data = getParsedData(body, parse);
      const values = await schema.validate(data, options);
      return values;
    } catch (err: any) {
      logger.silly(`validateError: ${err.stack}`);
      throw new ValidationError(JSON.stringify(err.errors));
    }
  };

  export default validate;