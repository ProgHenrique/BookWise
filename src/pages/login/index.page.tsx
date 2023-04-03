import { useRouter } from 'next/router'
import bookwiselogo from '@/assets/bookwiselogo.png'
import googleIcon from '@/assets/googleIcon.svg'
import githubIcon from '@/assets/githubIcon.svg'
import rocketLaunchIcon from '@/assets/rocketLaunchIcon.svg'
import { Button, Container, Hero, LoginOptions, Preview } from './styles'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function Login() {
  const router = useRouter()

  async function handleConnectGoogle() {
    await signIn('google')
  }

  async function handleConnectGithub() {
    await signIn('github')
  }

  async function handleVisitAsGuest() {
    await router.push('/')
  }

  return (
    <Container>
      <Preview>
        <Image src={bookwiselogo} alt="" quality={100} priority fill />
      </Preview>
      <Hero>
        <strong>Boas vindas!</strong>
        <p>Faça seu login ou acesse como visitante.</p>

        <LoginOptions>
          <Button onClick={handleConnectGoogle}>
            <Image src={googleIcon} alt="" width={32} height={32} />
            Entrar com Google
          </Button>
          <Button onClick={handleConnectGithub}>
            <Image src={githubIcon} alt="" width={32} height={32} />
            Entrar com GitHub
          </Button>
          <Button onClick={handleVisitAsGuest}>
            <Image src={rocketLaunchIcon} alt="" width={32} height={32} />
            Acessar como visitante
          </Button>
        </LoginOptions>
      </Hero>
    </Container>
  )
}
