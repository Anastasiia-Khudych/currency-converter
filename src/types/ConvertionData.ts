interface ConvertionDataApiResponse {
	'result': string;
	'documentation': string;
	'terms_of_use': string;
	'time_last_update_unix': Date;
	'time_last_update_utc': Date;
	'time_next_update_unix': Date;
	'time_next_update_utc': Date;
	'base_code': string;
	'target_code': string;
	'conversion_rate': number;
	'conversion_result': number;
}

export type ConvertionData = Pick<ConvertionDataApiResponse,'conversion_result'>;
