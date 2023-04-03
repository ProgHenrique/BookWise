import { firstLetterUppercase } from '@/utils/first-letter-upper-case'
import { signOut, useSession } from 'next-auth/react'
import { SignOut } from 'phosphor-react'
import { AvatarFallback, AvatarImage, AvatarRoot, Container } from './styles'
export default function Logout() {
  const { data: session } = useSession()
  const userData = session?.user
  const [firstName, secondaryName] = String(userData?.name).split(' ')
  const fallback = `${firstName.substring(0, 1)}${secondaryName.substring(
    0,
    1,
  )}`.toUpperCase()

  async function handleSignOut() {
    await signOut({ redirect: false })
  }
  return (
    <Container>
      <AvatarRoot>
        <AvatarImage src={userData?.avatar_url} alt={userData?.name} />
        <AvatarFallback delayMs={600}>{fallback}</AvatarFallback>
      </AvatarRoot>

      <p>{firstLetterUppercase(firstName)}</p>
      <button onClick={handleSignOut}>
        <SignOut size={20} />
      </button>
    </Container>
  )
}
