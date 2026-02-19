import { useState, useRef, useEffect } from "react"
import { sendMessage as sendMessageAPI, indexCodebase as indexCodebaseAPI } from "../api/client"

export function useChat() {
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [indexing, setIndexing] = useState(false)
  const [status, setStatus] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const newChat = () => {
    const id = Date.now()
    setActiveId(id)
    setMessages([])
    setInput("")
  }

  const selectChat = (id) => {
    const convo = conversations.find(c => c.id === id)
    if (convo) {
      setActiveId(id)
      setMessages(convo.messages)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await sendMessageAPI(input)
      const agentMessage = {
        role: "agent",
        content: response.data.response,
        steps: response.data.steps
      }
      const finalMessages = [...updatedMessages, agentMessage]
      setMessages(finalMessages)

      // Save to conversations
      const title = input.slice(0, 40) + (input.length > 40 ? "..." : "")
      setConversations(prev => {
        const existing = prev.find(c => c.id === activeId)
        if (existing) {
          return prev.map(c => c.id === activeId ? { ...c, messages: finalMessages } : c)
        }
        return [{ id: activeId || Date.now(), title, messages: finalMessages }, ...prev]
      })
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
    conversations, activeId, messages,
    input, setInput, loading, indexing, status,
    sendMessage, indexCodebase, newChat, selectChat, bottomRef
  }
}