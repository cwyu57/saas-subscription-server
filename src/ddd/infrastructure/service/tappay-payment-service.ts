import axios from 'axios';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../domain/entity';

export type PayByPrimeInput = {
  prime: string;
  amount: number;
  currency: string;
  details: string;
  cardholder: {
    phone_number: string;
    name: string;
    email: string;
  };
};
export type BankTransactionTime = {
  start_time_millis: string;
  end_time_millis: string;
};

export type CardInfo = {
  issuer: string;
  funding: number;
  type: number;
  level: string;
  country: string;
  last_four: string;
  bin_code: string;
  issuer_zh_tw: string;
  bank_id: string;
  country_code: string;
  expiry_date: string;
};

export type CardSecret = {
  card_token: string;
  card_key: string;
};

export type TransactionMethodDetails = {
  transaction_method_reference: string;
  transaction_method: string;
};

export type PayByPrimeResponse = {
  status: number;
  msg: string;
  amount: number;
  acquirer: string;
  currency: string;
  card_secret: CardSecret;
  rec_trade_id: string;
  bank_transaction_id: string;
  order_number: string;
  auth_code: string;
  card_info: CardInfo;
  transaction_time_millis: number;
  bank_transaction_time: BankTransactionTime;
  bank_result_code: string;
  bank_result_msg: string;
  card_identifier: string;
  merchant_id: string;
  is_rba_verified: boolean;
  transaction_method_details: TransactionMethodDetails;
};

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

  async payByPrime(data: PayByPrimeInput): Promise<PayByPrimeResponse> {
    const { prime, amount, currency, details, cardholder } = data;
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
        details,
        cardholder: {
          ...TapPayPaymentService.DEFAULT_CARD_HOLDER,
          ...cardholder,
        },
        instalment: 0,
        delay_capture_in_days: 0,
        remember: true,
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
    }
    return resp.data;
  }
}
