import { styled } from '@/styles/stitches.config'

export const Login = styled('button', {
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$3',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$green100',

  strong: {
    color: '$gray200',
    fontSize: '$md',
    textAlign: 'center',
    lineHeight: '$base',
    whiteSpace: 'nowrap',
  },
})
