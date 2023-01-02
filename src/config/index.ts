export class Config {
  environment: string;

  privateKeyPath: string;

  publicKeyPath: string;

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

    this.environment = env.NODE_ENV;

    this.privateKeyPath = env.PRIVATE_KEY_PATH;
    this.publicKeyPath = env.PUBLIC_KEY_PATH;
  }
}

export const config = new Config(process.env);
