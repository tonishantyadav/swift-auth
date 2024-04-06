import { useState } from 'react'

const useMessageTimeout = (initialMessage: string) => {
  const [message, setMessage] = useState(initialMessage)

  const setMessageWithTimeout = (newMessage: string, timeout: number) => {
    setMessage(newMessage)
    setTimeout(() => {
      setMessage('')
    }, timeout)
  }

  return [message, setMessageWithTimeout] as const
}

export default useMessageTimeout
