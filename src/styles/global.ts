import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Roboto;
    background: #fff;
    color: #333;
  }

  button, a {
    cursor: pointer;
  }
`
