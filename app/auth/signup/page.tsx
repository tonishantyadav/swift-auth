import { SignupForm } from '@/components/auth'
import isometricYCubes from '@/public/geometric-y-lines-pattern.jpg'
import Image from 'next/image'

const SignupPage = () => {
  return (
    <div className="grid min-h-screen items-center justify-center gap-2 md:grid-cols-2 lg:grid-cols-2">
      <div className="relative hidden  min-h-full md:block">
        <Image
          src={isometricYCubes}
          alt="Geometric-y-lines pattern"
          className="absolute left-0 top-0 h-full w-full object-cover"
          priority
        />
      </div>
      <div className="flex justify-center lg:m-8">
        <SignupForm />
      </div>
    </div>
  )
}

export default SignupPage
