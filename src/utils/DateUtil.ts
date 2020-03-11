export function getDateTimeFromMilli (value: number): string {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo'
  }

  return new Date(value).toLocaleDateString('pt-BR', options)
}
