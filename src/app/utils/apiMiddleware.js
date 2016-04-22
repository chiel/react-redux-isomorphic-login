'use strict';

import createApiCaller from 'app/utils/createApiCaller';

export default function apiMiddleware({ dispatch, getState }) {
	return next => action =>
		typeof action === 'function' ?
			action(dispatch, getState, createApiCaller(getState().session.token)) :
			next(action);
};
