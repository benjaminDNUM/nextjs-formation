import { NextRequest, NextResponse } from 'next/server'
import { createConnection, executeQuery } from '@/utils/mysql'
import { auth } from '@/auth'

export const POST = async (req: NextRequest) => {
  const { text } = await req.json()
  const connection = await createConnection()
  if (!text) {
    return NextResponse.json({ errorMessage: 'Oups' }, { status: 400 })
  }

  const session = await auth()

  try {
    console.log({
      text: text,
      book_id: 1,
      userId: session?.user?.id,
    })

    connection.connect()
    const response = await executeQuery(
      connection,
      'insert into Reviews set ?',
      {
        text: text,
        book_id: 1,
        user_id: session?.user?.id,
      }
    )
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ errorMessage: 'Oups' }, { status: 400 })
  } finally {
    connection.end()
  }
}
