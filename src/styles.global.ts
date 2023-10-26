import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html {
    font-size: 62.5%;
}

body {
    margin: 0;
    box-sizing: border-box;
    background: rgb(56,56,56);
    background: radial-gradient(circle, rgba(55,55,55,1) 14%, rgba(0,0,0,1) 100%);
    min-height: 100vh;

};
`;
