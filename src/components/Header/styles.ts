import styled from 'styled-components';

export const Container = styled.header`
	grid-area: header;
	background: var(--white);

	display: flex;
	flex-direction: column;
`;

export const Content = styled.div`
	height: 6.25rem;
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;

	padding: 0 2.25rem;

	display: flex;
	align-items: center;

	form {
		display: flex;

		height: 3.3125rem;
		width: 100%;
		max-width: 25.4rem;

		border-radius: 5px;
		overflow: hidden;

		label {
			display: flex;
			align-items: center;

			flex: 1;

			background: var(--gray-50);

			&:hover svg {
				color: var(--purple);
			}

			svg {
				height: 1.4rem;
				width: 1.4rem;
				color: var(--gray-400);
				margin: 0 0.9rem 0 1.4rem;

				transition: color 0.2s;
			}

			input {
				height: 100%;
				width: 100%;
				padding: 0.5rem;
				border: 0;
				background: transparent;
				outline: none;
				font-size: 0.9rem;
				font-weight: 700;

				&::placeholder {
					color: var(--gray-400);
				}
			}
		}

		button {
			width: 3.3125rem;
			border: 0;
			font-size: 0;

			background: var(--purple);

			transition: filter 0.2s;

			svg {
				height: 1.4rem;
				width: 1.4rem;
				color: var(--white);
			}

			&:hover {
				filter: brightness(0.9);
			}
		}
	}

	> button {
		border: 0;
		font: 500 1rem 'Poppins', sans-serif;
		background: transparent;
		margin-left: auto;

		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}
`

export const Title = styled.div`
	background: rgba(127, 99, 244, 0.1);
	height: calc(100% - 6.25rem);

	display: flex;

	> div {
		display: flex;
		align-items: center;

		width: 100%;
		max-width: 1440px;
		margin: 0 auto;

		padding: 0 2.25rem;
		
		gap: 0.8rem;

		h2 {
			color: var(--purple);
			font-size: 1.375rem;
			letter-spacing: 0.22px;
		}
	}
`
