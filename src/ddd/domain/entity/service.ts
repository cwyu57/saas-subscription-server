import { ServiceAttributes } from '../../../models/service';

export class ServiceEntity {
  id: number;

  code: string;

  name: string;

  constructor(params: ServiceAttributes) {
    this.id = params.id;
    this.code = params.code;
    this.name = params.name;
  }
}
