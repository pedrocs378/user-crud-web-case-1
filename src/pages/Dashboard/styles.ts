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

		.logo {
			height: 6.25rem;	

			display: flex;
			align-items: center;
			justify-content: center;

			background: var(--purple);
			
			h1 {
				font-size: 1.625rem;
				color: var(--white);
			}
		}
	}

	header {
		grid-area: header;
		background: var(--white);

		display: flex;
		align-items: center;
		justify-content: space-between;

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

			input {
				height: 100%;
				width: 100%;
				border: 0;
				background: transparent;
				outline: none;
				font-size: 0.94rem;
				font-weight: 700;

				&::placeholder {
					color: var(--gray-400);
				}
			}

			svg {
				height: 1.2rem;
				width: 1.2rem;
				color: var(--gray-400);
				margin: 0 1.48rem;
			}
		}

		button {
			border: 0;
			font: 500 1rem 'Poppins', sans-serif;
			background: transparent;

			transition: opacity 0.2s;

			&:hover {
				opacity: 0.7;
			}
		}
	}

	main {
		grid-area: main;
	}
	
	footer {
		grid-area: footer;
		background: var(--white);

		display: flex;
		align-items: center;
		justify-content: center;

		box-shadow: 0.5px 3px 10px rgba(0, 0, 0, 0.15);
		margin-left: 3px;

		strong {
			color: var(--gray-500);
			font-size: 0.875rem;

			span {
				color: var(--purple);
			}
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

	ul {
		list-style: none;
		margin-top: 1.25rem;

		li {
			a {
				position: relative;
				display: flex;
				align-items: center;

				width: 100%;
				height: 3.75rem;
				padding-left: calc(3.56rem - 5px);
				border-left: 5px solid transparent;

				text-decoration: none;
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
	}
`
