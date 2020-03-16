export function getDateTimeFromSeconds (value: number): string {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Sao_Paulo',
    hour12: false
  }
  const date = new Date(value * 1000).toLocaleDateString('pt-BR', options)
  console.log(date)
  return date
}
