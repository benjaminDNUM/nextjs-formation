'use client'

import Link from 'next/link'
import { Home, Book, Pen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { signOutUser } from '@/action/signOut'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Nav = () => {
  const sessions = useSession()
  const router = useRouter()

  useEffect(() => console.log(sessions.status), [sessions.status])

  return (
    <menu className="bg-gray-600 p-10 flex justify-between">
      <li className="flex items-center gap-2">
        <Book color="white" size={16} />
        <Link href="/" className="text-white">
          Liste de livre
        </Link>
      </li>
      <li className="flex items-center gap-2">
        <Pen color="white" size={16} />
        <Link href="/add-book" className="text-white">
          Ajouter un livre
        </Link>
      </li>
      <li className="flex items-center gap-2">
        <Pen color="white" size={16} />
        <Link href="/review" className="text-white">
          Ajouter une review
        </Link>
      </li>
      <li className="flex items-center gap-2">
        {sessions.status !== 'authenticated' ? (
          <>
            <Home color="white" size={16} />
            <Link href="/login" className="text-white">
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={async () => {
              await signOutUser()
              await sessions.update()
            }}
          >
            sign out
          </button>
        )}
      </li>
    </menu>
  )
}

export default Nav
