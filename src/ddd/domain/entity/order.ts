// These are all the attributes in the Service model
export interface OrdersAttributes {
  id: number;
  periodIndex: number;

  subscriptionId: number;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface OrdersCreationAttributes
  extends Omit<OrdersAttributes, 'id'> {}

export class OrderEntity implements OrdersAttributes {
  id: number;

  periodIndex: number;

  subscriptionId: number;

  constructor(params: OrdersAttributes) {
    this.id = params.id;
    this.periodIndex = params.periodIndex;
    this.subscriptionId = params.subscriptionId;
  }
}
