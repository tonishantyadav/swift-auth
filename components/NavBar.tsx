'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const session = useSession()
  const pathname = usePathname()

  if (session.status === 'unauthenticated') return null

  if (pathname !== '/') return null

  return <div className="flex justify-end">NavBar</div>
}

export default NavBar
