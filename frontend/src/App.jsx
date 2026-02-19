import { useState } from "react"
import axios from "axios"

const API_URL = "http://localhost:8000"

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: input
      })

      const agentMessage = {
        role: "agent",
        content: response.data.response,
        steps: response.data.steps
      }
      setMessages(prev => [...prev, agentMessage])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "agent",
        content: "Error connecting to AgentCraft API"
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "monospace" }}>
      <h1>AgentCraft</h1>
      <p style={{ color: "#666" }}>Local multi-agent AI copilot</p>

      <div style={{
        border: "1px solid #333",
        borderRadius: "8px",
        height: "500px",
        overflowY: "auto",
        padding: "16px",
        marginBottom: "16px",
        background: "#0d0d0d"
      }}>
        {messages.length === 0 && (
          <p style={{ color: "#555" }}>Ask AgentCraft anything about your codebase...</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <span style={{ color: msg.role === "user" ? "#4fc3f7" : "#81c784", fontWeight: "bold" }}>
              {msg.role === "user" ? "You" : "AgentCraft"}:
            </span>
            <p style={{ color: "#fff", marginTop: "4px", whiteSpace: "pre-wrap" }}>
              {msg.content}
            </p>
            {msg.steps && msg.steps.length > 0 && (
              <details style={{ color: "#888", fontSize: "12px" }}>
                <summary>Tools used ({msg.steps.length})</summary>
                {msg.steps.map((step, j) => (
                  <pre key={j} style={{ background: "#1a1a1a", padding: "8px", borderRadius: "4px" }}>
                    {step.content}
                  </pre>
                ))}
              </details>
            )}
          </div>
        ))}
        {loading && <p style={{ color: "#555" }}>AgentCraft is thinking...</p>}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your codebase..."
          style={{
            flex: 1,
            padding: "10px",
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "4px",
            color: "#fff",
            fontFamily: "monospace"
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#4fc3f7",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "monospace",
            fontWeight: "bold"
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}