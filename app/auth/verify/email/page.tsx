import EmailVerifyCard from '@/components/auth/EmailVerifyCard'
import { Suspense } from 'react'

const EmailVerifyPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
        <Suspense>
          <EmailVerifyCard />
        </Suspense>
      </div>
    </>
  )
}

export default EmailVerifyPage
