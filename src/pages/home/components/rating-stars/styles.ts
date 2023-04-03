import { styled } from '@/styles/stitches.config'

export const Stars = styled('div', {
  display: 'flex',
  gap: '$1',
  color: '$purple100',
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
      },
    },
  },
})
