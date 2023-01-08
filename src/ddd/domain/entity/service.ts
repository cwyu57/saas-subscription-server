import { ServiceAttributes } from '../../../models/service';

export class ServiceEntity {
  id: number;

  name: string;

  constructor(params: ServiceAttributes) {
    this.id = params.id;
    this.name = params.name;
  }
}
