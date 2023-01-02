export class Config {
  environment: string;

  privateKeyPath: string;

  publicKeyPath: string;

  swaggerUsername: string;

  swaggerPassword: string;

  systemApiKey: string;

  constructor(env: { [key: string]: string | undefined }) {
    if (!env.NODE_ENV) {
      throw new Error('missing environemnt variable NODE_ENV');
    }
    if (!env.PRIVATE_KEY_PATH) {
      throw new Error('missing environemnt variable PRIVATE_KEY_PATH');
    }
    if (!env.PUBLIC_KEY_PATH) {
      throw new Error('missing environemnt variable PUBLIC_KEY_PATH');
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

    this.environment = env.NODE_ENV;

    this.privateKeyPath = env.PRIVATE_KEY_PATH;
    this.publicKeyPath = env.PUBLIC_KEY_PATH;
    this.swaggerUsername = env.SWAGGER_USERNAME;
    this.swaggerPassword = env.SWAGGER_PASSWORD;
    this.systemApiKey = env.SYSTEM_API_KEY;
  }
}

export const config = new Config(process.env);
