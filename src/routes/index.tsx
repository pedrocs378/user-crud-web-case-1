import { Switch, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Dashboard } from '../pages/Dashboard'
import { DashboardAdmin } from '../pages/DashboardAdmin'

export function Routes() {

	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/register" component={Register} />
			<Route path="/forgot-password" component={ForgotPassword} />

			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/dashboard/admin" component={DashboardAdmin} />
		</Switch>
	)
}