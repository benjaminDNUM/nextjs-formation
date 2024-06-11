import { Book } from '@/types'

type BookProps = {
  book: Book
}

export default ({ book }: BookProps) => {
  return (
    <div
      key={book.id}
      className="flex flex-col justify-start bg-amber-50 p-5 rounded-2xl gap-2"
    >
      <h1 className="font-bold">{book.title}</h1>
      <span>{book.summary}</span>
    </div>
  )
}
