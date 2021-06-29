import styled from 'styled-components';

export const Container = styled.div`
	background: var(--white);
	border-radius: 1.875rem;
	padding: 0 3.125rem;
	width: 90%;
	max-width: 62.5rem;

	display: flex;
	align-items: center;

	section {
		h2 {
			text-align: center;
			font-size: 1.7rem;
		}

		div {
			display: flex;
			align-items: center;
			gap: 2.31rem;
			margin-top: 2.875rem;

			> button:first-child {
				height: 4.68rem;
				width: 100%;

				display: flex;
				align-items: center;
				justify-content: center;

				background: var(--white);
				color: var(--purple);
				
				border: 1px solid var(--purple);
				border-radius: 0.5rem;
				text-transform: uppercase;
				font-size: 1.1875rem;

				transition: ease 0.3s;

				&:hover {
					background: var(--purple);
					color: var(--white);
				}
			}
		}
	}
`;
