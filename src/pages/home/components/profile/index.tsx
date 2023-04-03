import { api } from '@/lib/axios'
import Image from 'next/image'
import {
  BookOpen,
  BookmarkSimple,
  Books,
  MagnifyingGlass,
  User,
  UserList,
} from 'phosphor-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { suffixHowLong } from '@/utils/distance-to-now'
import { IBook, IUser } from '../explorer'
import {
  Analytics,
  AnalyticsUser,
  AnalyticsUserItem,
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  BookContainer,
  BookInfos,
  Container,
  Content,
  CreatedAt,
  Label,
  RatingsContainer,
  Rectangle,
  Title,
  UserContainer,
} from './styles'
import RatingStars from '../rating-stars'
import { fallback } from '@/utils/fallback'
import { format } from 'date-fns'

interface IRatings {
  book_id: string
  created_at: string
  description: string
  id: string
  rate: number
  user_id: string
  book: IBook
}

interface IUserAnalytics {
  pages_read: number
  books_read: number
  authors_read: number
}

interface ICategory {
  name: string
  id: string
}

interface ProfileProps {
  user: IUser
}

export default function Profile({ user }: ProfileProps) {
  const [inputValue, setInputValue] = useState('')
  const [userRatings, setUserRatings] = useState<IRatings[]>([])
  const [userRatingsBackup, setUserRatingsBackup] = useState<IRatings[]>([])
  const [userRatingsHeader, setUserRatingsHeader] = useState<IRatings[]>([])
  const [userAnalytics, setUserAnalytics] = useState<IUserAnalytics>()
  const [category, setCategory] = useState<ICategory>()

  async function handleSearchRating(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)

    const { data: books } = await api.get(
      `/book/search-like?like=${event.target.value}`,
    )

    if (event.target.value.length < 1) {
      setUserRatingsHeader([])
      ratingDivisor(userRatingsBackup)
      return null
    }

    if (books.length < 1) {
      setUserRatingsHeader([])
      return null
    }
    const filterRatings: IRatings[] = []

    userRatings.map((rating) => {
      const book = books.find((book) => book.id === rating.book_id)

      if (book) {
        filterRatings.push(rating)
      }

      return null
    })

    setUserRatingsHeader([])
    ratingDivisor(filterRatings)
  }

  function getUserAnalytics(ratings: IRatings[]) {
    const pagesRead = ratings.reduce(
      (acc, operator) => operator.book.total_pages + acc,
      0,
    )
    const booksRead = ratings.length

    const authorsArray = ratings.map((rating) => rating.book.author)
    const authors = authorsArray.filter(
      (author, index) => authorsArray.indexOf(author) === index,
    )

    const categories: string[] = []
    ratings.map((rating) => {
      if (rating.book.categories) {
        const categoriesId = rating.book.categories.map(
          (category) => category.categoryId,
        )
        categoriesId.map((item) => categories.push(item))
      }

      return null
    })
    const mostCategory: Record<string, number> = {}

    categories.forEach((categoryId) => {
      mostCategory[categoryId] = (mostCategory[categoryId] || 0) + 1
    })
    const maxVal = Math.max(...Object.values(mostCategory))
    const categoryId = Object.keys(mostCategory).find(
      (key) => mostCategory[key] === maxVal,
    )

    setUserAnalytics({
      pages_read: pagesRead,
      books_read: booksRead,
      authors_read: authors.length,
    })

    return categoryId
  }

  function ratingDivisor(ratings: IRatings[]) {
    ratings.map((rating) => {
      const ratingsByDate = ratings.filter(
        (item) =>
          suffixHowLong(item.created_at) === suffixHowLong(rating.created_at),
      )
      setUserRatingsHeader((state) => {
        const alreadyInState = state.find(
          (item) => item.id === ratingsByDate[0].id,
        )
        if (alreadyInState) {
          return state
        }

        return [...state, ratingsByDate[0]]
      })

      return null
    })

    setUserRatings(ratings)
  }

  useEffect(() => {
    const dataFetch = async () => {
      const ratingsResponse = await api.get(
        `/rating/user-ratings?userId=${user?.id}`,
      )
      const categoryId = getUserAnalytics(ratingsResponse.data)
      const response = await api.get(
        `/category/find-by-id?categoryId=${categoryId}`,
      )

      setCategory(response.data)
      setUserRatingsBackup(ratingsResponse.data)
      ratingDivisor(ratingsResponse.data)
    }

    dataFetch()
  }, [user?.id])
  return (
    <Container>
      <Title>
        <User size={32} />
        <strong>Perfil</strong>
      </Title>

      <Content>
        <div style={{ width: 624 }}>
          <Label>
            <input
              value={inputValue}
              type="text"
              placeholder="Buscar livro avaliado"
              onChange={(e) => handleSearchRating(e)}
            />
            <MagnifyingGlass size={20} />
          </Label>

          <RatingsContainer>
            {userRatingsHeader.length < 1 && (
              <p style={{ color: '#8D95AF', fontSize: '0.875rem' }}>
                Nenhuma avaliação econtrada
              </p>
            )}
            {userRatingsHeader.map((rating, index) => {
              const ratingsByDate = userRatings.filter(
                (item) =>
                  suffixHowLong(rating.created_at) ===
                  suffixHowLong(item.created_at),
              )
              return (
                <div
                  key={`${rating.id}Header`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <CreatedAt>{suffixHowLong(rating.created_at)}</CreatedAt>
                  {ratingsByDate.map((item) => {
                    const fillArray = new Array(item.rate).fill('fill')
                    const regularArray = new Array(5 - item.rate).fill(
                      'regular',
                    )
                    const starsRate = [...fillArray, ...regularArray]
                    return (
                      <BookContainer key={Math.random()}>
                        <div
                          style={{
                            display: 'flex',
                            gap: '1.5rem',
                            width: '100%',
                          }}
                        >
                          <Image
                            src={item.book.cover_url}
                            alt=""
                            height={134}
                            width={98}
                            quality={100}
                            priority
                          />

                          <BookInfos>
                            <div>
                              <strong>{item.book.name}</strong>
                              <span>{item.book.author}</span>
                            </div>

                            <RatingStars starsRate={starsRate} />
                          </BookInfos>
                        </div>

                        <p>{item.description}</p>
                      </BookContainer>
                    )
                  })}
                </div>
              )
            })}
          </RatingsContainer>
        </div>
        {user && (
          <Analytics>
            <UserContainer>
              <AvatarRoot>
                <AvatarImage src={user?.avatar_url} alt={user?.name} />
                <AvatarFallback delayMs={600}>
                  {fallback(String(user?.name))}
                </AvatarFallback>
              </AvatarRoot>

              <div>
                <strong>{user.name}</strong>
                <p>
                  membro desde {format(new Date(user?.created_at!), 'yyyy')}
                </p>
              </div>
            </UserContainer>

            <Rectangle></Rectangle>
            <AnalyticsUser>
              <AnalyticsUserItem>
                <BookOpen size={32} />
                <div>
                  <strong>{userAnalytics?.pages_read}</strong>
                  <p>Páginas lidas</p>
                </div>
              </AnalyticsUserItem>
              <AnalyticsUserItem>
                <Books size={32} />
                <div>
                  <strong>{userAnalytics?.books_read}</strong>
                  <p>Livros avaliados</p>
                </div>
              </AnalyticsUserItem>
              <AnalyticsUserItem>
                <UserList size={32} />
                <div>
                  <strong>{userAnalytics?.authors_read}</strong>
                  <p>Autores lidos</p>
                </div>
              </AnalyticsUserItem>
              <AnalyticsUserItem>
                <BookmarkSimple size={32} />
                <div>
                  <strong>{category?.name}</strong>
                  <p>Categoria mais lida</p>
                </div>
              </AnalyticsUserItem>
            </AnalyticsUser>
          </Analytics>
        )}
      </Content>
    </Container>
  )
}
