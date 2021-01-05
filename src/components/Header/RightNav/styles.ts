import styled from 'styled-components'

interface ContainerProps {
  open?: boolean
}

export const Container = styled.ul<ContainerProps>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  align-items: center;
  justify-content: center;

  > li {
    padding: 18px 10px;

    > a {
      font-size: 20px;
      text-decoration: none;
      color: #8872b2;

      &.hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 640px) {
    flex-flow: column nowrap;
    background-color: #5f4ab7;
    position: fixed;
    z-index: 2;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #8872b2;

      > a {
        font-size: 24px;
        text-decoration: none;
        color: #fff;
      }
    }
  }
`
