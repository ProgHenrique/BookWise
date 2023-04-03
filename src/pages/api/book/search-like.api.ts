import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const bookLike = String(req.query.like)

  const book = await prisma.book.findMany({
    where: {
      OR: [
        {
          name: {
            contains: bookLike,
          },
        },

        {
          author: {
            contains: bookLike,
          },
        },
      ],
    },

    include: {
      categories: true,
      ratings: true,
    },
  })

  return res.json(book)
}
