import {
  PayByPrimeInput,
  PayByPrimeResponse,
} from '../../infrastructure/service';
import { SubscriptionEntity } from '../entity';

export interface PaymentRepositoryInterface {
  subscribeToPlan: (
    userId: string,
    planId: number,
    payByPrimeInput: PayByPrimeInput,
    payByPrimeResponse: PayByPrimeResponse,
  ) => Promise<void>;
  getSubscriptions: (userId: string) => Promise<SubscriptionEntity[]>;
}
