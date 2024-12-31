import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_ISSUER = process.env.JWT_ISSUER;

export const createAccessToken = async (payload: jose.JWTPayload) => {
  const now = new Date();
  const secret = new TextEncoder().encode(JWT_SECRET);
  const accessToken = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRES_IN)
    .setIssuer(JWT_ISSUER)
    .setIssuedAt(now)
    .sign(secret);

  return accessToken;
};

export const verifyAccessToken = async (accessToken: string) => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const decoded = await jose.jwtVerify(accessToken, secret, {
    issuer: JWT_ISSUER,
    maxTokenAge: JWT_EXPIRES_IN,
  });

  return decoded;
};
