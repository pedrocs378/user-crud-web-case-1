import Modal, { Props as ModalProps } from 'react-modal'

import { Input } from '../Input'
import { Button } from '../Button'

import { Container } from './styles'

interface EditUserModalProps extends ModalProps {
	isOpen: boolean
	onRequestClose: () => void
}

export function EditUserModal({ isOpen, onRequestClose }: EditUserModalProps) {

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<Container>
				<h2>Editar</h2>

				<Input
					name="email"
					label="E-mail"
					placeholder="Youraddres@email.com"
				/>
				<Input
					name="name"
					label="Nome"
					placeholder="Name"
				/>
				<Input
					name="password"
					label="Senha"
					placeholder="Enter your password"
					isPassword
				/>
				<Input
					name="password_confirmation"
					label="Senha"
					placeholder="Enter your password"
					isPassword
				/>

				<Button type="submit">Confirmar</Button>

				<button type="button" onClick={onRequestClose}>
					Voltar
				</button>
			</Container>
		</Modal>
	)
}