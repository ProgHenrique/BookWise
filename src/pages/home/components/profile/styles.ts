import { styled } from '@/styles/stitches.config'
import * as Avatar from '@radix-ui/react-avatar'

export const Container = styled('div', {
  marginTop: 'calc(4.5rem - 1.25rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const Title = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  color: '$green100',
  strong: {
    color: '$gray100',
    fontSize: '$2xl',
    lineHeight: '$short',
  },
})

export const Content = styled('div', {
  display: 'flex',
  gap: '4rem',
})

export const Label = styled('label', {
  width: '100%',
  height: '3rem',
  display: 'flex',
  gap: '$2',
  padding: 'calc($3 + 2px) $5',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid $gray500',
  borderRadius: '$sm',
  color: '$gray500',
  marginBottom: '2rem',

  input: {
    all: 'unset',
    width: '100%',
    fontSize: '$sm',
    lineHeight: '$base',
    color: '$gray100',
    cursor: 'auto',

    '&::placeholder': {
      fontSize: '$sm',
      lineHeight: '$base',
      color: '$gray400',
    },
  },
})

export const RatingsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

export const CreatedAt = styled('p', {
  fontSize: '$sm',
  lineHeight: '$base',
  color: '$gray300',
})

export const BookContainer = styled('div', {
  padding: '$6',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  borderRadius: 8,
  backgroundColor: '$gray700',

  '> p': {
    fontSize: '$sm',
    lineHeight: '$base',
    color: '$gray300',
  },
})

export const BookInfos = styled('div', {
  width: 454,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '> div': {
    strong: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: 'block',
      fontSize: '$md',
      lineHeight: '$short',
    },

    span: {
      lineHeight: '$base',
      fontSize: '$sm',
      color: '$gray400',
    },
  },
})

export const Analytics = styled('div', {
  width: 308,
  height: 555,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$8',
  borderLeft: '1px solid $gray700',
})

export const UserContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$5',

  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    strong: {
      color: '$gray100',
      fontSize: '$xl',
      textAlign: 'center',
      lineHeight: '$short',
    },
    p: {
      color: '$gray400',
      fontSize: '$sm',
      textAlign: 'center',
      lineHeight: '$base',
    },
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
  width: 72,
  height: 72,
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

export const Rectangle = styled('div', {
  width: 32,
  height: 4,
  display: 'block',
  borderRadius: '999px',
  background: '$gradient-horizontal',
})

export const AnalyticsUser = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  padding: '$5 3.5rem',
})

export const AnalyticsUserItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$5',
  color: '$green100',
  div: {
    height: '2.75rem',
    strong: {
      color: '$gray200',
      lineHeight: '$short',
      fontSize: '$md',
    },

    p: {
      color: '$gray300',
      lineHeight: '$short',
      fontSize: '$sm',
    },
  },
})
