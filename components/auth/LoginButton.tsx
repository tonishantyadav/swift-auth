'use client'

import { Button } from '@/components/ui'
import { ButtonProps } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface LoginButtonProps extends Omit<ButtonProps, 'onClick'> {
  label?: string
  mode?: 'modal' | 'redirect'
}

const LoginButton = ({
  label = 'Login',
  mode = 'redirect',
  ...buttonProps
}: LoginButtonProps) => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push('/auth/login')
  }

  return (
    <Button {...buttonProps} onClick={handleOnClick}>
      {label}
    </Button>
  )
}

export default LoginButton
