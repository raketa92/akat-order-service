import jwt from "jsonwebtoken";

const verifyToken = (token: string) => {
  try {
    const publicKey = process.env.JWT_KEY as string;
    return jwt.verify(token, publicKey);
  } catch (error) {
    return false;
  }
};

const decode = (token: string) => {
  return jwt.decode(token, { complete: true });
};

export { verifyToken, decode }
