/* eslint-disable react-hooks/exhaustive-deps */
import {
  howLongHaveRating,
  isCreatedToday,
  suffixHowLong,
} from '@/utils/distance-to-now'
import { fallback } from '@/utils/fallback'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { CaretRight, ChartLineUp } from 'phosphor-react'
import RatingStars from '../rating-stars'
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  BookCard,
  Books,
  BookTitleAndRate,
  Container,
  Content,
  PopularBooks,
  Rating,
  RatingBook,
  RatingBooks,
  RatingBooksContainer,
  RatingInfoBook,
  RatingUser,
  Title,
  UserName,
  UserRateInfo,
  UserRates,
  WithoutTRates,
} from './styles'
import { IBook, IUser } from '../..'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

export interface IRatings {
  book_id: string
  created_at: string
  description: string
  id: string
  rate: number
  user_id: string
  book: IBook
  user: IUser
}

interface HomeBodyProps {
  handleShowProfile: (userId: string) => Promise<void>
}

export default function HomeBody({ handleShowProfile }: HomeBodyProps) {
  const { data: session, status } = useSession()
  const [ratings, setRatings] = useState<IRatings[]>([])
  const [userRatings, setUserRating] = useState<IRatings[]>([])
  const [mostPopularBooks, setMostPopularBooks] = useState<IRatings[]>([])

  useEffect(() => {
    setUserRating((state) => {
      return ratings.filter((rating) => rating.user_id === session?.user.id)
    })
  }, [ratings, session?.user.id])

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get('/rating')
      const dataPopular = await api.get('/rating/most-popular')
      setRatings(data.data)
      setMostPopularBooks(dataPopular.data)
    }

    fetchData()
  }, [])
  return (
    <Container>
      <Title>
        <ChartLineUp size={32} />
        <strong>Início</strong>
      </Title>

      <Content>
        <RatingBooksContainer>
          {status === 'authenticated' && (
            <RatingBooks>
              <div>
                <p>Sua última leitura </p>
                <button onClick={() => handleShowProfile(session.user.id)}>
                  Ver todas <CaretRight size={16} />
                </button>
              </div>

              {userRatings.length < 1 && (
                <WithoutTRates>
                  Você ainda não possui avaliações registradas!
                </WithoutTRates>
              )}
              {userRatings.slice(0, 1).map((rating) => {
                const fillArray = new Array(rating.rate).fill('fill')
                const regularArray = new Array(5 - rating.rate).fill('regular')
                const starsRate = [...fillArray, ...regularArray]
                return (
                  <UserRates key={`${rating.id}${rating.user_id}`}>
                    <Image
                      src={rating.book.cover_url}
                      alt=""
                      height={152}
                      width={108}
                      quality={100}
                      priority
                    />
                    <div>
                      <UserRateInfo>
                        <div>
                          <span>{suffixHowLong(rating.created_at)}</span>
                          <RatingStars starsRate={starsRate} />
                        </div>

                        <div>
                          <strong>{rating.book.name}</strong>
                          <span>{rating.book.author}</span>
                        </div>

                        <p>{rating.description}</p>
                      </UserRateInfo>
                    </div>
                  </UserRates>
                )
              })}
            </RatingBooks>
          )}

          <RatingBooks>
            <p>Avaliações mais recentes</p>

            {ratings
              .filter((item) => isCreatedToday(item.created_at))
              .map((rating) => {
                const fillArray = new Array(rating.rate).fill('fill')
                const regularArray = new Array(5 - rating.rate).fill('regular')
                const starsRate = [...fillArray, ...regularArray]
                return (
                  <Rating key={rating.id}>
                    <RatingUser>
                      <AvatarRoot>
                        <AvatarImage
                          src={rating.user.avatar_url}
                          alt={rating.user.name}
                        />
                        <AvatarFallback delayMs={600}>
                          {fallback(rating.user.name)}
                        </AvatarFallback>
                      </AvatarRoot>

                      <UserName>
                        <p
                          style={{ cursor: 'pointer', display: 'inline' }}
                          onClick={() => handleShowProfile(rating.user_id)}
                        >
                          {rating.user.name}
                        </p>
                        <span style={{ display: 'block' }}>
                          {howLongHaveRating(rating.created_at)}
                        </span>
                      </UserName>

                      <RatingStars starsRate={starsRate} />
                    </RatingUser>

                    <RatingBook>
                      <Image
                        src={rating.book.cover_url}
                        alt=""
                        height={152}
                        width={108}
                        quality={100}
                        priority
                      />
                      <RatingInfoBook>
                        <div>
                          <strong>{rating.book.name}</strong>
                          <p>{rating.book.author}</p>
                        </div>
                        <p>{rating.description}</p>
                      </RatingInfoBook>
                    </RatingBook>
                  </Rating>
                )
              })}
          </RatingBooks>
        </RatingBooksContainer>
        <PopularBooks>
          <p>Livros populares</p>
          <Books>
            {mostPopularBooks.slice(0, 4).map((rating, index) => {
              const book = rating.book
              const bookRate = ratings.filter(
                (rate) => rate.book_id === rating.book_id,
              )

              const sumOfRates = bookRate.reduce(
                (acc, operator) => operator.rate + acc,
                0,
              )

              const finalRate = Math.round(sumOfRates / bookRate.length)

              const fillArray = new Array(finalRate).fill('fill')
              const regularArray = new Array(5 - finalRate).fill('regular')
              const starsRate = [...fillArray, ...regularArray]
              return (
                <BookCard key={`${book.id}${index}`}>
                  <Image
                    src={book.cover_url}
                    alt=""
                    height={94}
                    width={64}
                    quality={100}
                    priority
                  />
                  <BookTitleAndRate>
                    <div>
                      <strong>{book.name}</strong>
                      <p>{book.author}</p>
                    </div>
                    <RatingStars starsRate={starsRate} />
                  </BookTitleAndRate>
                </BookCard>
              )
            })}
          </Books>
        </PopularBooks>
      </Content>
    </Container>
  )
}
