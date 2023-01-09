import { PaymentRepositoryInterface } from '../../domain/repository';
import SaasSubscriptionModels from '../../../models';
import { PayByPrimeResponse, PayByPrimeInput } from '../service';

export class MySqlPaymentRepository implements PaymentRepositoryInterface {
  store: SaasSubscriptionModels;

  constructor(models: SaasSubscriptionModels) {
    this.store = models;
  }

  async subscribeToPlan(
    userId: string,
    planId: number,
    payByPrimeInput: PayByPrimeInput,
    payByPrimeResponse: PayByPrimeResponse,
  ): Promise<void> {
    await this.store.sequelize.transaction(async t => {
      const plan = await this.store.Plan.findOne({
        where: { id: planId },
        transaction: t,
      });

      const paymentInfo = await this.store.PaymentInfo.create(
        {
          cardKey: payByPrimeResponse.card_secret.card_key,
          cardToken: payByPrimeResponse.card_secret.card_token,
          firstSix: payByPrimeResponse.card_info.bin_code,
          lastFour: payByPrimeResponse.card_info.last_four,
          cardHolderEmail: payByPrimeInput.cardholder.email,
          cardHolderName: payByPrimeInput.cardholder.name,
          cardHolderPhone: payByPrimeInput.cardholder.phone_number,
        },
        { transaction: t },
      );

      const subscription = await this.store.Subscription.create(
        {
          validTo: Date.now() + plan!.periodInDays * 86400 * 1000,
          planId: plan!.id,
          userId,
          paymentInfoId: paymentInfo.id,
        },
        { transaction: t },
      );

      const order = await this.store.Order.create(
        {
          periodIndex: 1,
          subscriptionId: subscription.id,
        },
        { transaction: t },
      );
    });
  }

  async getSubscriptions(userId: string): Promise<any> {
    const subscriptions = await this.store.Subscription.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: this.store.Order,
          as: 'orders',
        },
        {
          model: this.store.PaymentInfo,
          as: 'paymentInfo',
        },
      ],
    });

    return subscriptions.map(e => e.toJSON());
  }
}
