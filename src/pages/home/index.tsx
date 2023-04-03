import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import HomeBody from './components/home-body'
import bookHeartOutline from '@/assets/book-heart-outline.svg'
import {
  Container,
  TitleSidebar,
  SidebarOptions,
  PseudoElementSelectedSidebarItem,
  SidebarItemHome,
  SidebarItemExplorer,
  SidebarItemProfile,
  UserStatus,
  Sidebar,
} from './styles'
import { Binoculars, ChartLineUp, User } from 'phosphor-react'
import Logout from './components/logout'
import Signin from './components/signin'
import { api } from '@/lib/axios'
import Explorer from './components/explorer'
import Profile from './components/profile'

export interface IBook {
  id: string
  created_at: string
  author: string
  cover_url: string
  name: string
  summary: string
  total_pages: number
}

export interface IUser {
  id: string
  created_at: string
  avatar_url: string
  name: string
  email: string
}

export default function Home() {
  const { data: session, status } = useSession()

  const [user, setUser] = useState<IUser>()

  const [isActive, setIsActive] = useState<'home' | 'explorer' | 'profile'>(
    'home',
  )

  async function handleShowProfile(userId: string) {
    const response = await api.get(`/user/find-by-id?userId=${userId}`)
    setUser(response.data)
    setIsActive('profile')
  }

  useEffect(() => {
    if (status !== 'authenticated') {
      setIsActive('home')
    }
  }, [status])

  return (
    <Container>
      <Sidebar>
        <TitleSidebar>
          <Image src={bookHeartOutline} alt="" height={24} width={24} />
          <strong>BookWise</strong>
        </TitleSidebar>

        <SidebarOptions>
          <PseudoElementSelectedSidebarItem
            active={isActive}
          ></PseudoElementSelectedSidebarItem>
          <SidebarItemHome
            active={isActive}
            onClick={() => {
              setIsActive('home')
            }}
          >
            <ChartLineUp size={24} />
            Início
          </SidebarItemHome>
          <SidebarItemExplorer
            active={isActive}
            onClick={() => {
              setIsActive('explorer')
            }}
          >
            <Binoculars size={24} />
            Explorar
          </SidebarItemExplorer>

          {status === 'authenticated' && (
            <SidebarItemProfile
              active={isActive}
              onClick={() => handleShowProfile(session?.user.id)}
            >
              <User size={24} />
              Perfil
            </SidebarItemProfile>
          )}
        </SidebarOptions>

        <UserStatus>
          {status === 'authenticated' ? <Logout /> : <Signin />}
        </UserStatus>
      </Sidebar>

      {isActive === 'home' && (
        <HomeBody handleShowProfile={handleShowProfile} />
      )}
      {isActive === 'explorer' && (
        <Explorer handleShowProfile={handleShowProfile} />
      )}
      {isActive === 'profile' && <Profile user={user!} />}
    </Container>
  )
}
