export class Config {
  environment: string;

  databaseHost: string;

  databaseUserName: string;

  databasePassword: string;

  databaseDatabase: string;

  databasePort: number;

  databaseMaxConnection: number;

  databaseMaxRetry: number;

  privateKeyBase64Str: string;

  publicKeyBase64Str: string;

  swaggerUsername: string;

  swaggerPassword: string;

  systemApiKey: string;

  tapPayBaseUrl: string;

  tapPayMerchantId: string;

  tapPayPartnerKey: string;

  constructor(env: { [key: string]: string | undefined }) {
    if (!env.NODE_ENV) {
      throw new Error('missing environemnt variable NODE_ENV');
    }
    if (!env.DB_HOST) {
      throw new Error('missing environemnt variable DB_HOST');
    }
    if (!env.DB_USERNAME) {
      throw new Error('missing environemnt variable DB_USERNAME');
    }
    if (!env.DB_PASSWORD) {
      // database password is allowed to set to empty string
      console.warn(
        'environemnt variable DB_PASSWORD is empty, so database password is set to empty string',
      );
    }
    if (!env.DB_DATABASE) {
      throw new Error('missing environemnt variable DB_DATABASE');
    }
    if (!env.DB_PORT) {
      throw new Error('missing environemnt variable DB_PORT');
    }
    if (!env.DB_MAX_CONNECTION) {
      throw new Error('missing environemnt variable DB_MAX_CONNECTION');
    }
    if (!env.DB_MAX_RETRY) {
      throw new Error('missing environemnt variable DB_MAX_RETRY');
    }
    if (!env.PRIVATE_KEY_PATH_BASE64_STR) {
      throw new Error(
        'missing environemnt variable PRIVATE_KEY_PATH_BASE64_STR',
      );
    }
    if (!env.PUBLIC_KEY_PATH_BASE64_STR) {
      throw new Error(
        'missing environemnt variable PUBLIC_KEY_PATH_BASE64_STR',
      );
    }
    if (!env.SWAGGER_USERNAME) {
      throw new Error('missing environemnt variable SWAGGER_USERNAME');
    }
    if (!env.SWAGGER_PASSWORD) {
      throw new Error('missing environemnt variable SWAGGER_PASSWORD');
    }
    if (!env.SYSTEM_API_KEY) {
      throw new Error('missing environemnt variable SYSTEM_API_KEY');
    }
    if (!env.TAP_PAY_BASE_URL) {
      throw new Error('missing environemnt variable TAP_PAY_BASE_URL');
    }
    if (!env.TAP_PAY_MERCHANT_ID) {
      throw new Error('missing environemnt variable TAP_PAY_MERCHANT_ID');
    }
    if (!env.TAP_PAY_PARTNER_KEY) {
      throw new Error('missing environemnt variable TAP_PAY_PARTNER_KEY');
    }

    this.environment = env.NODE_ENV;
    this.databaseHost = env.DB_HOST;
    this.databaseUserName = env.DB_USERNAME;
    this.databasePassword = env.DB_PASSWORD || ''; // database password is allowed to set to empty string
    this.databaseDatabase = env.DB_DATABASE;
    this.databasePort = parseInt(env.DB_PORT, 10);
    this.databaseMaxConnection = parseInt(env.DB_MAX_CONNECTION, 10);
    this.databaseMaxRetry = parseInt(env.DB_MAX_RETRY, 10);

    this.privateKeyBase64Str = env.PRIVATE_KEY_PATH_BASE64_STR;
    this.publicKeyBase64Str = env.PUBLIC_KEY_PATH_BASE64_STR;
    this.swaggerUsername = env.SWAGGER_USERNAME;
    this.swaggerPassword = env.SWAGGER_PASSWORD;
    this.systemApiKey = env.SYSTEM_API_KEY;

    this.tapPayBaseUrl = env.TAP_PAY_BASE_URL;
    this.tapPayMerchantId = env.TAP_PAY_MERCHANT_ID;
    this.tapPayPartnerKey = env.TAP_PAY_PARTNER_KEY;
  }
}

export const config = new Config(process.env);
