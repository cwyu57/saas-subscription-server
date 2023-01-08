import { PlanEntity } from '../../domain/entity';
import { CatalogRepositoryInterface } from '../../domain/repository';

export class GetPlansUseCase {
  catalogRepository: CatalogRepositoryInterface;

  constructor(catalogRepository: CatalogRepositoryInterface) {
    this.catalogRepository = catalogRepository;
  }

  async exec(): Promise<PlanEntity[]> {
    return this.catalogRepository.getPlans();
  }
}
