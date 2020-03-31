import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import * as dotenv from 'dotenv';

const checkJwtToken = () => {
  dotenv.config({ path: `${__dirname}/../configurations/auth0.env` });

  return jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.AUTH_BASEURI}.well-known/jwks.json`,
    }),
    audience: process.env.AUTH_AUDIENCE,
    issuer: process.env.AUTH_BASEURI,
    algorithms: ['RS256'],
  });
};

export { checkJwtToken };
