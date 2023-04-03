import { styled } from '@/styles/stitches.config'
import * as Avatar from '@radix-ui/react-avatar'

export const Container = styled('div', {
  display: 'flex',
  gap: '$3',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#F75A68',

  p: {
    fontSize: '$sm',
    lineHeight: '$base',
    color: '$gray200',
  },

  button: {
    all: 'unset',
    lineHeight: 0,
    cursor: 'pointer',
  },
})

export const AvatarRoot = styled(Avatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  padding: 1,
  width: 32,
  height: 32,
  borderRadius: '$full',
  background: '$gradient-vertical',
})

export const AvatarImage = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

export const AvatarFallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray700',
  color: '$gray100',
  fontWeight: '$medium',
  borderRadius: 'inherit',
})
