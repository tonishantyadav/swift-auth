import { SignupForm } from '@/components/auth'
import isometricYCubes from '@/public/geometric-y-lines-pattern.jpg'
import Image from 'next/image'

const SignupPage = () => {
  return (
    <div className="grid min-h-screen items-center justify-center gap-2 md:grid-cols-2 lg:grid-cols-2">
      <div className="hidden border md:block">
        <Image
          src={isometricYCubes}
          alt="Geometric-y-lines pattern"
          className="h-screen min-w-full object-cover"
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
