import { NextRequest, NextResponse } from 'next/server'
import { createConnection, executeQuery } from '@/utils/mysql'

export const POST = async (req: NextRequest) => {
  const { text } = await req.json()
  const connection = await createConnection()
  if (!text) {
    return NextResponse.json({ errorMessage: 'Oups' }, { status: 400 })
  }

  try {
    connection.connect()
    const response = await executeQuery(
      connection,
      'insert into Reviews set ?',
      {
        text: text,
      }
    )
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    return NextResponse.json({ errorMessage: 'Oups' }, { status: 400 })
  } finally {
    connection.end()
  }
}
