import { ServiceAttributes, ServiceEntity } from './service';

export interface PlanAttributes {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  periodInDays: number;

  services?: ServiceAttributes[] | undefined;
}

// Some attributes are optional in `Plan.build` and `Plan.create` calls
export interface PlanCreationAttributes extends Omit<PlanAttributes, 'id'> {}
export class PlanEntity implements PlanAttributes {
  id: number;

  name: string;

  price: number;

  isActive: boolean;

  periodInDays: number;

  services?: ServiceEntity[];

  constructor(params: PlanAttributes) {
    this.id = params.id;
    this.name = params.name;
    this.price = params.price;
    this.isActive = params.isActive;
    this.periodInDays = params.periodInDays;
    this.services = params.services?.map(e => new ServiceEntity(e));
  }
}
