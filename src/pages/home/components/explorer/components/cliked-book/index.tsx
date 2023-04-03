import { api } from '@/lib/axios'
import { howLongHaveRating } from '@/utils/distance-to-now'
import { fallback } from '@/utils/fallback'
import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { BookmarkSimple, BookOpen, Check, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { IBook, IUser } from '../..'
import RatingStars from '../../../rating-stars'
import SignInButton from '../../../signinButton'
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  BookContainer,
  BookInfos,
  Button,
  CloseButton,
  DialogContent,
  DialogOverlay,
  Label,
  PageCategory,
  Rating,
  RatingButton,
  RatingsContainer,
  RatingUser,
  UserName,
} from './styles'

interface ClickedBookProps {
  bookId: string
  users: IUser[]
  categoriesOnBooks: string
  handleShowProfile: (userId: string) => Promise<void>
}
export default function ClickedBook({
  bookId,
  users,
  categoriesOnBooks,
  handleShowProfile,
}: ClickedBookProps) {
  const { data: session, status } = useSession()
  const [textArea, setTextArea] = useState('')
  const [book, setBook] = useState<IBook>()
  const [newRating, setNewRating] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [rate, setRate] = useState(0)
  const [starRates, setStarRates] = useState<any[]>()

  function handleDiscartRating() {
    setTextArea('')
    setNewRating(false)
  }

  function handleOpenNewRating() {
    if (status === 'unauthenticated') {
      setSignIn(true)
      return null
    }
    setNewRating(true)
  }

  async function handleCreateRating() {
    if (rate < 1 || textArea.length < 1) {
      return null
    }
    await api.post('/rating/create', {
      book_id: book?.id,
      user_id: session?.user.id,
      description: textArea.trim(),
      rate,
    })

    const response = await api.get(`/book/get-a-book?bookId=${bookId}`)

    setBook(response.data)

    setTextArea('')
    setNewRating(false)
    setRate(0)
  }

  function setNewRate(rate: number) {
    setRate(rate)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/book/get-a-book?bookId=${bookId}`)

      setBook(response.data)
    }
    fetchData()
  }, [book, bookId])

  useEffect(() => {
    if (book) {
      const sumOfRates = book.ratings
        ? book.ratings.reduce((acc, operator) => operator.rate + acc, 0)
        : 0

      const finalRate = book.ratings
        ? Math.round(sumOfRates / book.ratings.length)
        : 0
      const rateToFill = finalRate > 1 ? finalRate : 1
      const fillArray = new Array(rateToFill).fill('fill')
      const rateToRegular = finalRate > 1 ? 5 - finalRate : 5
      const regularArray = new Array(rateToRegular).fill('regular')
      const starsRate =
        finalRate > 1 ? [...fillArray, ...regularArray] : regularArray

      setStarRates(starsRate)
    }
  }, [book])
  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <Dialog.Close asChild>
          <CloseButton aria-label="Close">
            <X size={24} />
          </CloseButton>
        </Dialog.Close>

        <BookContainer>
          <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
            <Image
              src={book?.cover_url || ''}
              alt=""
              height={242}
              width={171.65}
              quality={100}
              priority
            />

            <BookInfos>
              <div style={{ width: '100%' }}>
                <strong>{book?.name}</strong>
                <span>{book?.author}</span>
              </div>
              <div>
                <RatingStars starsRate={starRates} />
                <p>
                  {book?.ratings.length === 1
                    ? '1 avaliação'
                    : `${book?.ratings.length} avaliações`}{' '}
                </p>
              </div>
            </BookInfos>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '3.5rem',
              width: '100%',
              padding: '1.5rem 0',
              borderTop: '1px solid #252D4A',
            }}
          >
            <PageCategory>
              <span>
                <BookmarkSimple size={24} />
              </span>

              <div>
                <p>Categoria</p>
                <strong>{categoriesOnBooks}</strong>
              </div>
            </PageCategory>
            <PageCategory>
              <span>
                <BookOpen size={24} />
              </span>

              <div>
                <p>Páginas</p>
                <strong>{book?.total_pages}</strong>
              </div>
            </PageCategory>
          </div>
        </BookContainer>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                color: '#E6E8F2',
                fontSize: '0.875rem',
                lineHeight: '160%',
              }}
            >
              Avaliações
            </p>
            {!newRating ? (
              book?.ratings.find(
                (item) => item.user_id === session?.user.id,
              ) ? null : (
                <RatingButton onClick={handleOpenNewRating}>
                  Avaliar
                </RatingButton>
              )
            ) : null}
          </div>
          <RatingsContainer>
            {newRating && (
              <Rating>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      width: '100%',
                    }}
                  >
                    <AvatarRoot>
                      <AvatarImage
                        src={session?.user.avatar_url}
                        alt={session?.user.name}
                      />
                      <AvatarFallback delayMs={600}>
                        {fallback(String(session?.user.name))}
                      </AvatarFallback>
                    </AvatarRoot>
                    <strong style={{ lineHeight: '140%' }}>
                      {session?.user.name}
                    </strong>
                  </div>
                  <RatingStars createNewRating={setNewRate} starSize={28} />
                </div>
                <Label>
                  <textarea
                    value={textArea}
                    maxLength={450}
                    placeholder="Escreva sua avaliação"
                    onChange={(e) => {
                      setTextArea(e.target.value.substring(0, 450))
                    }}
                  />

                  <span>{textArea.length}/450</span>
                </Label>

                <div
                  style={{
                    marginTop: '-0.5rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button discartRating={true} onClick={handleDiscartRating}>
                    <X size={24} />
                  </Button>
                  <Button
                    discartRating={false}
                    onClick={handleCreateRating}
                    disabled={rate < 1 || textArea.length < 1}
                  >
                    <Check size={24} />
                  </Button>
                </div>
              </Rating>
            )}

            {book?.ratings.map((rating) => {
              const user = users.find((item) => item.id === rating.user_id)
              const fillArray = new Array(rating.rate).fill('fill')
              const regularArray = new Array(5 - rating.rate).fill('regular')
              const starsRate = [...fillArray, ...regularArray]

              return (
                <Rating key={rating.id}>
                  <RatingUser>
                    <AvatarRoot>
                      <AvatarImage src={user?.avatar_url} alt={user?.name} />
                      <AvatarFallback delayMs={600}>
                        {fallback(String(user?.name))}
                      </AvatarFallback>
                    </AvatarRoot>

                    <UserName>
                      <p
                        style={{ cursor: 'pointer', display: 'inline' }}
                        onClick={() => handleShowProfile(rating.user_id)}
                      >
                        {user?.name}
                      </p>
                      <span style={{ display: 'block' }}>
                        {howLongHaveRating(rating.created_at)}
                      </span>
                    </UserName>

                    <RatingStars starsRate={starsRate} />
                  </RatingUser>

                  <p>{rating.description}</p>
                </Rating>
              )
            })}
          </RatingsContainer>
        </div>
      </DialogContent>
      <Dialog.Root open={signIn} onOpenChange={() => setSignIn(!signIn)}>
        <SignInButton />
      </Dialog.Root>
    </Dialog.Portal>
  )
}
