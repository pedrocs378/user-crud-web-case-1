import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

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
			margin-top: 1.375rem;
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

export const Input = styled(TextField)`
	width: 100%;
	margin-top: 4.7rem;
	color: white;

	label {
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		opacity: 0.5;
		color: var(--blue-dark);

		&:not(.MuiFormLabel-filled):not(.Mui-focused) {
			margin-top: 0.9rem;
		}
	}

	input {
		font: 600 1.1875rem 'Open Sans', sans-serif;
		color: var(--blue-dark);
		opacity: 0.7;
		padding: 0.9rem 0;
	}

	.MuiInput-underline {
		&::before {
			border-color: var(--blue-dark);
			opacity: 0.2;
		}
	}

	& + div {
		margin: 3.62rem 0;
	}
`
