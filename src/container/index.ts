import { sequelize } from '../loader';
import SaasSubscriptionModels from '../models';

export const saasSubscriptionModels = new SaasSubscriptionModels(sequelize);
