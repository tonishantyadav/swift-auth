import { auth } from '@/auth'
import SignoutButton from '@/components/SignoutButton'
import GetStartedButton from '@/components/home/GetStartedButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import ToastContainer from '@/components/ui/toast'
import shieldIcon from '@/public/shield.png'
import { Metadata } from 'next'
import Image from 'next/image'

const HomePage = async () => {
  const session = await auth()

  return (
    <div>
      {session && session.user && (
        <div className="flex justify-end p-5">
          <ProfileDialog
            name={session.user?.name!}
            email={session.user?.email!}
            image={session.user?.image!}
          />
        </div>
      )}
      <main className="grid min-h-screen items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-2 p-5 md:flex-row lg:flex-row">
          <div className="flex flex-col items-center space-y-3 p-2 lg:space-y-5">
            <div className="hero-shadow flex flex-row items-center gap-2">
              <div className="max-w-12 md:max-w-16 lg:max-w-20">
                <Image src={shieldIcon} alt="A blue shield icon" priority />
              </div>
              <h1 className="hero-text text-center text-5xl font-semibold md:text-6xl lg:text-8xl">
                Swift Auth
              </h1>
            </div>
            <div>
              <p className="text-center text-lg font-semibold text-gray-300 md:text-2xl lg:text-2xl">
                Experience Seamless Authentication{' '}
              </p>
            </div>
            {!session && <GetStartedButton />}
          </div>
        </div>
      </main>
    </div>
  )
}

const ProfileDialog = ({
  name,
  email,
  image,
}: {
  name: string
  email: string
  image: string
}) => {
  return (
    <>
      <ToastContainer />
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={image} alt="Profile" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mx-4 flex flex-col space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={image} alt={`@${name}`} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-lg font-medium">{name}</span>
                <span className="text-sm text-gray-300">{email}</span>
              </div>
            </div>
          </div>
          <SignoutButton />
        </PopoverContent>
      </Popover>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Swift Auth - Home',
  description:
    "Welcome to Swift Auth, your all-in-one authentication solution. We offer OAuth, credential-based sign-in/sign-up, and Two-Factor Authentication (2FA) for robust security. A seamless interface, powered by Next.js, ensures a smooth user experience. Backed by MySQL for efficient database management and Prisma for optimized data modeling. Plus, we've integrated NextAuth for enhanced authentication features. Simplify your authentication needs with Swift Auth.",
}

export default HomePage
