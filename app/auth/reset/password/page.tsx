import PasswordResetCard from '@/components/auth/PasswordResetCard'
import { Suspense } from 'react'

const PasswordResetPage = () => {
  return (
    <div className="flex min-h-screen max-w-full items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
      <Suspense>
        <PasswordResetCard />
      </Suspense>
    </div>
  )
}

export default PasswordResetPage
