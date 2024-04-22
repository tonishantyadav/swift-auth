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
import Image from 'next/image'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa6'

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
        <PopoverTrigger className="text-gray-300 hover:text-gray-100">
          Profile
        </PopoverTrigger>
        <PopoverContent className="mx-4 flex flex-col space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <FaUser />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Link href="/auth/profile?q=edit">
                  <span className="text-lg font-medium hover:underline">
                    {name}
                  </span>
                </Link>
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

export default HomePage
