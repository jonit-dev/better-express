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
  },
  server: {
    ENV: process.env.ENV,
    SERVER_PORT: process.env.SERVER_PORT,
  },
  database: {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  },
  databaseAdmin: {
    DATABASE_ADMIN_EMAIL: process.env.DATABASE_ADMIN_EMAIL,
    DATABASE_ADMIN_PASSWORD: process.env.DATABASE_ADMIN_PASSWORD,
    DATABASE_ADMIN_PORT: process.env.DATABASE_ADMIN_PORT,
  },
  transactionalEmails: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    GLOBAL_VAR_SENDER_NAME: process.env.GLOBAL_VAR_SENDER_NAME,
    GLOBAL_VAR_COMPANY_NAME_LLC: process.env.GLOBAL_VAR_COMPANY_NAME_LLC,
    GLOBAL_VAR_COMPANY_ADDRESS: process.env.GLOBAL_VAR_COMPANY_ADDRESS,
  },
};
