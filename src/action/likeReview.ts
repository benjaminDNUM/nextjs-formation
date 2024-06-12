'use server'

import { auth } from '@/auth'
import { createConnection, executeQuery } from '@/utils/mysql'
import { ReviewLike } from '@/types'

export const likeReview = async (reviewId: number) => {
  const session = await auth()

  if (!session?.user?.id) {
    return
  }

  const connection = await createConnection()
  try {
    await connection.connect()
    const savedreview = await executeQuery<ReviewLike[], {}>(
      connection,
      'select * from reviews_like where review_id = ? AND user_id = ?',
      [reviewId, session.user.id]
    )

    if (savedreview.length == 0) {
      await executeQuery(connection, 'insert into reviews_like set ?', {
        review_id: reviewId,
        user_id: session.user.id,
      })
    } else {
      await executeQuery(
        connection,
        'delete from reviews_like where review_id = ? AND user_id = ? ',
        [reviewId, session.user.id]
      )
    }
    return { message: 'succes' }
  } catch (e) {
    return { errors: 'Oups' }
  } finally {
    await connection.end()
  }
}
