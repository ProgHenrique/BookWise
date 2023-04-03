import { prisma } from '@/lib/prisma'
import { Book, Rating, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const ratings = await prisma.rating.findMany({
    include: {
      book: true,
      user: true,
    },
  })

  const books = await prisma.book.findMany()

  const popularbooks: Record<string, number> = {}
  const mostPopularBooks: (Rating & {
    book: Book
    user: User
  })[] = []

  ratings.map((rating) => {
    const filtered = ratings.filter((item) => item.book_id === rating.book_id)
    popularbooks[rating.book_id] = filtered.length
    return null
  })

  while (mostPopularBooks.length !== books.length) {
    const maxVal = Math.max(...Object.values(popularbooks))
    const bookId = Object.keys(popularbooks).find(
      (key) => popularbooks[key] === maxVal,
    )!

    delete popularbooks[bookId]

    const book = await prisma.rating.findFirst({
      where: {
        book_id: bookId,
      },
      include: {
        book: true,
        user: true,
      },
    })

    if (book) {
      mostPopularBooks.push(book)
    }
  }

  return res.json(mostPopularBooks)
}
