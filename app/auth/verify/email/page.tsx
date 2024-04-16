import EmailVerificationCard from '@/components/auth/EmailVerificationCard'
import { Suspense } from 'react'

const EmailVerifyPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
        <Suspense>
          <EmailVerificationCard />
        </Suspense>
      </div>
    </>
  )
}

export default EmailVerifyPage
