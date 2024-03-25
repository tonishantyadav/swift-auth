import { LoginButton } from '@/components/auth'
import { Button, Card } from '@/components/ui'
import { CardContent, CardHeader } from '@/components/ui/card'
import shieldIcon from '@/public/shield.png'
import Image from 'next/image'

const HomePage = () => {
  return (
    <main className="grid h-screen grid-rows-2 justify-center gap-2 ">
      <Hero />
      <div>
        <Card>
          <CardHeader>Login</CardHeader>
          <CardContent>
            <LoginButton>
              <Button variant="default">Login</Button>
            </LoginButton>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

const Hero = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center gap-2 md:flex-row lg:flex-row">
        <div className="flex justify-center">
          <Image
            src={shieldIcon}
            alt="Shield Icon"
            className="max-w-12 md:mb-6 md:max-w-16 lg:mb-6 lg:max-w-20"
          />
        </div>
        <div className="space-y-2 p-2">
          <h1 className="text-center text-4xl md:text-6xl lg:text-7xl">
            Next-Simple Auth
          </h1>
          <div>
            <p className="text-center text-xs text-gray-300 md:text-lg lg:text-lg">
              Authentication made easy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
