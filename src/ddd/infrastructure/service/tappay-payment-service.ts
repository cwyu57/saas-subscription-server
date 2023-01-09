import axios from 'axios';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../domain/entity';

export class TapPayPaymentService {
  static DEFAULT_CARD_HOLDER = {
    phone_number: '',
    name: '',
    email: '',
    zip_code: '', // optional
    address: '', // optional
    national_id: '', // optional;
  };

  config: { baseUrl: string; merchantId: string; partnerKey: string };

  constructor(config: {
    baseUrl: string;
    merchantId: string;
    partnerKey: string;
  }) {
    this.config = config;
  }

  async payByPrime(data: any) {
    const {
      prime,
      amount,
      currency,
      orderId,
      bankTransactionId,
      details,
      cardholder,
      remember,
    } = data;
    const { baseUrl, merchantId, partnerKey } = this.config;

    const resp = await axios({
      method: 'POST',
      url: `${baseUrl}/tpc/payment/pay-by-prime`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': partnerKey,
      },
      data: {
        prime,
        partner_key: partnerKey,
        merchant_id: merchantId,
        amount,
        currency,
        order_number: orderId,
        bank_transaction_id: bankTransactionId,
        details,
        cardholder: {
          ...TapPayPaymentService.DEFAULT_CARD_HOLDER,
          ...cardholder,
        },
        instalment: 0,
        delay_capture_in_days: 0,
        remember,
      },
      timeout: 30000,
    });

    if (resp.data.status !== 0) {
      console.error(`TapPay Api Error: ${JSON.stringify(resp.data)}`);
      throw new ResponseError(
        'TapPay Api Error',
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
      );
      // throw new TapPayApiError(resp.data);
    }
    return resp.data;
  }
}
