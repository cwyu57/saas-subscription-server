import { ServiceAttributes } from '../../../models/service';

export class ServiceEntity {
  id: number;

  code: string;

  display: string;

  constructor(params: ServiceAttributes) {
    this.id = params.id;
    this.code = params.code;
    this.display = params.display;
  }
}
