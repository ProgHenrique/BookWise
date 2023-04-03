/* eslint-disable react-hooks/exhaustive-deps */
import { Star } from 'phosphor-react'
import { useState } from 'react'
import { Stars } from './styles'

interface StarsProps {
  starsRate?: any[]
  starSize?: number
  createNewRating?: (rate: number) => void
}

export default function RatingStars({
  starsRate = ['regular', 'regular', 'regular', 'regular', 'regular'],
  starSize = 16,
  createNewRating,
}: StarsProps) {
  const [rating, setRating] = useState<any[]>([])
  function handleStarRate(index: number) {
    if (starSize !== 28) {
      return null
    }
    const fillArray = new Array(index).fill('fill')
    const regularArray = new Array(5 - index).fill('regular')
    setRating([...fillArray, ...regularArray])
    if (createNewRating) {
      createNewRating(index)
    }
  }
  return (
    <Stars id="starsContainer" clickable={starSize === 28 && true}>
      {starsRate.map((star, index) => {
        return (
          <Star
            key={index}
            onClick={() => handleStarRate(index + 1)}
            weight={rating.length > 0 ? rating[index] : star}
            size={starSize}
          />
        )
      })}
    </Stars>
  )
}
