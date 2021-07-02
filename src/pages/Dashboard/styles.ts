import styled from 'styled-components';

export const Container = styled.main`
	grid-area: main;
`;

export const UserWelcome = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-between;

	max-width: 1252px;
	margin: 3rem auto;
	padding: 0 1.5rem;

	strong {
		font: 600 2rem 'Poppins', sans-serif;
		color: var(--black);

		span {
			color: var(--purple);
		}
	}

	img {
		width: 29rem;
		height: 29rem;
	}

	@media (min-width: 1400px) {
		strong {
			font-size: 2.9rem;
		}

		img {
			width: 35rem;
			height: 35rem;
		}
	}
`
