import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { Container, TextLink } from './styles'

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
					className="input"
					name="email"
					label="E-mail"
					placeholder="youraddres@email.com"
				/>

				<Input
					className="input"
					name="password"
					label="Senha"
					placeholder="********"
					isPassword
				/>

				<Button type="submit">Login</Button>

				<TextLink>
					Esqueceu sua senha? <Link to="forgot-password">Clique aqui</Link>
				</TextLink>

				<TextLink>
					Não possui uma conta? <Link to="register">Registrar-se</Link>
				</TextLink>
			</form>
		</Container>
	)
}