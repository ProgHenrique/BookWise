import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const categoryId = String(req.query.categoryId)

  const user = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  })

  return res.json(user)
}
