import EmailVerifyCard from '@/components/auth/EmailVerifyCard'
import { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Swift Auth - Verification',
  description:
    "Verify your account securely with Swift Auth. Our streamlined verification process ensures quick and reliable confirmation of your identity. Whether you're completing account registration or enhancing security measures, Swift Auth prioritizes the protection of your personal information. Trust Swift Auth for seamless authentication and peace of mind throughout the verification process.",
}

export default EmailVerifyPage
