import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { Container } from './styles'

export function Home() {

	const history = useHistory()

	function handleSignIn(event: FormEvent) {
		event.preventDefault()

		history.push('/dashboard')
	}

	return (
		<Container>
			<form onSubmit={handleSignIn}>
				<h2>Entrar</h2>

				<p className="subtitle">
					O seu passaporte para o futuro.
				</p>

				<Input
					name="email"
					label="E-mail"
					placeholder="Youraddres@email.com"
				/>

				<Input
					name="password"
					label="Senha"
					placeholder="Enter your password"
					isPassword
				/>

				<Button type="submit">Login</Button>

				<p className="link">
					Esqueceu sua senha? <Link to="forgot-password">Clique aqui</Link>
				</p>

				<p className="link">
					Não possui uma conta? <Link to="register">Registrar-se</Link>
				</p>
			</form>
		</Container>
	)
}