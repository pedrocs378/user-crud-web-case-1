import { useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useAuth } from '../../hooks/useAuth'
import { getValidationErrors } from '../../utils/getValidationErrors'

import { Container, TextLink } from './styles'

interface ValidationErrors {
	[key: string]: string
}

export function Home() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

	const { signIn } = useAuth()

	const history = useHistory()

	async function handleSignIn(event: FormEvent) {
		event.preventDefault()

		try {
			setValidationErrors({})

			const schema = Yup.object().shape({
				email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
				password: Yup.string().required('Senha obrigatória'),
			})

			const data = {
				email,
				password,
			}

			await schema.validate(data, {
				abortEarly: false
			})

			const user = await signIn(data)

			history.push(user.isAdmin ? '/dashboard/admin' : '/dashboard')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				setValidationErrors(errors)

				return
			}

			const message = err.response.data?.message || 'Não foi possivel entrar na conta'

			toast.error(message)
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
					required
					value={email}
					onChange={event => setEmail(event.target.value)}
					error={!!validationErrors['email']}
				/>

				<Input
					className="input"
					name="password"
					label="Senha"
					placeholder="********"
					required
					isPassword
					value={password}
					onChange={event => setPassword(event.target.value)}
					error={!!validationErrors['password']}
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