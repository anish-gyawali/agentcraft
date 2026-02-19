import Message from "./Message"

export default function MessageList({ messages, loading, bottomRef }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
      {messages.length === 0 && (
        <div style={{ textAlign: "center", color: "#333", marginTop: "80px" }}>
          <p style={{ fontSize: "14px" }}>Ask AgentCraft anything about your codebase</p>
          <p style={{ fontSize: "12px" }}>
            Try: "what tools does this project have?" or "explain the memory system"
          </p>
        </div>
      )}
      {messages.map((msg, i) => <Message key={i} msg={msg} />)}
      {loading && (
        <div style={{ color: "#555", fontSize: "13px" }}>AgentCraft is thinking...</div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}