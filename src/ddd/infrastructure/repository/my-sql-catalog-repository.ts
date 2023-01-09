import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { PlanEntity, ResponseError } from '../../domain/entity';
import { CatalogRepositoryInterface } from '../../domain/repository';
import SaasSubscriptionModels from '../models';

export class MySqlCatalogRepository implements CatalogRepositoryInterface {
  store: SaasSubscriptionModels;

  constructor(models: SaasSubscriptionModels) {
    this.store = models;
  }

  async getPlans(): Promise<PlanEntity[]> {
    const plans = await this.store.Plan.findAll({
      include: [
        {
          model: this.store.Service,
          as: 'services',
        },
      ],
    });
    return plans.map(e => new PlanEntity(e));
  }

  async getPlanById(id: number): Promise<PlanEntity> {
    const plan = await this.store.Plan.findOne({
      where: { id },
      include: [
        {
          model: this.store.Service,
          as: 'services',
        },
      ],
    });

    if (!plan) {
      throw new ResponseError(
        'plan not found',
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
      );
    }
    return plan;
  }
}
