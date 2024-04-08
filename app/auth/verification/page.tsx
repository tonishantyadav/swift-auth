import VerificationCard from '@/components/auth/VerificationCard'
import { Suspense } from 'react'

const VerificationPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
        <Suspense>
          <VerificationCard />
        </Suspense>
      </div>
    </>
  )
}

export default VerificationPage
