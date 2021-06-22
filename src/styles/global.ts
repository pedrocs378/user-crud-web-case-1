import { createGlobalStyle, keyframes } from 'styled-components'

const modalFadeAnimation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-3%);
	}

	100% {
		opacity: 1;
		transform: translateY(0%);
	}
`

export default createGlobalStyle`
	:root {
		--white: #fff;

		--gray-50: #F3F3F3;
		--gray-300: #ABAFB3;
		--gray-400: #AAAAAA;
		--gray-500: #898989;
		--gray-600: #6A707E;

		--blue-grayish-800: #464A53;

		--cyan: #2EA4D4;

		--blue-dark: #03014C;
		--blue-50: #F3F6F9;

		--purple: #7F63F4;
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	html {
		@media (max-width: 1080px) {
			font-size: 93.75%;
		}

		@media (max-width: 720px) {
			font-size: 87.5%;
		}
	}

	body {
		background: var(--blue-50);
		color: var(--blue-dark);
	}

	body, input, button, textarea {
		font: 400 1rem 'Open Sans', sans-serif;
	}

	button {
		cursor: pointer;
	}

	.react-modal-overlay {
		background: rgba(243, 246, 249, 0.6);

		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.react-modal-content {
		width: 90%;
		max-width: 576px;
		background: var(--background);
		padding: 3rem 1.5rem;
		position: relative;
		border-radius: 0.25rem;
		outline: none;

		animation: ${modalFadeAnimation} 700ms;
	}
`