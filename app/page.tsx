import GetStartedButton from '@/components/home/GetStartedButton'
import shieldIcon from '@/public/shield.png'
import Image from 'next/image'

const HomePage = async () => {
  return (
    <main className="grid min-h-screen items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-2 p-5 md:flex-row lg:flex-row">
        <div className="flex flex-col items-center space-y-3 p-2 lg:space-y-5">
          <div className="hero-shadow flex flex-col items-center gap-2 md:flex-row lg:flex-row">
            <div className="max-w-16">
              <Image src={shieldIcon} alt="A blue shield icon" priority />
            </div>
            <h1 className="text-center text-4xl font-semibold md:text-6xl lg:text-7xl">
              Next-Simple Auth
            </h1>
          </div>
          <div>
            <p className="text-center text-lg font-semibold text-gray-300 md:text-2xl lg:text-2xl">
              Authentication made easy
            </p>
          </div>
          <div className="py-1">
            <GetStartedButton />
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
