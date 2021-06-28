import { Switch, Route, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Dashboard } from '../pages/Dashboard'
import { DashboardAdmin } from '../pages/DashboardAdmin'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { AdminRoute } from './AdminRoute'

export function Routes() {
	const { user } = useAuth()

	return (
		<Switch>
			<PublicRoute path="/" exact component={Home} />
			<PublicRoute path="/register" component={Register} />
			<PublicRoute path="/forgot-password" component={ForgotPassword} />

			<PrivateRoute path="/dashboard" exact component={Dashboard}>
				{user && user.isAdmin && <Redirect to="/dashboard/admin" />}
			</PrivateRoute>

			<AdminRoute path="/dashboard/admin" component={DashboardAdmin} />
		</Switch>
	)
}