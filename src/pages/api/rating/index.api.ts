import { prisma } from '@/lib/prisma'
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
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  })

  return res.json(ratings)
}
