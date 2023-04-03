import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  marginTop: 'calc(4.5rem - 1.25rem)',
  display: 'flex',
  width: '100%',
  maxWidth: 996,
  flexDirection: 'column',
  gap: '$10',
})

export const Heading = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
    color: '$green100',
    strong: {
      color: '$gray100',
      fontSize: '$2xl',
      lineHeight: '$short',
    },
  },
})

export const Label = styled('label', {
  width: '27rem',
  height: '3rem',
  display: 'flex',
  gap: '$2',
  padding: 'calc($3 + 2px) $5',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid $gray500',
  borderRadius: '$sm',
  color: '$gray500',

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

export const Categories = styled('ul', {
  width: '100%',
  display: 'flex',
  overflowX: 'hidden',
  alignItems: 'center',
})

export const Category = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$1 $4',
  color: '$purple100',
  lineHeight: '$base',
  outline: '1px solid $purple100',
  outlineOffset: -1,
  borderRadius: '$full',
  cursor: 'pointer',
  userSelect: 'none',

  button: {
    all: 'unset',
  },

  variants: {
    mouseOver: {
      true: {
        backgroundColor: '$purple200',
        color: '$gray100',
        outline: 'none',
        outlineOffset: 0,
      },
    },
    isCurrent: {
      true: {
        backgroundColor: '$purple200',
        color: '$gray100',
        outline: 'none',
        outlineOffset: 0,
      },
    },
  },

  transition: 'background ease 0.3s, color ease 0.3s',
})

export const Books = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '$5',
  rowGap: '$5',
})

export const BookCard = styled('div', {
  position: 'relative',
  display: 'flex',
  padding: '$4 $5',
  gap: '$5',
  backgroundColor: '$gray700',
  borderRadius: 8,
  cursor: 'pointer',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: 152,
  },
})

export const ReadBook = styled('strong', {
  position: 'absolute',
  fontSize: '$xs',
  lineHeight: '130%',
  color: '$green100',
  textAlign: 'center',
  padding: '$1 $3',
  backgroundColor: '$green300',
  borderRadius: '0 4px',
  top: 0,
  right: 0,
})

export const BookInfo = styled('div', {
  strong: {
    display: 'block',
    lineHeight: '$short',
  },

  span: {
    fontSize: '$sm',
    lineHeight: '$base',
    color: '$gray400',
  },
})
