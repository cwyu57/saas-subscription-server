import { PlanEntity } from '../entity';

export interface CatalogRepositoryInterface {
  getPlans: () => Promise<PlanEntity[]>;
}
