import { Review } from '@/types'

type BookProps = {
  review: Review
}

const BookCard = ({ review }: BookProps) => {
  return (
    <div className="flex flex-col justify-start bg-amber-50 p-5 rounded-2xl gap-2 ">
      <h1 className="font-bold">Review de {review.userName}</h1>
      <span>{review.text}</span>
    </div>
  )
}

export default BookCard
