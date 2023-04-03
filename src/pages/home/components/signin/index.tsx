import * as Dialog from '@radix-ui/react-dialog'
import { SignIn } from 'phosphor-react'
import SignInButton from '../signinButton'
import { Login } from './styles'

export default function Signin() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Login>
          <strong>Fazer login</strong>
          <SignIn size={20} />
        </Login>
      </Dialog.Trigger>
      <SignInButton />
    </Dialog.Root>
  )
}
