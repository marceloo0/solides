import { useRouter } from 'next/router'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import Cookie from 'js-cookie'

import api from '../services/api'

import { useToast } from '../hooks/toast'

import {
  Container,
  Content,
  Section,
  Header,
  TextHeader,
  InputContainer,
  Input,
  MessageError,
  Footer,
  Button,
  LinkConta
} from '../styles/pages/Home'

interface SignInFormData {
  email: string
  password: string
}

const initialValues: SignInFormData = {
  email: '',
  password: ''
}

const SignIn: React.FC = () => {
  const router = useRouter()
  const { addToast } = useToast()
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().min(6, 'No mínimo 6 dígitos')
  })

  async function onSubmit(values: SignInFormData) {
    try {
      const response = await api.post('/users/signin', values)
      // alert('Login efetuado com sucesso.')
      addToast({
        type: 'success',
        title: 'Login realizado!',
        description: 'Login efetuado com sucesso!'
      })

      Cookie.set('name', response.data.name)

      router.push(`/registrar`)
    } catch (err) {
      alert(
        err?.response?.data?.error ||
          'Ocorreu um erro ao fazer cadastro, verifique seus dados.'
      )
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <Header>
            <img src="/logo.svg" alt="logo" />
            <TextHeader>Faça seu login</TextHeader>
          </Header>

          <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            validateOnMount
            initialValues={initialValues}
          >
            {({ isValid }) => (
              <Form>
                <InputContainer>
                  <Input>
                    <Field
                      className="input"
                      type="text"
                      placeholder="E-mail"
                      name="email"
                    />
                  </Input>
                  <MessageError>
                    <ErrorMessage name="email" />
                  </MessageError>
                </InputContainer>
                <InputContainer>
                  <Input>
                    <Field
                      className="input"
                      type="password"
                      placeholder="Senha"
                      name="password"
                    />
                  </Input>
                  <MessageError>
                    <ErrorMessage name="password" />
                  </MessageError>
                </InputContainer>
                <Footer>
                  <Button type="submit" disabled={!isValid}>
                    Login
                  </Button>
                  <Link href="/signup">
                    <LinkConta>Criar conta</LinkConta>
                  </Link>
                </Footer>
              </Form>
            )}
          </Formik>
        </Section>
      </Content>
    </Container>
  )
}
export default SignIn
