import { NextRequest, NextResponse } from 'next/server'
import { createConnection, executeQuery } from '@/utils/mysql'
import { Book } from '@/types'

export const GET = async (req: NextRequest) => {
  const connection = await createConnection()
  await connection.connect()
  const response = await executeQuery<{ books: Book[] }, undefined>(
    connection,
    'select * from Books'
  )
  await connection.end()
  return NextResponse.json(response, { status: 200 })
}
