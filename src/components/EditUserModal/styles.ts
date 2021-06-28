import styled from 'styled-components';

export const Container = styled.form`
	background: var(--white);
	border-radius: 1.875rem;
	padding: 2.75rem 5.5rem;
	width: 90%;
	max-width: 576px;

	h2 {
		text-transform: uppercase;
		text-align: center;
		font-size: 2.1rem;
	}

	.input {
		margin-top: 1rem;
	}

	button[type="submit"] {
		margin-top: 2.8rem;
	}

	> button[type="button"] {
		border: 0;
		background: transparent;
		display: block;
		margin: 2.6rem auto 0;

		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}
`;
