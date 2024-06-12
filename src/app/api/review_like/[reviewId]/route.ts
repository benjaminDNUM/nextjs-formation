import { NextRequest, NextResponse } from 'next/server'
import { createConnection, executeQuery } from '@/utils/mysql'
import { Book } from '@/types'

export const GET = async (
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) => {
  const connection = await createConnection()
  await connection.connect()

  const response = await executeQuery<{ books: Book[] }, {}>(
    connection,
    `
        select *
        from reviews_like rl
        where rl.review_id = ?
      `,
    [params.reviewId]
  )
  await connection.end()
  return NextResponse.json(response, { status: 200 })
}
