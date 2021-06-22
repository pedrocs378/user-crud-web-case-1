import { Switch, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Dashboard } from '../pages/Dashboard'

export function Routes() {

	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/register" component={Register} />
			<Route path="/forgot-password" component={ForgotPassword} />

			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	)
}