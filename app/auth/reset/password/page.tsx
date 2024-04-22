import PasswordResetCard from '@/components/auth/PasswordResetCard'
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

export default PasswordResetPage
