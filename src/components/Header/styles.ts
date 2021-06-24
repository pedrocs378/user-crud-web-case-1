import styled from 'styled-components';

export const Container = styled.header`
	grid-area: header;
	background: var(--white);

	display: flex;
	align-items: center;

	padding: 0 2.8125rem;

	label {
		display: flex;
		align-items: center;

		height: 3.3125rem;
		width: 100%;
		max-width: 22.12rem;

		background: var(--gray-50);
		border-radius: 5px;

		&:hover {
			opacity: 0.8;
		}

		svg {
			height: 1.4rem;
			width: 1.4rem;
			color: var(--gray-400);
			margin: 0 0.9rem 0 1.4rem;
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
		border: 0;
		font: 500 1rem 'Poppins', sans-serif;
		background: transparent;
		margin-left: auto;

		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}
`;
