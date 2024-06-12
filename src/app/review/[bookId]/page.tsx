'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Review } from '@/types'

const ReviewList = () => {
  const { bookId } = useParams<{ bookId: string }>()
  const router = useRouter()
  const [reviews, setReview] = useState<Review[] | null>()

  useEffect(() => {
    const getReviews = async () => {
      console.log('itititititii')
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
      <span>review {bookId}</span>
      <pre>{reviews?.map((r) => r.text)}</pre>
      <button
        onClick={() => router.push(`/`)}
        className="rounded bg-green-300 p-2 w-fit"
      >
        Back
      </button>
    </div>
  )
}

export default ReviewList
