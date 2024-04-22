'use client'

import { Button } from '@/components/ui'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { toast } from 'react-toastify'

const SignoutButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onClick = () => {
    try {
      setIsSubmitting(true)
      signOut()
    } catch (error) {
      setIsSubmitting(false)
      toast.error('An unexpected error occurred.')
    }
  }

  return (
    <Button
      className="w-full transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      variant="destructive"
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? <BeatLoader size={5} color="white" /> : 'Signout'}
    </Button>
  )
}

export default SignoutButton
