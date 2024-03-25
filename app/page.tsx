'use client'

import { Button } from '@/components/ui'
import shieldIcon from '@/public/shield.png'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

const HomePage = () => {
  const isMobile = useMediaQuery({ query: '(min-width: 640px)' })

  return (
    <main className="grid min-h-screen items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-2 p-5 md:flex-row lg:flex-row">
        <div className="flex flex-col items-center space-y-3 p-2 lg:space-y-5">
          <div className="hero-shadow flex flex-col items-center gap-2 md:flex-row lg:flex-row">
            <div className="max-w-12 md:max-w-16 lg:max-w-16">
              <Image src={shieldIcon} alt="Shie1ld icon" />
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
            <Button
              className="hover:bg-hover rounded-full bg-primary font-semibold text-white"
              size={!isMobile ? 'sm' : 'lg'}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
