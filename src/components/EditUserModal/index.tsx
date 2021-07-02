import { useState, FormEvent, useEffect } from 'react'
import Modal, { Props as ModalProps } from 'react-modal'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'
import { validateCPF } from 'validations-br'
import * as Yup from 'yup'

import { Input } from '../Input'
import { Button } from '../Button'

import { useAuth } from '../../hooks/useAuth'

import { api } from '../../services/api'

import { Container } from './styles'

interface ValidationErrors {
	[key: string]: string
}

interface User {
	id: string
	name: string
	email: string
	cpf: string
	isAdmin: boolean
}

interface EditUserModalProps extends ModalProps {
	isOpen: boolean
	user: User | undefined
	onRequestClose: () => void
	onSuccessUpdate?: (data: User) => void
}

export function EditUserModal({ isOpen, user, onRequestClose, onSuccessUpdate }: EditUserModalProps) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [cpf, setCpf] = useState('')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
	const [isLoading, setIsLoading] = useState(false)

	const { user: authenticatedUser } = useAuth()

	async function handleUpdateUser(event: FormEvent) {
		event.preventDefault()

		try {
			if (user) {
				setIsLoading(true)
				setValidationErrors({})

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório').min(3, 'Nome muito curto'),
					cpf: Yup
						.string()
						.required('CPF obrigatório')
						.test('isCpf', 'CPF inválido', value => validateCPF(String(value))),
					email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
				})

				const data = {
					name,
					cpf,
					email
				}

				await schema.validate(data, {
					abortEarly: false
				})

				if (authenticatedUser?.isAdmin) {
					const response = await api.put(`/users/${user.id}`, data)

					onSuccessUpdate && onSuccessUpdate(response.data)
					toast.success(`${response.data.name} foi atualizado`)
				} else {
					const response = await api.put(`/profile`, data)

					onSuccessUpdate && onSuccessUpdate(response.data)
					toast.success(`${response.data.name} foi atualizado`)
				}

				handleClose()
			}
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					setValidationErrors(state => {
						return {
							...state,
							[error.path || '']: error.message
						}
					})

					toast.error(error.message)
				})

				return
			}

			toast.error('Não foi possivel editar o usuário')
		} finally {
			setIsLoading(false)
		}
	}

	function handleClose() {
		setValidationErrors({})
		onRequestClose()
	}

	useEffect(() => {
		if (user) {
			setName(user.name)
			setEmail(user.email)
			setCpf(user.cpf)
		}
	}, [user])

	return (
		<Modal
			appElement={document.getElementById('root') as HTMLElement}
			isOpen={isOpen}
			onRequestClose={handleClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<Container onSubmit={handleUpdateUser}>
				<h2>Editar</h2>

				<Input
					className="input"
					name="name"
					label="Nome"
					placeholder="Digite seu nome"
					required
					value={name}
					onChange={event => setName(event.target.value)}
					error={!!validationErrors['name']}
				/>
				<Input
					className="input"
					name="cpf"
					label="CPF"
					placeholder="xxx.xxx.xxx-xx"
					required
					value={cpf}
					onChange={event => setCpf(event.target.value)}
					error={!!validationErrors['cpf']}
				/>
				<Input
					className="input"
					name="email"
					type="email"
					label="E-mail"
					placeholder="youraddres@email.com"
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
					isPassword
				/>
				<Input
					className="input"
					name="password_confirmation"
					label="Confirme sua senha"
					placeholder="********"
					isPassword
				/>

				<Button type="submit">
					{isLoading ? (
						<Loading
							type="spinningBubbles"
							height={26}
							width={26}
						/>
					) : "Confirmar"}
				</Button>

				<button type="button" onClick={handleClose}>
					Voltar
				</button>
			</Container>
		</Modal>
	)
}