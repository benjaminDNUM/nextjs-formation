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
        select 
            r.id as id,
            r.text as text,
            u.name as userName
        from Reviews r
        left join Books b on b.id = r.book_id
        left join Users u on u.id = r.user_id
        where b.id = ?
      `,
    [params.bookId]
  )
  await connection.end()
  return NextResponse.json(response, { status: 200 })
}
