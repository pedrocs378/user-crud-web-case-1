import { useState, FormEvent, useEffect, useCallback } from 'react'
import Modal, { Props as ModalProps } from 'react-modal'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'
import { validateCPF } from 'validations-br'
import * as Yup from 'yup'

import { Input } from '../Input'
import { CheckboxInput } from '../CheckboxInput'
import { Button } from '../Button'

import { api } from '../../services/api'
import { getValidationErrors } from '../../utils/getValidationErrors'

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
	const [cpf, setCpf] = useState('')
	const [email, setEmail] = useState('')
	const [admin, setAdmin] = useState(false)
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
	const [isLoading, setIsLoading] = useState(false)

	function clearFields() {
		setName('')
		setEmail('')
		setAdmin(false)
		setCpf('')
		setPassword('')
		setPasswordConfirmation('')
	}

	const handleClose = useCallback(() => {
		clearFields()
		setValidationErrors({})
		onRequestClose()
	}, [onRequestClose])

	const handleUpdateUser = useCallback(async (event: FormEvent) => {
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
					admin: Yup.boolean(),
					password: Yup.string(),
					password_confirmation: Yup.string()
						.when('password', {
							is: (value: string) => !!value.length,
							then: Yup.string().required('Insira a nova senha'),
							otherwise: Yup.string()
						})
						.oneOf([Yup.ref('password'), undefined], 'As senhas precisam ser iguais')
				})

				const data = {
					name,
					cpf,
					email,
					admin,
					password,
					password_confirmation
				}

				await schema.validate(data, {
					abortEarly: false
				})

				const response = await api.put(`/users/${user.id}`, data)

				onSuccessUpdate && onSuccessUpdate(response.data)
				toast.success(`${response.data.name} foi atualizado`)

				handleClose()
			}
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				setValidationErrors(errors)

				return
			}

			toast.error('Não foi possivel editar o usuário')
		} finally {
			setIsLoading(false)
		}
	}, [user, name, cpf, email, admin, password, password_confirmation, onSuccessUpdate, handleClose])

	useEffect(() => {
		if (user) {
			setName(user.name)
			setEmail(user.email)
			setCpf(user.cpf)
			setAdmin(user.isAdmin)
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

				<CheckboxInput
					label="Admin?"
					checked={admin}
					onChange={event => setAdmin(event.target.checked)}
				/>

				<Input
					name="password"
					label="Nova senha"
					placeholder="********"
					isPassword
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>
				<Input
					className="input"
					name="password_confirmation"
					label="Confirme a nova senha"
					placeholder="********"
					isPassword
					value={password_confirmation}
					onChange={event => setPasswordConfirmation(event.target.value)}
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