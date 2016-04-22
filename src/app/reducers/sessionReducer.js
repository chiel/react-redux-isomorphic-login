'use strict';

import * as c from 'app/constants';

const initialState = {
	token: null,
	user: null
};

export default function sessionReducer(state = initialState, action) {
	if (action.type === c.SESSION_SET_TOKEN) {
		return { ...state,
			token: action.token
		};
	}

	if (action.type === c.SESSION_SET_USER) {
		return { ...state,
			user: action.user
		};
	}

	return state;
}
