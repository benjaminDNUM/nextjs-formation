'use client'

import { useFormState } from 'react-dom'
import { signinUser } from '@/action/signinUser'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  csrfToken: string
}
export default ({ csrfToken }: Props) => {
  const [state, formAction] = useFormState(signinUser, {
    shouldRedirect: false,
    message: '',
  })
  const router = useRouter()

  useEffect(() => {
    console.log("je passe la")
    if (state.shouldRedirect) {
      console.log("je passe ici")
      router.push('/')
    }
  }, [state.shouldRedirect])

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 justify-start px-28 py-10"
    >
      <div className="flex flex-col justify-start">
        <label htmlFor="login">Login</label>
        <input type="text" name="login" />
      </div>
      <div className="flex flex-col justify-start">
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" />
      </div>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="flex justify-end">
        <button type="submit" className="rounded bg-green-300 p-2 w-fit">
          Sign in
        </button>
      </div>
      <div>{csrfToken}</div>
    </form>
  )
}
