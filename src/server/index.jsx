'use strict';

import { login }                 from 'app/actions/sessionActions';
import App                       from 'app/components/App';
import sessionReducer            from 'app/reducers/sessionReducer';
import createStoreWithMiddleware from 'app/utils/createStoreWithMiddleware';
import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server';
import { Provider }              from 'react-redux';
import { combineReducers }       from 'redux';
import renderFullPage            from 'server/utils/renderFullPage';

const app = express();
app.use(require('serve-static')(`${__dirname}/../public`));
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

/**
 * create a store for each incoming request,
 * initialising it with a token if available
 */
app.use((req, res, next) => {
	req.store = createStoreWithMiddleware(
		combineReducers({
			session: sessionReducer
		}),
		{ session: { token: req.cookies.jwt_token || null }}
	);

	next();
});

app.post('/api/login', (req, res, next) => {
	res.json({ token: 'dummy_token' });
});

app.post('/login', (req, res, next) => {
	req.store.dispatch(login(req.body.username, req.body.password))
		.then(token => {
			res.cookie('jwt_token', token);
			res.redirect('/');
		})
		.catch(next);
});

app.get('*', (req, res, next) => {
	res.send(renderFullPage(
		renderToString(
			<Provider store={req.store}>
				<App />
			</Provider>
		),
		req.store.getState()
	));
});

const port = process.env.PORT || 7854;
app.listen(port, () => console.info(`Listening on port ${port}`));
