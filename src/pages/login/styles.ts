import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  maxWidth: '1440px',
  margin: 'auto',
  height: '100vh',
  display: 'flex',
  padding: '1.25rem 0',
  gap: '14.125rem',
})

export const Preview = styled('div', {
  height: '100%',
  width: 530,
  position: 'relative',
})

export const Hero = styled('div', {
  width: 372,
  display: 'flex',
  flexDirection: 'column',
  marginTop: '8rem',

  strong: {
    fontSize: '$2xl',
    lineHeight: '$short',
  },

  p: {
    color: '$gray200',
  },
})

export const LoginOptions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  marginTop: '$10',
})

export const Button = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '$5',
  padding: '$5 $6',

  fontSize: '$lg',
  fontWeight: '$bold',
  color: '$gray200',

  backgroundColor: '$gray600',
  borderRadius: 8,

  cursor: 'pointer',
})
