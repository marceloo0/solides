import { render, fireEvent } from '@testing-library/react'
import SignIn from '../pages'

describe('', () => {
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const emailField = getByPlaceholderText('E-mail')
    const passwordField = getByPlaceholderText('Senha')
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } })
    fireEvent.change(passwordField, { target: { value: '123456' } })

    fireEvent.click(buttonElement)

    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')
  })
})
