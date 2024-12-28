import jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_ISSUER = process.env.JWT_ISSUER;

export const createAccessToken = (payload: string | Buffer | object) => {
  const accessToken = jsonwebtoken.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: JWT_ISSUER,
  });

  return accessToken;
};

export const verifyAccessToken = (accessToken: string) => {
  return jsonwebtoken.verify(accessToken, JWT_SECRET);
};
