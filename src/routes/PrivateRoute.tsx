import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type PrivateRouteProps = RouteProps & {
	component: React.ComponentType
}

export function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
	const { user } = useAuth()

	return (
		<Route
			{...rest}
			render={routeProps => {
				return !!user ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: routeProps.location }
						}}
					/>
				)
			}}
		/>
	)
}