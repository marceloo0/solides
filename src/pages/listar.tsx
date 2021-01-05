import { useRouter } from 'next/router'
import { isToday, format } from 'date-fns'
import { useEffect, useState, useCallback, useMemo } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import Cookie from 'js-cookie'

import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { MdRestaurant, MdRestaurantMenu } from 'react-icons/md'

import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import api from '../services/api'

import { useToast } from '../hooks/toast'

import Navbar from '../components/Header/Navbar'
import Appointment from '../components/Appointment'
import { IAppointment } from '../interfaces/IAppointment'

import {
  Container,
  Content,
  HeaderContent,
  Title,
  Line,
  TitleName,
  TitleRegister,
  Schedule,
  TitleProfile,
  Section,
  SectionTitle,
  Calendar,
  TitleSection
} from '../styles/pages/Listar'

export default function Dashboard() {
  const router = useRouter()
  const { addToast } = useToast()
  const name = Cookie.get('name')

  const [selectedDate, setSelectedDate] = useState(new Date())

  const [informacoes, setInformacoes] = useState<IAppointment[]>([])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  const loadInformacoes = async () => {
    const newDate = format(selectedDate, 'yyyy-MM-dd')
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
    loadInformacoes()
  }, [selectedDate])

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
      <HeaderContent>
        <Title>Bem-vindo(a)</Title>
        <TitleName>{name}</TitleName>
        <Line />
      </HeaderContent>
      <Content>
        <Schedule>
          <TitleName>
            Selecione um dia abaixo para ver a lista de registros do dia
          </TitleName>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] }
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
              ]}
            />
          </Calendar>

          {informacoes.length === 0 ? (
            <TitleRegister>
              Nenhum registro encontrado para este dia.
            </TitleRegister>
          ) : (
            <>
              <Title>Lista de horários registrados no dia de</Title>
              <TitleProfile>
                {isToday(selectedDate) && <TitleName>Hoje, </TitleName>}
                <TitleName>{selectedDateAsText}</TitleName>
              </TitleProfile>
              <Section>
                <SectionTitle>
                  <TitleSection>Entrada</TitleSection>
                  <FiLogIn size={24} />
                </SectionTitle>
                {start_day.map(info => (
                  <Appointment
                    key={info._id}
                    color={info.color}
                    date={info.date}
                  />
                ))}
              </Section>
              <Section>
                <SectionTitle>
                  <TitleSection>Saída almoço</TitleSection>
                  <MdRestaurant size={24} />
                </SectionTitle>
                {start_lunch.map(info => (
                  <Appointment
                    key={info._id}
                    color={info.color}
                    date={info.date}
                  />
                ))}
              </Section>
              <Section>
                <SectionTitle>
                  <TitleSection>Retorno almoço</TitleSection>
                  <MdRestaurantMenu size={24} />
                </SectionTitle>
                {end_lunch.map(info => (
                  <Appointment
                    key={info._id}
                    color={info.color}
                    date={info.date}
                  />
                ))}
              </Section>
              <Section>
                <SectionTitle>
                  <TitleSection>Saída</TitleSection>
                  <FiLogOut size={24} />
                </SectionTitle>
                {end_day.map(info => (
                  <Appointment
                    key={info._id}
                    color={info.color}
                    date={info.date}
                  />
                ))}
              </Section>
            </>
          )}
        </Schedule>
      </Content>
    </Container>
  )
}
