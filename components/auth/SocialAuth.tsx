import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui'

interface Social {
  label: string
  icon: React.ReactNode
}

const SocialAuth = ({ message }: { message: string }) => {
  return (
    <>
      <span className="text-sm text-gray-300">{message}</span>
      <div className="flex gap-3">
        {socialAuths.map((social, index) => (
          <Button
            size="icon"
            className="rounded-full transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            key={social.label}
            onClick={() => signIn(social.label)}
          >
            {social.icon}
          </Button>
        ))}
      </div>
    </>
  )
}

const socialAuths: Social[] = [
  { label: 'google', icon: <FcGoogle fontSize="1.5rem" /> },
  { label: 'github', icon: <FaGithub fontSize="1.5rem" /> },
]

export default SocialAuth
