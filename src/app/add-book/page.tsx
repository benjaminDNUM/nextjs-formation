'use client'
import { useFormState } from 'react-dom'
import insertBook from '@/action/insertBook'
import { useEffect } from 'react'

type FormState = { errors?: Record<string, string>; message?: string }

const initialState: FormState = {}

export default () => {
  const [state, formAction] = useFormState(insertBook, initialState)

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 justify-start px-28 py-10"
    >
      <div className="flex flex-col justify-start">
        <label htmlFor="title">Titre</label>
        <input type="text" name="title" />
        {state.errors && (
          <span className="text-red-700 py-2">{state.errors.title}</span>
        )}
      </div>
      <div className="flex flex-col justify-start">
        <label htmlFor="summay">Summary</label>
        <textarea name="summary" />
        {state.errors && (
          <span className="text-red-700 py-2">{state.errors.summary}</span>
        )}
      </div>
      <div className="flex justify-end">
        <button type="submit" className="rounded bg-green-300 p-2 w-fit">
          Soumettre la review
        </button>
      </div>
    </form>
  )
}
