'use strict';

import { login }              from 'app/actions/sessionActions';
import React                  from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

export class App extends React.Component {
	onSubmit(ev) {
		ev.preventDefault();

		const values = {};
		[].forEach.call(ev.target.querySelectorAll('input[name]'), input => {
			values[input.name] = input.value;
		});

		this.props.login(values.username, values.password)
			.then(token => {
				document.cookie = `jwt_token=${token}`;
			});
	}

	render() {
		const { token } = this.props;

		return (
			<form method='post' action='/login' onSubmit={this.onSubmit.bind(this)}>
				{token ? (
					<p>Your token: {token}</p>
				) : ''}
				<div className='field'>
					<label>Username</label>
					<input name='username' />
				</div>
				<div className='field'>
					<label>Password</label>
					<input name='password' type='password' />
				</div>
				<button type='submit'>Login</button>
			</form>
		);
	}
}

export default connect(
	state => ({ token: state.session.token }),
	dispatch => bindActionCreators({ login }, dispatch)
)(App);
