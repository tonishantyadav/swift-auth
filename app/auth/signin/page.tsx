import { SigninForm } from '@/components/auth'
import basketPattern from '@/public/basket-pattern.svg'
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

export default SigninPage
