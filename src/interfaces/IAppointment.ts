export interface IAppointment {
  userId?: string
  period?: string
  date?: Date
  color: 'green' | 'yellow' | 'blue' | 'red'
  _id?: string
}
