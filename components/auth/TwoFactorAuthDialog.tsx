'use client'

import { Button } from '@/components/ui'
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useSignin } from '@/hooks/auth/useSignin'
import { handleError } from '@/lib/error'
import { Input2FACodeSchema } from '@/schemas/validation'
import { SigninFormData } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import BeatLoader from 'react-spinners/BeatLoader'
import { z } from 'zod'

interface Props {
  data: SigninFormData | null
  open: boolean
  setOpen: (value: SetStateAction<boolean>) => void
}

const TwoFactorAuthDialog = ({ data, open, setOpen }: Props) => {
  const form = useForm<z.infer<typeof Input2FACodeSchema>>({
    resolver: zodResolver(Input2FACodeSchema),
    defaultValues: {
      code: '',
    },
  })
  const signin = useSignin()
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (formData: z.infer<typeof Input2FACodeSchema>) => {
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
            <div>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <span className="text-3xl font-semibold">
                      2FA Verification
                    </span>
                    <div>
                      <FormDescription className="text-md">
                        Enter your 2FA verification code.
                      </FormDescription>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="py-2">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-[0.8rem] font-normal text-red-500">
                  {error}
                </p>
              )}
            </div>
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
