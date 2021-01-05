import Image from 'next/image'
import Cookie from 'js-cookie'

import Burger from '../Burger'

import { Container, Content, Profile, ProfileContent } from './styles'

export default function Navbar() {
  const name = Cookie.get('name')
  return (
    <Container>
      <Content>
        <Profile>
          <Image src="/logo.svg" height={55} width={128} />
          <ProfileContent>
            <h1>Bem-vindo</h1>
            <p>{name}</p>
          </ProfileContent>
        </Profile>
        <Burger />
      </Content>
    </Container>
  )
}
