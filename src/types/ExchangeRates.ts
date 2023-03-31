interface ExchangeRatesApiResponse {
  'result': string;
  'documentation': string;
	'terms_of_use': string;
	'time_last_update_unix': Date;
	'time_last_update_utc': Date;
	'time_next_update_unix': Date;
	'time_next_update_utc': Date;
	'base_code': string;
  'conversion_rates': {
    [key: string]: number;
  };
}

export type ExchangeRatesData = Pick<ExchangeRatesApiResponse,'conversion_rates'>;

