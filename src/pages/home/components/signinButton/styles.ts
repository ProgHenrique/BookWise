import { styled } from '@/styles/stitches.config'
import { keyframes } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'absolute',
  inset: 0,
  zIndex: 3,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$gray700',
  borderRadius: 12,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '3.5rem 4.5rem',
  '&:focus': { outline: 'none' },
  zIndex: 4,
})

export const DialogTitle = styled(Dialog.Title, {
  textAlign: 'center',
  color: '$gray200',
  fontWeight: '$bold',
  lineHeight: '$short',
  fontSize: '$md',
})

export const CloseButton = styled('button', {
  all: 'unset',
  height: '1.5rem',
  width: '1.5rem',
  lineHeight: '0',
  color: '$gray400',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 16,
  right: 16,
  cursor: 'pointer',
})

export const LoginOptions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '23.25rem',
  gap: '$4',
  marginTop: '$10',
})

export const Button = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '$5',
  padding: '$5 $6',
  width: 'calc(100% - 3rem)',

  fontSize: '$lg',
  fontWeight: '$bold',
  color: '$gray200',

  backgroundColor: '$gray600',
  borderRadius: 8,

  cursor: 'pointer',
})
