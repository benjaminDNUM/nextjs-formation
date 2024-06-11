'use server'

import { z } from 'zod'
import { createConnection, executeQuery } from '@/utils/mysql'
import { NextResponse } from 'next/server'

const bookSchema = z.object({
  title: z.string().trim().min(1, 'Le titre le peux pas etre vide'),
  summary: z.string().trim().min(1, 'Le résumé le peux pas etre vide'),
})

export default async (_prevState: unknown, formData: FormData) => {
  const data = {
    title: formData.get('title'),
    summary: formData.get('summary'),
  }

  const validation = bookSchema.safeParse(data)

  if (!validation.success) {
    return {
      errors: validation.error.issues.reduce((errorMap, nextError) => {
        return { ...errorMap, [nextError.path[0]]: nextError.message }
      }, {}),
    }
  }

  const connection = await createConnection()
  try {
    await connection.connect()
    const response = await executeQuery(
      connection,
      'insert into Books set ?',
      data
    )
    return { message: 'succes' }
  } catch (e) {
    return { errors: 'Oups' }
  } finally {
    await connection.end()
  }
}
