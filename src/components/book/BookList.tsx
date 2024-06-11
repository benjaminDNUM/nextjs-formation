'use client'

import BookCard from '@/components/book/BookCard'
import { Book } from '@/types'
import { useSession } from 'next-auth/react'

type BookListProps = { books: Book[] }
export default ({ books }: BookListProps) => {
  const session = useSession()

  return (
    <>
      <h1 className="text-3xl font-bold mb-2.5">
        Bonjour {session.data?.user?.name}
      </h1>
      <div className="flex flex-col gap-4">
        {books
          ? books.map((book) => <BookCard book={book} key={book.id} />)
          : null}
      </div>
    </>
  )
}
