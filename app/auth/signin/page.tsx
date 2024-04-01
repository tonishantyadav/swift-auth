import { SigninForm } from '@/components/auth'
import basketPattern from '@/public/basket-pattern.svg'
import Image from 'next/image'

const SigninPage = () => {
  return (
    <div className="grid min-h-screen items-center justify-center gap-2 md:grid-cols-2 lg:grid-cols-2">
      <div className="hidden border md:block">
        <Image
          src={basketPattern}
          alt="Black and white basket pattern"
          className="h-screen min-w-full object-cover"
          priority
        />
      </div>
      <div className="flex justify-center lg:m-8">
        <SigninForm />
      </div>
    </div>
  )
}

export default SigninPage
