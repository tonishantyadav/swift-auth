'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP as BaseInputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { UseFormReturn } from 'react-hook-form'

interface InputOTPProps {
  form: UseFormReturn<any>
  label?: string
  description?: string
  error?: string
}

const InputOTP = ({ form, label, description, error }: InputOTPProps) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem className="space-y-4">
            {label && <span className="text-3xl font-semibold">{label}</span>}
            <div>
              {description && (
                <FormDescription className="text-md">
                  {description}
                </FormDescription>
              )}
              <FormControl>
                <BaseInputOTP maxLength={6} {...field}>
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
                </BaseInputOTP>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      {error && (
        <p className="text-[0.8rem] font-normal text-red-500">{error}</p>
      )}
    </div>
  )
}

export default InputOTP
