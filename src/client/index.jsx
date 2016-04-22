'use strict';

import App                       from 'app/components/App';
import sessionReducer            from 'app/reducers/sessionReducer';
import createStoreWithMiddleware from 'app/utils/createStoreWithMiddleware';
import React                     from 'react';
import { render }                from 'react-dom';
import { Provider }              from 'react-redux';
import { combineReducers }       from 'redux';

const store = createStoreWithMiddleware(
	combineReducers({ session: sessionReducer }),
	window.__initialState
);

render((
	<Provider store={store}>
		<App />
	</Provider>
), document.querySelector('[data-app]'));
