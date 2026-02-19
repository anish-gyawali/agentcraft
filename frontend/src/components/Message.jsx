import { useState } from "react"

export default function Message({ msg }) {
  const [showSteps, setShowSteps] = useState(false)
  const isUser = msg.role === "user"

  return (
    <div style={{
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: isUser ? "flex-end" : "flex-start"
    }}>
      <span style={{ fontSize: "11px", color: "#555", marginBottom: "4px" }}>
        {isUser ? "You" : "AgentCraft"}
      </span>
      <div style={{
        maxWidth: "80%",
        padding: "12px 16px",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        background: isUser ? "#1a3a4a" : "#1a1a2e",
        border: `1px solid ${isUser ? "#4fc3f7" : "#333"}`,
        color: "#fff",
        whiteSpace: "pre-wrap",
        lineHeight: "1.6"
      }}>
        {msg.content}
      </div>
      {msg.steps?.length > 0 && (
        <div style={{ marginTop: "6px", maxWidth: "80%" }}>
          <button
            onClick={() => setShowSteps(!showSteps)}
            style={{
              background: "none",
              border: "1px solid #333",
              color: "#555",
              padding: "4px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "11px"
            }}
          >
            {showSteps ? "hide" : "show"} reasoning ({msg.steps.length} steps)
          </button>
          {showSteps && msg.steps.map((step, i) => (
            <pre key={i} style={{
              background: "#0d0d0d",
              border: "1px solid #222",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "11px",
              color: "#81c784",
              overflowX: "auto",
              marginTop: "6px"
            }}>
              {step.content}
            </pre>
          ))}
        </div>
      )}
    </div>
  )
}