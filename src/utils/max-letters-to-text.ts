interface Request {
  max?: number
  text: string
}
export function maxLettersToText({ max = 27, text }: Request) {
  if (text.length > 27) {
    const textArray = text.split('')
    textArray.splice(27, text.length)

    return textArray.join('').concat('...')
  }

  return text
}
