// These are all the attributes in the Service model
export interface ServiceAttributes {
  id: number;
  code: string;
  name: string;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface ServiceCreationAttributes
  extends Omit<ServiceAttributes, 'id'> {}

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
