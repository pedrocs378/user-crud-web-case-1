import { useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useAuth } from '../../hooks/useAuth'

import { Container, TextLink } from './styles'

export function Home() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { signIn } = useAuth()

	const history = useHistory()

	async function handleSignIn(event: FormEvent) {
		event.preventDefault()

		try {
			const user = await signIn({
				email,
				password
			})

			history.push(user.isAdmin ? '/dashboard/admin' : '/dashboard')
		} catch (err) {
			toast.error('Não foi possivel entrar na conta')
		}
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
					placeholder="youraddress@email.com"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>

				<Input
					className="input"
					name="password"
					label="Senha"
					placeholder="********"
					isPassword
					value={password}
					onChange={event => setPassword(event.target.value)}
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