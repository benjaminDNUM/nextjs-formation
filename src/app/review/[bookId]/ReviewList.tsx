import { Review } from '@/types'
import ReviewCard from '@/app/review/[bookId]/ReviewCard'

type ReviewListProps = { reviews: Review[] }
const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {reviews
          ? reviews.map((r) => <ReviewCard review={r} key={r.id} />)
          : null}
      </div>
    </>
  )
}

export default ReviewList
