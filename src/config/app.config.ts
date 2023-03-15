import * as process from 'process';

export const appConfig = () => ({
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expiration: process.env.ACCESS_TOKEN_EXPIRATION,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expiration: process.env.REFRESH_TOKEN_SECRET
});

