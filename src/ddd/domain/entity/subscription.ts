import { OrderEntity, OrdersAttributes } from './order';
import { PaymentInfoAttributes, PaymentInfoEntity } from './payment-info';
import { PlanAttributes, PlanEntity } from './plan';

export interface SubscriptionAttributes {
  id: number;
  status: string;
  validTo: number;
  planId: number;
  userId: string;

  paymentInfoId?: number;
  orders?: OrdersAttributes[];
  paymentInfo?: PaymentInfoAttributes;
  plan?: PlanAttributes;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface SubscriptionCreationAttributes
  extends Omit<SubscriptionAttributes, 'id'> {}

export class SubscriptionEntity implements SubscriptionAttributes {
  id: number;

  status: string;

  validTo: number;

  planId: number;

  userId: string;

  paymentInfoId?: number;

  orders?: OrderEntity[] | undefined;

  paymentInfo?: PaymentInfoEntity | undefined;

  plan?: PlanEntity | undefined;

  constructor(params: SubscriptionAttributes) {
    this.id = params.id;
    this.status = params.status;
    this.validTo = params.validTo;
    this.planId = params.planId;
    this.userId = params.userId;
    this.paymentInfoId = params.paymentInfoId;
    this.orders = params.orders?.map(e => new OrderEntity(e));
    this.paymentInfo = params.paymentInfo
      ? new PaymentInfoEntity(params.paymentInfo)
      : undefined;
    this.plan = params.plan ? new PlanEntity(params.plan) : undefined;
  }
}
