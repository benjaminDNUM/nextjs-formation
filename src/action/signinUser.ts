'use server'

import { signIn } from '@/auth'
import { revalidatePath } from 'next/cache'

export const signinUser = async (_prevState: unknown, formData: FormData) => {
  let shouldRedirect = false
  let message = ''

  try {
    await signIn('credentials', {
      login: formData.get('login'),
      password: formData.get('password'),
      redirect: false,
    })
    revalidatePath('/')
    shouldRedirect = true
  } catch (e) {
    message = 'Oups'
  } finally {
    return { message, shouldRedirect }
  }
}
