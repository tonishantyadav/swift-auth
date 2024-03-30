import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui'

const ProfilePage = async () => {
  const session = await auth()

  return (
    <div className="flex flex-col space-y-5">
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  )
}

export default ProfilePage
