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

export class PaymentInfoEntity implements PaymentInfoAttributes {
  id: number;

  cardKey: string;

  cardToken: string;

  firstSix: string;

  lastFour: string;

  cardHolderName: string;

  cardHolderEmail: string;

  cardHolderPhone: string;

  constructor(params: PaymentInfoAttributes) {
    this.id = params.id;
    this.cardKey = params.cardKey;
    this.cardToken = params.cardToken;
    this.firstSix = params.firstSix;
    this.lastFour = params.lastFour;
    this.cardHolderName = params.cardHolderName;
    this.cardHolderEmail = params.cardHolderEmail;
    this.cardHolderPhone = params.cardHolderPhone;
  }
}
