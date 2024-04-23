'use client'

import InputOTP from '@/components/auth/InputOTP'
import { Button } from '@/components/ui'
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import { Form } from '@/components/ui/form'
import { useSignin } from '@/hooks/auth/useSignin'
import { handleError } from '@/lib/error'
import { InputOTPSchema } from '@/schemas/validation'
import { SigninFormData } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import BeatLoader from 'react-spinners/BeatLoader'
import { z } from 'zod'

interface TwoFactoAuthDialogProps {
  data: SigninFormData | null
  open: boolean
  setOpen: (value: SetStateAction<boolean>) => void
}

const TwoFactorAuthDialog = ({
  data,
  open,
  setOpen,
}: TwoFactoAuthDialogProps) => {
  const form = useForm<z.infer<typeof InputOTPSchema>>({
    resolver: zodResolver(InputOTPSchema),
    defaultValues: {
      code: '',
    },
  })
  const signin = useSignin()
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (formData: z.infer<typeof InputOTPSchema>) => {
    try {
      if (data) {
        const response = await signin.mutateAsync({
          email: data.email,
          password: data.password,
          code: formData.code,
        })
        setOpen(false)
        router.push('/')
      }
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
      setTimeout(() => setOpen(false), 3000)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputOTP
              form={form}
              label={'2FA Verification'}
              description={'Enter your 2FA verification code.'}
              error={error}
            />
            <div className="flex justify-end space-x-2">
              <Button
                className="font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                type="submit"
                variant="default"
                disabled={signin.isPending}
              >
                {signin.isPending ? <BeatLoader size={5} /> : 'Confirm'}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TwoFactorAuthDialog
