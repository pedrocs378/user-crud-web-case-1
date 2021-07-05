import { FormEvent, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import { getValidationErrors } from '../../utils/getValidationErrors'

import { Container } from './styles'
import { useEffect } from 'react'

interface ValidationErrors {
	[key: string]: string
}

export function ResetPassword() {
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

	const history = useHistory()
	const location = useLocation()
	const [_, token] = location.search.split('?token=')

	useEffect(() => {
		if (!token || !token.trim()) {
			history.push('/')
		}
	}, [token, history])

	async function handleResetPassword(event: FormEvent) {
		event.preventDefault()

		try {
			setIsLoading(true)
			setValidationErrors({})

			const schema = Yup.object().shape({
				password: Yup.string().required('Senha obrigatória'),
			})

			await schema.validate({ password }, {
				abortEarly: false
			})

			await api.post('/password/reset', {
				token,
				password
			})

			toast.success('Senha resetada com sucesso')
			history.push('/')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				setValidationErrors(errors)

				return
			}

			toast.error('Não foi possivel resetar a senha')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Container>
			<form onSubmit={handleResetPassword}>
				<h2>Resetar minha senha</h2>

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

				<Button type="submit">
					{isLoading ? (
						<Loading
							type="spinningBubbles"
							height={26}
							width={26}
						/>
					) : "Resetar"}
				</Button>

				<p>
					<Link to="/">Voltar para o login</Link>
				</p>
			</form>
		</Container>
	)
}