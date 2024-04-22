import EmailVerifyCard from '@/components/auth/EmailVerifyCard'
import { Suspense } from 'react'

const EmailVerifyPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Suspense>
          <EmailVerifyCard />
        </Suspense>
      </div>
    </>
  )
}

export default EmailVerifyPage
