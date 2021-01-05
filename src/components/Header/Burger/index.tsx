import { useState } from 'react'
import { Container } from './styles'

import RightNav from '../RightNav'

export default function Burger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Container open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </Container>
      <RightNav open={open} />
    </>
  )
}
