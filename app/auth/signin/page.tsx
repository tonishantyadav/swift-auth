import { SigninForm } from '@/components/auth'
import basketPattern from '@/public/basket-pattern.svg'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

const SigninPage = () => {
  return (
    <div className="grid min-h-screen items-center justify-center gap-2  md:grid-cols-2 lg:grid-cols-2">
      <div className="relative hidden  min-h-full md:block">
        <Image
          src={basketPattern}
          alt="Black and white basket pattern"
          className="absolute left-0 top-0 h-full w-full object-cover"
          priority
        />
      </div>
      <div className="flex justify-center lg:m-8">
        <Suspense>
          <SigninForm />
        </Suspense>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Swift Auth - Signin',
  description:
    "Sign in effortlessly with Swift Auth. Our secure authentication process ensures a smooth login experience, whether you're accessing your account for the first time or returning. With Swift Auth, your login credentials are protected, providing peace of mind and convenience. Trust Swift Auth for seamless authentication and access to your account.",
}

export default SigninPage
