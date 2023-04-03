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

export const RatingBooksContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const RatingBooks = styled('div', {
  display: 'flex',
  width: 608,
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$3',

  '> p': {
    fontSize: '$sm',
    marginBottom: '$1',
  },

  '> div:first-child': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '$bold',
    p: {
      fontSize: '$sm',
      color: '$gray100',
      lineHeight: '$base',
    },

    button: {
      all: 'unset',
      fontWeight: '$bold',
      display: 'flex',
      alignItems: 'center',
      gap: '$2',
      fontSize: '$sm',
      color: '$purple100',
      lineHeight: '$base',
      cursor: 'pointer',
    },
  },
})

export const WithoutTRates = styled('p', {
  textAlign: 'center',
  color: '$gray400',
})

export const UserRates = styled('div', {
  display: 'flex',
  padding: '$5 $6',
  gap: '$6',
  backgroundColor: '$gray600',
  borderRadius: 8,

  '> div': {
    width: '100%',
    maxHeight: 152,
    overflow: 'hidden',
  },
})

export const UserRateInfo = styled('div', {
  maxHeight: 152,
  'div:nth-child(1)': {
    marginBottom: '$3',
    display: 'flex',
    justifyContent: 'space-between',
    span: {
      fontSize: '$sm',
      color: '$gray300',
    },
  },

  '> div:nth-child(2)': {
    marginBottom: '$6',
    strong: {
      display: 'block',
      lineHeight: '$short',
    },
    span: {
      fontSize: '$sm',
      color: '$gray400',
    },
  },

  p: {
    fontSize: '$sm',
    color: '$gray300',
    overflow: 'hidden',
    lineHeight: '$base',
  },
})

export const Rating = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
  padding: '$6',
  backgroundColor: '$gray700',
  borderRadius: 8,
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

export const RatingBook = styled('div', {
  display: 'flex',
  gap: '$5',
})

export const RatingInfoBook = styled('div', {
  display: 'flex',
  maxHeight: 152,
  flexDirection: 'column',
  gap: '$5',

  div: {
    strong: {
      display: 'block',
      lineHeight: '140%',
      fontSize: '1rem',
    },

    p: {
      fontSize: '$sm',
      color: '$gray300',
      overflow: 'hidden',
      lineHeight: '$base',
    },
  },

  '> p': {
    marginTop: -2,
    lineHeight: '$base',
    fontSize: '$sm',
    color: '$gray300',
    overflow: 'hidden',
    maxHeight: 88,
  },
})

export const PopularBooks = styled('div', {
  display: 'flex',
  width: 324,
  flexDirection: 'column',
  gap: '$4',

  '> p': {
    fontSize: '$sm',
  },
})

export const Books = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '$3',
})

export const BookCard = styled('div', {
  display: 'flex',
  gap: '$5',
  padding: '1.125rem $5',
  backgroundColor: '$gray700',
  borderRadius: 8,
})

export const BookTitleAndRate = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  div: {
    strong: {
      maxHeight: 44,
      overflow: 'hidden',
      display: 'block',
      lineHeight: '140%',
      fontSize: '1rem',
    },

    p: {
      fontSize: '$sm',
      color: '$gray400',
    },
  },
})
