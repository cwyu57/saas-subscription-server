export interface PaymentInfoAttributes {
  id: number;
  cardKey: string;
  cardToken: string;
  firstSix: string;
  lastFour: string;
  cardHolderName: string;
  cardHolderEmail: string;
  cardHolderPhone: string;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface PaymentInfoCreationAttributes
  extends Omit<PaymentInfoAttributes, 'id'> {}
