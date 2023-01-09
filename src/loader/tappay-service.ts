import { TapPayPaymentService } from '../ddd/infrastructure/service/tappay-payment-service';
import { config } from '../config';

export const tapPayPaymentService = new TapPayPaymentService({
  baseUrl: config.tapPayBaseUrl,
  merchantId: config.tapPayMerchantId,
  partnerKey: config.tapPayPartnerKey,
});
