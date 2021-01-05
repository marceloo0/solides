import Link from 'next/link'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Container } from './styles'

interface Props {
  open?: boolean
}

const RightNav = ({ open }: Props) => {
  const route = useRouter()

  const logout = useCallback(async () => {
    Cookie.remove('name')
    route.push('/')
  }, [])
  return (
    <Container open={open}>
      <li>
        <Link href={`/registrar`}>
          <a>Registrar</a>
        </Link>
      </li>
      <li>
        <Link href={`/listar`}>
          <a>Listar</a>
        </Link>
      </li>
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </Container>
  )
}

export default RightNav
