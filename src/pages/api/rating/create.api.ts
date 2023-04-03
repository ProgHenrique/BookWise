/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { Rating } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { book_id, description, rate, user_id }: Rating = req.body

  await prisma.rating.create({
    data: { book_id, description, rate, user_id },
  })

  return res.status(201).send('created')
}
