import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { PlanEntity, ResponseError } from '../../domain/entity';
import { CatalogRepositoryInterface } from '../../domain/repository';
import { saasSubscriptionModels } from '../../../container';

export type SubscribePlansInput = {
  prime: string;
  planId: number;
};

export class SubscribePlansUseCase {
  catalogRepository: CatalogRepositoryInterface;

  constructor(catalogRepository: CatalogRepositoryInterface) {
    this.catalogRepository = catalogRepository;
  }

  async exec(subscribePlansInput: SubscribePlansInput): Promise<any> {
    const plan = await this.catalogRepository.getPlanById(
      subscribePlansInput.planId,
    );

    if (plan.id === 1) {
      // subscribe to a free plan
      // await saasSubscriptionModels.Subscription.create({});
      // order null
    } else {
      // subscribe to a chargeable plan
      // create
    }
  }
}
