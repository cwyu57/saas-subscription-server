import { sequelize } from '../loader';
import SaasSubscriptionModels from '../models';
import {
  InMemoryUserRepository,
  MySqlUserRepository,
} from '../ddd/infrastructure/repository';
import { BcryptHashService } from '../ddd/infrastructure/service';

export const bcryptHashService = new BcryptHashService();

export const saasSubscriptionModels = new SaasSubscriptionModels(sequelize);

export const inMemoryUserRepository = new InMemoryUserRepository();
export const mySqlUserRepository = new MySqlUserRepository(
  saasSubscriptionModels,
);
