import { SignupForm } from '@/components/auth'

const SignupPage = () => {
  return (
    <div className="grid min-h-screen items-center justify-center gap-2 bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px] md:grid-cols-2 lg:grid-cols-2">
      <div className="hidden md:block">
        <HeroSection />
      </div>
      <div className="flex justify-center lg:m-8">
        <SignupForm />
      </div>
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className="m-5 flex flex-col gap-y-2">
      <p className="flex items-center font-medium md:gap-2 md:text-6xl lg:gap-5 lg:text-8xl">
        Welcome{' '}
        <span className="md:mt-3 md:text-2xl lg:mt-5 lg:text-4xl">to</span>
      </p>
      <p className="hero flex justify-end font-semibold md:text-6xl lg:text-8xl">
        Swift Auth
      </p>
      <p className="flex justify-end text-gray-300/75 md:text-sm lg:text-xl">
        Experience seamless authentication.
      </p>
    </div>
  )
}

export default SignupPage
