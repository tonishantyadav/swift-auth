'use client'

import { Button } from '@/components/ui'
import { signIn } from 'next-auth/react'
import { useMediaQuery } from 'react-responsive'

const GetStartedButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 })

  return (
    <Button
      className="hover:btn-hover btn-primary rounded-full text-white"
      size={isMobile ? 'sm' : 'lg'}
      onClick={() => signIn('github')}
    >
      Get Started
    </Button>
  )
}

export default GetStartedButton
