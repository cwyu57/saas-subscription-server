export interface ServiceIncludedAttributes {
  id: number;
  planId: number | null;
  serviceId: number | null;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface ServiceIncludedCreationAttributes
  extends Omit<ServiceIncludedAttributes, 'id'> {}
