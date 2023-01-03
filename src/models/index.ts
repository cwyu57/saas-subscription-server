import { ModelCtor, Sequelize, SyncOptions } from 'sequelize';
import { User } from './user';

export interface ModelsInterface {
  sequelize: Sequelize;
  User: ModelCtor<User>;
}

export default class SaasSubscriptionModels implements ModelsInterface {
  sequelize: Sequelize;

  User: ModelCtor<User>;

  constructor(client: Sequelize) {
    this.sequelize = client;

    this.User = User.factory(this.sequelize);

    User.associate(this);
  }

  async sync(options: SyncOptions, callback: () => void): Promise<void> {
    await this.sequelize.sync(options);
    callback();
  }
}
