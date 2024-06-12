'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Review } from '@/types'
import ReviewList from '@/app/review/[bookId]/ReviewList'

const ReviewPage = () => {
  const { bookId } = useParams()
  const router = useRouter()
  const [reviews, setReview] = useState<Review[] | null>()

  useEffect(() => {
    const getReviews = async () => {
      const result = await fetch(`/api/reviews/${bookId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      setReview(await result.json())
    }
    getReviews()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {reviews && <ReviewList reviews={reviews}></ReviewList>}
      <div className="flex w-full gap-2 justify-end">
        <button
          onClick={() => router.push(`/review/${bookId}/add`)}
          className="rounded bg-green-300 p-2 w-fit"
        >
          Ajouter une review
        </button>
        <button
          onClick={() => router.push(`/`)}
          className="rounded bg-green-300 p-2 w-fit"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default ReviewPage
