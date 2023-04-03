import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  position: 'relative',
  maxWidth: '1440px',
  margin: 'auto',
  marginLeft: 23,
  display: 'flex',
  padding: '$5 $5',
  gap: '6rem',
})

export const Sidebar = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 12,
  height: 'calc(100vh - 40px)',
  width: 232,
  backgroundColor: '$gray800',
  backgroundImage: 'url(/background.png)',
  userSelect: 'none',
})

export const TitleSidebar = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '$2',
  marginTop: '$10',

  strong: {
    fontSize: '$xl',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundImage: '$gradient-horizontal',
  },
})

export const SidebarOptions = styled('ul', {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  marginTop: '4rem',
})

export const PseudoElementSelectedSidebarItem = styled('div', {
  position: 'absolute',
  width: 4,
  height: '1.5rem',
  borderRadius: '$full',
  backgroundImage: '$gradient-vertical',
  left: '-$4',

  variants: {
    active: {
      home: {
        transform: 'translateY(8px)',
      },
      explorer: {
        transform: 'translateY(66px)',
      },

      profile: {
        transform: 'translateY(124px)',
      },
    },
  },

  transition: 'transform .2s ease',
})

const SidebarItem = styled('li', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  padding: '$2 0',
  gap: '$3',

  cursor: 'pointer',
})

export const SidebarItemHome = styled(SidebarItem, {
  variants: {
    active: {
      home: {
        color: '$gray100',
      },
      explorer: {
        color: '$gray400',
      },
      profile: {
        color: '$gray400',
      },
    },
  },
})

export const SidebarItemExplorer = styled(SidebarItem, {
  variants: {
    active: {
      home: {
        color: '$gray400',
      },
      explorer: {
        color: '$gray100',
      },
      profile: {
        color: '$gray400',
      },
    },
  },
})

export const SidebarItemProfile = styled(SidebarItem, {
  variants: {
    active: {
      home: {
        color: '$gray400',
      },
      explorer: {
        color: '$gray400',
      },
      profile: {
        color: '$gray100',
      },
    },
  },
})

export const UserStatus = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '$6',
})
