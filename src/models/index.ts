import { ModelCtor, Sequelize, SyncOptions } from 'sequelize';
import { Plan } from './plan';
import { ServiceIncluded } from './service-included';
import { Service } from './service';
import { Subscription } from './subscription';
import { User } from './user';

export interface ModelsInterface {
  sequelize: Sequelize;
  Plan: ModelCtor<Plan>;
  ServiceIncluded: ModelCtor<ServiceIncluded>;
  Service: ModelCtor<Service>;
  Subscription: ModelCtor<Subscription>;
  User: ModelCtor<User>;
}

export default class SaasSubscriptionModels implements ModelsInterface {
  sequelize: Sequelize;

  Plan: ModelCtor<Plan>;

  ServiceIncluded: ModelCtor<ServiceIncluded>;

  Service: ModelCtor<Service>;

  Subscription: ModelCtor<Subscription>;

  User: ModelCtor<User>;

  constructor(client: Sequelize) {
    this.sequelize = client;

    this.Plan = Plan.factory(this.sequelize);
    this.ServiceIncluded = ServiceIncluded.factory(this.sequelize);
    this.Service = Service.factory(this.sequelize);
    this.Subscription = Subscription.factory(this.sequelize);
    this.User = User.factory(this.sequelize);

    Plan.associate(this);
    ServiceIncluded.associate(this);
    Service.associate(this);
    Subscription.associate(this);
    User.associate(this);
  }

  async sync(options: SyncOptions, callback: () => void): Promise<void> {
    await this.sequelize.sync(options);
    callback();
  }
}
