export function fallback(name: string) {
  const [firstName, secondaryName] = name.split(' ')
  return `${firstName.substring(0, 1)}${secondaryName.substring(
    0,
    1,
  )}`.toUpperCase()
}
