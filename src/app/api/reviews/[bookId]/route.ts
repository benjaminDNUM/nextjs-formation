import { NextRequest, NextResponse } from 'next/server'
import { createConnection, executeQuery } from '@/utils/mysql'
import { Book } from '@/types'

export const GET = async (
  req: NextRequest,
  { params }: { params: { bookId: string } }
) => {
  const connection = await createConnection()
  await connection.connect()

  const response = await executeQuery<{ books: Book[] }, {}>(
    connection,
    `
        select *
        from Reviews r
        left join Books b on b.id = r.book_id
        where b.id = ?
      `,
    [params.bookId]
  )
  await connection.end()
  return NextResponse.json(response, { status: 200 })
}
