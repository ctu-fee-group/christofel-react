import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #__next {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    
    width: 100%;

    min-height: 100vh;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @media only screen and (min-width: 768px) {
    body {
      background-image: url("/img/background.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
`;

export default GlobalStyle;
