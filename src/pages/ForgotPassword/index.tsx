import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import { getValidationErrors } from '../../utils/getValidationErrors'

import { Container } from './styles'

interface ValidationErrors {
	[key: string]: string
}

export function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

	const history = useHistory()

	async function handleSendCode(event: FormEvent) {
		event.preventDefault()

		try {
			setIsLoading(true)
			setValidationErrors({})

			const schema = Yup.object().shape({
				email: Yup.string().required('Email obrigatório').email('O email precisa ser válido')
			})

			const data = {
				email
			}

			await schema.validate(data)

			await api.post('/password/forgot', {
				email
			})

			toast.success('Código enviado! Verifique sua caixa de mensagens.')
			history.push('/')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				setValidationErrors(errors)

				return
			}

			const message = err.response.data?.message || 'Não foi possivel enviar o código.'

			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Container>
			<form onSubmit={handleSendCode}>
				<h2>Esqueci minha senha</h2>

				<Input
					name="email"
					label="Insira seu e-mail"
					placeholder="youraddres@email.com"
					required
					value={email}
					onChange={event => setEmail(event.target.value)}
					error={!!validationErrors['email']}
				/>

				<Button type="submit">
					{isLoading ? (
						<Loading
							type="spinningBubbles"
							height={26}
							width={26}
						/>
					) : "Enviar código"}
				</Button>

				<p>
					Já possui uma conta? <Link to="/">Entrar</Link>
				</p>
			</form>
		</Container>
	)
}