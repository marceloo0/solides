import Link from 'next/link'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import api from '../services/api'

import { useToast } from '../hooks/toast'

import {
  Container,
  Content,
  Section,
  Header,
  TextHeader,
  InputContainer,
  InputText,
  MessageError,
  Footer,
  Button,
  LinkConta
} from '../styles/pages/Signup'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const initialValues: SignUpFormData = {
  name: '',
  email: '',
  password: ''
}

export default function Signup() {
  const router = useRouter()
  const { addToast } = useToast()
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().min(6, 'No mínimo 6 dígitos')
  })

  async function onSubmit(values: SignUpFormData) {
    try {
      await api.post('/users/signup', values)
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no GoBarber!'
      })
      router.push('/')
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
      })
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <Header>
            <img src="/logo.svg" alt="logo" />
            <TextHeader>Crie sua conta</TextHeader>
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
                  <InputText>
                    <Field
                      className="input"
                      type="text"
                      placeholder="Name"
                      name="name"
                    />
                  </InputText>
                  <MessageError>
                    <ErrorMessage name="name" />
                  </MessageError>
                </InputContainer>
                <InputContainer>
                  <InputText>
                    <Field
                      className="input"
                      type="text"
                      placeholder="E-mail"
                      name="email"
                    />
                  </InputText>
                  <MessageError>
                    <ErrorMessage name="email" />
                  </MessageError>
                </InputContainer>
                <InputContainer>
                  <InputText>
                    <Field
                      className="input"
                      type="password"
                      placeholder="Senha"
                      name="password"
                    />
                  </InputText>
                  <MessageError>
                    <ErrorMessage name="password" />
                  </MessageError>
                </InputContainer>
                <Footer>
                  <Button type="submit" disabled={!isValid}>
                    Cadastrar
                  </Button>
                  <Link href="/">
                    <LinkConta>Fazer login</LinkConta>
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
