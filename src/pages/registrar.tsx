import { useRouter } from 'next/router'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { isToday, format } from 'date-fns'

import ptBR from 'date-fns/locale/pt-BR'
import Cookie from 'js-cookie'

import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { MdRestaurant, MdRestaurantMenu } from 'react-icons/md'

import api from '../services/api'
import Navbar from '../components/Header/Navbar'
import Appointment from '../components/Appointment'
import { useToast } from '../hooks/toast'
import { IAppointment } from '../interfaces/IAppointment'

import {
  Container,
  Content,
  HeaderContent,
  Title,
  TitleName,
  Schedule,
  TitleProfile,
  Section,
  SectionTitle,
  Agendar,
  Button,
  Line,
  TitleSection
} from '../styles/pages/Registrar'

export default function Dashboard() {
  const router = useRouter()
  const { addToast } = useToast()
  const name = Cookie.get('name')

  const [selectedDate] = useState(new Date())
  const [informacoes, setInformacoes] = useState<IAppointment[]>([])

  const loadAppointments = async () => {
    const date = new Date(selectedDate)
    const newDate = format(date, 'yyyy-MM-dd')
    try {
      const response = await api.get(`/appointments/${newDate}`)
      setInformacoes(response.data)
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro de autenticação',
        description: 'Desculpe, você não está autenticado.'
      })
      router.push('/')
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [selectedDate])

  const handleCreateAppointment = useCallback(
    async ({ period, color }: IAppointment) => {
      const date = new Date()
      const data = {
        date: format(date, 'yyyy-MM-dd HH:mm:00'),
        period: period,
        color: color
      }

      try {
        await api.post('/appointments', data)
        loadAppointments()
        addToast({
          type: 'success',
          title: 'Registro realizado!',
          description: `Periodo ${period} cadastrado com sucesso!`
        })
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro de autenticação',
          description: 'Você não esta autenticado, faça login novamente.'
        })
        router.push('/')
      }
    },
    [informacoes]
  )

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    })
  }, [selectedDate])

  const start_day = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'start_day')
  }, [informacoes])

  const start_lunch = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'start_lunch')
  }, [informacoes])

  const end_lunch = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'end_lunch')
  }, [informacoes])

  const end_day = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'end_day')
  }, [informacoes])

  return (
    <Container>
      <Navbar />
      <Content>
        <HeaderContent>
          <Title>Bem-vindo(a)</Title>
          <TitleName>{name}</TitleName>
          <Line />
        </HeaderContent>
        <Schedule>
          <Title>Registrar horários</Title>
          <TitleProfile>
            {isToday(selectedDate) && <TitleName>Hoje, </TitleName>}
            <TitleName>{selectedDateAsText}</TitleName>
          </TitleProfile>
          <Section>
            <SectionTitle>
              <TitleSection>Entrada</TitleSection>
              <FiLogIn size={24} />
            </SectionTitle>
            {start_day.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste periodo.</p>
                <Button
                  onClick={() =>
                    handleCreateAppointment({
                      period: 'start_day',
                      color: 'green'
                    })
                  }
                >
                  Registrar
                </Button>
              </Agendar>
            )}

            {start_day.map(info => (
              <Appointment
                key={info._id}
                color={info.color}
                date={info.date}
                period={info.period}
              />
            ))}
          </Section>
          <Section>
            <SectionTitle>
              <TitleSection>Saída almoço</TitleSection>
              <MdRestaurant size={24} />
            </SectionTitle>
            {start_lunch.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste periodo.</p>
                <Button
                  onClick={() =>
                    handleCreateAppointment({
                      period: 'start_lunch',
                      color: 'yellow'
                    })
                  }
                >
                  Registrar
                </Button>
              </Agendar>
            )}

            {start_lunch.map(info => (
              <Appointment
                key={info._id}
                color={info.color}
                date={info.date}
                period={info.period}
              />
            ))}
          </Section>
          <Section>
            <SectionTitle>
              <TitleSection>Retorno almoço</TitleSection>
              <MdRestaurantMenu size={24} />
            </SectionTitle>
            {end_lunch.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste periodo.</p>
                <Button
                  onClick={() =>
                    handleCreateAppointment({
                      period: 'end_lunch',
                      color: 'blue'
                    })
                  }
                >
                  Registrar
                </Button>
              </Agendar>
            )}

            {end_lunch.map(info => (
              <Appointment
                key={info._id}
                color={info.color}
                date={info.date}
                period={info.period}
              />
            ))}
          </Section>
          <Section>
            <SectionTitle>
              <TitleSection>Saída</TitleSection>
              <FiLogOut size={24} />
            </SectionTitle>
            {end_day.length === 0 && (
              <Agendar>
                <p>Nenhum horário neste periodo.</p>
                <Button
                  onClick={() =>
                    handleCreateAppointment({
                      period: 'end_day',
                      color: 'red'
                    })
                  }
                >
                  Registrar
                </Button>
              </Agendar>
            )}

            {end_day.map(info => (
              <Appointment
                key={info._id}
                color={info.color}
                date={info.date}
                period={info.period}
              />
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  )
}
