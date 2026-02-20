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
  const [mode, setMode] = useState("multi_agent")
  const [agentStates, setAgentStates] = useState({
    planner: null,
    coder: null,
    critic: null
  })
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

const newChat = () => {
  const id = Date.now()
  setActiveId(id)
  setMessages([])
  setInput("")
  setAgentStates({ planner: null, coder: null, critic: null })
}

  const selectChat = (id) => {
    const convo = conversations.find(c => c.id === id)
    if (convo) {
      setActiveId(id)
      setMessages(convo.messages)
      setAgentStates(convo.agentStates || { planner: null, coder: null, critic: null })
    }
  }

 const sendMessage = async () => {
  if (!input.trim() || loading) return

  // Create a new conversation if none is active
  let currentId = activeId
  if (!currentId) {
    currentId = Date.now()
    setActiveId(currentId)
  }

  const userMessage = { role: "user", content: input }
  const updatedMessages = [...messages, userMessage]
  setMessages(updatedMessages)
  setInput("")
  setLoading(true)

  setAgentStates({
    planner: { status: "thinking", output: null },
    coder: { status: "waiting", output: null },
    critic: { status: "waiting", output: null }
  })

  try {
    const response = await sendMessageAPI(input, mode)

    const newAgentStates = { planner: null, coder: null, critic: null }
    if (response.data.agents) {
      response.data.agents.forEach(a => {
        newAgentStates[a.agent] = {
          status: "complete",
          output: a.output,
          steps: a.steps || []
        }
      })
    }
    setAgentStates(newAgentStates)

    const agentMessage = {
      role: "agent",
      content: response.data.response,
      steps: response.data.steps || [],
      agents: response.data.agents || []
    }

    const finalMessages = [...updatedMessages, agentMessage]
    setMessages(finalMessages)

    // Update existing conversation or create new one
    const title = finalMessages[0].content.slice(0, 40) +
      (finalMessages[0].content.length > 40 ? "..." : "")

    setConversations(prev => {
      const existing = prev.find(c => c.id === currentId)
      if (existing) {
        // Thread exists — append to it
        return prev.map(c => c.id === currentId
          ? { ...c, messages: finalMessages, agentStates: newAgentStates }
          : c)
      }
      // New conversation
      return [{ id: currentId, title, messages: finalMessages, agentStates: newAgentStates }, ...prev]
    })

  } catch {
    setMessages(prev => [...prev, {
      role: "agent",
      content: "Error connecting to AgentCraft API. Is the backend running?"
    }])
    setAgentStates({ planner: null, coder: null, critic: null })
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
    input, setInput, loading, indexing,
    status, mode, setMode, agentStates,
    sendMessage, indexCodebase, newChat, selectChat, bottomRef
  }
}