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
import { Input2FACodeSchema } from '@/schemas/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  open: boolean
  setOpen: (value: SetStateAction<boolean>) => void
}

const TwoStepVerificationCodeDialog = ({ open, setOpen }: Props) => {
  const form = useForm<z.infer<typeof Input2FACodeSchema>>({
    resolver: zodResolver(Input2FACodeSchema),
    defaultValues: {
      code: '',
    },
  })

  const onSubmit = (data: z.infer<typeof Input2FACodeSchema>) => {
    console.log(data)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <span className="text-3xl font-semibold">Verification</span>
                  <div>
                    <FormDescription className="text-md">
                      Please enter your 2-step verification code.
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
            <div className="flex justify-end space-x-2">
              <Button
                className="font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="btn-primary hover:btn-hover font-semibold text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                type="submit"
                variant="default"
              >
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TwoStepVerificationCodeDialog
