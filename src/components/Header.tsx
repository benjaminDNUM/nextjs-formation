import Image from 'next/image'
import { signOutUser } from '@/action/signOut'

const Header = () => {
  return (
    <header className="bg-gray-400 h-44 p-10 flex items-center justify-center gap-4">
      <Image src="/logo.png" alt="logo de l'app" width={50} height={50} />
      <span>Prenez vous pour un critique</span>
    </header>
  )
}

export default Header
