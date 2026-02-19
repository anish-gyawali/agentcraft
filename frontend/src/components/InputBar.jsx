export default function InputBar({ input, setInput, onSend, loading }) {
  return (
    <div style={{
      padding: "16px 24px",
      borderTop: "1px solid #1a1a2e",
      background: "#0d0d1a",
      display: "flex",
      gap: "10px"
    }}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onSend()}
        placeholder="Ask about your codebase..."
        disabled={loading}
        style={{
          flex: 1,
          padding: "12px 16px",
          background: "#0a0a0f",
          border: "1px solid #1a1a2e",
          borderRadius: "6px",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "13px",
          outline: "none"
        }}
      />
      <button
        onClick={onSend}
        disabled={loading}
        style={{
          padding: "12px 20px",
          background: loading ? "#1a1a2e" : "#4fc3f7",
          border: "none",
          borderRadius: "6px",
          color: loading ? "#555" : "#0a0a0f",
          cursor: loading ? "default" : "pointer",
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "13px"
        }}
      >
        send
      </button>
    </div>
  )
}