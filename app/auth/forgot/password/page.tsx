import PasswordForgotCard from '@/components/auth/PasswordForgotCard'
import { Metadata } from 'next'

const PasswordForgotPage = () => {
  return <PasswordForgotCard />
}

export const metadata: Metadata = {
  title: 'Swift Auth - Password Forgot',
  description:
    'Swift Auth provides a hassle-free password recovery process. Forgot your password? No worries! Our password recovery feature ensures a seamless experience. Simply follow the steps to reset your password securely. Trust Swift Auth to safeguard your account and provide reliable password management solutions.',
}

export default PasswordForgotPage
