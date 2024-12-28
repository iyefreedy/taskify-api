import jsonwebtoken from "jsonwebtoken";

export const createAccessToken = (payload: string | Buffer | object) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiry = process.env.JWT_EXPIRES_IN;
  const accessToken = jsonwebtoken.sign(payload, jwtSecret, {
    expiresIn: jwtExpiry,
  });

  return accessToken;
};
