import { PaymentRepositoryInterface } from '../../domain/repository';

export type GetSubscriptionsInput = {
  userId: string;
};

export class GetSubscriptionsUseCase {
  paymentRepository: PaymentRepositoryInterface;

  constructor(paymentRepository: PaymentRepositoryInterface) {
    this.paymentRepository = paymentRepository;
  }

  async exec(input: GetSubscriptionsInput): Promise<any> {
    const subscriptions = await this.paymentRepository.getSubscriptions(
      input.userId,
    );
    return subscriptions;
  }
}
