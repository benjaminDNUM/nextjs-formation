'use client'

import { Review, ReviewLike } from '@/types'
import { Heart } from 'lucide-react'
import { likeReview } from '@/action/likeReview'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type BookProps = {
  review: Review
}

const ReviewCard = ({ review }: BookProps) => {
  const [likes, setLikes] = useState<ReviewLike[] | null>(null)
  const session = useSession()

  const getLikes = async () => {
    const apiLikes = await fetch(`/api/review_like/${review.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    setLikes(await apiLikes.json())
  }

  useEffect(() => {
    getLikes()
  }, [])

  const currentUserLike =
    (!!session.data?.user?.id &&
      likes?.map((l) => l.user_id.toString()).includes(session.data.user.id)) ??
    false

  return (
    <div className="flex flex-col justify-start bg-amber-50 p-5 rounded-2xl gap-2 relative">
      <h1 className="font-bold">Review de {review.userName}</h1>
      <span>{review.text}</span>
      <button
        onClick={async () => {
          await likeReview(review.id)
          await getLikes()
        }}
        className="absolute bottom-0 right-0 flex gap-2 p-3 items-center justify-center"
      >
        <Heart color="red" fill={currentUserLike ? 'red' : 'transparent'} />
        <span className="text-gray-600 text-sm">{(likes ?? []).length}</span>
      </button>
    </div>
  )
}

export default ReviewCard
