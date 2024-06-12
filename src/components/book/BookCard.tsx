'use Client'

import { Book } from '@/types'
import { useRouter } from 'next/navigation'

type BookProps = {
  book: Book
}

const BookCard = ({ book }: BookProps) => {
  const router = useRouter()

  return (
    <button
      key={book.id}
      className="flex flex-col justify-start bg-amber-50 p-5 rounded-2xl gap-2 "
      onClick={() => router.push(`/review/${book.id}`)}
    >
      <h1 className="font-bold">{book.title}</h1>
      <span>{book.summary}</span>
    </button>
  )
}

export default BookCard
