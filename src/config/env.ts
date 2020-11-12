export const appEnv = {
  general: {
    APP_NAME: process.env.APP_NAME,
    TIMEZONE: process.env.TIMEZONE,
    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    LANGUAGE: process.env.LANGUAGE,
    PHONE_LOCALE: process.env.PHONE_LOCALE,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
    PRODUCTION_URL_WWW: process.env.PRODUCTION_URL_WWW,
    ENV: process.env.ENV,
    SERVER_PORT: process.env.SERVER_PORT,
  },
  database: {
    MONGO_INITDB_DATABASE: process.env.MONGO_INITDB_DATABASE,
    MONGO_HOST_CONTAINER: process.env.MONGO_HOST_CONTAINER,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
  },
  authentication: {
    PASSPORT_DEFAULT_STRATEGY: process.env.PASSPORT_DEFAULT_STRATEGY,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    googleOAuth: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    },
  },
  transactionalEmail: {
    general: {
      GLOBAL_VAR_SENDER_NAME: process.env.GLOBAL_VAR_SENDER_NAME,
      GLOBAL_VAR_COMPANY_NAME_LLC: process.env.GLOBAL_VAR_COMPANY_NAME_LLC,
      GLOBAL_VAR_COMPANY_ADDRESS: process.env.GLOBAL_VAR_COMPANY_ADDRESS,
    },
    sendGrid: {
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    },
  },
};
