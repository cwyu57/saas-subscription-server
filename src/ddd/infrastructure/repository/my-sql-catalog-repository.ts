import { PlanEntity } from '../../domain/entity';
import { CatalogRepositoryInterface } from '../../domain/repository';
import SaasSubscriptionModels from '../../../models';

export class MySqlCatalogRepository implements CatalogRepositoryInterface {
  store: SaasSubscriptionModels;

  constructor(models: SaasSubscriptionModels) {
    this.store = models;
  }

  async getPlans(): Promise<PlanEntity[]> {
    const plans = await this.store.Plan.findAll();
    return plans.map(e => new PlanEntity(e));
  }
}
