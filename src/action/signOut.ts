'use server'

import { signOut } from '@/auth'
import { revalidatePath } from 'next/cache'

export const signOutUser = async () => {
  try {
    await signOut({ redirect: false })
    revalidatePath('/')
  } catch (e) {
    throw e
  }
}
