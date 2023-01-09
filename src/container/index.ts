import { sequelize } from '../loader';
import SaasSubscriptionModels from '../models';
import {
  InMemoryUserRepository,
  MySqlUserRepository,
  MySqlCatalogRepository,
  MySqlPaymentRepository,
} from '../ddd/infrastructure/repository';
import { BcryptHashService } from '../ddd/infrastructure/service';

export const bcryptHashService = new BcryptHashService();

export const saasSubscriptionModels = new SaasSubscriptionModels(sequelize);

export const inMemoryUserRepository = new InMemoryUserRepository();
export const mySqlUserRepository = new MySqlUserRepository(
  saasSubscriptionModels,
);
export const mySqlCatalogRepository = new MySqlCatalogRepository(
  saasSubscriptionModels,
);
export const mySqlPaymentRepository = new MySqlPaymentRepository(
  saasSubscriptionModels,
);
