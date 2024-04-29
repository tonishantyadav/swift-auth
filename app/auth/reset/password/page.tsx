import PasswordResetCard from '@/components/auth/PasswordResetCard'
import { Metadata } from 'next'
import { Suspense } from 'react'

const PasswordResetPage = () => {
  return (
    <div className="flex min-h-screen max-w-full items-center justify-center">
      <Suspense>
        <PasswordResetCard />
      </Suspense>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Swift Auth - Password Reset',
  description:
    "Swift Auth makes resetting your password a breeze. Whether you've forgotten your password or want to enhance security, our password reset feature offers a seamless experience. Follow the simple steps to securely update your password and regain access to your account. Trust Swift Auth for reliable password management solutions and safeguard your account with ease.",
}

export default PasswordResetPage
