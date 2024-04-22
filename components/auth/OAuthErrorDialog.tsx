import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { SetStateAction } from 'react'

const OAuthErrorDialog = ({
  showOauthError,
  setShowOauthError,
}: {
  showOauthError: boolean
  setShowOauthError: (value: SetStateAction<boolean>) => void
}) => {
  return (
    <AlertDialog open={showOauthError} onOpenChange={setShowOauthError}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>OAuth Error</AlertDialogTitle>
          <AlertDialogDescription>
            Email is already in use with different provider.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setShowOauthError(false)}>
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OAuthErrorDialog
