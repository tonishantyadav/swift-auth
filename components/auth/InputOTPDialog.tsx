'use client'

import { InputOTP } from '@/components/auth'
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useEmailVerify } from '@/hooks/auth/useEmailVerify'
import { handleError } from '@/lib/error'
import { InputOTPSchema } from '@/schemas/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import BeatLoader from 'react-spinners/BeatLoader'
import { z } from 'zod'

const InputOTPDialog = ({
  open,
  setOpen,
  token,
}: {
  open: boolean
  setOpen: (value: SetStateAction<boolean>) => void
  token: string
}) => {
  const form = useForm<z.infer<typeof InputOTPSchema>>({
    resolver: zodResolver(InputOTPSchema),
    defaultValues: {
      code: '',
    },
  })
  const router = useRouter()
  const emailVerify = useEmailVerify()
  const [error, setError] = useState('')

  const onSubmit = async (formData: z.infer<typeof InputOTPSchema>) => {
    try {
      if (token) {
        await emailVerify.mutateAsync({
          code: formData.code,
          token,
          deleteToken: false,
        })
        setOpen(false)
        router.push(`/auth/reset/password?token=${token}`)
      }
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputOTP
              form={form}
              label="Verification"
              description="Enter the OTP code."
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
                disabled={emailVerify.isPending}
              >
                {emailVerify.isPending ? <BeatLoader size={5} /> : 'Confirm'}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InputOTPDialog
