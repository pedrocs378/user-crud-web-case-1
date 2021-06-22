import Modal, { Props as ModalProps } from 'react-modal'

import { Button } from '../Button'

import depressonPersonImg from '../../assets/depression-person.svg'

import { Container } from './styles'

interface EditUserModalProps extends ModalProps {
	isOpen: boolean
	onRequestClose: () => void
}

export function DeleteUserModal({ isOpen, onRequestClose }: EditUserModalProps) {

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<Container>
				<img
					src={depressonPersonImg}
					alt="Pessoa triste em baixo da chuva"
				/>

				<section>
					<h2>Você realmente deseja excluir o usuário?</h2>

					<div>
						<button type="button">
							Confirmar
						</button>

						<Button type="button" onClick={onRequestClose}>
							Não
						</Button>
					</div>
				</section>
			</Container>
		</Modal>
	)
}