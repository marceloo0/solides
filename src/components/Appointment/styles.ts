import styled, { css } from 'styled-components'

interface ContainerProps {
  type?: 'green' | 'yellow' | 'blue' | 'red'
}

const colorTypeVariations = {
  green: css`
    background: #e6fffa;
    border-color: #2e656a;
  `,
  yellow: css`
    background: #faf7c3;
    border-color: #fadb05;
  `,
  blue: css`
    background: #ebf8ff;
    border-color: #3172b7;
  `,
  red: css`
    background: #fddede;
    border-color: #c53030;
  `
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
  border-left: 5px solid;
  border-right: 5px solid;
  border-radius: 8px;

  ${props => colorTypeVariations[props.type || 'green']}

  > div {
    margin: 8px;
    display: flex;
    align-items: center;

    > svg {
      margin-right: 4px;
    }

    > h1 {
      font-size: 24px;
      color: #4e4b73;
    }
  }

  @media (min-width: 640px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    width: 100%;
    max-width: 700px;
    border-left: 5px solid;
    border-right: 5px solid;
    border-radius: 8px;

    ${props => colorTypeVariations[props.type || 'green']}
  }
`
