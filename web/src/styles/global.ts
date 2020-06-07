import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #34cb79;
    --title-color: #322153;
    --text-color: #6c6c80;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #444;
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
  }

  .modal-open {
    overflow: hidden;
  }

  body,
  input,
  button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--title-color);
    font-family: Ubuntu;
  }
`;
