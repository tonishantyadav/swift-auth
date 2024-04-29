import AuthErrorCard from '@/components/AuthErrorCard'
import { Metadata } from 'next'

const AuthErrorPage = () => {
  return <AuthErrorCard />
}

export const metadata: Metadata = {
  title: 'Swift Auth - Error',
  description:
    'Oops! Something went wrong. The Swift Auth error page provides helpful information and guidance when encountering unexpected errors. From troubleshooting tips to contacting support, Swift Auth ensures a seamless user experience even in challenging moments. Trust us to swiftly resolve any issues and keep your authentication process running smoothly.',
}

export default AuthErrorPage
