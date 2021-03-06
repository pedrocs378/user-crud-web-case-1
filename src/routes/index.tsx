import { Switch } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { ResetPassword } from '../pages/ResetPassword'

import { PublicRoute } from './PublicRoute'

import { DashboardRoutes } from './dashboard.routes'

export function Routes() {

	return (
		<Switch>
			<PublicRoute path="/" exact component={Home} />
			<PublicRoute path="/register" component={Register} />
			<PublicRoute path="/forgot-password" component={ForgotPassword} />
			<PublicRoute path="/reset-password" component={ResetPassword} />

			<DashboardRoutes />
		</Switch>
	)
}