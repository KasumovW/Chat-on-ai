import axios from 'axios'
import { useState } from 'react'

export interface IMessage {
  message: IResponseMessage
  time: string
  isUser: boolean
}

interface IResponseMessage {
  answer: string
  question?: string
  sources?: string[]
  time_taken?: number
}

export const useMessages = () => {
  const [messages, setMessage] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const askQuestion = async (text: string) => {
    try {
      setIsLoading(true)
      setMessage((prev) => [
        ...prev,
        {
          message: {
            answer: text,
          },
          time: new Date(Date.now()).toLocaleDateString('ru-RU'),
          isUser: true,
        },
      ])
      const { data } = await axios.post<IResponseMessage>(
        'http://localhost:5000/query',
        {
          query: text,
        }
      )
      setMessage((prev) => [
        ...prev,
        {
          message: data,
          time: new Date(Date.now()).toLocaleDateString('ru-RU'),
          isUser: false,
        },
      ])
    } catch (err) {
      // @ts-ignore
      setError(err.data)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    askQuestion,
    isLoading,
    error,
  }
}
