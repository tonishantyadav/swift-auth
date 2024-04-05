import moment from 'moment-timezone'

export const DateToIST = (date: Date) => {
  const formatDate = new Date(date).toISOString()
  return moment.utc(formatDate).tz('Asia/Kolkata').format()
}
