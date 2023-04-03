import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { X } from 'phosphor-react'
import googleIcon from '@/assets/googleIcon.svg'
import githubIcon from '@/assets/githubIcon.svg'
import {
  Button,
  CloseButton,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  LoginOptions,
} from './styles'
import { signIn } from 'next-auth/react'

export default function SignInButton() {
  async function handleConnectGoogle() {
    await signIn('google')
  }

  async function handleConnectGithub() {
    await signIn('github')
  }
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Faça login para deixar sua avaliação</DialogTitle>
        <Dialog.Close asChild>
          <CloseButton aria-label="Close">
            <X size={24} />
          </CloseButton>
        </Dialog.Close>
        <LoginOptions>
          <Button onClick={handleConnectGoogle}>
            <Image src={googleIcon} alt="" width={32} height={32} />
            Entrar com Google
          </Button>
          <Button onClick={handleConnectGithub}>
            <Image src={githubIcon} alt="" width={32} height={32} />
            Entrar com GitHub
          </Button>
        </LoginOptions>
      </DialogContent>
    </Dialog.Portal>
  )
}
