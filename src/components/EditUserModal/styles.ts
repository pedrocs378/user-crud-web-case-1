import styled from 'styled-components';

export const Container = styled.form`
	background: var(--white);
	border-radius: 1.875rem;
	padding: 2.75rem 5.5rem;

	h2 {
		text-transform: uppercase;
		text-align: center;
		font-size: 2.115rem;
	}

	button[type="submit"] {
		margin-top: 2.83rem;
	}

	> button[type="button"] {
		border: 0;
		background: transparent;
		display: block;
		margin: 2.61rem auto 0;
		font-size: 1.07rem;

		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}
`;
