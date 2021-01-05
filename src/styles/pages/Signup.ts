import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`
export const Content = styled.div`
  align-items: center;
  justify-content: center;
  padding: 20px;
`
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
export const Header = styled.div`
  margin: 20px;
  align-items: center;
  justify-content: center;
`
export const TextHeader = styled.h2`
  margin-top: 16px;
  font-size: 18px;
  text-align: center;
  color: #5f4ab7;
`
export const InputContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 24px auto;
`
export const InputText = styled.div`
  height: 45px;
  width: 100%;

  .input {
    border-radius: 8px;
    border: 1px solid #8872b2;
    background-color: #fff;
    font-size: 16px;
    height: 45px;
    width: 100%;
    padding: 10px 20px;
    color: #5f4ab7;

    &::placeholder {
      color: #8872b2;
    }
  }
`
export const MessageError = styled.div`
  margin: 4px 8px;
  color: #c53030;
`
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
`
export const Button = styled.button`
  margin-top: 16px;
  height: 45px;
  color: #fff;
  background: #5f4ab7;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#5f4ab7')};
  }
`
export const LinkConta = styled.a`
  margin-top: 16px;
  text-align: center;
  font-size: 16px;
  margin-bottom: 16px;
  color: #8872b2;
  transition: background-color 0.2s;

  &:hover {
    color: ${shade(0.2, '#8872b2')};
    text-decoration: underline;
  }
`
