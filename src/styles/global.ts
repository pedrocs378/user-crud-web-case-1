import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	:root {
		--white: #fff;

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
`