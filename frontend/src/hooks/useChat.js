import { useState, useRef, useEffect } from "react"
import { sendMessage as sendMessageAPI, indexCodebase as indexCodebaseAPI } from "../api/client"

export function useChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [indexing, setIndexing] = useState(false)
  const [status, setStatus] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await sendMessageAPI(input)
      setMessages(prev => [...prev, {
        role: "agent",
        content: response.data.response,
        steps: response.data.steps
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: "agent",
        content: "Error connecting to AgentCraft API. Is the backend running?"
      }])
    } finally {
      setLoading(false)
    }
  }

  const indexCodebase = async () => {
    setIndexing(true)
    setStatus("Indexing codebase...")
    try {
      await indexCodebaseAPI()
      setStatus("Codebase indexed successfully")
    } catch {
      setStatus("Indexing failed — is the backend running?")
    } finally {
      setIndexing(false)
      setTimeout(() => setStatus(""), 3000)
    }
  }

  return {
    messages, input, setInput,
    loading, indexing, status,
    sendMessage, indexCodebase, bottomRef
  }
}