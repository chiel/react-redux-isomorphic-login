'use strict';

import * as c from 'app/constants';

export function setSessionToken(token) {
	return { type: c.SESSION_SET_TOKEN, token };
}

export function login(username, password) {
	return (dispatch, getState, callApi) => (
		callApi('/login', {
			method: 'post',
			body: JSON.stringify({ username, password })
		})
			.then(res => res.json())
			.then(({ token }) => {
				dispatch(setSessionToken(token));
				return Promise.resolve(token);
			})
	);
}
