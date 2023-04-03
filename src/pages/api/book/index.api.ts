import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const book = await prisma.book.findMany({
    include: {
      categories: true,
      ratings: {
        orderBy: [
          {
            created_at: 'desc',
          },
        ],
      },
    },
  })

  return res.json(book)
}
