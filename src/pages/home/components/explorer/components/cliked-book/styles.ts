import { styled } from '@/styles/stitches.config'
import { keyframes } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Avatar from '@radix-ui/react-avatar'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$gray800',
  width: 660,
  height: '100vh',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
  overflowY: 'scroll',
  padding: '3rem 4rem',
  '&:focus': { outline: 'none' },
  '&::-webkit-scrollbar': {
    width: 6,
  },

  '&::-webkit-scrollbar-track': {
    background: '$gray700',
    borderRadius: '$full',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray600',
    borderRadius: '$full',
  },
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

export const BookContainer = styled('div', {
  padding: '$6 $8 $4 $8',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  borderRadius: 10,
  backgroundColor: '$gray700',
  marginBottom: '$10',
})

export const BookInfos = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  'div:first-child': {
    strong: {
      display: 'block',
      fontSize: '$md',
      lineHeight: '$short',
      marginBottom: '$2',
    },

    span: {
      lineHeight: '$base',
      color: '$gray300',
    },
  },

  'div:last-child': {
    p: {
      fontSize: '$sm',
      lineHeight: '$base',
      color: '$gray400',
    },
  },
})

export const PageCategory = styled('div', {
  display: 'flex',
  gap: '$4',
  color: '$green100',
  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    p: {
      fontSize: '$sm',
      lineHeight: '$base',
      color: '$gray300',
    },

    strong: {
      lineHeight: '$short',
      color: '$gray200',
    },
  },
})

export const RatingsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const RatingButton = styled('button', {
  all: 'unset',
  padding: '$2 $1',
  borderRadius: 4,
  fontWeight: '$bold',
  lineHeight: '$base',
  color: '$purple100',
  cursor: 'pointer',
})

export const Rating = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
  padding: '$6',
  backgroundColor: '$gray700',
  borderRadius: 8,
  p: {
    fontSize: '$sm',
    color: '$gray300',
    lineHeight: '$base',
  },
})

export const Label = styled('label', {
  marginTop: '-$1',
  position: 'relative',
  border: '1px solid $gray500',
  borderRadius: 4,
  backgroundColor: '$gray800',
  padding: '0.875rem $5',
  height: 157,

  textarea: {
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '$sm',
    lineHeight: '$base',
    color: '$gray200',
    backgroundColor: '$gray800',
    resize: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    '&::placeholder': {
      color: '$gray400',
      fontSize: '$sm',
      lineHeight: '$base',
    },
  },

  span: {
    position: 'absolute',
    fontSize: '$xs',
    lineHeight: '$base',
    color: '$gray400',
    bottom: 4,
    right: 8,
  },
})

export const Button = styled('button', {
  all: 'unset',
  padding: '$2',
  width: 24,
  height: 24,
  backgroundColor: '$gray600',
  cursor: 'pointer',
  borderRadius: 4,
  '&:disabled': {
    opacity: '0.4',
    cursor: 'not-allowed',
  },
  variants: {
    discartRating: {
      true: {
        color: '$purple100',
        marginRight: '$2',
      },

      false: {
        color: '$green100',
      },
    },
  },
})

export const RatingUser = styled('div', {
  display: 'grid',
  width: '100%',
  gridTemplateColumns: '7.14% 70% 17.14%',
  columnGap: '$4',
  p: {
    display: 'flex',
  },
})

export const AvatarRoot = styled(Avatar.Root, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  userSelect: 'none',
  padding: 1,
  width: 40,
  height: 40,
  borderRadius: '$full',
  border: 'solid 1px transparent',
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

export const UserName = styled('div', {
  span: {
    fontSize: '$sm',
    color: '$gray400',
  },
})
