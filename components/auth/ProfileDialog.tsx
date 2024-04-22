'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaUser } from 'react-icons/fa6'
import { Button } from '../ui'
import Link from 'next/link'

const ProfileDialog = ({
  name,
  email,
  image,
}: {
  name: string
  email: string
  image: string
}) => {
  const pathname = usePathname()
  return (
    <Popover>
      <PopoverTrigger className="text-lg">Profile</PopoverTrigger>
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
        <Button className="w-full" variant="destructive">
          Signout
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default ProfileDialog
