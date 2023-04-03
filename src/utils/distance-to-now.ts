import {
  differenceInHours,
  formatDistanceToNowStrict,
  formatRelative,
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function howLongHaveRating(date: string): string {
  const timeOfRate = formatRelative(new Date(date), new Date(), {
    locale: ptBR,
  }).split(' ')

  if (timeOfRate.length < 2) {
    const dateFormat = timeOfRate[0]
      .split('/')
      .reverse()
      .map((item, index) => index === 0 && item.padStart(4, '20'))
      .map(Number)
    return suffixHowLong(
      String(new Date(dateFormat[0], dateFormat[1], dateFormat[2])),
    )
  }

  timeOfRate.splice(-2)

  return timeOfRate
    .join(' ')
    .substring(0, 1)
    .toUpperCase()
    .concat(timeOfRate.join(' ').substring(1))
}

export function suffixHowLong(date: string) {
  if (isCreatedToday(date)) {
    return howLongHaveRating(date)
  }

  const timeOfRate = formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  })

  return timeOfRate
    .substring(0, 1)
    .toUpperCase()
    .concat(timeOfRate.substring(1))
}

export function isCreatedToday(date: string) {
  return differenceInHours(new Date(), new Date(date)) < 24
}
