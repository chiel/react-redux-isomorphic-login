'use strict';

import 'isomorphic-fetch';

const API_URL = typeof window === 'undefined' ?
	process.env.API_URL :
	window.__config.API_URL;

export default function callApi(endpoint, options) {
	const url = API_URL + endpoint;

	options = options || {};
	options.headers = options.headers || {};

	if (!options.headers.accept) {
		options.headers.accept = 'application/json';
	}

	if (!options.headers['content-type']) {
		options.headers['content-type'] = 'application/json';
	}

	return fetch(url, options);
}
