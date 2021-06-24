import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-rows: 6.25rem 1fr 5.0625rem;
	grid-template-columns: 20.625rem 1fr;
	grid-template-areas: 
		"menu header"
		"menu main"
		"menu footer";

	aside {
		grid-area: menu;
		height: 100vh;
		max-width: 100%;

		background: var(--white);
		box-shadow: 0.5px 3px 10px rgba(119, 119, 119, 0.1);
	}

	header {
		grid-area: header;
		background: var(--white);

		display: flex;

		padding: 0 2.8125rem;

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
	}

	main {
		grid-area: main;

		> div {
			background: rgba(127, 99, 244, 0.1);
			height: 3.94rem;

			display: flex;
			align-items: center;
			padding: 0 2.25rem;
		}
	}
`;

export const Navigation = styled.nav`
	margin-top: 2.875rem;

	strong {
		font-size: 0.75rem;
		letter-spacing: 0.24px;
		text-transform: uppercase;
		color: var(--gray-300);

		margin-left: 3.56rem;
	}

	> p {
		color: var(--purple);
		background: rgba(127, 99, 244, 0.2);
		display: inline-block;
		padding: 0.19rem 0.75rem;
		margin-left: 3.56rem;
		border-radius: 5px;

		font: 500 0.875rem 'Poppins', sans-serif;
	}

	ul {
		list-style: none;
		margin-top: 1.25rem;

		button {
			position: relative;
			display: flex;
			align-items: center;

			width: 100%;
			height: 3.75rem;

			background: transparent;
			border: 0;
			border-left: 5px solid transparent;
			padding-left: calc(3.56rem - 5px);

			color: var(--gray-600);
			font-size: 1rem;
			font-weight: 700;

			transition: ease 0.3s;

			svg {
				height: 1.4rem;
				width: 1.4rem;
				color: var(--gray-400);
				margin-right: 0.75rem;

				transition: ease 0.3s;
			}

			&:hover {
				border-left-color: var(--purple);
				color: var(--purple);
				background: rgba(127, 99, 244, 0.1);

				svg {
					color: var(--purple);	
				}
			}
		}
	}
`

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