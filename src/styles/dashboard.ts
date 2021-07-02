import styled from "styled-components";

export const Container = styled.div`
	display: grid;
	grid-template-rows: 10.19rem 1fr 5.1rem;
	grid-template-columns: 20.6rem 1fr;
	grid-template-areas: 
		"menu header"
		"menu main"
		"menu footer";
`