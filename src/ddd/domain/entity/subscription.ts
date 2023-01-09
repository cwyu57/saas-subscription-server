export interface SubscriptionAttributes {
  id: number;
  validTo: number;
  planId: number;
  userId: string;
  paymentInfoId?: number;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface SubscriptionCreationAttributes
  extends Omit<SubscriptionAttributes, 'id'> {}
