import { PlanAttributes } from '../../../models/plan';
import { ServiceEntity } from './service';

export class PlanEntity {
  id: number;

  name: string;

  isActive: boolean;

  periodInDays: number;

  services?: ServiceEntity[];

  constructor(params: PlanAttributes) {
    this.id = params.id;
    this.name = params.name;
    this.isActive = params.isActive;
    this.periodInDays = params.periodInDays;
    this.services = params.services?.map(e => new ServiceEntity(e));
  }
}
