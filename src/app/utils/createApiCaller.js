'use strict';

import callApi from 'app/utils/callApi';

export default function createApiCaller(token) {
	if (!token) return callApi;

	return function callApiWithToken(endpoint, options) {
		if (!options) options = {};

		const headers = options.headers || {};

		return callApi(endpoint, { ...options,
			headers: { ...headers,
				authorization: `Bearer ${token}`
			}
		});
	};
}
