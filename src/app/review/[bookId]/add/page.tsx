'use client'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'

const formSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, { message: 'La review doit faire au moins 1 charactère' }),
})

const AddReview = () => {
  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
  })

  const { bookId } = useParams()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, book_id: bookId }),
      })
      if (result.status === 200) {
        toast('Well done !', { type: 'success' })
        router.push(`/review/${bookId}`)
      } else {
        toast('Oups', { type: 'error' })
      }
    } catch (e) {
      toast('Oups', { type: 'error' })
    }
  }

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e))}
      className="flex flex-col gap-2 justify-start px-28 py-10"
    >
      <div className="flex flex-col justify-start">
        <label
          htmlFor="text"
          className={clsx({ 'text-red-700': formState.errors.text })}
        >
          Texte de votre super review
        </label>
        <textarea
          {...register('text')}
          className={clsx({ 'border-red-700 border-2': formState.errors.text })}
        />
        {formState.errors && (
          <span className="text-red-700 py-2">
            {formState.errors.text?.message}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => router.push(`/review/${bookId}`)}
          className="rounded bg-green-300 p-2 w-fit"
        >
          Revenir au review
        </button>
        <button type="submit" className="rounded bg-green-300 p-2 w-fit">
          Soumettre la review
        </button>
      </div>
    </form>
  )
}

export default AddReview
