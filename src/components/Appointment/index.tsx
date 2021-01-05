import React from 'react'
import Cookie from 'js-cookie'
import { MdAlarm, MdPerson } from 'react-icons/md'

import { Container } from './styles'
import { IAppointment } from '../../interfaces/IAppointment'

export default function Appointment({ color, date }: IAppointment) {
  const name = Cookie.get('name')

  return (
    <Container type={color}>
      <div>
        <MdPerson size={24} />
        <h1>{name}</h1>
      </div>
      <div>
        <MdAlarm size={24} />
        <h1>{date}</h1>
      </div>
    </Container>
  )
}
