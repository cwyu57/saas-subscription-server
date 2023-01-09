import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../domain/entity';
import {
  CatalogRepositoryInterface,
  PaymentRepositoryInterface,
} from '../../domain/repository';
import { TapPayPaymentService } from '../../infrastructure/service';

export type SubscribePlansInput = {
  prime: string;
  planId: number;
  userId: string;
  cardholder: {
    phone_number: string;
    name: string;
    email: string;
  };
};

export class SubscribePlansUseCase {
  catalogRepository: CatalogRepositoryInterface;

  paymentRepository: PaymentRepositoryInterface;

  tapPayPaymentService: TapPayPaymentService;

  constructor(
    catalogRepository: CatalogRepositoryInterface,
    paymentRepository: PaymentRepositoryInterface,
    tapPayPaymentService: TapPayPaymentService,
  ) {
    this.catalogRepository = catalogRepository;
    this.paymentRepository = paymentRepository;
    this.tapPayPaymentService = tapPayPaymentService;
  }

  async exec(input: SubscribePlansInput): Promise<any> {
    const plan = await this.catalogRepository.getPlanById(input.planId);

    if (!plan.isActive) {
      throw new ResponseError(
        'Plan is not active',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
      );
    }

    const subscriptions = await this.paymentRepository.getSubscriptions(
      input.userId,
    );

    if (subscriptions.length !== 0) {
      throw new ResponseError(
        'already subscribe a plan',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
      );
    }

    const payByPrimeResponse = await this.tapPayPaymentService.payByPrime({
      prime: input.prime,
      amount: plan.id,
      currency: 'TWD',
      details: plan.name,
      cardholder: {
        phone_number: input.cardholder.phone_number,
        name: input.cardholder.name,
        email: input.cardholder.email,
      },
    });

    await this.paymentRepository.subscribeToPlan(
      input.userId,
      input.planId,
      {
        prime: input.prime,
        amount: plan.id,
        currency: 'TWD',
        details: plan.name,
        cardholder: {
          phone_number: input.cardholder.phone_number,
          name: input.cardholder.name,
          email: input.cardholder.email,
        },
      },
      payByPrimeResponse,
    );

    return `恭喜你成功升級 ${plan.name}`;
  }
}
