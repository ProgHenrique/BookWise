import { api } from '@/lib/axios'
import * as Dialog from '@radix-ui/react-dialog'
import { maxLettersToText } from '@/utils/max-letters-to-text'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Binoculars, MagnifyingGlass } from 'phosphor-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/mousewheel'

import {
  BookCard,
  BookInfo,
  Books,
  Categories,
  Category,
  Container,
  Heading,
  Label,
  ReadBook,
} from './styles'
import ClickedBook from './components/cliked-book'
import RatingStars from '../rating-stars'
import { Mousewheel } from 'swiper'

interface ICategory {
  name: string
  id: string
}

export interface IBook {
  id: string
  created_at: string
  author: string
  cover_url: string
  name: string
  summary: string
  total_pages: number
  categories: {
    book_id: string
    categoryId: string
  }[]
  ratings: {
    book_id: string
    created_at: string
    description: string
    id: string
    rate: number
    user_id: string
  }[]
}

export interface IUser {
  id: string
  name: string
  email: string
  avatar_url: string
  created_at: string
}

interface ExplorerProps {
  handleShowProfile: (userId: string) => Promise<void>
}

export default function Explorer({ handleShowProfile }: ExplorerProps) {
  const { data: session, status } = useSession()
  const [inputValue, setInputValue] = useState('')
  const [isOver, setIsOver] = useState('')
  const [isCurrent, setCurrent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>()
  const [books, setBooks] = useState<IBook[]>([])
  const [booksBackup, setBooksBackup] = useState<IBook[]>([])
  const [bookId, setBookId] = useState('')
  const [categoriesOnBook, setCategoriesOnBook] = useState('')
  const [user, setUser] = useState<IUser[]>()

  function handleCategoryBooks(categoryId: string) {
    if (isCurrent === categoryId) {
      setBooks(booksBackup)
      setCurrent('')
      return null
    }
    setBooks(booksBackup)
    setCurrent(categoryId)
    setBooks((state) => {
      return state?.filter((book) => {
        return book.categories.find((item) => item.categoryId === categoryId)
      })
    })
  }

  async function handleShowBook(book: IBook) {
    setInputValue('')
    const response = await api.get('/user')
    setUser(response.data)
    const categoriesOnBook: string[] = []

    book.categories.map((item) => {
      const category = categories?.find(
        (category) => category.id === item.categoryId,
      )
      if (category) categoriesOnBook.push(category.name)
      return null
    })
    const categoryString: string[] = [categoriesOnBook.join(', ')]

    if (categoriesOnBook.length > 2) {
      categoryString.splice(2, categoryString.length)

      categoryString.splice(0, categoryString.length)
      categoryString.push(
        categoryString.join(', ').concat(`(${book.categories.length})`),
      )
    }

    setCategoriesOnBook(categoryString.join(''))
    setBookId(book.id)
    setIsOpen(true)
  }

  async function handleSearchBooks(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    if (isCurrent) {
      setCurrent('')
      setBooks(booksBackup)
    }
    setInputValue(event.target.value)
    const books = await api.get(`/book/search-like?like=${event.target.value}`)
    setBooks(books.data)
  }

  async function handleCloseDialogScreen() {
    const books = await api.get(`/book`)
    setBooks(books.data)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      const categories = await api.get('/category')
      const books = await api.get(`/book`)

      setCategories(categories.data)
      setBooks(books.data)
      setBooksBackup(books.data)
    }

    fetchData()
  }, [])
  return (
    <Container>
      <Heading>
        <div>
          <Binoculars size={32} />
          <strong>Explorar</strong>
        </div>

        <Label>
          <input
            value={inputValue}
            type="text"
            placeholder="Buscar livro ou autor"
            onChange={handleSearchBooks}
          />
          <MagnifyingGlass size={20} />
        </Label>
      </Heading>

      <Swiper
        modules={[Mousewheel]}
        direction="horizontal"
        mousewheel={true}
        spaceBetween={12}
        slidesPerView="auto"
        style={{ width: '100%' }}
      >
        <Categories>
          {categories &&
            categories.map((category) => {
              return (
                <SwiperSlide key={category.id} style={{ width: 'auto' }}>
                  <Category
                    mouseOver={isOver === category.id}
                    isCurrent={isCurrent === category.id}
                    onMouseEnter={() => setIsOver(category.id)}
                    onMouseLeave={() => setIsOver('')}
                    onClick={() => handleCategoryBooks(category.id)}
                  >
                    {category.name}
                  </Category>
                </SwiperSlide>
              )
            })}
        </Categories>
      </Swiper>

      <Books>
        {books &&
          books.map((book) => {
            const alreadyRead = book.ratings.find(
              (rating) => rating.user_id === session?.user.id,
            )

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
            return (
              <BookCard onClick={() => handleShowBook(book)} key={book.id}>
                {alreadyRead && <ReadBook>LIDO</ReadBook>}
                <Image
                  src={book.cover_url}
                  alt=""
                  height={152}
                  width={108}
                  quality={100}
                  priority
                  style={{ borderRadius: 4 }}
                />

                <div>
                  <BookInfo>
                    <strong>{maxLettersToText({ text: book.name })}</strong>
                    <span>{book.author}</span>
                  </BookInfo>
                  <RatingStars starsRate={starsRate} />
                </div>
              </BookCard>
            )
          })}
      </Books>
      <Dialog.Root open={isOpen} onOpenChange={handleCloseDialogScreen}>
        {bookId && user ? (
          <ClickedBook
            categoriesOnBooks={categoriesOnBook}
            bookId={bookId}
            users={user}
            handleShowProfile={handleShowProfile}
          />
        ) : null}
      </Dialog.Root>
    </Container>
  )
}
