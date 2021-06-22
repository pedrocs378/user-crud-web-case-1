import styled from 'styled-components';

import unsplashBg from '../../assets/unsplash-background.png'

export const Container = styled.div`
	height: 100vh;
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	background: url(${unsplashBg}) no-repeat center;
	background-size: cover;

	&::before {
		content: '';
		height: 100%;
		width: 100%;

		position: absolute;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.4;
	}

	form {
		position: relative;
		width: 100%;
		max-width: 35.3rem;
		padding: 5.5rem;

		border-radius: 1.875rem;
		background: var(--white);

		h2 {
			font-size: 2.976rem;
			text-transform: uppercase;
		}
		
		p.subtitle {
			opacity: 0.5;
			margin: 1.375rem 0 4.71rem;
		}

		> button {
			margin-top: 3rem;
		}
		
		p.register {
			margin-top: 2.61rem;
			font-size: 1.07rem;

			a {
				color: var(--cyan);
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`;
