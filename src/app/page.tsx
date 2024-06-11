import BookList from '@/components/book/BookList'
import { Book } from '@/types'

const getBooks = async (): Promise<Book[]> => {
  const books = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/books`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-cache',
  })
  return await books.json()
}
export default async function Home() {
  const books = await getBooks()
  return <BookList books={books} />
}
